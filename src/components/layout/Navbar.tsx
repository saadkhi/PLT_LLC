"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';
import { Menu, X, ChevronRight, Phone, Mail } from 'lucide-react';

const Navbar = ({ contactInfo }: { contactInfo?: { email?: string; phone?: string } }) => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            // Reveal navbar when scrolling up or at the very top
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Insights", href: "/insights" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <header
                id="navbar"
                className={`fixed top-0 left-0 w-full bg-white backdrop-blur-md text-[#0A2540] px-6 py-4 z-50 border-b border-gray-100 transition-all duration-500 ease-in-out ${visible ? 'translate-y-0' : '-translate-y-full'}`}
            >
                <nav className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                            <Image
                                src={getImageUrl('navbar_logo.png')}
                                alt="Logo"
                                width={180}
                                height={45}
                                style={{ height: '40px', width: 'auto' }}
                                className="object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <ul className="flex space-x-8 items-center">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm font-bold uppercase tracking-widest hover:text-cyan-500 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('open-quote-drawer'))}
                            className="bg-cyan-500 text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
                        >
                            Get A Quote
                        </button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        id="hamburger-btn"
                        className="lg:hidden p-4 text-gray-900 transition-colors hover:text-cyan-500"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <Menu size={28} strokeWidth={2.5} />
                    </button>
                </nav>
            </header>

            {/* Premium Mobile Menu Drawer */}
            <div
                className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${mobileMenuOpen ? 'visible' : 'invisible pointer-events-none'}`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-navy-900/60 backdrop-blur-sm transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setMobileMenuOpen(false)}
                />

                {/* Drawer Content */}
                <div
                    className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-50">
                        <Image
                            src={getImageUrl('navbar_logo.png')}
                            alt="Logo"
                            width={120}
                            height={30}
                            style={{ height: '30px', width: 'auto' }}
                            className="object-contain"
                        />
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 text-gray-500 hover:text-[#0A2540] transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-8 px-6">
                        <ul className="space-y-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center justify-between text-2xl font-black uppercase tracking-tighter text-gray-900 py-2"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span>{link.name}</span>
                                        <ChevronRight size={20} className="text-gray-300 group-hover:text-cyan-500 transform group-hover:translate-x-1 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-12 pt-12 border-t border-gray-100">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 mb-6">Connect with us</p>
                            <div className="space-y-4">
                                <a href={`mailto:${contactInfo?.email || 'primelinetech@gmail.com'}`} className="flex items-center space-x-3 text-gray-600 font-bold text-sm">
                                    <Mail size={18} className="text-cyan-500" />
                                    <span>{contactInfo?.email || 'primelinetech@gmail.com'}</span>
                                </a>
                                <a href={`tel:${contactInfo?.phone || '+923353948753'}`} className="flex items-center space-x-3 text-gray-600 font-bold text-sm">
                                    <Phone size={18} className="text-cyan-500" />
                                    <span>{contactInfo?.phone || '+92 335 3948753'}</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 mt-auto border-t border-gray-50">
                        <button
                            onClick={() => {
                                setMobileMenuOpen(false);
                                window.dispatchEvent(new CustomEvent('open-quote-drawer'));
                            }}
                            className="flex items-center justify-center w-full bg-cyan-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/20"
                        >
                            Get A Quote
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Navbar;
