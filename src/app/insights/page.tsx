import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getImageUrl } from '@/lib/utils';

export default async function InsightsPage() {
    const insights = await prisma.insight.findMany({
        orderBy: { created_at: 'desc' },
    });

    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-40 pb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 sm:mt-6 md:mt-8 text-center font-bold">Insights</h1>
            <p className="text-center text-gray-600 mt-4 mb-12 max-w-2xl mx-auto">
                Stay updated with the latest trends and innovations in technology.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {insights.map((insight: any) => (
                    <div key={insight.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transform transition duration-300 hover:scale-[1.02] hover:shadow-xl">
                        <div className="h-48 bg-gray-200">
                            <img src={getImageUrl(insight.image || 'AI.png')} alt={insight.title} className="w-full h-full object-contain p-8" />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <p className="text-orange-500 text-xs font-bold mb-2 uppercase">
                                {new Date(insight.created_at).toLocaleDateString()}
                            </p>
                            <h3 className="text-xl font-bold text-black mb-3">{insight.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{insight.description}</p>
                            <Link href={`/insights/${insight.id}`} className="mt-auto text-orange-500 font-semibold hover:underline">
                                Read More &rarr;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {insights.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 italic">No insights published yet.</p>
                </div>
            )}
        </div>
    );
}
