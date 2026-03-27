'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface JobFormProps {
    initialData?: any;
}

const JobForm = ({ initialData }: JobFormProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        location: initialData?.location || '',
        job_mode: initialData?.job_mode || 'Remote',
        about_role: initialData?.about_role || '',
        responsibilities: initialData?.responsibilities || '',
        requirements: initialData?.requirements || '',
        nice_to_have: initialData?.nice_to_have || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = initialData ? `/api/admin/jobs/${initialData.id}` : '/api/admin/jobs';
            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/admin/jobs');
                router.refresh();
            } else {
                alert('Failed to save job');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-4xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Job Mode</label>
                    <select
                        name="job_mode"
                        value={formData.job_mode}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition"
                    >
                        <option value="Remote">Remote</option>
                        <option value="On-site">On-site</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">About the Role</label>
                <textarea
                    name="about_role"
                    value={formData.about_role}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Responsibilities</label>
                <textarea
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition"
                    placeholder="One per line..."
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Requirements</label>
                <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition"
                    placeholder="One per line..."
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Nice to Have</label>
                <textarea
                    name="nice_to_have"
                    value={formData.nice_to_have}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition"
                />
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-bold hover:bg-gray-50 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition shadow-lg disabled:opacity-50"
                >
                    {loading ? 'Saving...' : initialData ? 'Update Job' : 'Create Job'}
                </button>
            </div>
        </form>
    );
};

export default JobForm;
