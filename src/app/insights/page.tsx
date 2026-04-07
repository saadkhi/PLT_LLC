import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';

export default async function InsightsPage() {
    const insights = await prisma.insight.findMany({
        orderBy: { created_at: 'desc' },
    });

    return (
        <div className="bg-white min-h-screen">
            {/* Standardized Hero Title */}
            <div className="pt-24 pb-12 px-6 sm:px-12 md:px-20 lg:px-32 text-center">
                <h1 className="text-fluid-h1 font-black uppercase tracking-tighter text-black">
                    Our <span className="text-orange-500">Insights</span>
                </h1>
                <p className="mt-4 text-[10px] sm:text-xs uppercase font-bold tracking-[0.3em] text-gray-400">
                    Latest trends and innovations in technology
                </p>
            </div>

            <section className="py-12 bg-gray-50/50 min-h-[50vh]">
                <div className="max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {insights.map((insight: any) => (
                            <div key={insight.id} className="group bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden flex flex-col border border-gray-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/5">
                                <div className="h-64 bg-gray-50 relative overflow-hidden">
                                    <Image
                                        src={getImageUrl(insight.image || 'AI.png')}
                                        alt={insight.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 text-orange-600 font-bold uppercase text-[10px] tracking-widest mb-4">
                                        <Calendar size={14} />
                                        <span>{new Date(insight.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tight text-black mb-4 group-hover:text-orange-500 transition-colors line-clamp-2 uppercase leading-tight">
                                        {insight.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-6 line-clamp-3 font-medium leading-relaxed">
                                        {insight.description}
                                    </p>
                                    <Link
                                        href={`/insights/${insight.id}`}
                                        className="mt-auto inline-flex items-center justify-center gap-2 group/btn"
                                    >
                                        <span className="text-xs font-black uppercase tracking-widest text-black group-hover/btn:text-orange-500 transition-colors">Read Article</span>
                                        <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover/btn:bg-orange-500 group-hover/btn:border-orange-500 group-hover/btn:text-white transition-all">
                                            <ArrowRight size={14} />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {insights.length === 0 && (
                        <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-gray-200">
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No insights published yet</p>
                            <p className="text-sm text-gray-400 mt-2 font-medium">Coming soon!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
