import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProjectForm from '@/components/admin/ProjectForm';
import { requireAdminPage } from '@/lib/adminAuth';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
    await requireAdminPage();

    const project = await prisma.project.findUnique({
        where: { id: parseInt((await params).id) },
        include: { images: true }
    });

    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
    });

    if (!project) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Edit Project: {project.title}</h2>
            <ProjectForm initialData={project} categories={categories} />
        </div>
    );
}
