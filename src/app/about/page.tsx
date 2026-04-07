import React from 'react';
import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';
import { ExternalLink, Link as LinkIcon } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Standardized Hero Title */}
            <div className="pt-24 pb-12 px-6 sm:px-12 md:px-20 lg:px-32 text-center">
                <h1 className="text-fluid-h1 font-black uppercase tracking-tighter text-black">
                    About <span className="text-orange-500">Us</span>
                </h1>
                <p className="mt-4 text-[10px] sm:text-xs uppercase font-bold tracking-[0.3em] text-gray-400">
                    A partner in your digital transformation
                </p>
            </div>

            <section className="py-12 bg-gray-50/50">
                <div className="max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* CEO Box - 5 columns on large screen */}
                    <div className="lg:col-span-5 bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 sm:p-12 flex flex-col items-center text-center border border-gray-100 transition-transform duration-500 hover:scale-[1.01]">
                        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-8 group">
                            <div className="absolute inset-0 bg-orange-500 rounded-[2rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20"></div>
                            <Image
                                src={getImageUrl('ceo.jpeg')}
                                alt="Saad Ather Ali - CEO"
                                width={224}
                                height={224}
                                className="relative w-full h-full object-cover rounded-[2rem] shadow-xl border-4 border-white"
                            />
                        </div>
                        <h3 className="text-3xl font-black uppercase tracking-tight text-black mb-1">Saad Ather Ali</h3>
                        <p className="text-xs uppercase font-bold tracking-widest text-orange-500 mb-6">Chief Executive Officer</p>

                        <p className="text-sm sm:text-base text-gray-600 mb-10 leading-relaxed font-medium">
                            Saad leads with vision and dedication, ensuring our agency achieves consistent success.
                            His leadership is built on trust, innovation, and long-term loyalty with our clients.
                        </p>

                        <div className="flex gap-4 w-full">
                            <a href="https://www.linkedin.com/in/saadali5/" target="_blank" rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-[#0077b5] text-white px-6 py-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all duration-300 font-bold text-sm">
                                <LinkIcon size={18} />
                                <span>LinkedIn</span>
                            </a>
                            <a href="https://github.com/saadkhi" target="_blank" rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-6 py-4 rounded-2xl shadow-lg shadow-gray-900/20 hover:bg-gray-800 transition-all duration-300 font-bold text-sm">
                                <LinkIcon size={18} />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>

                    {/* About Us Content - 7 columns on large screen */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white shadow-xl shadow-gray-200/40 rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 h-full">
                            <div className="w-12 h-1.5 bg-orange-500 rounded-full mb-8" />
                            <div className="space-y-6 text-gray-700 leading-relaxed sm:text-lg">
                                <p>
                                    At <span className="font-bold text-black border-b-2 border-orange-200">Primeline IT Services</span>, we are more than just a software agency — we are a partner in digital transformation. Founded with a mission to deliver impactful solutions, our team of experts specializes in creating scalable, innovative, and future-ready technologies that empower businesses to thrive in competitive markets.
                                </p>
                                <p>
                                    With years of dedication, we have earned the trust and loyalty of clients across industries including healthcare, factories, e-commerce, and corporate offices. Our commitment to success is reflected in the long-term relationships we’ve built and the consistent growth of our client base.
                                </p>
                                <p>
                                    We pride ourselves on being a people-first company — combining creativity, data-driven strategies, and cutting-edge tools to solve real-world problems. Whether it’s through automation, ERP systems, or custom digital platforms, we ensure our clients achieve measurable results and lasting success.
                                </p>
                                <p className="font-medium italic text-black/80">
                                    &quot;Our journey is defined by passion, innovation, and resilience. The success of our clients is the true measure of our accomplishments.&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
