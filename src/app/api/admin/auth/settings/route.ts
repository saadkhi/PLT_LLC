import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateAdminSession, hashPassword } from '@/lib/adminAuth';

export async function GET(request: Request) {
    const unauthorized = await validateAdminSession(request);
    if (unauthorized) return unauthorized;

    try {
        const user = await prisma.adminUser.findFirst();
        if (!user) {
            console.log('Settings GET: No admin user found in DB');
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        return NextResponse.json({ username: user.username });
    } catch (error) {
        console.error('Settings GET error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const unauthorized = await validateAdminSession(request);
    if (unauthorized) return unauthorized;

    try {
        const { username, password } = await request.json();
        console.log(`Attempting to update admin credentials to: ${username}`);

        const hashedPassword = await hashPassword(password.trim());
        let user = await prisma.adminUser.findFirst();

        if (!user) {
            console.log('No user found, creating new admin record');
            user = await prisma.adminUser.create({
                data: { username: username.trim(), password: hashedPassword },
            });
        } else {
            console.log(`Updating existing admin record with ID: ${user.id}`);
            user = await prisma.adminUser.update({
                where: { id: user.id },
                data: { username: username.trim(), password: hashedPassword },
            });
        }

        console.log('Admin credentials updated successfully');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Settings PUT error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}