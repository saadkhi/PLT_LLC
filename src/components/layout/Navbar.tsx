"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';

const Navbar = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return (
        <header
            id="navbar"
            className={`fixed top-0 left-0 w-full bg-white text-black p-5 z-50 font-thin border-b border-gray-300 transition-all duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
        >
            <nav className="px-8 flex justify-between items-center min-w-[200px]">
                <div className="flex items-center space-x-6 flex-shrink-0">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src={getImageUrl('navbar_logo.png')}
                            alt="Logo"
                            width={150}
                            height={40}
                            style={{ height: '40px', width: 'auto' }}
                            className="object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-4">
                    <ul className="flex space-x-4 font-thin">
                        <li><Link href="/" className="px-3 py-2 rounded-md hover:text-orange-500 transition font-semibold">Home</Link></li>
                        <li><Link href="/services" className="px-3 py-2 rounded-md hover:text-orange-500 transition font-semibold">Services</Link></li>
                        <li><Link href="/industries" className="px-3 py-2 rounded-md hover:text-orange-500 transition font-semibold">Industries</Link></li>
                        <li><Link href="/insights" className="px-3 py-2 rounded-md hover:text-orange-500 transition font-semibold">Insights</Link></li>
                        <li><Link href="/about" className="px-3 py-2 rounded-md hover:text-orange-500 transition font-semibold">About</Link></li>
                    </ul>
                    <div className="flex items-center space-x-4 font-thin">
                        <Link href="/careers" className="px-3 py-2 rounded-md hover:text-orange-500 transition font-semibold">Careers</Link>
                        <Link href="/contact" className="px-3 py-2 rounded-md hover:text-orange-500 transition font-semibold">Contact Us</Link>
                    </div>
                </div>

                {/* Hamburger Button */}
                <button
                    id="hamburger-btn"
                    className="lg:hidden p-2 rounded-md hover:text-orange-500 transition"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div id="mobile-menu" className={`lg:hidden flex-col bg-white ${mobileMenuOpen ? 'flex' : 'hidden'}`}>
                <ul className="flex flex-col space-y-2 p-4 font-thin">
                    <li><Link href="/" className="block px-3 py-2 rounded-md hover:text-orange-500 transition" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
                    <li><Link href="/services" className="block px-3 py-2 rounded-md hover:text-orange-500 transition" onClick={() => setMobileMenuOpen(false)}>Services</Link></li>
                    <li><Link href="/industries" className="block px-3 py-2 rounded-md hover:text-orange-500 transition" onClick={() => setMobileMenuOpen(false)}>Industries</Link></li>
                    <li><Link href="/insights" className="block px-3 py-2 rounded-md hover:text-orange-500 transition" onClick={() => setMobileMenuOpen(false)}>Insights</Link></li>
                    <li><Link href="/about" className="block px-3 py-2 rounded-md hover:text-orange-500 transition" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
                    <li><Link href="/careers" className="block px-3 py-2 rounded-md hover:text-orange-500 transition" onClick={() => setMobileMenuOpen(false)}>Careers</Link></li>
                    <li><Link href="/contact" className="block px-3 py-2 rounded-md hover:text-orange-500 transition" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
