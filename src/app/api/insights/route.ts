import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const insights = await prisma.insight.findMany({
            orderBy: { created_at: 'desc' },
        });
        return NextResponse.json(insights);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
