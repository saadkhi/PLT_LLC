import React from 'react';
import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="px-2 sm:px-4 md:px-8 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 sm:mt-6 md:mt-8 text-center font-bold">About Us</h1>

            <section className="py-6 sm:py-8 md:py-10 bg-gray-100">
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 items-start mb-6 sm:mb-8 md:mb-10">
                    {/* CEO Box */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center text-center min-h-[300px] sm:min-h-[400px]">
                        <Image
                            src={getImageUrl('ceo.jpeg')}
                            alt="Saad Ather Ali - CEO"
                            width={160}
                            height={160}
                            className="w-40 h-40 object-cover rounded-2xl shadow-md"
                        />
                        <h3 className="text-xl sm:text-3xl font-semibold text-black mt-4">Saad Ather Ali</h3>
                        <p className="text-sm sm:text-lg text-black mb-4">Chief Executive Officer</p>
                        <p className="text-xs sm:text-base text-black mb-6 max-w-3xl">
                            Saad leads with vision and dedication, ensuring our agency achieves consistent success.
                            His leadership is built on trust, innovation, and long-term loyalty with our clients.
                        </p>
                        <div className="flex gap-2 sm:gap-4">
                            <a href="https://www.linkedin.com/in/saadali5/" target="_blank" rel="noopener noreferrer"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm sm:text-base rounded-xl shadow-md transform transition duration-300 hover:scale-[1.02]">
                                LinkedIn
                            </a>
                            <a href="https://github.com/saadkhi" target="_blank" rel="noopener noreferrer"
                                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 text-sm sm:text-base rounded-xl shadow-md transform transition duration-300 hover:scale-[1.02]">
                                GitHub
                            </a>
                        </div>
                    </div>

                    {/* About Us Content */}
                    <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-8 text-black leading-relaxed min-h-[300px] sm:min-h-[400px]">
                        <p className="text-xs sm:text-lg mb-4">
                            At <span className="font-semibold">Primeline IT Services</span>, we are more than just a software agency —
                            we are a partner in digital transformation. Founded with a mission to deliver impactful solutions,
                            our team of experts specializes in creating scalable, innovative, and future-ready technologies that
                            empower businesses to thrive in competitive markets.
                        </p>
                        <p className="text-xs sm:text-lg mb-4">
                            With years of dedication, we have earned the trust and loyalty of clients across industries including
                            healthcare, factories, e-commerce, and corporate offices. Our commitment to success is reflected in
                            the long-term relationships we’ve built and the consistent growth of our client base.
                        </p>
                        <p className="text-xs sm:text-lg mb-4">
                            We pride ourselves on being a people-first company — combining creativity, data-driven strategies,
                            and cutting-edge tools to solve real-world problems. Whether it’s through automation, ERP systems,
                            or custom digital platforms, we ensure our clients achieve measurable results and lasting success.
                        </p>
                        <p className="text-xs sm:text-lg">
                            Our journey is defined by passion, innovation, and resilience. The success of our clients is the true
                            measure of our accomplishments, and we remain committed to delivering excellence with every project
                            we undertake.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
