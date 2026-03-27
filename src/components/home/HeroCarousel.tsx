'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);
    const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
    const videoSources = ["/videos/homepage_vid1.mp4", "/videos/Code_vid4.mp4"];

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % videoSources.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + videoSources.length) % videoSources.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-screen w-screen -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-40 overflow-hidden">
            {/* Video Slides */}
            {videoSources.map((src, index) => (
                <video
                    key={src}
                    ref={videoRefs[index]}
                    className={`video-slide absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={src} type="video/mp4" />
                </video>
            ))}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

            {/* Hero Texts */}
            <div
                className={`absolute top-1/2 left-2 sm:left-4 md:left-8 lg:left-16 transform -translate-y-1/2 text-white z-20 transition-opacity duration-1000 px-2 sm:px-4 md:px-8 lg:px-16 max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] ${current === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-2 sm:mb-4 text-left leading-tight px-6">
                    Designing<br />tomorrow,<br />differently.
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-left px-6">
                    Advancing growth while crafting the future through meaningful transformation.
                </p>
                <Link
                    href="/insights"
                    className="mt-4 mb-4 sm:mt-6 inline-block px-4 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 bg-orange-500 text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg shadow-md transform transition duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-orange-600 ml-6"
                >
                    Explore Insights
                </Link>
            </div>

            <div
                className={`absolute top-1/2 left-2 sm:left-4 md:left-8 lg:left-16 transform -translate-y-1/2 text-white z-20 transition-opacity duration-1000 px-2 sm:px-4 md:px-8 lg:px-16 max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] ${current === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-2 sm:mb-4 text-left leading-tight px-6">
                    Smart innovation<br />that transforms the future.
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-left px-6">
                    Your ideas, instantly transformed into personalized solutions.
                </p>
                <Link
                    href="/insights"
                    className="mt-4 mb-4 sm:mt-6 inline-block px-4 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 bg-orange-500 text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg shadow-md transform transition duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-orange-600 ml-6"
                >
                    Explore Insights
                </Link>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-1 sm:left-2 flex items-center z-30">
                <button onClick={prevSlide} className="text-white text-lg sm:text-xl md:text-2xl p-1 sm:p-2 md:p-3 px-3">{"<"}</button>
            </div>
            <div className="absolute inset-y-0 right-1 sm:right-2 flex items-center z-30">
                <button onClick={nextSlide} className="text-white text-lg sm:text-xl md:text-2xl p-1 sm:p-2 md:p-3 px-3">{">"}</button>
            </div>
        </section>
    );
};

export default HeroCarousel;
