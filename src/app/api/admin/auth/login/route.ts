import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        const cleanUsername = username.trim();
        const cleanPassword = password.trim();

        const logEntry = `[${new Date().toISOString()}] Login attempt: user="${cleanUsername}"\n`;
        console.log(logEntry);

        const user = await prisma.adminUser.findUnique({
            where: { username: cleanUsername },
        });

        if (!user) {
            console.log(`Result: User not found`);
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        if (user.password === cleanPassword) {
            console.log(`Result: Success`);
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

        console.log(`Result: Invalid password`);
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        const errLog = `[${new Date().toISOString()}] Login error: ${error}\n`;
        console.error(errLog);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
