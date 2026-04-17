import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default async function ServicesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { id: 'asc' },
    });

    return (
        <div className="bg-white min-h-screen">
            {/* Standardized Hero Title */}
            <div className="pt-24 pb-12 px-6 sm:px-12 md:px-20 lg:px-32 text-center">
                <h1 className="text-fluid-h1 font-black uppercase tracking-tighter text-[#0A2540]">
                    Our <span className="text-cyan-500">Services</span>
                </h1>
                <p className="mt-4 text-[10px] sm:text-xs uppercase font-bold tracking-[0.3em] text-gray-400">
                    Innovative solutions for your business
                </p>
            </div>

            {/* Quadrants Section */}
            <section className="py-20 decorative-grid">
                <div className="max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 space-y-32">
                    {categories.map((service, index) => (
                        <div
                            key={service.id}
                            id={service.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}
                            className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
                        >
                            {/* Image Container */}
                            <div className="w-full lg:w-1/2 group relative">
                                <div className="absolute -inset-4 bg-black/5 rounded-[3rem] blur-2xl group-hover:bg-black/10 transition-colors duration-500" />
                                <Image
                                    src={getImageUrl(service.image || service.homepage_image || 'web_dev.png')}
                                    alt={service.name}
                                    width={600}
                                    height={600}
                                    className="relative w-full aspect-square object-cover rounded-[2.5rem] shadow-2xl border border-white"
                                />
                            </div>

                            {/* Content Container */}
                            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                                <div className="inline-flex items-center space-x-2 bg-cyan-50 px-4 py-2 rounded-full border border-cyan-100">
                                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-600">Featured Service</span>
                                </div>
                                <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0A2540]">{service.name}</h3>
                                <p className="text-lg text-gray-600 leading-relaxed font-normal">
                                    {service.description}
                                </p>
                                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                    <Link
                                        href={`/portfolio#category-${service.id}`}
                                        className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-navy-900 text-white font-bold rounded-2xl shadow-xl hover:bg-cyan-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-98"
                                    >
                                        <span>Explore Past Works</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="w-full sm:w-auto px-8 py-4 bg-white text-[#0A2540] font-bold rounded-2xl border border-gray-200 hover:border-navy-900 transition-colors"
                                    >
                                        Inquire Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 relative">
                    <div className="max-w-3xl mb-20 text-center mx-auto lg:text-left lg:mx-0">
                        <h2 className="text-fluid-h2 font-black uppercase tracking-tighter text-[#0A2540] mb-6">Why Choose <span className="text-cyan-500">Us</span></h2>
                        <p className="text-xl text-gray-500 leading-relaxed">We combine deep technical expertise with strategic vision to deliver results that matter.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Idea Generation", text: "We generate iconic and unique ideas making sure that creativity and innovation never fade away from the industry." },
                            { title: "Countless Experiments", text: "Every service is experimented with unlimited times to make sure it is safe, unique, and user-friendly." },
                            { title: "Unlimited Revisions", text: "Prototyping is the key. Our services are never launched until tested countless times with flexibility in mind." },
                            { title: "Streamline Process", text: "We follow a streamlined process of designing, development, and delivery ensuring complete satisfaction." },
                            { title: "Pre-Launch Marketing", text: "We ensure you already have a strong market presence before your product even exists in the market." },
                            { title: "Post-Launch Marketing", text: "Our services help you connect with your targeted audience and mark your success effectively." },
                        ].map((feature, i) => (
                            <div key={i} className="group p-10 rounded-[2rem] bg-gray-50/50 border border-transparent hover:border-cyan-100 hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                                <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-500">
                                    <CheckCircle2 size={24} />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight text-[#0A2540] mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
