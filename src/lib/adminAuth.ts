import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export const ADMIN_SESSION_COOKIE_NAME = 'admin_session';
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours
const LOGIN_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOGIN_RATE_LIMIT_MAX = 5;

const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();

function parseCookies(cookieHeader?: string) {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;

  for (const part of cookieHeader.split(';')) {
    const [name, ...valueParts] = part.split('=');
    if (!name) continue;
    cookies[name.trim()] = valueParts.join('=').trim();
  }

  return cookies;
}

export function getCookieValue(request: Request, name: string) {
  const cookieHeader = request.headers.get('cookie') || '';
  return parseCookies(cookieHeader)[name];
}

export function getClientIp(request: Request) {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = xForwardedFor?.split(',')[0].trim() || realIp;
  return ip || 'unknown';
}

export function enforceLoginRateLimit(request: Request) {
  const ip = getClientIp(request);
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record || now - record.firstAttempt > LOGIN_RATE_LIMIT_WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now });
    return;
  }

  record.count += 1;
  if (record.count > LOGIN_RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((LOGIN_RATE_LIMIT_WINDOW_MS - (now - record.firstAttempt)) / 1000);
    const error = new Error('Too many login attempts');
    (error as any).status = 429;
    (error as any).retryAfter = retryAfter;
    throw error;
  }
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export function isBcryptHash(value: string) {
  return typeof value === 'string' && /\$2[aby]\$\d{2}\$.{53}/.test(value);
}

export async function verifyAdminCredentials(username: string, password: string) {
  const cleanUsername = username.trim();
  const cleanPassword = password.trim();
  const user = await prisma.adminUser.findUnique({ where: { username: cleanUsername } });

  if (user) {
    if (isBcryptHash(user.password)) {
      const valid = await bcrypt.compare(cleanPassword, user.password);
      if (valid) return user;
    } else if (cleanPassword === user.password) {
      const hashed = await hashPassword(cleanPassword);
      await prisma.adminUser.update({ where: { id: user.id }, data: { password: hashed } });
      return user;
    }
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';

  if (adminPassword && cleanUsername === adminUsername && cleanPassword === adminPassword) {
    if (!user) {
      const hashed = await hashPassword(cleanPassword);
      return prisma.adminUser.create({ data: { username: cleanUsername, password: hashed } });
    }

    if (!isBcryptHash(user.password)) {
      const hashed = await hashPassword(cleanPassword);
      await prisma.adminUser.update({ where: { id: user.id }, data: { password: hashed } });
    }

    return user;
  }

  return null;
}

export async function ensureLoginConfigured() {
  const user = await prisma.adminUser.findFirst();
  if (!process.env.ADMIN_PASSWORD && !user) {
    throw new Error('ADMIN_PASSWORD is not configured and no admin user exists. Login is disabled.');
  }
}

export async function createAdminSession(adminUserId: number) {
  const token = crypto.randomBytes(48).toString('hex');
  const expiresAt = new Date(Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000);

  await prisma.adminSession.create({
    data: {
      token,
      adminUserId,
      expiresAt,
    },
  });

  return token;
}

export async function invalidateAdminSession(token?: string) {
  if (!token) return;
  await prisma.adminSession.deleteMany({ where: { token } });
}

/** Returns the session for a token if it exists and has not expired; deletes it if expired. */
async function findValidAdminSession(token: string | undefined) {
  if (!token) return null;

  const session = await prisma.adminSession.findUnique({
    where: { token },
    include: { adminUser: true },
  });

  if (!session) return null;

  if (session.expiresAt <= new Date()) {
    await prisma.adminSession.deleteMany({ where: { token } });
    return null;
  }

  return session;
}

export async function validateAdminSession(request: Request) {
  const session = await findValidAdminSession(getCookieValue(request, ADMIN_SESSION_COOKIE_NAME));
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}

/**
 * Guards an admin page (server component). Redirects to the login page unless the
 * request carries a valid, unexpired admin session. The middleware only checks that
 * the cookie exists, so every admin page must call this before reading any data.
 */
export async function requireAdminPage() {
  const session = await findValidAdminSession((await cookies()).get(ADMIN_SESSION_COOKIE_NAME)?.value);
  if (!session) {
    redirect('/admin/login');
  }

  return session;
}

export function disableAdminLoginIfNeeded() {
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error('ADMIN_PASSWORD is not configured. Admin login is disabled.');
  }
}
