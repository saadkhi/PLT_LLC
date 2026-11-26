import React from "react";
import prisma from "@/lib/prisma";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Layers, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Portfolio | Primeline IT Services LLC",
    description: "Explore our portfolio of delivered projects across AI, web development, digital marketing, and more.",
};

export default async function PortfolioPage() {
    const categories = await prisma.category.findMany({
        orderBy: { id: "asc" },
        include: {
            projects: {
                include: { images: { orderBy: { order: "asc" } } },
            },
        },
    });

    const totalProjects = categories.reduce((sum, c) => sum + c.projects.length, 0);

    return (
        <div className="bg-white">
            {/* ── Hero ── */}
            <div className="relative bg-navy-950 overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 bg-dot-grid-dark bg-dot-28 opacity-40 pointer-events-none" />
                <div className="absolute -top-40 right-0 w-[600px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

                <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                        <div>
                            <div className="tag mb-6"><Layers size={11} />Our Work</div>
                            <h1 className="text-fluid-h1 font-900 uppercase tracking-tight leading-[0.95] text-white mb-4 max-w-2xl">
                                Projects That<br />
                                <span className="gradient-text">Move the Needle</span>
                            </h1>
                            <p className="text-base text-white/45 max-w-xl leading-relaxed font-400">
                                Every project here represents a real business challenge we solved. Browse by category to see what we&apos;ve built.
                            </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-4">
                            <div className="text-center">
                                <p className="text-4xl font-900 text-white">{totalProjects}+</p>
                                <p className="text-[10px] font-700 uppercase tracking-[0.2em] text-white/35 mt-1">Projects</p>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="text-center">
                                <p className="text-4xl font-900 text-white">{categories.length}</p>
                                <p className="text-[10px] font-700 uppercase tracking-[0.2em] text-white/35 mt-1">Categories</p>
                            </div>
                        </div>
                    </div>

                    {/* Category jump links */}
                    <div className="mt-10 flex flex-wrap gap-2.5">
                        {categories.map((cat) => (
                            <a
                                key={cat.id}
                                href={`#category-${cat.id}`}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] font-700 text-white/55 hover:bg-cyan-500/15 hover:border-cyan-500/30 hover:text-cyan-300 transition-all"
                            >
                                {cat.name}
                                <span className="text-white/25 font-500">({cat.projects.length})</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Project Categories ── */}
            <div className="max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 py-20 space-y-24">
                {categories.map((category) => (
                    <section key={category.id} id={`category-${category.id}`} className="scroll-mt-28">
                        {/* Category header */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-px w-8 bg-cyan-500" />
                                    <span className="text-[10px] font-800 uppercase tracking-[0.2em] text-cyan-500">{category.projects.length} Project{category.projects.length !== 1 ? "s" : ""}</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-900 uppercase tracking-tight text-navy-900">
                                    {category.name}
                                </h2>
                                {category.description && (
                                    <p className="mt-3 text-sm text-slate-500 leading-relaxed font-400 max-w-xl">{category.description}</p>
                                )}
                            </div>
                            <Link href={`/contact`} className="btn-outline rounded-full py-2.5 px-6 text-xs shrink-0">
                                Start a Project
                            </Link>
                        </div>

                        {category.projects.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {category.projects.map((project) => (
                                    <article
                                        key={project.id}
                                        className="group bg-white rounded-4xl border border-slate-100 overflow-hidden flex flex-col card-hover shadow-card"
                                    >
                                        {/* Image */}
                                        <div className="relative h-64 bg-slate-50 overflow-hidden">
                                            {project.images.length > 0 ? (
                                                <Image
                                                    src={getImageUrl(project.images[0].image)}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50">
                                                    <Sparkles size={32} className="text-slate-300" />
                                                </div>
                                            )}

                                            {/* Image dots for multi-image */}
                                            {project.images.length > 1 && (
                                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                                    {project.images.map((_, i) => (
                                                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-cyan-500" : "bg-white/60"}`} />
                                                    ))}
                                                </div>
                                            )}

                                            {/* Category tag on image */}
                                            <div className="absolute top-4 left-4">
                                                <span className="tag bg-white/90 backdrop-blur-sm border-white/80 text-navy-900">{category.name}</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 flex flex-col flex-1">
                                            <h3 className="text-xl font-800 uppercase tracking-tight text-navy-900 mb-3 group-hover:text-cyan-600 transition-colors">{project.title}</h3>
                                            <p className="text-sm text-slate-500 leading-relaxed font-400 mb-6 flex-1">{project.description}</p>
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-[11px] font-800 uppercase tracking-widest text-navy-900 hover:text-cyan-500 transition-colors group/link mt-auto w-fit"
                                                >
                                                    View Live Project
                                                    <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                                </a>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-4xl bg-slate-50 border border-dashed border-slate-200 p-16 text-center">
                                <Sparkles size={28} className="text-slate-300 mx-auto mb-3" />
                                <p className="text-sm font-700 uppercase tracking-widest text-slate-300">Case studies coming soon</p>
                                <p className="text-xs text-slate-400 mt-1.5 font-400">We&apos;re documenting our latest work in this category.</p>
                            </div>
                        )}
                    </section>
                ))}
            </div>

            {/* ── CTA ── */}
            <section className="section-pad bg-navy-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-dot-grid-dark bg-dot-28 opacity-40 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[500px] h-[300px] bg-cyan-500/6 rounded-full blur-[100px]" />
                </div>
                <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 text-center">
                    <h2 className="text-fluid-h2 font-900 uppercase tracking-tight leading-none text-white mb-5">
                        Want Your Project<br /><span className="gradient-text">In This Portfolio?</span>
                    </h2>
                    <p className="text-base text-white/45 max-w-md mx-auto mb-10 font-400">Let&apos;s build something worth showcasing.</p>
                    <Link href="/contact" className="btn-cyan rounded-full py-4 px-9 text-sm shadow-cyan-lg">
                        Get in Touch <ArrowUpRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
