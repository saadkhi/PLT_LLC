import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateAdminSession } from '@/lib/adminAuth';

export async function GET(request: Request) {
    const unauthorized = await validateAdminSession(request);
    if (unauthorized) return unauthorized;
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
    const unauthorized = await validateAdminSession(request);
    if (unauthorized) return unauthorized;
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