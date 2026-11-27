import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import IndustryForm from '@/components/admin/IndustryForm';
import { requireAdminPage } from '@/lib/adminAuth';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditIndustryPage({ params }: PageProps) {
    await requireAdminPage();

    const industry = await prisma.industry.findUnique({
        where: { id: parseInt((await params).id) },
    });

    if (!industry) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Edit Industry: {industry.name}</h2>
            <IndustryForm initialData={industry} />
        </div>
    );
}
