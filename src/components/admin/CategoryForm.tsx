'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getImageUrl } from '@/lib/utils';
import { Home, Settings } from 'lucide-react';

interface CategoryFormProps {
    initialData?: any;
}

const CategoryForm = ({ initialData }: CategoryFormProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        description: initialData?.description || '',
        image: initialData?.image || '',
        homepage_image: initialData?.homepage_image || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = initialData
            ? `/api/admin/categories/${initialData.id}`
            : '/api/admin/categories';
        const method = initialData ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/admin/categories');
                router.refresh();
            } else {
                alert('Failed to save service/category');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4">Service Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 font-inter">Service Title</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-black outline-none transition font-medium"
                            placeholder="e.g. Web & App Development"
                            required
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 font-inter">Description</label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-black outline-none transition font-medium resize-none"
                            placeholder="Describe this service to your clients..."
                        />
                    </div>

                    <div className="md:col-span-2 space-y-4 pt-4 border-t border-gray-50">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 font-inter">Homepage Visual (Optional)</label>
                        <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-white rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden relative shadow-sm text-gray-200">
                                {formData.homepage_image ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img src={getImageUrl(formData.homepage_image)} alt="Home Preview" className="w-full h-full object-contain p-2" />
                                ) : (
                                    <Home className="w-8 h-8 opacity-20" />
                                )}
                            </div>
                            <div className="space-y-2 flex-1">
                                <label className="inline-block bg-white text-black border border-gray-200 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-gray-100 transition shadow-sm">
                                    Set Home Icon
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
                                            if (data.url) setFormData({ ...formData, homepage_image: data.url });
                                        }}
                                    />
                                </label>
                                <p className="text-[10px] text-gray-400 font-medium italic">Custom icon for homepage grid (Text-only visual currently preferred)</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 font-inter">Service Detailed Banner / Icon</label>
                        <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                            <div className="w-24 h-24 bg-white rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden relative shadow-sm text-gray-200">
                                {formData.image ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img src={getImageUrl(formData.image)} alt="Preview" className="w-full h-full object-contain p-2" />
                                ) : (
                                    <Settings className="w-12 h-12 opacity-20" />
                                )}
                            </div>
                            <div className="space-y-2 flex-1">
                                <label className="inline-block bg-black text-white px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer hover:bg-gray-800 transition shadow-lg shadow-gray-200">
                                    Choose Icon
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
                                <p className="text-[10px] text-gray-400 font-medium">Used on main Services portal</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-8 py-4 rounded-2xl font-bold text-gray-500 hover:bg-white transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200 disabled:opacity-50"
                >
                    {loading ? 'Saving...' : initialData ? 'Update Service' : 'Create Service'}
                </button>
            </div>
        </form>
    );
};

export default CategoryForm;
