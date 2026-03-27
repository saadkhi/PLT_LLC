import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const offices = await prisma.office.findMany({
            orderBy: { created_at: 'desc' },
        });
        return NextResponse.json(offices);
    } catch (error) {
        console.error('Error fetching offices:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const office = await prisma.office.create({
            data: {
                name: data.name,
                address: data.address,
                phone: data.phone,
                email: data.email,
                office_hours: data.office_hours,
                is_main: data.is_main || false,
            },
        });
        return NextResponse.json(office);
    } catch (error) {
        console.error('Error creating office:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
