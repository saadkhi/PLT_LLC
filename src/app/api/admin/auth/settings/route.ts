import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import {
    ADMIN_SESSION_COOKIE_NAME,
    MIN_ADMIN_PASSWORD_LENGTH,
    getAdminSession,
    hashPassword,
    passwordMatches,
} from '@/lib/adminAuth';

export async function GET(request: Request) {
    const session = await getAdminSession(request);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    return NextResponse.json({ username: session.adminUser.username });
}

export async function PUT(request: Request) {
    const session = await getAdminSession(request);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await request.json();
        const username = typeof body.username === 'string' ? body.username.trim() : '';
        const password = typeof body.password === 'string' ? body.password.trim() : '';
        const currentPassword = typeof body.currentPassword === 'string' ? body.currentPassword.trim() : '';

        if (!username || username.length > 64) {
            return NextResponse.json({ error: 'Username must be 1 to 64 characters.' }, { status: 400 });
        }
        if (password.length < MIN_ADMIN_PASSWORD_LENGTH || password.length > 128) {
            return NextResponse.json(
                { error: `New password must be at least ${MIN_ADMIN_PASSWORD_LENGTH} characters.` },
                { status: 400 },
            );
        }

        // Re-check the current password so a stolen or left-open session can't take over the account.
        const user = session.adminUser;
        if (!currentPassword || !(await passwordMatches(user.password, currentPassword))) {
            return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 403 });
        }

        if (username !== user.username) {
            const taken = await prisma.adminUser.findUnique({ where: { username } });
            if (taken) return NextResponse.json({ error: 'That username is already in use.' }, { status: 409 });
        }

        await prisma.adminUser.update({
            where: { id: user.id },
            data: { username, password: await hashPassword(password) },
        });

        // End every session for this admin, including this one, so the new password is needed everywhere.
        await prisma.adminSession.deleteMany({ where: { adminUserId: user.id } });

        const response = NextResponse.json({ success: true });
        response.cookies.delete(ADMIN_SESSION_COOKIE_NAME);
        return response;
    } catch (error) {
        console.error('Settings PUT error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
