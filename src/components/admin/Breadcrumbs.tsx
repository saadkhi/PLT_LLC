'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumbs = () => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length <= 1) return null; // Don't show on root dashboard

    return (
        <nav className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 py-2 px-1">
            <Link href="/admin" className="hover:text-[#0A2540] transition">Home</Link>
            {segments.slice(1).map((segment, index) => {
                const path = `/${segments.slice(0, index + 2).join('/')}`;
                const isLast = index === segments.length - 2;
                const displayName = segment.replace(/-/g, ' ');

                return (
                    <React.Fragment key={path}>
                        <span className="text-gray-300">/</span>
                        {isLast ? (
                            <span className="text-gray-900">{displayName}</span>
                        ) : (
                            <Link href={path} className="hover:text-[#0A2540] transition">{displayName}</Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
