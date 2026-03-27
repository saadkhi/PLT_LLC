import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const jobId = parseInt(formData.get('jobId') as string);
        const name = formData.get('name') as string;
        const age = parseInt(formData.get('age') as string);
        const email = formData.get('email') as string;
        const education_level = formData.get('education_level') as string;
        const last_institute = formData.get('last_institute') as string;
        const github_link = formData.get('github_link') as string;
        const linkedin_link = formData.get('linkedin_link') as string;
        const resume_url = formData.get('resume') as string; // For now, we take a URL/string
        const referral_source = formData.get('referral_source') as string;

        if (!jobId || !name || !email || !resume_url) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const application = await prisma.application.create({
            data: {
                jobId,
                name,
                age,
                email,
                education_level,
                last_institute,
                github_link,
                linkedin_link,
                resume: resume_url,
                referral_source,
            },
        });

        return NextResponse.json({ success: true, message: 'Application submitted successfully', data: application });
    } catch (error) {
        console.error('Apply API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
