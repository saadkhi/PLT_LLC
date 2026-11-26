import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { Calendar, ArrowRight, BookOpen, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Insights | Primeline IT Services LLC",
    description: "Latest thinking on AI, cybersecurity, digital marketing, and business technology from the Primeline team.",
};

function estimateReadTime(text: string): number {
    return Math.max(1, Math.ceil(text.split(" ").length / 200));
}

export default async function InsightsPage() {
    const insights = await prisma.insight.findMany({ orderBy: { created_at: "desc" } });
    const [featured, ...rest] = insights;

    return (
        <div className="bg-white">
            {/* ── Hero ── */}
            <div className="relative bg-navy-950 overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 bg-dot-grid-dark bg-dot-28 opacity-40 pointer-events-none" />
                <div className="absolute -top-40 right-0 w-[600px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                    <div className="tag mb-6"><BookOpen size={11} />Insights</div>
                    <h1 className="text-fluid-h1 font-900 uppercase tracking-tight leading-[0.95] text-white mb-5 max-w-2xl">
                        Ideas That<br /><span className="gradient-text">Shape the Future</span>
                    </h1>
                    <p className="text-base text-white/45 max-w-xl leading-relaxed font-400">
                        Our team&apos;s perspective on AI, technology trends, and what it takes to build a business that compounds.
                    </p>
                </div>
            </div>

            {insights.length === 0 ? (
                <div className="section-pad max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 text-center">
                    <div className="rounded-4xl bg-slate-50 border border-dashed border-slate-200 py-24 px-8">
                        <Sparkles size={32} className="text-slate-300 mx-auto mb-4" />
                        <p className="text-sm font-700 uppercase tracking-widest text-slate-400">No insights published yet</p>
                        <p className="text-sm text-slate-400 mt-2 font-400">Check back soon — great content is on the way.</p>
                    </div>
                </div>
            ) : (
                <div className="max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 py-16">
                    {/* ── Featured article ── */}
                    {featured && (
                        <div className="mb-16">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="h-px w-8 bg-cyan-500" />
                                <span className="text-[10px] font-800 uppercase tracking-[0.2em] text-cyan-500">Featured</span>
                            </div>
                            <Link href={`/insights/${featured.id}`} className="group block">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-4xl overflow-hidden border border-slate-100 shadow-card card-hover">
                                    {/* Image */}
                                    <div className="relative h-72 lg:h-auto bg-slate-100 overflow-hidden min-h-[280px]">
                                        <Image
                                            src={getImageUrl(featured.image ?? "AI.png")}
                                            alt={featured.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                                    </div>
                                    {/* Text */}
                                    <div className="bg-white p-10 lg:p-14 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-5">
                                            <span className="tag">Featured Article</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-700 uppercase tracking-[0.2em] text-slate-400 mb-4">
                                            <Calendar size={12} />
                                            {new Date(featured.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                                            <span className="text-slate-200">·</span>
                                            {estimateReadTime(featured.description)} min read
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-900 uppercase tracking-tight text-navy-900 mb-4 group-hover:text-cyan-600 transition-colors leading-tight">
                                            {featured.title}
                                        </h2>
                                        <p className="text-sm text-slate-500 leading-relaxed font-400 mb-8 line-clamp-3">
                                            {featured.description}
                                        </p>
                                        <div className="inline-flex items-center gap-2 text-xs font-800 uppercase tracking-widest text-navy-900 group-hover:text-cyan-500 transition-colors">
                                            Read Full Article
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* ── Rest of articles ── */}
                    {rest.length > 0 && (
                        <>
                            <div className="flex items-center gap-2 mb-8">
                                <div className="h-px w-8 bg-slate-200" />
                                <span className="text-[10px] font-800 uppercase tracking-[0.2em] text-slate-400">More Articles</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {rest.map((insight: any) => (
                                    <Link
                                        key={insight.id}
                                        href={`/insights/${insight.id}`}
                                        className="group bg-white rounded-4xl border border-slate-100 overflow-hidden flex flex-col card-hover shadow-card"
                                    >
                                        <div className="relative h-52 bg-slate-50 overflow-hidden">
                                            <Image
                                                src={getImageUrl(insight.image ?? "AI.png")}
                                                alt={insight.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>
                                        <div className="p-7 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 text-[10px] font-700 uppercase tracking-[0.2em] text-slate-400 mb-3">
                                                <Calendar size={11} />
                                                {new Date(insight.created_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                                                <span className="text-slate-200">·</span>
                                                {estimateReadTime(insight.description)} min
                                            </div>
                                            <h3 className="text-lg font-800 uppercase tracking-tight text-navy-900 mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2 leading-tight flex-1">
                                                {insight.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 leading-relaxed font-400 line-clamp-2 mb-5">
                                                {insight.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-[11px] font-800 uppercase tracking-widest text-slate-400 group-hover:text-cyan-500 transition-colors mt-auto">
                                                Read Article
                                                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
