import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const offices = await prisma.office.findMany({
            orderBy: { is_main: 'desc' },
        });
        return NextResponse.json(offices);
    } catch (error) {
        console.error('Error fetching offices:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
