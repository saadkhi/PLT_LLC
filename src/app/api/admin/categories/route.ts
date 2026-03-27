import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { name, description, image, homepage_image } = await request.json();

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const category = await prisma.category.create({
            data: {
                name,
                description: description || '',
                image: image || '',
                homepage_image: homepage_image || ''
            },
        });
        return NextResponse.json(category);
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
