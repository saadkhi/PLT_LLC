'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import Breadcrumbs from '@/components/admin/Breadcrumbs';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#fcfcfc] font-inter">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 pt-24 lg:pt-16">
                <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
                    <Breadcrumbs />
                    {children}
                </div>
            </main>
        </div>
    );
}
