import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { validateAdminSession } from '@/lib/adminAuth';

function getMimeType(buffer: Buffer) {
    if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
        return 'image/jpeg';
    }
    if (buffer.length >= 8 && buffer.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
        return 'image/png';
    }
    if (buffer.length >= 12 && buffer.slice(0, 4).toString('ascii') === 'RIFF' && buffer.slice(8, 12).toString('ascii') === 'WEBP') {
        return 'image/webp';
    }
    return null;
}

export async function POST(request: Request) {
    const unauthorized = await validateAdminSession(request);
    if (unauthorized) return unauthorized;

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
        if (fileObject.size === 0 || fileObject.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File must be smaller than 5 MB' }, { status: 413 });
        }

        const bytes = await fileObject.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const mimeType = getMimeType(buffer);
        if (!mimeType) {
            return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
        }
        // Name the file from its detected type, never the uploaded extension, so a file
        // named `.html` (or anything else) can't be served back as a different content type.
        const extension = ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' } as Record<string, string>)[mimeType];
        const baseName = fileObject.name.replace(/\.[^.]*$/, '').replace(/[^a-zA-Z0-9-]/g, '_').slice(0, 60) || 'image';
        const cleanName = `${baseName}.${extension}`;

        // If Vercel Blob token is missing, use local storage as fallback
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
            console.log('[UPLOAD] BLOB_READ_WRITE_TOKEN missing');

            try {
                // Read file as Buffer
                // Clean filename: remove weird characters, spaces to hyphens
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

                return NextResponse.json({ error: 'Upload failed. Check the server logs for details.' }, { status: 500 });
            }

        }

        // Upload directly to Vercel Blob if token exists
        try {
            const blob = await put(`${Date.now()}-${cleanName}`, new Blob([buffer], { type: mimeType }), {
                access: 'public',
                contentType: mimeType,
            });

            console.log(`[UPLOAD SUCCESS] File saved to Vercel Blob: ${blob.url}`);

            return NextResponse.json({
                success: true,
                url: blob.url
            });
        } catch (err: any) {
            console.error('[UPLOAD ERROR] Vercel Blob upload failed:', err);
            return NextResponse.json({ error: 'Upload to Vercel Blob failed. Check the server logs for details.' }, { status: 500 });
        }
    } catch (error: any) {
        console.error('General upload error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
