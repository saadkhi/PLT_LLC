'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const CareersSection = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Auto-play was prevented, handles gracefully
                });
            }
        }
    }, []);

    return (
        <section className="relative h-[60vh] w-screen -mx-0 sm:-mx-0 md:-mx-0 lg:-mx-0 overflow-hidden">
            <video
                ref={videoRef}
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            >
                <source src="/videos/people_office.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>
            <div className="absolute top-1/2 left-2 sm:left-16 transform -translate-y-1/2 text-white z-20 px-4 max-w-[90%] sm:max-w-[60%]">
                <h1 className="text-3xl sm:text-6xl font-black uppercase mb-4 leading-tight tracking-tighter">Careers at<br />Primeline Tech</h1>
                <p className="text-sm sm:text-xl font-medium text-white/70">Join us to innovate, grow, and make an impact in a dynamic tech-driven environment.</p>
                <Link href="/careers" className="mt-8 inline-block px-10 py-4 bg-orange-500 text-white font-black uppercase tracking-widest rounded-xl shadow-lg hover:bg-orange-600 transition-all duration-300">Join the Team</Link>
            </div>
        </section>
    );
};

export default CareersSection;
