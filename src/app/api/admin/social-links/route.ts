import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
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
