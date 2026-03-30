import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request: Request) {
    try {
        console.log('[UPLOAD] POST request received');
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file || typeof file === 'string') {
            console.error('[UPLOAD ERROR] No file object in formData');
            return NextResponse.json({ error: 'No file uploaded or invalid file format' }, { status: 400 });
        }

        const fileObject = file as File;
        console.log(`[UPLOAD] File detected: ${fileObject.name}, size: ${fileObject.size}, type: ${fileObject.type}`);

        // If Vercel Blob token is missing, use local storage as fallback
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            console.log('[UPLOAD] BLOB_READ_WRITE_TOKEN missing');

            try {
                // Read file as Buffer
                const bytes = await fileObject.arrayBuffer();
                const buffer = Buffer.from(bytes);

                // Clean filename: remove weird characters, spaces to hyphens
                const cleanName = fileObject.name.replace(/[^a-zA-Z0-9.-]/g, '_');
                const fileName = `${Date.now()}-${cleanName}`;

                // Use absolute path from project root
                const uploadDir = path.join(process.cwd(), 'public', 'uploads');
                const filePath = path.join(uploadDir, fileName);

                console.log(`[UPLOAD] Resolved path: ${filePath}`);

                // Ensure directory exists
                await fs.mkdir(uploadDir, { recursive: true });

                // Write file
                await fs.writeFile(filePath, buffer);

                const localUrl = `/uploads/${fileName}`;
                console.log(`[UPLOAD SUCCESS] File saved locally: ${localUrl}`);

                return NextResponse.json({
                    success: true,
                    url: localUrl
                });
            } catch (err: any) {
                console.error('[UPLOAD ERROR] Local storage failed:', err);

                if (err.code === 'EROFS' || process.env.VERCEL) {
                    return NextResponse.json({
                        error: 'Vercel local storage is read-only. Please connect "Vercel Blob" in your Vercel Dashboard -> Storage tab to enable uploads.'
                    }, { status: 500 });
                }

                return NextResponse.json({ error: `Upload failed: ${err.message}` }, { status: 500 });
            }

        }

        // Upload directly to Vercel Blob if token exists
        try {
            const blob = await put(fileObject.name, fileObject, {
                access: 'public',
            });

            console.log(`[UPLOAD SUCCESS] File saved to Vercel Blob: ${blob.url}`);

            return NextResponse.json({
                success: true,
                url: blob.url
            });
        } catch (err: any) {
            console.error('[UPLOAD ERROR] Vercel Blob upload failed:', err);
            return NextResponse.json({ error: `Blob error: ${err.message}` }, { status: 500 });
        }
    } catch (error: any) {
        console.error('General upload error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
