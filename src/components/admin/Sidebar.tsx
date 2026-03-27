'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Mail,
    Lightbulb,
    Building2,
    Folder,
    Construction,
    MapPin,
    Share2,
    Settings,
    LogOut
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Jobs', href: '/admin/jobs', icon: Briefcase },
    { name: 'Applications', href: '/admin/applications', icon: FileText },
    { name: 'Messages', href: '/admin/messages', icon: Mail },
    { name: 'Insights', href: '/admin/insights', icon: Lightbulb },
    { name: 'Industries', href: '/admin/industries', icon: Building2 },
    { name: 'Services', href: '/admin/categories', icon: Folder },
    { name: 'Projects', href: '/admin/projects', icon: Construction },
    { name: 'Offices', href: '/admin/offices', icon: MapPin },
    { name: 'Social Links', href: '/admin/social-links', icon: Share2 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        const res = await fetch('/api/admin/auth/logout', { method: 'POST' });
        if (res.ok) {
            window.location.href = '/admin/login'; // Hard redirect to clear any state
        }
    };

    const NavContent = () => (
        <>
            <div className="p-8 border-b border-gray-50 bg-white">
                <h1 className="text-xl font-black text-gray-900 tracking-tighter">PRIME<span className="text-gray-400">LINE</span></h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Agency Management</p>
            </div>

            <nav className="flex-1 p-6 space-y-2 overflow-y-auto bg-white">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${isActive
                                ? 'bg-black text-white shadow-lg shadow-gray-200 translate-x-1'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'scale-110' : 'opacity-70'}`} />
                            <span className="font-bold text-sm tracking-tight">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-gray-50 mt-auto bg-white">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-red-500 font-bold text-sm hover:bg-red-50 transition-colors group"
                >
                    <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>Logout</span>
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-50">
                <h1 className="text-lg font-black text-gray-900 tracking-tighter">PRIME<span className="text-gray-400">LINE</span></h1>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl text-gray-900"
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Sidebar Menu */}
            <aside className={`lg:hidden fixed top-0 bottom-0 left-0 w-72 bg-white z-[70] shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <NavContent />
            </aside>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 bg-white border-r border-gray-100 flex-col h-screen sticky top-0 shadow-sm overflow-hidden">
                <NavContent />
            </aside>
        </>
    );
};

export default Sidebar;
