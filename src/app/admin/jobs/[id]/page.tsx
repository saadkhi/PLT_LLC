import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import JobForm from '@/components/admin/JobForm';

interface PageProps {
    params: { id: string };
}

export default async function EditJobPage({ params }: PageProps) {
    const job = await prisma.job.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!job) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Edit Job: {job.title}</h2>
            <JobForm initialData={job} />
        </div>
    );
}
