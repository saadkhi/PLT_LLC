import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json();
        const office = await prisma.office.update({
            where: { id: parseInt(params.id) },
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
        console.error('Error updating office:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.office.delete({
            where: { id: parseInt(params.id) },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting office:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
