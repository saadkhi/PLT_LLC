import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';

export default async function InsightDetailPage({ params }: { params: { id: string } }) {
    const insight = await prisma.insight.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!insight) {
        notFound();
    }

    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-40 pb-16">
            <div className="max-w-4xl mx-auto mt-8">
                <Link href="/insights" className="text-orange-500 font-semibold mb-8 inline-block hover:underline">&larr; Back to Insights</Link>

                <h1 className="text-3xl sm:text-5xl font-bold text-black mb-6 leading-tight">{insight.title}</h1>
                <p className="text-orange-500 font-bold mb-8">{new Date(insight.created_at).toLocaleDateString()}</p>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
                    <div className="h-[400px] bg-gray-100 flex items-center justify-center p-8 relative">
                        <Image
                            src={getImageUrl(insight.image || 'AI.png')}
                            alt={insight.title}
                            fill
                            className="object-contain p-8"
                        />
                    </div>
                    <div className="p-8 sm:p-12 text-gray-800 leading-relaxed text-lg">
                        <p className="mb-6 font-semibold">{insight.description}</p>
                        {/* For now we use description as content if content column is missing, 
                or we can add content to the schema later if needed. 
                Django model only had title, description, image, created_at. */}
                        <div className="whitespace-pre-line">{insight.description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
