import React from "react";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import HeroCarousel from "@/components/home/HeroCarousel";
import CareersSection from "@/components/home/CareersSection";
import { getImageUrl } from "@/lib/utils";
import { getGlobalData } from "@/lib/globalData";
import {
    ChevronRight, ArrowRight, Sparkles, Zap, Brain, Shield,
    BarChart2, Globe, Code2, CheckCircle, Star, Quote
} from "lucide-react";

export const dynamic = "force-dynamic";

// Map category names → icons
const serviceIcons: Record<string, React.ElementType> = {
    "Artificial Intelligence": Brain,
    "AI & Automation":         Brain,
    "Cybersecurity":           Shield,
    "Data Analytics":          BarChart2,
    "Digital Marketing":       Globe,
    "Web & App Development":   Code2,
    "E-commerce":              Zap,
};
const fallbackIcon = Sparkles;

const testimonials = [
    {
        name: "Ali Khan",
        role: "CEO",
        company: "TechFlow",
        content: "Primeline's AI integration transformed how we handle customer data. We went from manual reporting to live dashboards in weeks. Absolutely game-changing.",
        rating: 5,
    },
    {
        name: "Sara Ahmed",
        role: "Managing Director",
        company: "HealthCare Plus",
        content: "Their team understood our domain immediately. The platform they built handles thousands of patient records with zero downtime. Exceptional communication throughout.",
        rating: 5,
    },
    {
        name: "David Smith",
        role: "Founder",
        company: "E-Shop Global",
        content: "Our e-commerce conversion rate jumped 40% after Primeline rebuilt our storefront with AI-powered recommendations. They genuinely care about results.",
        rating: 5,
    },
];

const aiSteps = [
    { step: "01", title: "Audit & Discover", desc: "We map every manual process in your business and identify the highest-impact AI opportunities." },
    { step: "02", title: "Design the Solution", desc: "Our AI architects design a custom integration plan — no off-the-shelf tools, no bloated software." },
    { step: "03", title: "Build & Integrate", desc: "We deploy, connect, and train the system within your existing infrastructure." },
    { step: "04", title: "Scale & Optimise", desc: "Continuous monitoring, model retraining, and performance tuning to keep ROI growing." },
];

export default async function Home() {
    const categories = await prisma.category.findMany({ orderBy: { id: "asc" } });
    const globalData  = await getGlobalData();
    const mainOffice  = globalData.mainOffice;

    return (
        <div className="bg-white">
            {/* ── Hero ── */}
            <HeroCarousel />

            {/* ── AI Integration Section ── */}
            <section className="section-pad bg-navy-950 relative overflow-hidden">
                {/* Background texture */}
                <div className="absolute inset-0 bg-dot-grid-dark bg-dot-28 opacity-40 pointer-events-none" />
                {/* Glow blobs */}
                <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/4 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                    {/* Header */}
                    <div className="max-w-3xl mb-20">
                        <div className="tag mb-6">
                            <Brain size={11} />
                            AI-Powered Growth
                        </div>
                        <h2 className="text-fluid-h1 font-900 uppercase leading-[0.95] tracking-tight text-white mb-6">
                            How We Make<br />
                            <span className="gradient-text">AI Work For You</span>
                        </h2>
                        <p className="text-lg text-white/50 leading-relaxed font-400 max-w-xl">
                            We don&apos;t just build software — we surgically integrate intelligence into your existing business to remove friction, automate growth, and create competitive moats.
                        </p>
                    </div>

                    {/* Process steps */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {aiSteps.map((s, i) => (
                            <div key={i} className="relative group p-8 rounded-3xl bg-white/4 border border-white/8 hover:bg-white/7 hover:border-cyan-500/25 transition-all duration-300">
                                {/* Step number */}
                                <div className="text-[3.5rem] font-900 leading-none text-white/5 group-hover:text-cyan-500/10 transition-colors mb-4 select-none">{s.step}</div>
                                {/* Connector line (desktop) */}
                                {i < aiSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 -right-3 w-6 h-px bg-gradient-to-r from-white/10 to-white/3 z-10" />
                                )}
                                <h3 className="text-lg font-800 text-white mb-3 uppercase tracking-tight">{s.title}</h3>
                                <p className="text-sm text-white/45 leading-relaxed font-400">{s.desc}</p>
                                <div className="absolute bottom-6 right-6 w-1.5 h-1.5 rounded-full bg-cyan-500/40 group-hover:bg-cyan-500 transition-colors" />
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-cyan-500/6 to-transparent border border-cyan-500/15">
                        <div>
                            <p className="text-xl font-800 text-white mb-1">Ready to 10x your business with AI?</p>
                            <p className="text-sm text-white/45 font-400">Get a free AI opportunity audit — no commitment required.</p>
                        </div>
                        <button
                            onClick={() => {}}
                            className="btn-cyan shrink-0 rounded-full py-3.5 px-8 text-sm shadow-cyan-lg"
                            id="hero-audit-cta"
                        >
                            Book Free Audit
                            <ArrowRight size={15} />
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Services ── */}
            <section id="services" className="section-pad bg-white relative">
                <div className="max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div className="max-w-xl">
                            <div className="tag mb-5">
                                <Zap size={11} />
                                What We Do
                            </div>
                            <h2 className="text-fluid-h2 font-900 uppercase tracking-tight leading-none text-navy-900">
                                Services Built for<br />
                                <span className="gradient-text-warm">Measurable Impact</span>
                            </h2>
                        </div>
                        <Link href="/services" className="group flex items-center gap-2 text-xs font-800 uppercase tracking-widest text-slate-400 hover:text-cyan-500 transition-colors shrink-0">
                            All Services
                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {categories.slice(0, 6).map((svc, idx) => {
                            const Icon = serviceIcons[svc.name] ?? fallbackIcon;
                            return (
                                <Link
                                    key={svc.id}
                                    href={`/services#${svc.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                                    className="group relative bg-white border border-slate-100 rounded-4xl p-8 card-hover overflow-hidden"
                                >
                                    {/* Hover glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/4 group-hover:to-transparent rounded-4xl transition-all duration-500" />

                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-navy-900 flex items-center justify-center mb-6 group-hover:bg-cyan-500 transition-colors duration-300 shadow-navy-sm">
                                            <Icon size={22} className="text-white" />
                                        </div>
                                        <h3 className="text-xl font-800 uppercase tracking-tight text-navy-900 mb-3 group-hover:text-cyan-600 transition-colors">
                                            {svc.name}
                                        </h3>
                                        {svc.description && (
                                            <p className="text-sm text-slate-500 leading-relaxed font-400 line-clamp-2">
                                                {svc.description}
                                            </p>
                                        )}
                                        <div className="mt-6 flex items-center gap-1.5 text-[11px] font-800 uppercase tracking-widest text-slate-300 group-hover:text-cyan-500 transition-colors">
                                            Learn More
                                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>

                                    {/* Index number watermark */}
                                    <div className="absolute bottom-4 right-6 text-[3.5rem] font-900 text-slate-50 select-none leading-none group-hover:text-cyan-50 transition-colors">
                                        {String(idx + 1).padStart(2, "0")}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Stats Bar ── */}
            <section className="bg-navy-900 py-14 relative overflow-hidden">
                <div className="absolute inset-0 bg-dot-grid-dark bg-dot-28 opacity-30 pointer-events-none" />
                <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "150+",  label: "Projects Delivered",  icon: CheckCircle },
                            { value: "50+",   label: "Happy Clients",        icon: Star },
                            { value: "5+",    label: "Years Experience",     icon: Zap },
                            { value: "12",    label: "Countries Reached",    icon: Globe },
                        ].map((s) => (
                            <div key={s.label} className="text-center">
                                <s.icon size={18} className="text-cyan-500/60 mx-auto mb-3" />
                                <p className="text-4xl sm:text-5xl font-900 text-white mb-1 leading-none">{s.value}</p>
                                <p className="text-[10px] font-700 uppercase tracking-[0.2em] text-white/35">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Careers ── */}
            <CareersSection />

            {/* ── Testimonials ── */}
            <section className="section-pad bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-dot-grid bg-dot-28 opacity-60 pointer-events-none" />
                <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                    <div className="text-center mb-16">
                        <div className="tag mx-auto mb-5" style={{ display: "inline-flex" }}>
                            <Quote size={11} />
                            Client Stories
                        </div>
                        <h2 className="text-fluid-h2 font-900 uppercase tracking-tight leading-none text-navy-900">
                            What Our Clients<br />
                            <span className="gradient-text-warm">Actually Say</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white rounded-4xl p-8 border border-slate-100 card-hover flex flex-col">
                                {/* Stars */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(t.rating)].map((_, s) => (
                                        <Star key={s} size={14} className="text-cyan-500 fill-cyan-500" />
                                    ))}
                                </div>
                                {/* Quote */}
                                <blockquote className="flex-1 text-[15px] text-slate-600 leading-relaxed font-400 mb-8 italic">
                                    &ldquo;{t.content}&rdquo;
                                </blockquote>
                                {/* Author */}
                                <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 flex items-center justify-center shrink-0 text-white font-900 text-lg uppercase shadow-navy-sm">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-800 uppercase tracking-tight text-navy-900 text-sm">{t.name}</p>
                                        <p className="text-[10px] font-700 uppercase tracking-widest text-cyan-500">{t.role} · {t.company}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Partner Logos Ticker ── */}
            <section className="py-16 bg-white border-y border-slate-100 overflow-hidden">
                <div className="text-center mb-10 px-6">
                    <p className="text-[10px] font-800 uppercase tracking-[0.3em] text-slate-300">Trusted Partner Ecosystem</p>
                </div>
                <div className="relative flex overflow-hidden">
                    <div className="flex animate-scroll py-3 gap-12 whitespace-nowrap">
                        {[...Array(2)].flatMap(() =>
                            ["acc.png","AWS.png","cloudera.png","GCP.png","IBM.png","infosys.png","MS.png","SAP.png","SF.png","temenso.png","wipro.png","zendesk.png"]
                                .map((logo, i) => (
                                    <div key={`${logo}-${i}`} className="inline-block relative h-9 w-28 shrink-0 grayscale opacity-35 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110">
                                        <Image src={getImageUrl(logo)} alt={logo.replace(".png", "")} fill className="object-contain" sizes="112px" />
                                    </div>
                                ))
                        )}
                    </div>
                </div>
            </section>

            {/* ── Contact Banner ── */}
            <section className="relative overflow-hidden bg-navy-950 section-pad">
                <div className="absolute inset-0 bg-dot-grid-dark bg-dot-28 opacity-40 pointer-events-none" />
                {/* Glow blobs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/6 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 text-center">
                    <div className="tag mx-auto mb-6" style={{ display: "inline-flex" }}>
                        <Sparkles size={11} />
                        Let&apos;s Build Together
                    </div>
                    <h2 className="text-fluid-h2 font-900 uppercase tracking-tight leading-none text-white mb-6">
                        Ready to Transform<br />
                        <span className="gradient-text">Your Business?</span>
                    </h2>
                    <p className="text-base text-white/45 max-w-xl mx-auto mb-12 font-400 leading-relaxed">
                        Get in touch with our team today. Whether you have a brief or just an idea — we&apos;ll turn it into a roadmap.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                        <Link href="/contact" className="btn-cyan rounded-full py-4 px-9 text-sm shadow-cyan-lg">
                            Start a Conversation
                            <ArrowRight size={16} />
                        </Link>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent("open-quote-drawer"))}
                            className="btn-outline border-white/20 text-white hover:border-cyan-500 hover:text-cyan-400 rounded-full py-4 px-9 text-sm"
                        >
                            Get a Quote
                        </button>
                    </div>

                    {/* Contact chips */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href={`mailto:${mainOffice?.email || "primelinetech@gmail.com"}`}
                            className="flex items-center gap-3 px-5 py-3 rounded-full glass-dark border border-white/10 hover:border-cyan-500/30 transition-colors group">
                            <div className="w-7 h-7 rounded-full bg-cyan-500/15 flex items-center justify-center">
                                <svg className="w-3.5 h-3.5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                            </div>
                            <span className="text-xs font-600 text-white/60 group-hover:text-white/90 transition-colors">{mainOffice?.email || "primelinetech@gmail.com"}</span>
                        </a>
                        <a href={`tel:${mainOffice?.phone || "+923353948753"}`}
                            className="flex items-center gap-3 px-5 py-3 rounded-full glass-dark border border-white/10 hover:border-cyan-500/30 transition-colors group">
                            <div className="w-7 h-7 rounded-full bg-cyan-500/15 flex items-center justify-center">
                                <svg className="w-3.5 h-3.5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                            </div>
                            <span className="text-xs font-600 text-white/60 group-hover:text-white/90 transition-colors">{mainOffice?.phone || "+92 335 3948753"}</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
