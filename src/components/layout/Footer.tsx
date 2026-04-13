import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { getImageUrl } from '@/lib/utils';
import { Globe, Mail, Phone, Hexagon } from 'lucide-react';

interface Office {
    id: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    is_main: boolean;
}

interface SocialLink {
    id: number;
    platform_name: string;
    url: string;
    icon: string | null;
}

const Footer = async () => {
    // Attempting access via lowercase properties first
    const offices = (await (prisma as any).office.findMany({ orderBy: { id: 'asc' } })) as any[];
    const socialLinks = (await (prisma as any).socialLink.findMany({ orderBy: { id: 'asc' } })) as any[];

    const mainOffice = offices.find((o: any) => o.is_main);

    return (
        <footer className="bg-navy-950 text-white pt-12 pb-8 font-medium">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
                {/* Top Section: Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12">
                    <div className="col-span-2 md:col-span-1">
                        <Image
                            src={getImageUrl('navbar_logo.png')}
                            alt="Logo"
                            width={120}
                            height={32}
                            className="h-8 w-auto object-contain brightness-0 invert mb-4"
                            priority
                        />
                        <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Primeline IT Services LLC</p>
                    </div>
                    <div>
                        <h4 className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-4">Services</h4>
                        <ul className="space-y-2 text-xs font-bold text-white/50">
                            <li><Link href="/services#ai-automation" className="hover:text-white transition-colors">AI & Automation</Link></li>
                            <li><Link href="/services#web-app-dev" className="hover:text-white transition-colors">App Development</Link></li>
                            <li><Link href="/services#cybersecurity" className="hover:text-white transition-colors">Cybersecurity</Link></li>
                            <li><Link href="/services#data-analytics" className="hover:text-white transition-colors">Data Analytics</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-4">Navigation</h4>
                        <ul className="space-y-2 text-xs font-bold text-white/50">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                            <li><Link href="/insights" className="hover:text-white transition-colors">Insights</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-4">Support & Contact</h4>
                        <ul className="space-y-2 text-xs font-bold text-white/50">
                            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            {mainOffice && (
                                <li className="pt-4 space-y-3">
                                    <a href={`mailto:${mainOffice.email}`} className="flex items-center gap-2 hover:text-cyan-500 transition-colors">
                                        <Mail size={16} />
                                        <span>{mainOffice.email}</span>
                                    </a>
                                    <a href={`tel:${mainOffice.phone}`} className="flex items-center gap-2 hover:text-cyan-500 transition-colors">
                                        <Phone size={16} />
                                        <span>{mainOffice.phone}</span>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: All Addresses Side-by-Side */}
                <div className="pt-10 border-t border-white/5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {offices.map(office => (
                            <div key={office.id} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-1 h-1 rounded-full ${office.is_main ? 'bg-cyan-500' : 'bg-white/10'}`} />
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/80">{office.name}</h4>
                                </div>
                                <p className="text-[10px] text-white/40 leading-relaxed font-bold uppercase">
                                    {office.address}
                                </p>
                                {office.is_main && (
                                    <span className="inline-block text-[7px] font-black px-1.5 py-0.5 bg-cyan-500/10 text-cyan-500 rounded uppercase tracking-widest">HQ</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2 text-white/20">
                        <Hexagon size={14} className="text-cyan-500 opacity-80" strokeWidth={2.5} />
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em]">
                            &copy; {new Date().getFullYear()} Primeline IT Services LLC. All rights reserved.
                        </p>
                    </div>
                    {/* Social Links */}
                    <div className="flex gap-3">
                        {socialLinks.map((link: any) => {
                            const initial = link.platform_name ? link.platform_name.charAt(0).toUpperCase() : '';
                            return (
                                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-cyan-500 transition-colors flex items-center justify-center text-white/50 hover:text-white aspect-square font-black text-[12px]">
                                    {initial}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
