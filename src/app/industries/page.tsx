import React from 'react';
import prisma from '@/lib/prisma';
import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';

export default async function IndustriesPage() {
    const industries = await prisma.industry.findMany({
        orderBy: { created_at: 'asc' },
    });

    return (
        <div className="bg-white min-h-screen">
            {/* Standardized Hero Title */}
            <div className="pt-24 pb-12 px-6 sm:px-12 md:px-20 lg:px-32 text-center">
                <h1 className="text-fluid-h1 font-black uppercase tracking-tighter text-black">
                    Industries <span className="text-orange-500">We Serve</span>
                </h1>
                <p className="mt-4 text-[10px] sm:text-xs uppercase font-bold tracking-[0.3em] text-gray-400">
                    Tailored solutions across diverse sectors
                </p>
            </div>

            <section className="py-12 bg-gray-50/50 min-h-[50vh]">
                <div className="max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {industries.map((industry: any) => (
                            <div key={industry.id} className="group bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-8 flex flex-col items-center text-center border border-gray-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/5">
                                <div className="w-24 h-24 mb-6 relative">
                                    <div className="absolute inset-0 bg-orange-50 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                                    <Image
                                        src={getImageUrl(industry.image || 'AI.png')}
                                        alt={industry.name}
                                        width={96}
                                        height={96}
                                        className="relative w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight text-black mb-4">{industry.name}</h3>
                                <p className="text-gray-600 leading-relaxed font-medium line-clamp-3">
                                    {industry.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {industries.length === 0 && (
                        <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No industries identified yet</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
