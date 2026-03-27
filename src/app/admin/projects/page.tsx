import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import SearchBar from '@/components/admin/SearchBar';
import ProjectsTable from '@/components/admin/ProjectsTable';

export default async function AdminProjectsPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
    const query = searchParams.q || '';

    const projects = await prisma.project.findMany({
        where: {
            OR: [
                { title: { contains: query } },
                { description: { contains: query } },
                { category: { name: { contains: query } } },
            ],
        },
        include: { category: true },
        orderBy: { id: 'desc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Projects</h2>
                <Link
                    href="/admin/projects/new"
                    className="bg-black text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200 inline-flex items-center"
                >
                    <span className="mr-2 text-lg">+</span> New Project
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <SearchBar placeholder="Search projects by title, description, or category..." />
                </div>

                <ProjectsTable initialProjects={projects} />
            </div>
        </div>
    );
}
