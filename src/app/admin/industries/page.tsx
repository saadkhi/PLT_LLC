import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import SearchBar from '@/components/admin/SearchBar';
import IndustriesTable from '@/components/admin/IndustriesTable';

export default async function AdminIndustriesPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
    const query = searchParams.q || '';

    const industries = await prisma.industry.findMany({
        where: {
            OR: [
                { name: { contains: query } },
                { description: { contains: query } },
            ],
        },
        orderBy: { created_at: 'asc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Industries</h2>
                <Link
                    href="/admin/industries/new"
                    className="bg-navy-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200 inline-flex items-center"
                >
                    <span className="mr-2 text-lg">+</span> New Industry
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <SearchBar placeholder="Search industries..." />
                </div>

                <IndustriesTable initialIndustries={industries} />
            </div>
        </div>
    );
}
