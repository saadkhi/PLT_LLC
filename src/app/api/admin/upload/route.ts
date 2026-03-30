import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // If Vercel Blob token is missing, use local storage as fallback
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            console.log('[UPLOAD] BLOB_READ_WRITE_TOKEN missing, using local storage fallback');

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Clean filename and add timestamp to avoid collisions
            const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
            const uploadDir = path.join(process.cwd(), 'public/uploads');
            const filePath = path.join(uploadDir, fileName);

            // Ensure directory exists
            await fs.mkdir(uploadDir, { recursive: true });
            await fs.writeFile(filePath, buffer);

            const localUrl = `/uploads/${fileName}`;
            console.log(`[UPLOAD SUCCESS] File saved locally: ${localUrl}`);

            return NextResponse.json({
                success: true,
                url: localUrl
            });
        }

        // Upload directly to Vercel Blob if token exists
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
