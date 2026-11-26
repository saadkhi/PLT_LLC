"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Sparkles, Zap, TrendingUp, Shield } from "lucide-react";

const slides = [
    {
        src: "/videos/homepage_vid1.mp4",
        badge: "AI Integration",
        headline: ["We Plug AI Into", "Your Business"],
        accent: "Watch It 10x.",
        sub: "From process automation to predictive analytics — we make artificial intelligence your most powerful business asset.",
        cta: { label: "Explore AI Solutions", href: "/services" },
        ctaSecondary: { label: "See Our Work", href: "/portfolio" },
    },
    {
        src: "/videos/Code_vid4.mp4",
        badge: "Custom Development",
        headline: ["Smart Software,", "Built to Scale."],
        accent: "Built for Growth.",
        sub: "Full-stack development, cloud architecture, and intelligent systems tailored to your exact business challenges.",
        cta: { label: "View Services", href: "/services" },
        ctaSecondary: { label: "Get a Quote", href: "#quote" },
    },
];

const stats = [
    { icon: TrendingUp, value: "10x",   label: "Average Growth" },
    { icon: Zap,        value: "150+",  label: "Projects Delivered" },
    { icon: Shield,     value: "98%",   label: "Client Retention" },
    { icon: Sparkles,   value: "5+",    label: "Years of Excellence" },
];

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const touchStart = useRef<number | null>(null);
    const touchEnd   = useRef<number | null>(null);

    const goTo = useCallback((index: number) => {
        if (animating) return;
        setAnimating(true);
        setCurrent(index);
        setTimeout(() => setAnimating(false), 700);
    }, [animating]);

    const nextSlide = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
    const prevSlide = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

    // Auto-advance
    useEffect(() => {
        const t = setInterval(nextSlide, 8000);
        return () => clearInterval(t);
    }, [nextSlide]);

    // Video playback
    useEffect(() => {
        videoRefs.current.forEach((v, i) => {
            if (!v) return;
            v.muted = true;
            if (i === current) v.play().catch(() => {});
            else v.pause();
        });
    }, [current]);

    // Touch swipe
    const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.targetTouches[0].clientX; };
    const onTouchMove  = (e: React.TouchEvent) => { touchEnd.current   = e.targetTouches[0].clientX; };
    const onTouchEnd   = () => {
        if (!touchStart.current || !touchEnd.current) return;
        const d = touchStart.current - touchEnd.current;
        if (d >  50) nextSlide();
        if (d < -50) prevSlide();
        touchStart.current = touchEnd.current = null;
    };

    return (
        <section
            className="relative w-full h-screen min-h-[640px] overflow-hidden bg-navy-950"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Video layers */}
            {slides.map((slide, i) => (
                <video
                    key={slide.src}
                    ref={el => { videoRefs.current[i] = el; }}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 video-slide ${i === current ? "opacity-100" : "opacity-0"}`}
                    muted loop playsInline
                    preload={i === 0 ? "auto" : "none"}
                >
                    <source src={slide.src} type="video/mp4" />
                </video>
            ))}

            {/* Multi-layer overlay — cinematic depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-navy-950/55 to-navy-950/95 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-transparent to-transparent z-10" />

            {/* Subtle dot grid */}
            <div className="absolute inset-0 bg-dot-grid-dark bg-dot-28 opacity-30 z-10 pointer-events-none" />

            {/* Cyan glow accent — bottom left */}
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] z-10 pointer-events-none" />
            {/* Cyan glow accent — top right */}
            <div className="absolute -top-20 right-20 w-72 h-72 bg-cyan-500/6 rounded-full blur-[80px] z-10 pointer-events-none" />

            {/* ── Slide content ── */}
            <div className="relative z-30 h-full max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 flex flex-col justify-center">
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-32 max-w-screen-xl mx-auto transition-all duration-800
                            ${i === current ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-8 pointer-events-none"}`}
                    >
                        <div className="max-w-3xl pt-20 md:pt-0">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-cyan-500/15 border border-cyan-500/30 backdrop-blur-sm">
                                <Sparkles size={12} className="text-cyan-400" />
                                <span className="text-[10px] font-800 uppercase tracking-[0.2em] text-cyan-300">{slide.badge}</span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-fluid-display font-900 uppercase leading-[0.92] tracking-[-0.04em] text-white mb-2 drop-shadow-2xl">
                                {slide.headline[0]}<br />
                                {slide.headline[1]}<br />
                                <span className="gradient-text">{slide.accent}</span>
                            </h1>

                            {/* Sub */}
                            <p className="mt-6 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed font-400">
                                {slide.sub}
                            </p>

                            {/* CTAs */}
                            <div className="mt-10 flex flex-wrap gap-4">
                                <Link
                                    href={slide.cta.href}
                                    className="btn-cyan shadow-cyan-lg rounded-full text-sm py-3.5 px-7"
                                >
                                    {slide.cta.label}
                                    <ChevronRight size={16} strokeWidth={3} />
                                </Link>
                                <Link
                                    href={slide.ctaSecondary.href === "#quote" ? "#" : slide.ctaSecondary.href}
                                    onClick={slide.ctaSecondary.href === "#quote"
                                        ? (e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("open-quote-drawer")); }
                                        : undefined}
                                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/25 text-white text-sm font-700 uppercase tracking-widest hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                                >
                                    {slide.ctaSecondary.label}
                                    <ArrowRight size={15} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Stats ticker bar — bottom ── */}
            <div className="absolute bottom-0 left-0 right-0 z-30">
                {/* Slide dots above stats */}
                <div className="flex justify-center gap-2.5 mb-6">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-500 border-0
                                ${i === current ? "w-10 bg-cyan-500 shadow-[0_0_10px_rgba(0,212,255,0.6)]" : "w-4 bg-white/30 hover:bg-white/50"}`}
                        />
                    ))}
                </div>

                {/* Stats bar */}
                <div className="glass-dark border-t border-white/8">
                    <div className="max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
                            {stats.map((stat) => (
                                <div key={stat.label} className="flex items-center gap-3 px-6 py-4">
                                    <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                        <stat.icon size={15} className="text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-900 text-white leading-none">{stat.value}</p>
                                        <p className="text-[10px] font-700 uppercase tracking-widest text-white/40 mt-0.5">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroCarousel;
