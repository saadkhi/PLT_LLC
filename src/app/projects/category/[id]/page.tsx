import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';

export default async function ProjectCategoryPage({ params }: { params: { id: string } }) {
    const categoryId = parseInt(params.id);
    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    });

    if (!category) {
        notFound();
    }

    const projects = await prisma.project.findMany({
        where: { categoryId },
        include: { images: { orderBy: { order: 'asc' } } },
    });

    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-40 pb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0A2540] mt-8 mb-4">{category.name}</h1>
            <p className="text-gray-600 mb-12">Discover our projects in {category.name}.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
                        {/* Simple Project Carousel (Static for now) */}
                        <div className="h-64 bg-gray-100 relative group">
                            {project.images.length > 0 ? (
                                <Image
                                    src={getImageUrl(project.images[0].image)}
                                    alt={project.title}
                                    fill
                                    className="object-contain p-4"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 italic">No Image Available</div>
                            )}
                            {project.images.length > 1 && (
                                <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
                                    {project.images.map((_, i) => (
                                        <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-cyan-500' : 'bg-gray-300'}`}></div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-8 flex-1 flex flex-col">
                            <h3 className="text-2xl font-bold text-[#0A2540] mb-4">{project.title}</h3>
                            <p className="text-gray-700 mb-6">{project.description}</p>
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="mt-auto text-cyan-500 font-bold hover:underline">
                                    Visit Project &rarr;
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {projects.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl shadow-md">
                    <p className="text-gray-500 text-lg italic">No projects found in this category yet. Check back soon!</p>
                </div>
            )}
        </div>
    );
}
