import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import SearchBar from '@/components/admin/SearchBar';
import JobsTable from '@/components/admin/JobsTable';

export default async function AdminJobsPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
    const query = searchParams.q || '';

    const jobs = await prisma.job.findMany({
        where: {
            OR: [
                { title: { contains: query } },
                { location: { contains: query } },
            ],
        },
        orderBy: { posted_at: 'desc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Job Listings</h2>
                <Link
                    href="/admin/jobs/new"
                    className="bg-navy-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200 inline-flex items-center"
                >
                    <span className="mr-2 text-lg">+</span> Add New Job
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <SearchBar placeholder="Search by title or location..." />
                </div>

                <JobsTable initialJobs={jobs} />
            </div>
        </div>
    );
}
