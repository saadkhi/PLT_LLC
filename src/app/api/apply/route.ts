import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { safeHttpUrl } from '@/lib/utils';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, name: string) {
    const value = formData.get(name);
    return typeof value === 'string' ? value.trim() : '';
}

type ApplyResult = { ok: true } | { ok: false; status: number; error: string };

async function handleApplication(formData: FormData, jobId: number): Promise<ApplyResult> {
    const name = text(formData, 'name');
    const email = text(formData, 'email');
    const age = Number(text(formData, 'age'));
    const education_level = text(formData, 'education_level');
    const last_institute = text(formData, 'last_institute');
    const githubInput = text(formData, 'github_link');
    const linkedinInput = text(formData, 'linkedin_link');
    const resumeInput = text(formData, 'resume');
    const referral_source = text(formData, 'referral_source') || 'Other';

    if (!jobId || !name || !email || !resumeInput || !education_level || !last_institute) {
        return { ok: false, status: 400, error: 'Please fill in all required fields.' };
    }
    if (name.length > 120 || email.length > 254 || education_level.length > 120 || last_institute.length > 200
        || referral_source.length > 60 || resumeInput.length > 500 || githubInput.length > 500 || linkedinInput.length > 500) {
        return { ok: false, status: 400, error: 'One or more fields are too long.' };
    }
    if (!EMAIL_PATTERN.test(email)) {
        return { ok: false, status: 400, error: 'Please enter a valid email address.' };
    }
    if (!Number.isInteger(age) || age < 14 || age > 100) {
        return { ok: false, status: 400, error: 'Please enter a valid age.' };
    }

    const resume = safeHttpUrl(resumeInput);
    const github_link = githubInput ? safeHttpUrl(githubInput) : null;
    const linkedin_link = linkedinInput ? safeHttpUrl(linkedinInput) : null;
    if (!resume || (githubInput && !github_link) || (linkedinInput && !linkedin_link)) {
        return { ok: false, status: 400, error: 'Links must start with https:// or http://.' };
    }

    const job = await prisma.job.findUnique({ where: { id: jobId }, select: { id: true } });
    if (!job) {
        return { ok: false, status: 404, error: 'This job is no longer open.' };
    }

    await prisma.application.create({
        data: { jobId, name, age, email, education_level, last_institute, github_link, linkedin_link, resume, referral_source },
    });

    return { ok: true };
}

export async function POST(request: Request) {
    // The careers page posts a plain HTML form; send those visitors back to the job page
    // with a status message. Other clients get JSON.
    const wantsHtml = (request.headers.get('accept') || '').includes('text/html');
    let jobId = 0;
    let result: ApplyResult;

    try {
        const formData = await request.formData();
        jobId = Number.parseInt(text(formData, 'jobId'), 10) || 0;
        result = await handleApplication(formData, jobId);
    } catch (error) {
        console.error('Apply API Error:', error);
        result = { ok: false, status: 500, error: 'Something went wrong. Please try again.' };
    }

    if (wantsHtml && jobId) {
        const target = new URL(`/careers/${jobId}`, request.url);
        if (result.ok) target.searchParams.set('applied', '1');
        else target.searchParams.set('error', result.error);
        return NextResponse.redirect(target, 303);
    }

    return result.ok
        ? NextResponse.json({ success: true, message: 'Application submitted successfully' })
        : NextResponse.json({ error: result.error }, { status: result.status });
}
