'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminSettingsPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetch('/api/admin/auth/settings')
            .then(res => res.json())
            .then(data => {
                if (data.username) setUsername(data.username);
            })
            .catch(err => console.error('Failed to load settings', err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/admin/auth/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username.trim(), password: password.trim() }),
            });

            if (res.ok) {
                setSuccess('Credentials updated. You will be logged out in 3 seconds.');
                setTimeout(async () => {
                    await fetch('/api/admin/auth/logout', { method: 'POST' });
                    router.push('/admin/login');
                    router.refresh();
                }, 3000);
            } else {
                const data = await res.json();
                setError(data.error || 'Failed to update credentials');
            }
        } catch (err) {
            setError('An error occurred. Check browser console.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-8">System Settings</h2>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-10 border border-gray-100 shadow-xl shadow-gray-100/50 space-y-8">
                {(error || success) && (
                    <div className={`p-5 rounded-2xl font-bold text-sm border ${success ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                        }`}>
                        {error || success}
                    </div>
                )}

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Administrative Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-navy-900 outline-none transition font-bold text-sm bg-gray-50/50"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Secure Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-navy-900 outline-none transition font-bold text-sm bg-gray-50/50"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-navy-900 outline-none transition font-bold text-sm bg-gray-50/50"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end border-t border-gray-50 pt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-navy-900 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition shadow-xl shadow-gray-200 disabled:opacity-50"
                    >
                        {loading ? 'Saving Changes...' : 'Update Records'}
                    </button>
                </div>
            </form>
        </div>
    );
}
