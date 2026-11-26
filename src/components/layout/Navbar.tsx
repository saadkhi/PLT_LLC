"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getImageUrl } from "@/lib/utils";
import { Menu, X, ChevronRight, Phone, Mail, Sparkles } from "lucide-react";

const Navbar = ({ contactInfo }: { contactInfo?: { email?: string; phone?: string } }) => {
    const [scrolled, setScrolled]       = useState(false);
    const [visible, setVisible]         = useState(true);
    const [prevScroll, setPrevScroll]   = useState(0);
    const [mobileOpen, setMobileOpen]   = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        const onScroll = () => {
            const cur = window.pageYOffset;
            setScrolled(cur > 20);
            setVisible(prevScroll > cur || cur < 60);
            setPrevScroll(cur);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [prevScroll]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const navLinks = [
        { name: "Home",      href: "/" },
        { name: "Services",  href: "/services" },
        { name: "Insights",  href: "/insights" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "About",     href: "/about" },
        { name: "Careers",   href: "/careers" },
        { name: "Contact",   href: "/contact" },
    ];

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-spring
                    ${visible ? "translate-y-0" : "-translate-y-full"}
                    ${scrolled
                        ? "bg-white/90 backdrop-blur-xl shadow-navy-sm border-b border-slate-100/80"
                        : isHome
                            ? "bg-transparent border-b border-transparent"
                            : "bg-white border-b border-slate-100"
                    }`}
            >
                {/* Top micro-bar — hidden on scroll */}
                <div className={`transition-all duration-300 overflow-hidden ${scrolled ? "max-h-0 opacity-0" : "max-h-8 opacity-100"}`}>
                    <div className="bg-navy-900 text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-6 py-1.5 px-6">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                            AI-Powered Business Solutions
                        </span>
                        <span className="hidden sm:block text-white/20">|</span>
                        <span className="hidden sm:block">USA · Pakistan · Global</span>
                    </div>
                </div>

                <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
                    {/* Logo */}
                    <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 shrink-0">
                        <Image
                            src={getImageUrl("navbar_logo.png")}
                            alt="Primeline IT Services"
                            width={160}
                            height={40}
                            style={{ height: "36px", width: "auto" }}
                            className={`object-contain transition-all duration-300 ${scrolled || !isHome ? "" : "brightness-0 invert"}`}
                            priority
                        />
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative px-4 py-2 text-[11px] font-800 uppercase tracking-widest transition-colors duration-200 rounded-full
                                    ${isActive(link.href)
                                        ? "text-cyan-500"
                                        : scrolled || !isHome
                                            ? "text-navy-900 hover:text-cyan-500"
                                            : "text-white/80 hover:text-white"
                                    }`}
                            >
                                {link.name}
                                {isActive(link.href) && (
                                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-500" />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* AI badge */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                            <Sparkles size={11} className="text-cyan-500" />
                            <span className="text-[10px] font-800 uppercase tracking-widest text-cyan-600">AI-Powered</span>
                        </div>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent("open-quote-drawer"))}
                            className="btn-primary text-[11px] py-2.5 px-5 rounded-full shadow-navy-sm"
                        >
                            Get a Quote
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled || !isHome ? "text-navy-900 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
                        onClick={() => setMobileOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu size={26} strokeWidth={2.5} />
                    </button>
                </nav>
            </header>

            {/* ── Mobile Drawer ── */}
            <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${mobileOpen ? "visible" : "invisible pointer-events-none"}`}>
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity duration-500 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setMobileOpen(false)}
                />

                {/* Panel */}
                <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white flex flex-col shadow-navy-lg transition-transform duration-500 ease-spring ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                        <Image
                            src={getImageUrl("navbar_logo.png")}
                            alt="Primeline IT Services"
                            width={130}
                            height={32}
                            style={{ height: "30px", width: "auto" }}
                            className="object-contain"
                        />
                        <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl text-slate-400 hover:text-navy-900 hover:bg-slate-50 transition-colors">
                            <X size={22} />
                        </button>
                    </div>

                    {/* AI badge */}
                    <div className="mx-6 mt-5">
                        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100">
                            <Sparkles size={14} className="text-cyan-500" />
                            <span className="text-[11px] font-800 uppercase tracking-widest text-cyan-700">AI-Powered Solutions</span>
                        </div>
                    </div>

                    {/* Nav links */}
                    <nav className="flex-1 overflow-y-auto px-6 py-6">
                        <ul className="space-y-1">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-lg font-800 uppercase tracking-tight transition-all duration-200
                                            ${isActive(link.href)
                                                ? "bg-cyan-50 text-cyan-600 border border-cyan-100"
                                                : "text-navy-900 hover:bg-slate-50"
                                            }`}
                                    >
                                        {link.name}
                                        <ChevronRight size={18} className={`transition-transform ${isActive(link.href) ? "text-cyan-500 translate-x-0.5" : "text-slate-300"}`} />
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 pt-8 border-t border-slate-100 space-y-3">
                            <p className="text-[10px] font-800 uppercase tracking-[0.2em] text-cyan-500 px-1 mb-4">Contact Us</p>
                            <a
                                href={`mailto:${contactInfo?.email || "primelinetech@gmail.com"}`}
                                className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center">
                                    <Mail size={15} className="text-cyan-500" />
                                </div>
                                <span className="text-sm font-600 text-slate-600 truncate">{contactInfo?.email || "primelinetech@gmail.com"}</span>
                            </a>
                            <a
                                href={`tel:${contactInfo?.phone || "+923353948753"}`}
                                className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center">
                                    <Phone size={15} className="text-cyan-500" />
                                </div>
                                <span className="text-sm font-600 text-slate-600">{contactInfo?.phone || "+92 335 3948753"}</span>
                            </a>
                        </div>
                    </nav>

                    {/* CTA */}
                    <div className="p-6 border-t border-slate-100">
                        <button
                            onClick={() => {
                                setMobileOpen(false);
                                window.dispatchEvent(new CustomEvent("open-quote-drawer"));
                            }}
                            className="btn-cyan w-full py-4 rounded-2xl text-sm shadow-cyan-md"
                        >
                            Get a Quote
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
