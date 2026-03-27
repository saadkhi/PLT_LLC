import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await request.json();
        const socialLink = await prisma.socialLink.update({
            where: { id: parseInt(params.id) },
            data: {
                platform_name: data.platform_name,
                url: data.url,
                icon: data.icon || null,
            },
        });
        return NextResponse.json(socialLink);
    } catch (error) {
        console.error('Error updating social link:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.socialLink.delete({
            where: { id: parseInt(params.id) },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting social link:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
