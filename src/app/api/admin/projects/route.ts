import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { title, categoryId, description, link, images } = await request.json();

        const project = await prisma.project.create({
            data: {
                title,
                categoryId,
                description,
                link,
                images: {
                    create: images?.map((img: any) => ({
                        image: img.image,
                        alt_text: img.alt_text || '',
                        order: img.order || 0,
                    })) || [],
                },
            },
            include: {
                images: true,
            },
        });

        return NextResponse.json(project);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
