import React from "react";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { getImageUrl } from "@/lib/utils";
import { Mail, Phone, MapPin, Sparkles, ArrowUpRight } from "lucide-react";

interface FooterProps {
    initialData?: { offices: any[]; socialLinks: any[]; mainOffice: any };
}

const Footer = async ({ initialData }: FooterProps) => {
    const offices: any[]     = initialData?.offices     ?? (await (prisma as any).office.findMany({ orderBy: { id: "asc" } }));
    const socialLinks: any[] = initialData?.socialLinks ?? (await (prisma as any).socialLink.findMany({ orderBy: { id: "asc" } }));
    const mainOffice: any    = initialData?.mainOffice  ?? offices.find((o: any) => o.is_main) ?? offices[0] ?? null;

    const services = [
        { name: "AI & Automation",      href: "/services#ai-automation" },
        { name: "Web & App Development", href: "/services#web-app-development" },
        { name: "Cybersecurity",         href: "/services#cybersecurity" },
        { name: "Data Analytics",        href: "/services#data-analytics" },
        { name: "Digital Marketing",     href: "/services#digital-marketing" },
        { name: "E-Commerce",            href: "/services#e-commerce" },
    ];

    const company = [
        { name: "Home",      href: "/" },
        { name: "About",     href: "/about" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Insights",  href: "/insights" },
        { name: "Careers",   href: "/careers" },
        { name: "Contact",   href: "/contact" },
    ];

    // Social icon map (simple SVG paths by platform name)
    const socialIconPaths: Record<string, string> = {
        linkedin:  "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
        twitter:   "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
        instagram: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5a1 1 0 10-1-1 1 1 0 001 1zM21 2H3a1 1 0 00-1 1v18a1 1 0 001 1h18a1 1 0 001-1V3a1 1 0 00-1-1zm-1 18H4V4h16z",
        facebook:  "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
        github:    "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
    };

    return (
        <footer className="bg-navy-950 relative overflow-hidden">
            {/* Top gradient edge */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            {/* Dot grid texture */}
            <div className="absolute inset-0 bg-dot-grid-dark bg-dot-28 opacity-30 pointer-events-none" />

            {/* Glow blob */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/4 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 pt-16 pb-8">

                {/* ── Main grid ── */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-10 pb-14 border-b border-white/5">

                    {/* Brand column */}
                    <div className="col-span-2 md:col-span-4">
                        <Link href="/" className="inline-block mb-5">
                            <Image
                                src={getImageUrl("navbar_logo.png")}
                                alt="Primeline IT Services LLC"
                                width={140}
                                height={36}
                                style={{ height: "34px", width: "auto" }}
                                className="object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-sm text-white/35 leading-relaxed font-400 max-w-xs mb-6">
                            USA-based technology partner delivering AI integrations, custom software, and digital growth strategies to businesses worldwide.
                        </p>

                        {/* Contact snippets */}
                        {mainOffice && (
                            <div className="space-y-2.5">
                                <a href={`mailto:${mainOffice.email}`} className="flex items-center gap-2.5 text-xs text-white/40 hover:text-cyan-400 transition-colors font-500">
                                    <Mail size={13} className="text-cyan-500/60 shrink-0" />
                                    {mainOffice.email}
                                </a>
                                <a href={`tel:${mainOffice.phone}`} className="flex items-center gap-2.5 text-xs text-white/40 hover:text-cyan-400 transition-colors font-500">
                                    <Phone size={13} className="text-cyan-500/60 shrink-0" />
                                    {mainOffice.phone}
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Services */}
                    <div className="col-span-1 md:col-span-3">
                        <h4 className="text-[9px] font-800 uppercase tracking-[0.25em] text-white/25 mb-5">Services</h4>
                        <ul className="space-y-2.5">
                            {services.map((s) => (
                                <li key={s.name}>
                                    <Link href={s.href} className="text-xs text-white/45 hover:text-white transition-colors font-500 flex items-center gap-1 group">
                                        <span className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-cyan-500 transition-colors shrink-0" />
                                        {s.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="col-span-1 md:col-span-2">
                        <h4 className="text-[9px] font-800 uppercase tracking-[0.25em] text-white/25 mb-5">Company</h4>
                        <ul className="space-y-2.5">
                            {company.map((c) => (
                                <li key={c.name}>
                                    <Link href={c.href} className="text-xs text-white/45 hover:text-white transition-colors font-500 flex items-center gap-1 group">
                                        <span className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-cyan-500 transition-colors shrink-0" />
                                        {c.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA + Social */}
                    <div className="col-span-2 md:col-span-3">
                        <h4 className="text-[9px] font-800 uppercase tracking-[0.25em] text-white/25 mb-5">Start a Project</h4>
                        <p className="text-xs text-white/35 mb-4 font-400 leading-relaxed">Have an idea? Let&apos;s build something impactful together.</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/12 border border-cyan-500/20 text-[11px] font-800 uppercase tracking-widest text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-300 mb-6"
                        >
                            Get in Touch
                            <ArrowUpRight size={13} />
                        </Link>

                        {/* Social icons */}
                        {socialLinks.length > 0 && (
                            <div>
                                <p className="text-[9px] font-800 uppercase tracking-[0.25em] text-white/20 mb-3">Follow Us</p>
                                <div className="flex gap-2 flex-wrap">
                                    {socialLinks.map((link: any) => {
                                        const key = link.platform_name?.toLowerCase() ?? "";
                                        const path = socialIconPaths[key];
                                        return (
                                            <a
                                                key={link.id}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={link.platform_name}
                                                className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 hover:bg-cyan-500/20 hover:border-cyan-500/30 transition-all duration-300 flex items-center justify-center"
                                            >
                                                {path ? (
                                                    <svg className="w-3.5 h-3.5 text-white/50 hover:text-cyan-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
                                                    </svg>
                                                ) : (
                                                    <span className="text-[11px] font-800 text-white/50">
                                                        {link.platform_name?.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Office addresses ── */}
                {offices.length > 0 && (
                    <div className="py-10 border-b border-white/5">
                        <p className="text-[9px] font-800 uppercase tracking-[0.25em] text-white/20 mb-6">Our Offices</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {offices.map((office: any) => (
                                <div key={office.id} className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={11} className={office.is_main ? "text-cyan-500" : "text-white/20"} />
                                        <span className="text-[10px] font-800 uppercase tracking-wider text-white/60">{office.name}</span>
                                        {office.is_main && (
                                            <span className="text-[7px] font-800 px-1.5 py-0.5 bg-cyan-500/10 text-cyan-500 rounded uppercase tracking-widest">HQ</span>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-white/30 leading-relaxed font-400 pl-[19px]">{office.address}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Bottom bar ── */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-white/20">
                        <Sparkles size={12} className="text-cyan-500/60" />
                        <p className="text-[10px] font-700 uppercase tracking-[0.15em]">
                            &copy; {new Date().getFullYear()} Primeline IT Services LLC. All rights reserved.
                        </p>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/4 border border-white/8">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[9px] font-800 uppercase tracking-[0.2em] text-white/30">All Systems Operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
