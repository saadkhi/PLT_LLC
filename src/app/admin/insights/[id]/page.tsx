import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import InsightForm from '@/components/admin/InsightForm';

interface PageProps {
    params: { id: string };
}

export default async function EditInsightPage({ params }: PageProps) {
    const insight = await prisma.insight.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!insight) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Edit Insight: {insight.title}</h2>
            <InsightForm initialData={insight} />
        </div>
    );
}
