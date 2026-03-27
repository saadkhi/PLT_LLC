import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json();
        // @ts-ignore - Prisma types may be stale in IDE but DB is synced
        const category = await prisma.category.update({
            where: { id: parseInt(params.id) },
            data: {
                name: data.name,
                description: data.description || '',
                image: data.image || '',
                homepage_image: data.homepage_image || ''
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.category.delete({
            where: { id: parseInt(params.id) },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
