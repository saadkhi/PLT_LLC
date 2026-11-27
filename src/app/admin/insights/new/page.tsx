import React from 'react';
import InsightForm from '@/components/admin/InsightForm';
import { requireAdminPage } from '@/lib/adminAuth';

export default async function NewInsightPage() {
    await requireAdminPage();

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Create New Insight</h2>
            <InsightForm />
        </div>
    );
}
