import React from "react";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { getImageUrl } from "@/lib/utils";
import {
    ArrowRight, CheckCircle2, Brain, Shield, BarChart2,
    Globe, Code2, Zap, Sparkles, ChevronRight
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Services | Primeline IT Services LLC",
    description: "AI integration, custom software development, cybersecurity, digital marketing, data analytics and e-commerce solutions.",
};

const serviceIcons: Record<string, React.ElementType> = {
    "Artificial Intelligence": Brain,
    "AI & Automation":         Brain,
    "Cybersecurity":           Shield,
    "Data Analytics":          BarChart2,
    "Digital Marketing":       Globe,
    "Web & App Development":   Code2,
    "E-commerce":              Zap,
    "E-Commerce":              Zap,
};
const fallbackIcon = Sparkles;

const whyUs = [
    { title: "Idea Generation",        text: "We generate iconic and unique ideas — ensuring creativity and innovation never fade from your industry." },
    { title: "Countless Experiments",  text: "Every service is tested extensively to guarantee it's safe, unique, and user-friendly before it ships." },
    { title: "Unlimited Revisions",    text: "Prototyping is the key. We iterate until every detail is exactly right — no shortcuts." },
    { title: "Streamlined Process",    text: "Design → Build → Launch → Optimise. A clean, proven process that eliminates guesswork." },
    { title: "Pre-Launch Marketing",   text: "We ensure you already have a strong market presence before your product even launches." },
    { title: "Post-Launch Growth",     text: "Our work doesn't end at launch. We monitor, iterate, and grow your product continuously." },
];

export default async function ServicesPage() {
    const categories = await prisma.category.findMany({ orderBy: { id: "asc" } });

    return (
        <div className="bg-white">
            {/* ── Hero ── */}
            <div className="relative bg-navy-950 overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 bg-dot-grid-dark bg-dot-28 opacity-40 pointer-events-none" />
                <div className="absolute -top-40 right-0 w-[600px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                    <div className="tag mb-6"><Sparkles size={11} />What We Build</div>
                    <h1 className="text-fluid-h1 font-900 uppercase tracking-tight leading-[0.95] text-white mb-6 max-w-3xl">
                        Services Engineered<br />
                        <span className="gradient-text">for 10x Results</span>
                    </h1>
                    <p className="text-lg text-white/50 max-w-2xl leading-relaxed font-400 mb-10">
                        Every service we offer is built around one question: how does this make your business more competitive? Explore what we do and how we do it.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((c) => (
                            <a key={c.id} href={`#${c.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] font-700 text-white/60 hover:bg-cyan-500/15 hover:border-cyan-500/30 hover:text-cyan-300 transition-all">
                                <ChevronRight size={11} />
                                {c.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Service Sections ── */}
            <section className="py-20">
                <div className="max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 space-y-28">
                    {categories.map((service, index) => {
                        const Icon = serviceIcons[service.name] ?? fallbackIcon;
                        const isEven = index % 2 === 0;
                        return (
                            <div
                                key={service.id}
                                id={service.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}
                                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20 scroll-mt-28`}
                            >
                                {/* Visual */}
                                <div className="w-full lg:w-1/2 group relative">
                                    <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-cyan-500/8 to-navy-500/5 blur-2xl group-hover:from-cyan-500/14 transition-all duration-500" />
                                    <div className="relative rounded-4xl overflow-hidden shadow-navy-lg border border-slate-100">
                                        <Image
                                            src={getImageUrl(service.image ?? service.homepage_image ?? "web_dev.png")}
                                            alt={service.name}
                                            width={640}
                                            height={480}
                                            className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        {/* Icon overlay */}
                                        <div className="absolute top-5 left-5 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/80 flex items-center justify-center shadow-card">
                                            <Icon size={22} className="text-navy-900" />
                                        </div>
                                    </div>
                                </div>

                                {/* Text */}
                                <div className="w-full lg:w-1/2 space-y-6">
                                    <div className="tag">
                                        <Icon size={11} />
                                        {`Service ${String(index + 1).padStart(2, "0")}`}
                                    </div>
                                    <h2 className="text-fluid-h3 font-900 uppercase tracking-tight text-navy-900">{service.name}</h2>
                                    <p className="text-[15px] text-slate-500 leading-relaxed font-400">
                                        {service.description ?? "We deliver world-class solutions tailored to your business goals — backed by deep expertise and a track record of measurable results."}
                                    </p>

                                    {/* Feature bullets */}
                                    <ul className="space-y-3">
                                        {["Tailored to your exact business context", "AI-enhanced where it creates real leverage", "Measured against outcomes, not deliverables"].map((f) => (
                                            <li key={f} className="flex items-start gap-3">
                                                <CheckCircle2 size={16} className="text-cyan-500 mt-0.5 shrink-0" />
                                                <span className="text-sm text-slate-600 font-500">{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-3 pt-2">
                                        <Link
                                            href={`/portfolio#category-${service.id}`}
                                            className="btn-primary rounded-full py-3 px-7 text-xs"
                                        >
                                            View Case Studies
                                            <ArrowRight size={15} />
                                        </Link>
                                        <Link href="/contact" className="btn-outline rounded-full py-3 px-7 text-xs">
                                            Enquire Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── Why Choose Us ── */}
            <section className="section-pad bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-dot-grid bg-dot-28 opacity-60 pointer-events-none" />
                <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                    <div className="text-center mb-16">
                        <div className="tag mx-auto mb-5" style={{ display: "inline-flex" }}>
                            <CheckCircle2 size={11} />
                            Our Approach
                        </div>
                        <h2 className="text-fluid-h2 font-900 uppercase tracking-tight leading-none text-navy-900">
                            Why Clients Choose<br />
                            <span className="gradient-text-warm">Primeline</span>
                        </h2>
                        <p className="mt-5 text-base text-slate-500 max-w-xl mx-auto font-400 leading-relaxed">
                            We combine deep technical expertise with strategic vision to deliver results that actually move the needle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {whyUs.map((f, i) => (
                            <div key={i} className="group p-8 rounded-4xl bg-white border border-slate-100 hover:border-cyan-100 hover:shadow-card transition-all duration-300">
                                <div className="w-10 h-10 rounded-2xl bg-navy-900 flex items-center justify-center mb-5 group-hover:bg-cyan-500 transition-colors duration-300 shadow-navy-sm">
                                    <CheckCircle2 size={18} className="text-white" />
                                </div>
                                <div className="text-[2.5rem] font-900 text-slate-50 mb-3 leading-none select-none group-hover:text-cyan-50 transition-colors">
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <h3 className="text-lg font-800 uppercase tracking-tight text-navy-900 mb-3">{f.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed font-400">{f.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-16 text-center">
                        <Link href="/contact" className="btn-primary rounded-full py-4 px-10 text-sm shadow-navy-md inline-flex">
                            Discuss Your Project
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
