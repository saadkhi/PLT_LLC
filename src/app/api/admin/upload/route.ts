import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure uploads directory exists
        const uploadDir = join(process.cwd(), 'public/uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (err) {
            // ignore if exists
        }

        // Generate unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
        const path = join(uploadDir, filename);

        await writeFile(path, buffer);
        console.log(`[UPLOAD SUCCESS] File saved to: ${path}`);

        // Return the public URL
        return NextResponse.json({
            success: true,
            url: `/uploads/${filename}`
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
