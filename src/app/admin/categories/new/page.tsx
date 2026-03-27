import React from 'react';
import CategoryForm from '@/components/admin/CategoryForm';

export default function NewCategoryPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Add New Service</h2>
            <CategoryForm />
        </div>
    );
}
