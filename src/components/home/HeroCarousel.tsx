'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getImageUrl } from '@/lib/utils';

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);
    const videoSources = ["/videos/homepage_vid1.mp4", "/videos/Code_vid4.mp4"];
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % videoSources.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + videoSources.length) % videoSources.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % videoSources.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [videoSources.length]);

    // Ensure all videos are muted and playing
    useEffect(() => {
        videoRefs.current.forEach(video => {
            if (video) {
                video.muted = true;
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Auto-play was prevented, handles gracefully
                    });
                }
            }
        });
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Video Slides */}
            {videoSources.map((src, index) => (
                <video
                    key={src}
                    ref={el => { videoRefs.current[index] = el; }}
                    className={`video-slide absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                >
                    <source src={src} type="video/mp4" />
                </video>
            ))}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 z-10"></div>

            {/* Hero Texts */}
            <div
                className={`absolute top-1/2 left-0 w-full transform -translate-y-1/2 text-white z-20 transition-opacity duration-1000 px-6 sm:px-12 md:px-20 lg:px-32 xl:px-48 ${current === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="max-w-4xl">
                    <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.95] tracking-tighter mb-6 uppercase">
                        Designing<br /><span className="text-orange-500">tomorrow</span>,<br />differently.
                    </h1>
                    <p className="text-sm sm:text-lg md:text-xl font-medium text-white/80 max-w-xl mb-10 leading-relaxed">
                        Advancing growth while crafting the future through meaningful transformation.
                    </p>
                    <Link
                        href="/insights"
                        className="inline-flex items-center px-8 py-4 bg-orange-500 text-white text-sm sm:text-base font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-orange-500/20 transform transition-all duration-300 hover:scale-105 hover:bg-orange-600 active:scale-95"
                    >
                        Explore Insights
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>

            <div
                className={`absolute top-1/2 left-0 w-full transform -translate-y-1/2 text-white z-20 transition-opacity duration-1000 px-6 sm:px-12 md:px-20 lg:px-32 xl:px-48 ${current === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="max-w-4xl">
                    <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.95] tracking-tighter mb-6 uppercase">
                        Smart <span className="text-orange-500">innovation</span><br />that transforms.
                    </h1>
                    <p className="text-sm sm:text-lg md:text-xl font-medium text-white/80 max-w-xl mb-10 leading-relaxed">
                        Your ideas, instantly transformed into personalized solutions.
                    </p>
                    <Link
                        href="/insights"
                        className="inline-flex items-center px-8 py-4 bg-orange-500 text-white text-sm sm:text-base font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-orange-500/20 transform transition-all duration-300 hover:scale-105 hover:bg-orange-600 active:scale-95"
                    >
                        Explore Insights
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Navigation Arrows - Simplified for Mobile */}
            <div className="absolute bottom-10 right-10 flex space-x-4 z-30 lg:bottom-1/2 lg:right-10 lg:flex-col lg:space-x-0 lg:space-y-4 lg:transform lg:translate-y-1/2">
                <button
                    onClick={prevSlide}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-orange-500 hover:border-orange-500 transition-all active:scale-90"
                    aria-label="Previous Slide"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-orange-500 hover:border-orange-500 transition-all active:scale-90"
                    aria-label="Next Slide"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        </section>
    );
};

export default HeroCarousel;
