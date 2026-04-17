import React from 'react';
import prisma from '@/lib/prisma';
import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';

export default async function PortfolioPage() {
    const categories = await prisma.category.findMany({
        orderBy: { id: 'asc' },
        include: {
            projects: {
                include: { images: { orderBy: { order: 'asc' } } },
            },
        },
    });

    return (
        <div className="bg-white min-h-screen">
            {/* Header / Hero */}
            <div className="pt-24 pb-12 px-6 sm:px-12 md:px-20 lg:px-32 text-center">
                <h1 className="text-fluid-h1 font-black uppercase tracking-tighter text-[#0A2540]">
                    Our <span className="text-cyan-500">Portfolio</span>
                </h1>
                <p className="mt-4 text-[10px] sm:text-xs uppercase font-bold tracking-[0.3em] text-gray-400">
                    Explore our diverse range of successful projects
                </p>
            </div>

            {/* Categories Loop */}
            <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 pb-32 space-y-32">
                {categories.map((category) => (
                    <section key={category.id} id={`category-${category.id}`} className="scroll-mt-32">
                        <div className="mb-12">
                            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0A2540] border-l-4 border-cyan-500 pl-6">
                                {category.name}
                            </h2>
                            {category.description && (
                                <p className="mt-6 text-gray-600 leading-relaxed text-lg pl-6 max-w-3xl">
                                    {category.description}
                                </p>
                            )}
                        </div>

                        {category.projects.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
                                {category.projects.map((project) => (
                                    <div key={project.id} className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col group hover:shadow-2xl hover:border-black/20 transition-all duration-500">
                                        <div className="h-72 bg-gray-50 relative overflow-hidden">
                                            {project.images.length > 0 ? (
                                                <Image
                                                    src={getImageUrl(project.images[0].image)}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium uppercase tracking-widest">
                                                    No Image
                                                </div>
                                            )}
                                            {project.images.length > 1 && (
                                                <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2 z-10">
                                                    {project.images.map((_, i) => (
                                                        <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-cyan-500 shadow-md shadow-cyan-500/50' : 'bg-white/80'}`}></div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-8 flex-1 flex flex-col">
                                            <h3 className="text-2xl font-black text-[#0A2540] mb-4 grouping-tight">{project.title}</h3>
                                            <p className="text-gray-600 mb-8 leading-relaxed font-medium">{project.description}</p>
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center text-cyan-500 font-bold uppercase tracking-widest text-xs hover:text-[#0A2540] transition-colors group/link w-fit">
                                                    Visit Project
                                                    <span className="ml-2 group-hover/link:translate-x-1 transition-transform">&rarr;</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 rounded-[2rem] p-12 text-center border border-dashed border-gray-200">
                                <p className="text-gray-400 font-medium uppercase tracking-widest text-xs">More projects coming soon</p>
                            </div>
                        )}
                    </section>
                ))}
            </div>
        </div>
    );
}
