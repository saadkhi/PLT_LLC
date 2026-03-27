'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Image as LucideImage, X } from 'lucide-react';

interface ProjectFormProps {
    initialData?: any;
    categories: any[];
}

const ProjectForm = ({ initialData, categories }: ProjectFormProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        categoryId: initialData?.categoryId || (categories?.[0]?.id || ''),
        description: initialData?.description || '',
        link: initialData?.link || '',
    });

    const [images, setImages] = useState<{ id?: number, image: string, alt_text: string, order: number }[]>(
        initialData?.images || []
    );

    const handleAddImage = () => {
        setImages([...images, { image: '', alt_text: '', order: images.length }]);
    };

    const handleRemoveImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleImageChange = (index: number, field: string, value: any) => {
        const newImages = [...images];
        newImages[index] = { ...newImages[index], [field]: value };
        setImages(newImages);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = initialData
            ? `/api/admin/projects/${initialData.id}`
            : '/api/admin/projects';
        const method = initialData ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, images }),
            });

            if (res.ok) {
                router.push('/admin/projects');
                router.refresh();
            } else {
                alert('Failed to save project');
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
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4">General Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 font-inter">Project Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-black outline-none transition font-medium"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 font-inter">Assigned Service</label>
                        <select
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
                            className="w-full p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-black outline-none transition font-medium appearance-none bg-no-repeat bg-[right_1.5rem_center] bg-[length:1em]"
                            required
                        >
                            {categories?.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 font-inter">Project Link (Optional)</label>
                        <input
                            type="url"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className="w-full p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-black outline-none transition font-medium"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 font-inter">Description</label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-black outline-none transition font-medium resize-none"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                    <h3 className="text-lg font-bold text-gray-900">Project Images</h3>
                    <button
                        type="button"
                        onClick={handleAddImage}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 transition uppercase tracking-widest"
                    >
                        + Add Image
                    </button>
                </div>

                <div className="space-y-4">
                    {images.map((img, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-3xl relative group border border-transparent hover:border-gray-200 transition-all duration-300">
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute -top-3 -right-3 w-10 h-10 bg-white text-red-500 rounded-full shadow-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 border border-gray-100"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="w-full md:w-32 h-32 bg-white rounded-2xl border border-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden relative text-gray-200">
                                {img.image ? (
                                    <img
                                        src={img.image}
                                        alt={`Project preview ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <LucideImage className="w-10 h-10 opacity-20" />
                                )}
                                <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition cursor-pointer">
                                    <span className="text-white text-[10px] font-black uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">Change</span>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml, image/gif, image/avif"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;
                                            const formData = new FormData();
                                            formData.append('file', file);
                                            const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
                                            const data = await res.json();
                                            if (data.url) handleImageChange(index, 'image', data.url);
                                        }}
                                    />
                                </label>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Metadata / Alt Text</label>
                                        <input
                                            type="text"
                                            placeholder="Descriptive text..."
                                            value={img.alt_text}
                                            onChange={(e) => handleImageChange(index, 'alt_text', e.target.value)}
                                            className="w-full p-3 rounded-xl border border-white focus:border-gray-200 focus:bg-white bg-white/50 outline-none transition text-sm font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Display Priority</label>
                                        <input
                                            type="number"
                                            value={img.order}
                                            onChange={(e) => handleImageChange(index, 'order', parseInt(e.target.value))}
                                            className="w-full p-3 rounded-xl border border-white focus:border-gray-200 focus:bg-white bg-white/50 outline-none transition text-sm font-bold"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Direct Asset Link</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={img.image}
                                        placeholder="No file selected"
                                        className="w-full p-3 rounded-xl border border-transparent bg-gray-100 text-[10px] font-mono text-gray-400 select-all"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {images.length === 0 && (
                        <p className="text-center py-10 text-gray-400 text-sm italic">No images added yet.</p>
                    )}
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
                    {loading ? 'Saving...' : initialData ? 'Update Project' : 'Create Project'}
                </button>
            </div>
        </form>
    );
};

export default ProjectForm;
