'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface InsightFormProps {
    initialData?: any;
}

const InsightForm = ({ initialData }: InsightFormProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        image: initialData?.image || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = initialData ? `/api/admin/insights/${initialData.id}` : '/api/admin/insights';
            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/admin/insights');
                router.refresh();
            } else {
                alert('Failed to save insight');
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
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Insight Title</label>
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
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Description / Content</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={10}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black outline-none transition"
                    required
                />
            </div>

            <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Featured Image</label>
                <div className="flex items-center space-x-6 bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-200">
                    <div className="w-40 h-24 bg-white rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                        {formData.image ? (
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-2xl grayscale opacity-20">📰</span>
                        )}
                    </div>
                    <div className="space-y-2 flex-1">
                        <label className="inline-block bg-black text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-gray-800 transition">
                            Upload Cover
                            <input
                                type="file"
                                className="hidden"
                                accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml, image/gif, image/avif"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const uploadData = new FormData();
                                    uploadData.append('file', file);
                                    const res = await fetch('/api/admin/upload', { method: 'POST', body: uploadData });
                                    const data = await res.json();
                                    if (data.url) setFormData({ ...formData, image: data.url });
                                }}
                            />
                        </label>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Recommended: 1200x630 (PNG, JPG)</p>
                        {formData.image && (
                            <p className="text-[10px] font-mono text-gray-400 truncate max-w-xs">{formData.image}</p>
                        )}
                    </div>
                </div>
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
                    {loading ? 'Saving...' : initialData ? 'Update Insight' : 'Create Insight'}
                </button>
            </div>
        </form>
    );
};

export default InsightForm;
