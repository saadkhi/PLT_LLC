import React from 'react';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { safeHttpUrl } from '@/lib/utils';

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    await requireAdminPage();

    const application = await prisma.application.findUnique({
        where: { id: parseInt((await params).id) },
        include: { job: true },
    });

    if (!application) notFound();

    const details = [
        { label: 'Full Name', value: application.name },
        { label: 'Email Address', value: application.email },
        { label: 'Age', value: application.age },
        { label: 'Education Level', value: application.education_level },
        { label: 'Last Institute', value: application.last_institute },
        { label: 'Referral Source', value: application.referral_source },
        { label: 'Applied At', value: new Date(application.applied_at).toLocaleString() },
    ];

    // Applicant-supplied links: only render http(s) URLs as clickable links.
    const resumeUrl = safeHttpUrl(application.resume);
    const socialLinks = [
        { label: 'GitHub', value: application.github_link, url: safeHttpUrl(application.github_link) },
        { label: 'LinkedIn', value: application.linkedin_link, url: safeHttpUrl(application.linkedin_link) },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">{application.name}</h2>
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">Application for: {application.job.title}</p>
                </div>
                {resumeUrl ? (
                    <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-navy-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-200"
                    >
                        <FileText className="w-5 h-5 mr-3" /> View Resume
                    </a>
                ) : (
                    <p className="font-bold text-red-600 text-sm max-w-xs break-all">
                        Resume link is not a valid web address: {application.resume}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8 border-b border-gray-50 pb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                            {details.map((detail, index) => (
                                <div key={index}>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{detail.label}</p>
                                    <p className="font-bold text-gray-900">{detail.value || 'N/A'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 border-b border-gray-50 pb-4">Social Profiles</h3>
                        <div className="space-y-6">
                            {socialLinks.map((link, index) => (
                                <div key={index}>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{link.label}</p>
                                    {link.url ? (
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline break-all">{link.value}</a>
                                    ) : link.value ? (
                                        <p className="font-bold text-gray-500 text-sm break-all">{link.value}</p>
                                    ) : (
                                        <p className="font-bold text-gray-300 italic text-sm">Not provided</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-navy-900 rounded-3xl p-8 text-white shadow-xl">
                        <h3 className="text-xs font-black text-white/50 uppercase tracking-[0.2em] mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/20 font-bold transition text-sm">
                                Mark as Reviewed
                            </button>
                            <button className="w-full py-4 px-6 rounded-2xl bg-red-500 hover:bg-red-600 font-bold transition text-sm">
                                Reject Application
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
