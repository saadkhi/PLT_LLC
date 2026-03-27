'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DeleteModal from './DeleteModal';
import { useRouter } from 'next/navigation';

interface ApplicationsTableProps {
    initialApplications: any[];
}

const ApplicationsTable = ({ initialApplications }: ApplicationsTableProps) => {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteName, setDeleteName] = useState('');

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            const res = await fetch(`/api/admin/applications/${deleteId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert('Failed to delete application');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-[0.1em]">
                        <tr>
                            <th className="px-8 py-5">Applicant</th>
                            <th className="px-8 py-5">Job Title</th>
                            <th className="px-8 py-5">Email</th>
                            <th className="px-8 py-5">Applied Date</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {initialApplications.map((app) => (
                            <tr key={app.id} className="hover:bg-gray-50 transition group">
                                <td className="px-8 py-5">
                                    <p className="font-bold text-gray-900 group-hover:text-black transition">{app.name}</p>
                                </td>
                                <td className="px-8 py-5 text-sm text-gray-500 font-medium">{app.job?.title || 'N/A'}</td>
                                <td className="px-8 py-5 text-sm text-gray-500 font-medium">{app.email}</td>
                                <td className="px-8 py-5 text-sm text-gray-400 font-medium">
                                    {new Date(app.applied_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </td>
                                <td className="px-8 py-5 text-right space-x-2">
                                    <Link
                                        href={`/admin/applications/${app.id}`}
                                        className="inline-flex items-center justify-center w-9 h-9 bg-gray-50 text-gray-400 rounded-xl hover:bg-black hover:text-white transition shadow-sm"
                                        title="View Details"
                                    >
                                        <span className="text-[10px] uppercase font-black">View</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setDeleteId(app.id);
                                            setDeleteName(app.name);
                                        }}
                                        className="inline-flex items-center justify-center w-9 h-9 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm"
                                        title="Delete"
                                    >
                                        <span className="text-[10px] uppercase font-black">Del</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {initialApplications.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-8 py-16 text-center">
                                    <p className="text-gray-400 italic font-medium">No applications found matching your search.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <DeleteModal
                isOpen={deleteId !== null}
                itemName={deleteName}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
            />
        </>
    );
};

export default ApplicationsTable;
