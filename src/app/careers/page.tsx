import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Job } from '@prisma/client';

export default async function CareersPage() {
    const jobs = await prisma.job.findMany({
        orderBy: { posted_at: 'desc' },
    });

    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-40 pb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 sm:mt-6 md:mt-8 text-center font-bold">Careers</h1>
            <p className="text-center text-gray-600 mt-4 mb-12 max-w-2xl mx-auto">
                Join our team of innovators and help us shape the future of technology.
            </p>

            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                {jobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row justify-between items-center transform transition duration-300 hover:scale-[1.01] hover:shadow-xl border border-gray-100">
                        <div className="text-center sm:text-left mb-4 sm:mb-0">
                            <h3 className="text-xl font-bold text-black mb-1">{job.title}</h3>
                            <p className="text-gray-500 text-sm flex items-center justify-center sm:justify-start">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {job.location} ({job.job_mode})
                            </p>
                        </div>
                        <Link
                            href={`/careers/${job.id}`}
                            className="px-6 py-2 bg-black text-white rounded-xl font-semibold hover:bg-orange-500 transition"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>

            {jobs.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 italic">No job openings at the moment. Please check back later!</p>
                </div>
            )}
        </div>
    );
}
