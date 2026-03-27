import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getImageUrl } from '@/lib/utils';

export default async function ServicesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { id: 'asc' },
    });

    return (
        <div className="px-2 sm:px-4 md:px-8 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 sm:mt-6 md:mt-8 text-center font-bold">Our Services</h1>

            {/* Quadrants Section */}
            <section className="py-12 bg-gray-100 px-0 border-y border-gray-200 mt-12">
                <div className="max-w-screen-xl mx-auto px-0 space-y-12">
                    {categories.map((service, index) => (
                        <div
                            key={service.id}
                            id={service.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}
                            className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} justify-center items-center`}
                        >
                            {/* Square Box */}
                            <div className="flex flex-col items-center justify-center text-center w-full md:w-[30%] max-w-[400px] aspect-square p-4">
                                <img
                                    src={getImageUrl(service.image || 'web_dev.png')}
                                    alt={service.name}
                                    className="w-full h-full object-contain shadow-xl rounded-[2rem] bg-white border border-gray-100"
                                />
                            </div>

                            {/* Rectangle Box */}
                            <div className="flex flex-col items-start justify-start text-left p-8 w-full md:w-[70%] max-w-[1000px]">
                                <h3 className="mt-4 text-4xl font-black tracking-tight text-gray-900 mb-4">{service.name}</h3>
                                <p className="text-justify text-gray-700 leading-relaxed mb-6 font-medium">{service.description}</p>
                                <Link
                                    href={`/projects/category/${service.id}`}
                                    className="inline-block px-8 py-3 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transform transition duration-300 hover:scale-[1.02] hover:bg-orange-600"
                                >
                                    Explore Past Works
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="relative bg-white py-24 px-0 border-t border-gray-100">
                <div className="relative container mx-auto text-center text-black">
                    <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tight">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
                        {[
                            { title: "Idea Generation", text: "We are the source of generating the most iconic and unique ideas to make sure that creativity and innovation never fade away from the industry. Our work is based on imagination and decision-making of industry specialists." },
                            { title: "Countless Experiments", text: "Before coming up with something new, our service is experimented with unlimited times to make sure it is safe, unique, and user-friendly. We assure you that our customers will always be satisfied." },
                            { title: "Unlimited Revisions", text: "Prototyping is the key to our success. Our service is never launched until tested countless times. We assure flexibility and scalability in our work with unlimited revisions." },
                            { title: "Streamline Process", text: "We always follow a streamlined process of designing, development, order payment, and delivery. Our customers will always be satisfied." },
                            { title: "Pre-Launch Marketing", text: "Our Pre-Launch service will deliver the right message for your targeted audience. We ensure you already have a strong market presence before your product even exists in the market." },
                            { title: "Post-Launch Marketing", text: "Our post-launch marketing services help you connect with your targeted audience and mark your success effectively." },
                        ].map((feature, i) => (
                            <div key={i} className="text-left group p-8 rounded-3xl hover:bg-gray-50 transition-colors duration-300 border border-transparent hover:border-gray-100">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-1 bg-orange-500 rounded-full group-hover:w-16 transition-all duration-300" />
                                    <h3 className="text-2xl font-bold tracking-tight">{feature.title}</h3>
                                </div>
                                <p className="text-justify text-gray-600 leading-relaxed font-medium">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
