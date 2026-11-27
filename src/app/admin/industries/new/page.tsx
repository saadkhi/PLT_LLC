import React from 'react';
import IndustryForm from '@/components/admin/IndustryForm';
import { requireAdminPage } from '@/lib/adminAuth';

export default async function NewIndustryPage() {
    await requireAdminPage();

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Create New Industry</h2>
            <IndustryForm />
        </div>
    );
}
