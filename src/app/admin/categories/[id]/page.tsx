import React from 'react';
import CategoryForm from '@/components/admin/CategoryForm';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { requireAdminPage } from '@/lib/adminAuth';

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    await requireAdminPage();

    const category = await prisma.category.findUnique({
        where: { id: parseInt((await params).id) },
    });

    if (!category) notFound();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Edit Service: {category.name}</h2>
            <CategoryForm initialData={category} />
        </div>
    );
}
