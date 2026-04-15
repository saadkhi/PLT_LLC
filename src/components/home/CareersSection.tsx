'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const CareersSection = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && videoRef.current) {
                        videoRef.current.muted = true;
                        videoRef.current.play().catch(() => { });
                        // Optional: Disconnect after hitting play safely so it loops uninterrupted without re-triggering observer callbacks
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(videoRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section className="relative h-[60vh] w-full overflow-hidden">
            <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="none"
            >
                <source src="/videos/people_office.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#000000] bg-opacity-70 z-10"></div>
            <div className="absolute top-1/2 left-2 sm:left-16 transform -translate-y-1/2 text-white z-20 px-4 max-w-[90%] sm:max-w-[60%]">
                <h1 className="text-3xl sm:text-6xl font-black uppercase mb-4 leading-tight tracking-tighter">Careers at<br />Primeline Tech</h1>
                <p className="text-sm sm:text-xl font-medium text-white/70">Join us to innovate, grow, and make an impact in a dynamic tech-driven environment.</p>
                <Link href="/careers" className="mt-8 inline-block px-10 py-4 bg-cyan-500 text-white font-black uppercase tracking-widest rounded-xl shadow-lg hover:bg-cyan-600 transition-all duration-300">Join the Team</Link>
            </div>
        </section>
    );
};

export default CareersSection;
