'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getImageUrl } from '@/lib/utils';

const Footer = () => {
    const [offices, setOffices] = useState<any[]>([]);
    const [socialLinks, setSocialLinks] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [officesRes, socialRes] = await Promise.all([
                    fetch('/api/offices'),
                    fetch('/api/social-links')
                ]);
                const officesData = await officesRes.json();
                const socialData = await socialRes.json();
                setOffices(officesData);
                setSocialLinks(socialData);
            } catch (error) {
                console.error('Failed to fetch footer data:', error);
            }
        };
        fetchData();
    }, []);

    const mainOffice = offices.find(o => o.is_main);

    return (
        <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 font-medium">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
                {/* Top Section: Split Get in Touch & Messaging */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-20 border-b border-white/5">
                    {/* Left: Get in Touch (Main Office Only) */}
                    <div>
                        <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-10">Get in Touch</h2>
                        {mainOffice ? (
                            <div className="space-y-8">
                                <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
                                    {mainOffice.name}
                                </h3>
                                <p className="text-xl text-white/60 max-w-md font-medium leading-relaxed">
                                    {mainOffice.address}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                                    <div>
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Call Us</p>
                                        <p className="text-lg font-bold">{mainOffice.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Email Us</p>
                                        <p className="text-lg font-bold">{mainOffice.email}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">USA Head Office</h3>
                                <p className="text-xl text-white/60 max-w-md">5410 BROOKWAY WILLOW DR, SPRING TX 77379-2840, USA</p>
                                <p className="text-lg font-bold">+1 (302) 367-9366</p>
                            </div>
                        )}
                    </div>

                    {/* Right: Messaging (Social Links) */}
                    <div id="messaging-div" className="lg:pl-20 border-l border-white/5">
                        <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-10">Messaging</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <p className="text-sm text-white/60 leading-relaxed font-medium">
                                    Connect with us across our global platforms for the latest updates and direct support.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {socialLinks.map(link => (
                                        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                                            className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-orange-500 transition-all group border border-white/5 hover:border-orange-400">
                                            <img
                                                src={getImageUrl(link.icon ? `${link.icon}.png` : 'link.png')}
                                                alt={link.platform_name}
                                                className="w-5 h-5 object-contain invert grayscale group-hover:grayscale-0 group-hover:invert-0 transition-all opacity-50 group-hover:opacity-100"
                                                onError={(e) => { (e.target as HTMLImageElement).src = getImageUrl('link.png'); }}
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/5 self-start">
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4">Quick Response</p>
                                <Link href="/contact" className="inline-flex items-center text-xl font-bold hover:text-orange-500 transition-colors group">
                                    Send a Message
                                    <span className="ml-3 group-hover:translate-x-2 transition-transform">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-20">
                    <div className="col-span-2 md:col-span-1">
                        <img src={getImageUrl('navbar_logo.png')} alt="Logo" className="h-10 w-auto object-contain brightness-0 invert mb-6" />
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Primeline IT Services LLC</p>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-6">Services</h4>
                        <ul className="space-y-3 text-sm font-bold text-white/60">
                            <li><Link href="/services#ai-automation" className="hover:text-white transition-colors">AI & Automation</Link></li>
                            <li><Link href="/services#web-app-dev" className="hover:text-white transition-colors">App Development</Link></li>
                            <li><Link href="/services#cybersecurity" className="hover:text-white transition-colors">Cybersecurity</Link></li>
                            <li><Link href="/services#data-analytics" className="hover:text-white transition-colors">Data Analytics</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-6">Navigation</h4>
                        <ul className="space-y-3 text-sm font-bold text-white/60">
                            <li><Link href="/services" className="hover:text-white transition-colors">Portfolio</Link></li>
                            <li><Link href="/industries" className="hover:text-white transition-colors">Industries</Link></li>
                            <li><Link href="/insights" className="hover:text-white transition-colors">Insights</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-6">Support</h4>
                        <ul className="space-y-3 text-sm font-bold text-white/60">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: All Addresses Side-by-Side */}
                <div className="pt-16 border-t border-white/5">
                    <h2 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] mb-12 text-center">Global Locations</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {offices.map(office => (
                            <div key={office.id} className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${office.is_main ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]' : 'bg-white/20'}`} />
                                    <h4 className="text-xs font-black uppercase tracking-widest text-white">{office.name}</h4>
                                </div>
                                <p className="text-[11px] text-white/40 leading-relaxed font-bold uppercase">
                                    {office.address}
                                </p>
                                {office.is_main && (
                                    <span className="inline-block text-[8px] font-black px-2 py-0.5 bg-orange-500/10 text-orange-500 rounded uppercase tracking-widest">Headquarters</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} Primeline IT Services LLC. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="w-12 h-px bg-white/5" />
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Asia &bull; USA &bull; Europe</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
