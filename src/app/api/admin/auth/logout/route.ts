import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { invalidateAdminSession, validateAdminSession, ADMIN_SESSION_COOKIE_NAME } from '@/lib/adminAuth';

export async function POST(request: Request) {
    const unauthorized = await validateAdminSession(request);
    if (unauthorized) return unauthorized;

    const cookieValue = cookies().get(ADMIN_SESSION_COOKIE_NAME)?.value;
    if (cookieValue) {
        await invalidateAdminSession(cookieValue);
    }

    cookies().delete(ADMIN_SESSION_COOKIE_NAME);
    return NextResponse.json({ success: true });
}
