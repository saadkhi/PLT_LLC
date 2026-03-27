import React from 'react';
import InsightForm from '@/components/admin/InsightForm';

export default function NewInsightPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Create New Insight</h2>
            <InsightForm />
        </div>
    );
}
