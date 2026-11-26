import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateAdminSession } from '@/lib/adminAuth';

export async function GET(request: Request) {
    const unauthorized = await validateAdminSession(request);
    if (unauthorized) return unauthorized;
    try {
        const socialLinks = await prisma.socialLink.findMany({
            orderBy: { created_at: 'asc' },
        });
        return NextResponse.json(socialLinks);
    } catch (error) {
        console.error('Error fetching social links:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const unauthorized = await validateAdminSession(request);
    if (unauthorized) return unauthorized;
    try {
        const data = await request.json();
        const socialLink = await prisma.socialLink.create({
            data: {
                platform_name: data.platform_name,
                url: data.url,
                icon: data.icon || null,
            },
        });
        return NextResponse.json(socialLink);
    } catch (error) {
        console.error('Error creating social link:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}