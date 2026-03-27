import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const contactMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                subject,
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
