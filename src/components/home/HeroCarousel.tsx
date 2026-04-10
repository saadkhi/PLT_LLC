'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);
    const videoSources = ["/videos/homepage_vid1.mp4", "/videos/Code_vid4.mp4"];
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const touchStart = useRef<number | null>(null);
    const touchEnd = useRef<number | null>(null);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev + 1) % videoSources.length);
    }, [videoSources.length]);

    const prevSlide = useCallback(() => {
        setCurrent((prev) => (prev - 1 + videoSources.length) % videoSources.length);
    }, [videoSources.length]);

    // Swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStart.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEnd.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStart.current || !touchEnd.current) return;
        const distance = touchStart.current - touchEnd.current;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();

        touchStart.current = null;
        touchEnd.current = null;
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 7000); // Reduced to 7 seconds
        return () => clearInterval(interval);
    }, [nextSlide]);

    // Robust video playback
    useEffect(() => {
        const playVideos = () => {
            videoRefs.current.forEach(video => {
                if (video) {
                    video.muted = true;
                    video.play().catch(() => {
                        // Retry playback on user interaction if needed
                    });
                }
            });
        };

        playVideos();
        // Fallback for some browsers
        window.addEventListener('touchstart', playVideos, { once: true });
        return () => window.removeEventListener('touchstart', playVideos);
    }, []);

    return (
        <section
            className="relative h-screen w-full overflow-hidden bg-black"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
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
            <div className="absolute inset-0 bg-black/50 z-10"></div>


            {/* Hero Overlays */}
            <div className="relative h-full w-full max-w-screen-2xl mx-auto z-30 pointer-events-none">
                {videoSources.map((_, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 transition-all duration-1000 ${index === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        <div className="max-w-4xl pointer-events-auto mt-16 md:mt-0">
                            {index === 0 ? (
                                <>
                                    <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.95] tracking-tighter mb-6 uppercase text-white drop-shadow-2xl">
                                        Designing<br /><span className="text-orange-500">tomorrow</span>,<br />differently.
                                    </h1>
                                    <p className="text-sm sm:text-lg md:text-xl font-medium text-white/90 max-w-xl mb-10 leading-relaxed">
                                        Advancing growth while crafting the future through meaningful transformation.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-black leading-[0.95] tracking-tighter mb-6 uppercase text-white drop-shadow-2xl">
                                        Smart <span className="text-orange-500">innovation</span><br />that transforms.
                                    </h1>
                                    <p className="text-sm sm:text-lg md:text-xl font-medium text-white/90 max-w-xl mb-10 leading-relaxed">
                                        Your ideas, instantly transformed into personalized solutions.
                                    </p>
                                </>
                            )}

                            <Link
                                href="/insights"
                                className="inline-flex items-center px-8 py-4 bg-orange-500 text-white text-xs sm:text-sm font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-orange-500/40 transform transition-all duration-300 hover:scale-105 hover:bg-orange-600 active:scale-95"
                            >
                                Explore Insights
                                <ChevronRight className="w-5 h-5 ml-2" strokeWidth={3} />
                            </Link>
                        </div>
                    </div>
                ))}


                {/* Indicator Dots - More visible */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-3 z-50 pointer-events-auto">
                    {videoSources.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`h-2 transition-all duration-500 rounded-full border border-black/20 ${index === current ? 'w-12 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'w-4 bg-white/40 hover:bg-white/60'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroCarousel;
