import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';

export default async function CareersPage() {
    const jobs = await prisma.job.findMany({
        orderBy: { posted_at: 'desc' },
    });

    return (
        <div className="bg-white min-h-screen">
            {/* Standardized Hero Title */}
            <div className="pt-24 pb-12 px-6 sm:px-12 md:px-20 lg:px-32 text-center">
                <h1 className="text-fluid-h1 font-black uppercase tracking-tighter text-black">
                    Join Our <span className="text-orange-500">Team</span>
                </h1>
                <p className="mt-4 text-[10px] sm:text-xs uppercase font-bold tracking-[0.3em] text-gray-400">
                    Shape the future of technology with us
                </p>
            </div>

            <section className="py-12 bg-gray-50/50 min-h-[50vh]">
                <div className="max-w-4xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 space-y-6">
                    {jobs.map((job) => (
                        <div key={job.id} className="group bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-8 flex flex-col sm:flex-row justify-between items-center border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-orange-100">
                            <div className="text-center sm:text-left mb-6 sm:mb-0">
                                <h3 className="text-2xl font-black tracking-tight text-black mb-2 group-hover:text-orange-500 transition-colors uppercase">{job.title}</h3>
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={14} className="text-orange-500" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Briefcase size={14} className="text-orange-500" />
                                        <span>{job.job_mode}</span>
                                    </div>
                                </div>
                            </div>
                            <Link
                                href={`/careers/${job.id}`}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-orange-500 transition-all duration-300 shadow-lg shadow-gray-200"
                            >
                                <span>View Details</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    ))}

                    {jobs.length === 0 && (
                        <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No job openings at the moment</p>
                            <p className="text-sm text-gray-400 mt-2 font-medium">Please check back later!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
