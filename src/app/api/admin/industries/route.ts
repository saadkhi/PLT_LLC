import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateAdminSession } from '@/lib/adminAuth';

export async function POST(request: Request) {
    const unauthorized = await validateAdminSession(request);
    if (unauthorized) return unauthorized;
    try {
        const body = await request.json();
        const industry = await prisma.industry.create({
            data: body,
        });
        return NextResponse.json(industry);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}