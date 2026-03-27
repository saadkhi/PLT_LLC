'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Office {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    office_hours: string;
    is_main: boolean;
}

export default function AdminOfficesPage() {
    const router = useRouter();
    const [offices, setOffices] = useState<Office[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        office_hours: '',
        is_main: false,
    });

    const fetchOffices = async () => {
        try {
            const res = await fetch('/api/admin/offices');
            const data = await res.json();
            setOffices(data);
        } catch (error) {
            console.error('Failed to fetch offices:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffices();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const url = isEditing
            ? `/api/admin/offices/${isEditing}`
            : '/api/admin/offices';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({
                    name: '',
                    address: '',
                    phone: '',
                    email: '',
                    office_hours: '',
                    is_main: false,
                });
                setIsEditing(null);
                fetchOffices();
            } else {
                alert('Failed to save office');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (office: Office) => {
        setIsEditing(office.id);
        setFormData({
            name: office.name,
            address: office.address,
            phone: office.phone,
            email: office.email,
            office_hours: office.office_hours,
            is_main: office.is_main,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this office?')) return;

        try {
            const res = await fetch(`/api/admin/offices/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchOffices();
            } else {
                alert('Failed to delete office');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Manage Office Locations</h2>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6 max-w-4xl">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4">
                    {isEditing ? 'Edit Office' : 'Add New Office'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Office Name (e.g. USA Office, Pakistan Office)</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-black outline-none transition font-bold text-sm bg-gray-50/50"
                            placeholder="e.g. Headquarters"
                            required
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Address</label>
                        <textarea
                            rows={3}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-black outline-none transition font-bold text-sm bg-gray-50/50 resize-none"
                            placeholder="Full physical address..."
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-black outline-none transition font-bold text-sm bg-gray-50/50"
                            placeholder="+1 234 567 890"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-black outline-none transition font-bold text-sm bg-gray-50/50"
                            placeholder="info@pltllc.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Office Hours</label>
                        <input
                            type="text"
                            value={formData.office_hours}
                            onChange={(e) => setFormData({ ...formData, office_hours: e.target.value })}
                            className="w-full p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-black outline-none transition font-bold text-sm bg-gray-50/50"
                            placeholder="Mon - Fri: 9:00 AM - 5:00 PM"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-3 pt-4">
                        <input
                            type="checkbox"
                            id="is_main"
                            checked={formData.is_main}
                            onChange={(e) => setFormData({ ...formData, is_main: e.target.checked })}
                            className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <label htmlFor="is_main" className="text-sm font-bold text-gray-700 cursor-pointer">Set as Main Office</label>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 border-t border-gray-50 pt-6">
                    {isEditing && (
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(null);
                                setFormData({
                                    name: '',
                                    address: '',
                                    phone: '',
                                    email: '',
                                    office_hours: '',
                                    is_main: false,
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
                        className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : isEditing ? 'Update Office' : 'Add Office'}
                    </button>
                </div>
            </form>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <tr>
                            <th className="px-8 py-5">Office</th>
                            <th className="px-8 py-5">Address</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {offices.map((office) => (
                            <tr key={office.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center space-x-2">
                                        <p className="font-bold text-gray-900 group-hover:text-black transition">{office.name}</p>
                                        {office.is_main && (
                                            <span className="bg-green-100 text-green-700 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">Main</span>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-bold">{office.email} • {office.phone}</p>
                                </td>
                                <td className="px-8 py-5">
                                    <p className="text-xs text-gray-600 font-medium line-clamp-1">{office.address}</p>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => handleEdit(office)}
                                            className="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-400 rounded-lg hover:bg-black hover:text-white transition shadow-sm"
                                            title="Edit"
                                        >
                                            <span className="text-[10px] uppercase font-black">Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(office.id)}
                                            className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition shadow-sm"
                                            title="Delete"
                                        >
                                            <span className="text-[10px] uppercase font-black">Del</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
