import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function GET() {
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
    try {
        const { username, password } = await request.json();
        console.log(`Attempting to update admin credentials to: ${username}`);

        let user = await prisma.adminUser.findFirst();

        if (!user) {
            console.log('No user found, creating new admin record');
            user = await prisma.adminUser.create({
                data: { username: username.trim(), password: password.trim() },
            });
        } else {
            console.log(`Updating existing admin record with ID: ${user.id}`);
            user = await prisma.adminUser.update({
                where: { id: user.id },
                data: { username: username.trim(), password: password.trim() },
            });
        }

        console.log('Admin credentials updated successfully');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Settings PUT error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
