import React from 'react';
import prisma from '@/lib/prisma';
import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';

export default async function IndustriesPage() {
    const industries = await prisma.industry.findMany({
        orderBy: { created_at: 'asc' },
    });

    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-40 pb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 sm:mt-6 md:mt-8 text-center font-bold">Industries</h1>
            <p className="text-center text-gray-600 mt-4 mb-12 max-w-2xl mx-auto">
                We provide tailored software solutions across diverse sectors, helping businesses innovate and scale.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {industries.map((industry: any) => (
                    <div key={industry.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-[1.02] hover:shadow-xl">
                        <Image
                            src={getImageUrl(industry.image || 'AI.png')}
                            alt={industry.name}
                            width={80}
                            height={80}
                            className="w-20 h-20 mb-4 object-contain"
                        />
                        <h3 className="text-xl font-bold text-black mb-2">{industry.name}</h3>
                        <p className="text-gray-600 text-sm">{industry.description}</p>
                    </div>
                ))}
            </div>

            {industries.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 italic">No industries identified yet.</p>
                </div>
            )}
        </div>
    );
}
