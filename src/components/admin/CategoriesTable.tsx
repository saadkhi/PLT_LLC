'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DeleteModal from './DeleteModal';
import { useRouter } from 'next/navigation';
import { getImageUrl } from '@/lib/utils';

interface CategoriesTableProps {
    initialCategories: any[];
}

const CategoriesTable = ({ initialCategories }: CategoriesTableProps) => {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteName, setDeleteName] = useState('');

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            const res = await fetch(`/api/admin/categories/${deleteId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert('Failed to delete category');
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
                            <th className="px-8 py-5">Preview</th>
                            <th className="px-8 py-5">Service Name</th>
                            <th className="px-8 py-5">Active Projects</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {initialCategories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-gray-50 transition group">
                                <td className="px-8 py-5">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={getImageUrl(cat.image || cat.homepage_image || 'web_dev.png')}
                                            alt={cat.name}
                                            className="w-full h-full object-contain p-1"
                                        />
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <p className="font-bold text-gray-900 group-hover:text-[#0A2540] transition">{cat.name}</p>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                        {cat._count.projects} Projects
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right space-x-2">
                                    <Link
                                        href={`/admin/categories/${cat.id}`}
                                        className="inline-flex items-center justify-center w-9 h-9 bg-gray-50 text-gray-400 rounded-xl hover:bg-navy-900 hover:text-white transition shadow-sm"
                                        title="Edit"
                                    >
                                        <span className="text-[10px] uppercase font-black">Edit</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setDeleteId(cat.id);
                                            setDeleteName(cat.name);
                                        }}
                                        className="inline-flex items-center justify-center w-9 h-9 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm"
                                        title="Delete"
                                    >
                                        <span className="text-[10px] uppercase font-black">Del</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {initialCategories.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-8 py-16 text-center">
                                    <p className="text-gray-400 italic font-medium">No categories found matching your search.</p>
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

export default CategoriesTable;
