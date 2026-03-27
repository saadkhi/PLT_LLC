'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DeleteModal from './DeleteModal';
import { useRouter } from 'next/navigation';

interface IndustriesTableProps {
    initialIndustries: any[];
}

const IndustriesTable = ({ initialIndustries }: IndustriesTableProps) => {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteName, setDeleteName] = useState('');

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            const res = await fetch(`/api/admin/industries/${deleteId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert('Failed to delete industry');
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
                            <th className="px-8 py-5">Name</th>
                            <th className="px-8 py-5">Description</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {initialIndustries.map((industry) => (
                            <tr key={industry.id} className="hover:bg-gray-50 transition group">
                                <td className="px-8 py-5">
                                    <p className="font-bold text-gray-900 group-hover:text-black transition">{industry.name}</p>
                                </td>
                                <td className="px-8 py-5 text-sm text-gray-500 font-medium line-clamp-1 max-w-md">
                                    {industry.description}
                                </td>
                                <td className="px-8 py-5 text-right space-x-2">
                                    <Link
                                        href={`/admin/industries/${industry.id}`}
                                        className="inline-flex items-center justify-center w-9 h-9 bg-gray-50 text-gray-400 rounded-xl hover:bg-black hover:text-white transition shadow-sm"
                                        title="Edit"
                                    >
                                        <span className="text-[10px] uppercase font-black">Edit</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setDeleteId(industry.id);
                                            setDeleteName(industry.name);
                                        }}
                                        className="inline-flex items-center justify-center w-9 h-9 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm"
                                        title="Delete"
                                    >
                                        <span className="text-[10px] uppercase font-black">Del</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {initialIndustries.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-8 py-16 text-center">
                                    <p className="text-gray-400 italic font-medium">No industries found matching your search.</p>
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

export default IndustriesTable;
