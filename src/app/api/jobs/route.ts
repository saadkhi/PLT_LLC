import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const jobs = await prisma.job.findMany({
            orderBy: { posted_at: 'desc' },
        });
        return NextResponse.json(jobs);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
