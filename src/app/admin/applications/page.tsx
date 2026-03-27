import React from 'react';
import prisma from '@/lib/prisma';
import SearchBar from '@/components/admin/SearchBar';
import ApplicationsTable from '@/components/admin/ApplicationsTable';

export default async function AdminApplicationsPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
    const query = searchParams.q || '';

    const applications = await prisma.application.findMany({
        where: {
            OR: [
                { name: { contains: query } },
                { email: { contains: query } },
                { job: { title: { contains: query } } },
            ],
        },
        include: {
            job: true,
        },
        orderBy: {
            applied_at: 'desc',
        },
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Job Applications</h2>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <SearchBar placeholder="Search by applicant name, email, or job title..." />
                </div>

                <ApplicationsTable initialApplications={applications} />
            </div>
        </div>
    );
}
