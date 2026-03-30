import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Upload directly to Vercel Blob
        const blob = await put(file.name, file, {
            access: 'public',
        });

        console.log(`[UPLOAD SUCCESS] File saved to Vercel Blob: ${blob.url}`);

        return NextResponse.json({
            success: true,
            url: blob.url
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
