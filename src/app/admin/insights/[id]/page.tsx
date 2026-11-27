import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import InsightForm from '@/components/admin/InsightForm';
import { requireAdminPage } from '@/lib/adminAuth';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditInsightPage({ params }: PageProps) {
    await requireAdminPage();

    const insight = await prisma.insight.findUnique({
        where: { id: parseInt((await params).id) },
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
