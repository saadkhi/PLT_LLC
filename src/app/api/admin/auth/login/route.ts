import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ensureLoginConfigured, enforceLoginRateLimit, verifyAdminCredentials, createAdminSession, ADMIN_SESSION_COOKIE_NAME, ADMIN_SESSION_MAX_AGE_SECONDS } from '@/lib/adminAuth';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        const cleanUsername = username.trim();
        const cleanPassword = password.trim();

        await ensureLoginConfigured();
        enforceLoginRateLimit(request);

        const user = await verifyAdminCredentials(cleanUsername, cleanPassword);
        if (!user) {
            console.log(`Result: Invalid credentials`);
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = await createAdminSession(user.id);
        const response = NextResponse.json({ success: true });
        (await cookies()).set(ADMIN_SESSION_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
            path: '/',
        });

        console.log(`Result: Success (Authenticated)`);
        return response;
    } catch (error: any) {
        const errLog = `[${new Date().toISOString()}] Login error: ${error}\n`;
        console.error(errLog);
        if (error?.status === 429) {
            return NextResponse.json({ error: 'Too many login attempts' }, { status: 429, headers: { 'Retry-After': `${error.retryAfter || 900}` } });
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
