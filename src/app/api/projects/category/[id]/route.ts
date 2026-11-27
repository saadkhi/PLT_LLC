import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const categoryId = parseInt((await params).id);
        const projects = await prisma.project.findMany({
            where: { categoryId },
            include: { images: true },
        });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
