import React from 'react';
import prisma from '@/lib/prisma';
import { Briefcase, FileText, Mail, Lightbulb } from 'lucide-react';

export default async function AdminDashboard() {
    let counts = { jobs: 0, applications: 0, messages: 0, insights: 0 };
    let recentApplications: any[] = [];
    let recentMessages: any[] = [];

    try {
        counts = {
            jobs: await prisma.job.count(),
            applications: await prisma.application.count(),
            messages: await prisma.contactMessage.count(),
            insights: await prisma.insight.count(),
        };

        recentApplications = await prisma.application.findMany({
            take: 5,
            orderBy: { applied_at: 'desc' },
            include: { job: true },
        });

        recentMessages = await prisma.contactMessage.findMany({
            take: 5,
            orderBy: { created_at: 'desc' },
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
    }

    const stats = [
        { label: 'Total Jobs', val: counts.jobs, color: 'bg-blue-500', icon: <Briefcase className="w-6 h-6" /> },
        { label: 'Applications', val: counts.applications, color: 'bg-green-500', icon: <FileText className="w-6 h-6" /> },
        { label: 'Messages', val: counts.messages, color: 'bg-cyan-500', icon: <Mail className="w-6 h-6" /> },
        { label: 'Insights', val: counts.insights, color: 'bg-purple-500', icon: <Lightbulb className="w-6 h-6" /> },
    ];

    return (
        <div className="space-y-8 md:space-y-12 pb-12">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-3xl font-black text-gray-900 mt-1 tracking-tight">{stat.val}</h3>
                        </div>
                        <div className={`${stat.color} w-14 h-14 rounded-2xl text-white flex items-center justify-center text-2xl shadow-lg shadow-gray-200 transition-transform group-hover:scale-110`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
                {/* Recent Applications */}
                <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">Recent Applications</h2>
                        <span className="px-3 py-1 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-full">Newest First</span>
                    </div>
                    <div className="space-y-4">
                        {recentApplications.map((app: any) => (
                            <div key={app.id} className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100">
                                <div className="min-w-0 flex-1 mr-4">
                                    <p className="font-bold text-gray-900 truncate">{app.name}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{app.job?.title || 'Unknown Job'}</p>
                                </div>
                                <p className="text-[10px] font-black text-gray-300 whitespace-nowrap">
                                    {new Date(app.applied_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                        {recentApplications.length === 0 && <p className="text-gray-400 italic text-sm py-10 text-center">No recent applications.</p>}
                    </div>
                </div>

                {/* Recent Messages */}
                <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">Recent Messages</h2>
                        <span className="px-3 py-1 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest rounded-full">Newest First</span>
                    </div>
                    <div className="space-y-4">
                        {recentMessages.map((msg: any) => (
                            <div key={msg.id} className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100">
                                <div className="min-w-0 flex-1 mr-4">
                                    <p className="font-bold text-gray-900 truncate">{msg.name}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{msg.subject || 'No Subject'}</p>
                                </div>
                                <p className="text-[10px] font-black text-gray-300 whitespace-nowrap">
                                    {new Date(msg.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                        {recentMessages.length === 0 && <p className="text-gray-400 italic text-sm py-10 text-center">No recent messages.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
