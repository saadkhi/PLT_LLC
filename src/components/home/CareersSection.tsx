"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Users, Globe, Lightbulb } from "lucide-react";

const perks = [
    { icon: Lightbulb, label: "Innovation-first culture" },
    { icon: Globe,     label: "Remote & hybrid roles" },
    { icon: Users,     label: "Diverse global team" },
];

const CareersSection = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && videoRef.current) {
                    videoRef.current.muted = true;
                    videoRef.current.play().catch(() => {});
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(videoRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative w-full min-h-[580px] overflow-hidden flex items-center">
            {/* Background video */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                muted loop playsInline preload="none"
            >
                <source src="/videos/people_office.mp4" type="video/mp4" />
            </video>

            {/* Layered overlays */}
            <div className="absolute inset-0 bg-navy-950/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-transparent" />
            <div className="absolute inset-0 bg-dot-grid-dark bg-dot-28 opacity-20 pointer-events-none" />

            {/* Cyan glow */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/8 rounded-full blur-[80px] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 py-20">
                <div className="max-w-2xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-cyan-500/12 border border-cyan-500/25">
                        <Users size={12} className="text-cyan-400" />
                        <span className="text-[10px] font-800 uppercase tracking-[0.2em] text-cyan-300">Join Our Team</span>
                    </div>

                    <h2 className="text-fluid-h1 font-900 uppercase tracking-tight leading-[0.95] text-white mb-6">
                        Build the Future<br />
                        <span className="gradient-text">With Us.</span>
                    </h2>

                    <p className="text-base sm:text-lg text-white/60 leading-relaxed font-400 mb-10 max-w-lg">
                        Join a team that ships AI-powered products, works with global clients, and grows together.
                        We reward talent, curiosity, and ambition.
                    </p>

                    {/* Perks row */}
                    <div className="flex flex-wrap gap-3 mb-10">
                        {perks.map((p) => (
                            <div key={p.label} className="flex items-center gap-2 px-4 py-2 rounded-full glass-dark border border-white/10">
                                <p.icon size={13} className="text-cyan-400" />
                                <span className="text-[11px] font-700 text-white/70 uppercase tracking-wider">{p.label}</span>
                            </div>
                        ))}
                    </div>

                    <Link
                        href="/careers"
                        className="btn-cyan shadow-cyan-lg rounded-full text-sm py-3.5 px-8 inline-flex"
                    >
                        View Open Positions
                        <ArrowRight size={16} className="ml-1" />
                    </Link>
                </div>
            </div>

            {/* Decorative right edge fade */}
            <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-navy-950/0 to-transparent pointer-events-none" />
        </section>
    );
};

export default CareersSection;
