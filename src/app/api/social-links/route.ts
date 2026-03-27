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
