import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import IndustryForm from '@/components/admin/IndustryForm';

interface PageProps {
    params: { id: string };
}

export default async function EditIndustryPage({ params }: PageProps) {
    const industry = await prisma.industry.findUnique({
        where: { id: parseInt(params.id) },
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
