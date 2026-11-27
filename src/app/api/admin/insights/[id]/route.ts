import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { validateAdminSession } from '@/lib/adminAuth';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const unauthorized = await validateAdminSession(request);
    if (unauthorized) return unauthorized;
    try {
        await prisma.insight.delete({
            where: { id: parseInt((await params).id) },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
