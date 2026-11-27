import React from 'react';
import JobForm from '@/components/admin/JobForm';
import { requireAdminPage } from '@/lib/adminAuth';

export default async function NewJobPage() {
    await requireAdminPage();

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Create New Job Listing</h2>
            <JobForm />
        </div>
    );
}
