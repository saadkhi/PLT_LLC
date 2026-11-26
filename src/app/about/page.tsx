import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import {
    BriefcaseBusiness, Code2, ArrowRight, Target, Eye, Heart,
    Zap, Globe, Shield, Brain, Users, Award, TrendingUp
} from "lucide-react";

export const metadata = {
    title: "About Us | Primeline IT Services LLC",
    description: "Meet the team behind Primeline IT Services — a USA-based technology company delivering AI-powered business transformation globally.",
};

const milestones = [
    { year: "2019", title: "Founded", desc: "Primeline IT Services established in Spring, TX with a mission to make enterprise technology accessible." },
    { year: "2020", title: "First 10 Clients", desc: "Delivered web platforms and ERP systems to clients across healthcare and e-commerce." },
    { year: "2021", title: "Expanded Globally", desc: "Opened offices in Pakistan and started serving clients across 6 countries." },
    { year: "2023", title: "AI Division Launched", desc: "Dedicated AI integration practice — helping businesses automate processes and unlock data insights." },
    { year: "2024", title: "150+ Projects", desc: "Crossed milestone of 150 delivered projects with a 98% client retention rate." },
    { year: "2026", title: "Today", desc: "Serving 50+ active clients across 12 countries with a full-service AI + software offering." },
];

const values = [
    { icon: Target,    title: "Results First",     desc: "Every engagement is measured against real business outcomes — not just deliverables." },
    { icon: Brain,     title: "AI at the Core",    desc: "We embed intelligence into every solution we build, not as an afterthought." },
    { icon: Heart,     title: "People-Centric",    desc: "Technology should serve people. We design for the humans who use our products every day." },
    { icon: Shield,    title: "Trust & Security",  desc: "Security and reliability are non-negotiable in everything we build and deploy." },
    { icon: Globe,     title: "Global Thinking",   desc: "Our team spans continents — we bring diverse perspectives to every problem." },
    { icon: TrendingUp,"title": "Continuous Growth", desc: "We push boundaries, experiment relentlessly, and never stop learning." },
];

const team = [
    {
        name: "Saad Ather Ali",
        role: "Chief Executive Officer",
        image: "ceo.jpeg",
        bio: "Leads with vision and dedication, ensuring consistent delivery and long-term client loyalty. Expert in AI strategy and digital transformation.",
        linkedin: "https://www.linkedin.com/in/saadali5/",
        github:   "https://github.com/saadkhi",
    },
];

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* ── Hero ── */}
            <div className="relative bg-navy-950 overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 bg-dot-grid-dark bg-dot-28 opacity-40 pointer-events-none" />
                <div className="absolute -top-40 right-0 w-[600px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                    <div className="tag mb-6">
                        <Users size={11} />
                        Our Story
                    </div>
                    <h1 className="text-fluid-h1 font-900 uppercase tracking-tight leading-[0.95] text-white mb-6 max-w-3xl">
                        A Partner in Your<br />
                        <span className="gradient-text">Digital Future</span>
                    </h1>
                    <p className="text-lg text-white/50 max-w-2xl leading-relaxed font-400">
                        Primeline IT Services is a USA-based technology company that helps businesses grow by integrating AI, building scalable software, and executing data-driven growth strategies — globally.
                    </p>
                </div>
            </div>

            {/* ── Mission / Vision / Impact ── */}
            <section className="section-pad bg-white">
                <div className="max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                        {[
                            {
                                icon: Target,
                                label: "Mission",
                                color: "from-cyan-500/10 to-blue-500/5",
                                border: "border-cyan-200/60",
                                text: "To make enterprise-grade AI and software technology accessible to every business — from startups to corporates — and help them compete at a higher level.",
                            },
                            {
                                icon: Eye,
                                label: "Vision",
                                color: "from-navy-900/5 to-navy-900/10",
                                border: "border-navy-200/40",
                                text: "To become the world's most trusted AI-integration partner for growing businesses, known for delivering measurable outcomes, not just software.",
                            },
                            {
                                icon: Award,
                                label: "Impact",
                                color: "from-emerald-500/8 to-teal-500/5",
                                border: "border-emerald-200/50",
                                text: "150+ projects delivered. 50+ long-term clients. 12 countries. 98% retention rate. We measure our success entirely by the growth of our clients.",
                            },
                        ].map((item) => (
                            <div key={item.label} className={`rounded-4xl p-9 bg-gradient-to-br ${item.color} border ${item.border} flex flex-col`}>
                                <div className="w-11 h-11 rounded-2xl bg-white shadow-card flex items-center justify-center mb-6">
                                    <item.icon size={20} className="text-navy-900" />
                                </div>
                                <p className="text-[10px] font-800 uppercase tracking-[0.2em] text-slate-400 mb-3">{item.label}</p>
                                <p className="text-[15px] text-slate-600 leading-relaxed font-400">{item.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* ── CEO + Bio ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        {/* CEO card */}
                        <div className="lg:col-span-4">
                            {team.map((member) => (
                                <div key={member.name} className="bg-white rounded-5xl border border-slate-100 p-8 shadow-card text-center card-hover">
                                    {/* Photo */}
                                    <div className="relative w-44 h-44 mx-auto mb-6 group">
                                        <div className="absolute inset-0 rounded-4xl bg-gradient-to-br from-cyan-500/20 to-navy-900/20 rotate-3 group-hover:rotate-6 transition-transform duration-500" />
                                        <Image
                                            src={getImageUrl(member.image)}
                                            alt={member.name}
                                            width={176}
                                            height={176}
                                            className="relative w-full h-full object-cover rounded-4xl border-4 border-white shadow-navy-md"
                                        />
                                    </div>

                                    <h3 className="text-2xl font-900 uppercase tracking-tight text-navy-900 mb-1">{member.name}</h3>
                                    <p className="text-[10px] font-800 uppercase tracking-[0.2em] text-cyan-500 mb-5">{member.role}</p>
                                    <p className="text-sm text-slate-500 leading-relaxed font-400 mb-7">{member.bio}</p>

                                    <div className="flex gap-3">
                                        <a
                                            href={member.linkedin}
                                            target="_blank" rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#0077b5] text-white text-xs font-800 uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-sm"
                                        >
                                            <BriefcaseBusiness size={15} />
                                            LinkedIn
                                        </a>
                                        <a
                                            href={member.github}
                                            target="_blank" rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-navy-900 text-white text-xs font-800 uppercase tracking-wider hover:bg-navy-800 transition-colors shadow-sm"
                                        >
                                            <Code2 size={15} />
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Story text */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="bg-white rounded-4xl border border-slate-100 p-10 shadow-card">
                                <span className="line-accent" />
                                <h2 className="text-fluid-h3 font-900 uppercase tracking-tight text-navy-900 mb-6">
                                    Who We <span className="gradient-text-warm">Are</span>
                                </h2>
                                <div className="space-y-5 text-[15px] text-slate-600 leading-relaxed font-400">
                                    <p>
                                        At <span className="font-700 text-navy-900">Primeline IT Services</span>, we are more than a software agency — we are a partner in digital transformation. Founded with a mission to deliver impactful solutions, our team specialises in creating scalable, intelligent, and future-ready technology that empowers businesses to thrive in competitive markets.
                                    </p>
                                    <p>
                                        We&apos;ve earned the trust of clients across healthcare, e-commerce, manufacturing, and corporate services. Our commitment to success is reflected in the long-term relationships we&apos;ve built — not contracts, but genuine partnerships where we share accountability for outcomes.
                                    </p>
                                    <p>
                                        Our AI practice is at the forefront of everything we do. From LLM-powered automations to predictive analytics dashboards, we integrate artificial intelligence where it creates real leverage — not where it looks impressive on a slide deck.
                                    </p>
                                    <blockquote className="border-l-2 border-cyan-500 pl-6 italic text-navy-900/70 font-500">
                                        &ldquo;The success of our clients is the only true measure of our work. Everything else is just output.&rdquo;
                                    </blockquote>
                                </div>
                            </div>

                            {/* Quick stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { v: "150+", l: "Projects" },
                                    { v: "50+",  l: "Clients" },
                                    { v: "12",   l: "Countries" },
                                    { v: "98%",  l: "Retention" },
                                ].map((s) => (
                                    <div key={s.l} className="rounded-3xl bg-navy-900 p-6 text-center">
                                        <p className="text-3xl font-900 text-white mb-1">{s.v}</p>
                                        <p className="text-[10px] font-700 uppercase tracking-[0.2em] text-white/35">{s.l}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Timeline ── */}
            <section className="section-pad bg-slate-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-dot-grid bg-dot-28 opacity-60 pointer-events-none" />
                <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                    <div className="text-center mb-16">
                        <div className="tag mx-auto mb-5" style={{ display: "inline-flex" }}>
                            <TrendingUp size={11} />
                            Our Journey
                        </div>
                        <h2 className="text-fluid-h2 font-900 uppercase tracking-tight leading-none text-navy-900">
                            Built Over <span className="gradient-text-warm">Years of Craft</span>
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-slate-200 to-transparent md:-translate-x-px" />

                        <div className="space-y-8">
                            {milestones.map((m, i) => (
                                <div key={i} className={`relative flex items-start gap-8 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                                    {/* Dot */}
                                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-cyan-500 border-2 border-white shadow-cyan-sm md:-translate-x-1.5 mt-5 z-10 shrink-0" />

                                    {/* Content */}
                                    <div className={`ml-12 md:ml-0 w-full md:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                                        <div className={`inline-flex items-center gap-2 mb-3 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                                            <span className="text-[10px] font-800 uppercase tracking-[0.2em] text-cyan-500 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full">{m.year}</span>
                                            {m.year === "2026" && <span className="text-[9px] font-800 uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">Now</span>}
                                        </div>
                                        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-card">
                                            <h3 className="text-lg font-800 uppercase tracking-tight text-navy-900 mb-2">{m.title}</h3>
                                            <p className="text-sm text-slate-500 font-400 leading-relaxed">{m.desc}</p>
                                        </div>
                                    </div>

                                    {/* Spacer for the other side */}
                                    <div className="hidden md:block w-[calc(50%-2.5rem)]" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Values ── */}
            <section className="section-pad bg-white">
                <div className="max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                    <div className="text-center mb-16">
                        <div className="tag mx-auto mb-5" style={{ display: "inline-flex" }}>
                            <Heart size={11} />
                            What Drives Us
                        </div>
                        <h2 className="text-fluid-h2 font-900 uppercase tracking-tight leading-none text-navy-900">
                            Our Core <span className="gradient-text-warm">Values</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {values.map((v, i) => (
                            <div key={i} className="group p-8 rounded-4xl bg-slate-50/60 border border-slate-100 hover:bg-white hover:border-cyan-100 hover:shadow-card transition-all duration-300">
                                <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-5 shadow-card group-hover:bg-navy-900 group-hover:border-navy-900 transition-all duration-300">
                                    <v.icon size={20} className="text-navy-900 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-lg font-800 uppercase tracking-tight text-navy-900 mb-3">{v.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed font-400">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="section-pad bg-navy-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-dot-grid-dark bg-dot-28 opacity-40 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[500px] h-[300px] bg-cyan-500/6 rounded-full blur-[100px]" />
                </div>
                <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 text-center">
                    <h2 className="text-fluid-h2 font-900 uppercase tracking-tight leading-none text-white mb-6">
                        Let&apos;s Build Something<br />
                        <span className="gradient-text">Extraordinary Together</span>
                    </h2>
                    <p className="text-base text-white/45 max-w-lg mx-auto mb-10 font-400 leading-relaxed">
                        Whether you need AI integration, a custom platform, or a full digital strategy — we&apos;re ready.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="btn-cyan rounded-full py-4 px-9 text-sm shadow-cyan-lg">
                            Start the Conversation
                            <ArrowRight size={16} />
                        </Link>
                        <Link href="/services" className="btn-outline border-white/20 text-white hover:border-cyan-500 hover:text-cyan-400 rounded-full py-4 px-9 text-sm">
                            Explore Services
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
