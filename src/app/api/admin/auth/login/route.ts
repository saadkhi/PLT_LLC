import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        const cleanUsername = username.trim();
        const cleanPassword = password.trim();

        const logEntry = `[${new Date().toISOString()}] Login attempt: user="${cleanUsername}", pass="${cleanPassword}"\n`;
        fs.appendFileSync(path.join(process.cwd(), 'login_audit.log'), logEntry);

        const user = await prisma.adminUser.findUnique({
            where: { username: cleanUsername },
        });

        if (!user) {
            fs.appendFileSync(path.join(process.cwd(), 'login_audit.log'), `Result: User not found\n`);
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        if (user.password === cleanPassword) {
            fs.appendFileSync(path.join(process.cwd(), 'login_audit.log'), `Result: Success\n`);
            const response = NextResponse.json({ success: true });

            cookies().set('admin_session', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            return response;
        }

        fs.appendFileSync(path.join(process.cwd(), 'login_audit.log'), `Result: Invalid password (found: "${user.password}")\n`);
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        const errLog = `[${new Date().toISOString()}] Login error: ${error}\n`;
        fs.appendFileSync(path.join(process.cwd(), 'login_audit.log'), errLog);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
