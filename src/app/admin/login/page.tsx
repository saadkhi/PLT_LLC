'use client';

import React, { useState } from 'react';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username.trim(),
                    password: password.trim()
                }),
            });

            if (res.ok) {
                // Hard redirect to ensure cookie state is fresh and layout triggers
                window.location.href = '/admin';
            } else {
                const data = await res.json();
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[10000] bg-[#fcfcfc] flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col space-y-10 animate-in zoom-in-95 duration-500 my-auto">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tighter">PRIME<span className="text-gray-400">LINE</span></h1>
                    <div className="inline-block px-3 py-1 bg-gray-50 rounded-full">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Administrative Portal</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-3xl text-xs font-bold border border-red-100/50 text-center animate-shake">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Identifier</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-5 rounded-[1.5rem] border border-gray-100 bg-gray-50/30 focus:bg-white focus:ring-2 focus:ring-black outline-none transition font-bold text-sm"
                                placeholder="Username"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Access Code</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-5 rounded-[1.5rem] border border-gray-100 bg-gray-50/30 focus:bg-white focus:ring-2 focus:ring-black outline-none transition font-bold text-sm"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-6 bg-black text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-800 transition-all hover:shadow-xl hover:shadow-gray-200 active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? 'Verifying...' : 'Access Dashboard'}
                    </button>
                </form>

                <div className="pt-6 border-t border-gray-50 text-center">
                    <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest leading-loose">
                        Secure System Access<br />
                        Controlled Environment
                    </p>
                </div>
            </div>
        </div>
    );
}
