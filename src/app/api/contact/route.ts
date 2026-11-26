import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const contentType = request.headers.get('content-type') || '';
        const values = contentType.includes('application/json')
            ? await request.json()
            : Object.fromEntries((await request.formData()).entries());
        const name = typeof values.name === 'string' ? values.name.trim() : '';
        const email = typeof values.email === 'string' ? values.email.trim() : '';
        const subject = typeof values.subject === 'string' ? values.subject.trim() : '';
        const message = typeof values.message === 'string' ? values.message.trim() : '';

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        if (name.length > 120 || email.length > 254 || subject.length > 200 || message.length > 10000) {
            return NextResponse.json({ error: 'One or more fields are too long' }, { status: 400 });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
        }

        const contactMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                subject: subject || null,
                message,
            },
        });

        // TODO: Send email using Resend/SendGrid
        // await sendEmail({ to: 'saadali598@yahoo.com', ... })

        return NextResponse.json({ success: true, message: 'Message sent successfully', data: contactMessage });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
