import React from 'react';
import { notFound } from 'next/navigation';
import { Job } from '@prisma/client';
import prisma from '@/lib/prisma'; // Using Prisma directly since it's a Server Component

export default async function JobDetailPage({ params }: { params: { id: string } }) {
    const job = await prisma.job.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!job) {
        notFound();
    }

    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-40 pb-16">
            <div className="max-w-4xl mx-auto mt-8">
                <h1 className="text-3xl sm:text-5xl font-bold text-black mb-4">{job.title}</h1>
                <p className="text-gray-500 text-lg mb-8">{job.location} | {job.job_mode}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Job Details */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-bold text-black mb-3">About the Role</h2>
                            <p className="text-gray-700 leading-relaxed">{job.about_role}</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-black mb-3">Responsibilities</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.responsibilities}</p>
                        </section>
                        <section>
                            <h2 className="text-xl font-bold text-black mb-3">Requirements</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.requirements}</p>
                        </section>
                        {job.nice_to_have && (
                            <section>
                                <h2 className="text-xl font-bold text-black mb-3">Nice to Have</h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.nice_to_have}</p>
                            </section>
                        )}
                    </div>

                    {/* Application Form */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 h-fit">
                        <h2 className="text-2xl font-bold text-black mb-6">Apply Now</h2>
                        <form action="/api/apply" method="POST" className="space-y-4">
                            <input type="hidden" name="jobId" value={job.id} />
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                <input type="text" name="name" className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
                                    <input type="number" name="age" className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                    <input type="email" name="email" className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Education Level</label>
                                <input type="text" name="education_level" className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Last Institute</label>
                                <input type="text" name="last_institute" className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">GitHub Link</label>
                                    <input type="url" name="github_link" className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">LinkedIn Link</label>
                                    <input type="url" name="linkedin_link" className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Resume (URL for now)</label>
                                <input type="text" name="resume" placeholder="e.g., Google Drive link" className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Referral Source</label>
                                <select name="referral_source" className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none">
                                    <option value="Linkedin">LinkedIn</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Indeed">Indeed</option>
                                    <option value="Company Website">Company Website</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg mt-4">
                                Submit Application
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
