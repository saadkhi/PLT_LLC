import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { title, categoryId, description, link, images } = await request.json();
        const projectId = parseInt(params.id);

        // Update project basic info
        const project = await prisma.project.update({
            where: { id: projectId },
            data: {
                title,
                categoryId,
                description,
                link,
            },
        });

        // Handle images: Delete existing and re-create (simplest way for parity)
        await prisma.projectImage.deleteMany({
            where: { projectId },
        });

        if (images && images.length > 0) {
            await prisma.projectImage.createMany({
                data: images.map((img: any) => ({
                    projectId,
                    image: img.image,
                    alt_text: img.alt_text || '',
                    order: img.order || 0,
                })),
            });
        }

        return NextResponse.json(project);
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
        const projectId = parseInt(params.id);

        // Cascading delete for images
        await prisma.projectImage.deleteMany({
            where: { projectId },
        });

        await prisma.project.delete({
            where: { id: projectId },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
