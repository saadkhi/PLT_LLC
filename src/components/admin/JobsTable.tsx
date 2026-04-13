'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DeleteModal from './DeleteModal';
import { useRouter } from 'next/navigation';

interface JobsTableProps {
    initialJobs: any[];
}

const JobsTable = ({ initialJobs }: JobsTableProps) => {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleteName, setDeleteName] = useState('');

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            const res = await fetch(`/api/admin/jobs/${deleteId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert('Failed to delete job');
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
                            <th className="px-8 py-5">Job Title</th>
                            <th className="px-8 py-5">Location</th>
                            <th className="px-8 py-5">Mode</th>
                            <th className="px-8 py-5">Posted Date</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {initialJobs.map((job) => (
                            <tr key={job.id} className="hover:bg-gray-50 transition group">
                                <td className="px-8 py-5">
                                    <p className="font-bold text-gray-900 group-hover:text-[#0A2540] transition">{job.title}</p>
                                </td>
                                <td className="px-8 py-5 text-sm text-gray-500 font-medium">{job.location}</td>
                                <td className="px-8 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${job.job_mode === 'Remote' ? 'bg-green-50 text-green-600' :
                                        job.job_mode === 'On-site' ? 'bg-cyan-50 text-cyan-600' : 'bg-blue-50 text-blue-600'
                                        }`}>
                                        {job.job_mode}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-sm text-gray-400 font-medium">
                                    {new Date(job.posted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </td>
                                <td className="px-8 py-5 text-right space-x-2">
                                    <Link
                                        href={`/admin/jobs/${job.id}`}
                                        className="inline-flex items-center justify-center w-9 h-9 bg-gray-50 text-gray-400 rounded-xl hover:bg-navy-900 hover:text-white transition shadow-sm"
                                        title="Edit"
                                    >
                                        <span className="text-[10px] uppercase font-black">Edit</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setDeleteId(job.id);
                                            setDeleteName(job.title);
                                        }}
                                        className="inline-flex items-center justify-center w-9 h-9 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm"
                                        title="Delete"
                                    >
                                        <span className="text-[10px] uppercase font-black">Del</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {initialJobs.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-8 py-16 text-center">
                                    <p className="text-gray-400 italic font-medium">No results matching your search.</p>
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

export default JobsTable;
