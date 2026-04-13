'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SocialLink {
    id: number;
    platform_name: string;
    url: string;
    icon: string | null;
}

const COMMON_PLATFORMS = [
    { name: 'Facebook', icon: 'facebook' },
    { name: 'Instagram', icon: 'instagram' },
    { name: 'LinkedIn', icon: 'linkedin' },
    { name: 'Twitter / X', icon: 'twitter' },
    { name: 'YouTube', icon: 'youtube' },
];

export default function AdminSocialLinksPage() {
    const router = useRouter();
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        platform_name: '',
        url: '',
        icon: '',
    });

    const fetchSocialLinks = async () => {
        try {
            const res = await fetch('/api/admin/social-links');
            const data = await res.json();
            setSocialLinks(data);
        } catch (error) {
            console.error('Failed to fetch social links:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSocialLinks();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = isEditing
            ? `/api/admin/social-links/${isEditing}`
            : '/api/admin/social-links';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({
                    platform_name: '',
                    url: '',
                    icon: '',
                });
                setIsEditing(null);
                fetchSocialLinks();
            } else {
                alert('Failed to save social link');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (link: SocialLink) => {
        setIsEditing(link.id);
        setFormData({
            platform_name: link.platform_name,
            url: link.url,
            icon: link.icon || '',
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this social link?')) return;

        try {
            const res = await fetch(`/api/admin/social-links/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchSocialLinks();
            } else {
                alert('Failed to delete social link');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    const handleQuickAdd = (platform: { name: string, icon: string }) => {
        setFormData({
            platform_name: platform.name,
            url: '',
            icon: platform.icon,
        });
        setIsEditing(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Social Media Links</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
                        <h3 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4">
                            {isEditing ? 'Edit Social Link' : 'Add New Link'}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Platform Name</label>
                                <input
                                    type="text"
                                    value={formData.platform_name}
                                    onChange={(e) => setFormData({ ...formData, platform_name: e.target.value })}
                                    className="w-full p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-navy-900 outline-none transition font-bold text-sm bg-gray-50/50"
                                    placeholder="e.g. Facebook"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Platform ID / Icon Tag</label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-navy-900 outline-none transition font-bold text-sm bg-gray-50/50"
                                    placeholder="e.g. facebook, instagram, twitter"
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full URL</label>
                                <input
                                    type="url"
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    className="w-full p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-navy-900 outline-none transition font-bold text-sm bg-gray-50/50"
                                    placeholder="https://facebook.com/pltllc"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 border-t border-gray-50 pt-6">
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(null);
                                        setFormData({
                                            platform_name: '',
                                            url: '',
                                            icon: '',
                                        });
                                    }}
                                    className="px-6 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-navy-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200 disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : isEditing ? 'Update Link' : 'Add Link'}
                            </button>
                        </div>
                    </form>

                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <tr>
                                    <th className="px-8 py-5">Platform</th>
                                    <th className="px-8 py-5">URL</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {socialLinks.map((link) => (
                                    <tr key={link.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <p className="font-bold text-gray-900 group-hover:text-[#0A2540] transition">{link.platform_name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{link.icon || 'No Icon'}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-500 hover:underline font-medium line-clamp-1"
                                            >
                                                {link.url}
                                            </a>
                                        </td>
                                        <td className="px-8 py-5 text-right text-sm">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => handleEdit(link)}
                                                    className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-400 rounded-lg hover:bg-navy-900 hover:text-white transition shadow-sm"
                                                    title="Edit"
                                                >
                                                    <span className="text-[10px] uppercase font-black">Edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(link.id)}
                                                    className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition shadow-sm"
                                                    title="Delete"
                                                >
                                                    <span className="text-[10px] uppercase font-black">Del</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {socialLinks.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-8 py-10 text-center text-gray-400 italic">No social links added yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#111] text-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 space-y-6">
                        <h3 className="text-lg font-black tracking-tight">Quick Add Platform</h3>
                        <p className="text-xs text-gray-400 font-medium leading-relaxed">Select a platform below to pre-fill the form and add your link quickly.</p>

                        <div className="grid grid-cols-1 gap-2">
                            {COMMON_PLATFORMS.map((platform) => (
                                <button
                                    key={platform.name}
                                    onClick={() => handleQuickAdd(platform)}
                                    className="flex items-center space-x-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                                >
                                    <span className="font-bold text-sm tracking-widest uppercase">{platform.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-4">
                        <h4 className="font-bold text-gray-900 text-sm">Note</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Icon tags are used by the frontend to display the correct platform logo. Common tags include <code className="bg-gray-50 px-1 rounded">facebook</code>, <code className="bg-gray-50 px-1 rounded">instagram</code>, <code className="bg-gray-50 px-1 rounded">twitter</code>, etc.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
