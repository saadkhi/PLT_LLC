import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { MapPin, Briefcase, ArrowRight, Users, Sparkles, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Careers | Primeline IT Services LLC",
    description: "Join the Primeline IT team. We're hiring talented people who want to build AI-powered products and grow with us.",
};

const perks = [
    { icon: Users,    label: "Collaborative Team" },
    { icon: Briefcase, label: "Remote Friendly" },
    { icon: Sparkles, label: "AI-First Culture" },
    { icon: Clock,    label: "Flexible Hours" },
];

export default async function CareersPage() {
    const jobs = await prisma.job.findMany({ orderBy: { posted_at: "desc" } });

    return (
        <div className="bg-white">
            {/* ── Hero ── */}
            <div className="relative bg-navy-950 overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 bg-dot-grid-dark bg-dot-28 opacity-40 pointer-events-none" />
                <div className="absolute -top-40 right-0 w-[600px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                    <div className="tag mb-6"><Users size={11} />We&apos;re Hiring</div>
                    <h1 className="text-fluid-h1 font-900 uppercase tracking-tight leading-[0.95] text-white mb-5 max-w-2xl">
                        Shape What&apos;s<br /><span className="gradient-text">Next With Us</span>
                    </h1>
                    <p className="text-base text-white/45 max-w-xl leading-relaxed font-400 mb-10">
                        We&apos;re building AI-powered products for global clients. If you love solving hard problems and shipping things that matter — you&apos;ll fit right in.
                    </p>

                    {/* Perks row */}
                    <div className="flex flex-wrap gap-3">
                        {perks.map((p) => (
                            <div key={p.label} className="flex items-center gap-2 px-4 py-2 rounded-full glass-dark border border-white/10">
                                <p.icon size={13} className="text-cyan-400" />
                                <span className="text-[11px] font-700 text-white/65 uppercase tracking-wider">{p.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Job Listings ── */}
            <section className="section-pad">
                <div className="max-w-3xl mx-auto px-6 sm:px-12 md:px-20 lg:px-8">
                    {jobs.length > 0 ? (
                        <>
                            <div className="flex items-center gap-2 mb-8">
                                <div className="h-px w-8 bg-cyan-500" />
                                <span className="text-[10px] font-800 uppercase tracking-[0.2em] text-cyan-500">{jobs.length} Open Position{jobs.length !== 1 ? "s" : ""}</span>
                            </div>
                            <div className="space-y-4">
                                {jobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="group bg-white rounded-4xl border border-slate-100 p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 card-hover shadow-card"
                                    >
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                <span className="tag">{job.job_mode}</span>
                                                <span className="text-[9px] font-700 uppercase tracking-widest text-slate-400">
                                                    Posted {new Date(job.posted_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-800 uppercase tracking-tight text-navy-900 mb-2 group-hover:text-cyan-600 transition-colors">
                                                {job.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-4">
                                                <div className="flex items-center gap-1.5 text-[11px] font-600 text-slate-400 uppercase tracking-wide">
                                                    <MapPin size={12} className="text-cyan-500" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[11px] font-600 text-slate-400 uppercase tracking-wide">
                                                    <Briefcase size={12} className="text-cyan-500" />
                                                    {job.job_mode}
                                                </div>
                                            </div>
                                        </div>
                                        <Link
                                            href={`/careers/${job.id}`}
                                            className="btn-primary rounded-full py-3 px-6 text-xs shrink-0"
                                        >
                                            View Role
                                            <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-24 rounded-4xl border border-dashed border-slate-200">
                            <Sparkles size={32} className="text-slate-300 mx-auto mb-4" />
                            <p className="text-sm font-700 uppercase tracking-widest text-slate-400">No openings right now</p>
                            <p className="text-sm text-slate-400 mt-2 font-400">We post new roles regularly — check back soon or send us your CV.</p>
                            <Link href="/contact" className="btn-outline rounded-full py-3 px-7 text-xs mt-8 inline-flex">
                                Send Your CV
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Culture CTA ── */}
            <section className="section-pad bg-navy-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-dot-grid-dark bg-dot-28 opacity-40 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[500px] h-[300px] bg-cyan-500/6 rounded-full blur-[100px]" />
                </div>
                <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 text-center">
                    <h2 className="text-fluid-h2 font-900 uppercase tracking-tight leading-none text-white mb-5">
                        Don&apos;t See Your Role?<br />
                        <span className="gradient-text">Reach Out Anyway</span>
                    </h2>
                    <p className="text-base text-white/45 max-w-md mx-auto mb-10 font-400">
                        We&apos;re always looking for exceptional talent. Send us a note — the right people always find a home here.
                    </p>
                    <Link href="/contact" className="btn-cyan rounded-full py-4 px-9 text-sm shadow-cyan-lg">
                        Get in Touch <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
