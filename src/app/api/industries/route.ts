import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const industries = await prisma.industry.findMany({
            orderBy: { created_at: 'asc' },
        });
        return NextResponse.json(industries);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
