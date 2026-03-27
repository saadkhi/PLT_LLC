import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { getImageUrl } from '@/lib/utils';

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
        <footer className="bg-[#0a0a0a] text-white pt-12 pb-8 font-medium">
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
                            <li><Link href="/services" className="hover:text-white transition-colors">Portfolio</Link></li>
                            <li><Link href="/industries" className="hover:text-white transition-colors">Industries</Link></li>
                            <li><Link href="/insights" className="hover:text-white transition-colors">Insights</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-4">Support</h4>
                        <ul className="space-y-2 text-xs font-bold text-white/50">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: All Addresses Side-by-Side */}
                <div className="pt-10 border-t border-white/5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {offices.map(office => (
                            <div key={office.id} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-1 h-1 rounded-full ${office.is_main ? 'bg-orange-500' : 'bg-white/10'}`} />
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/80">{office.name}</h4>
                                </div>
                                <p className="text-[10px] text-white/40 leading-relaxed font-bold uppercase">
                                    {office.address}
                                </p>
                                {office.is_main && (
                                    <span className="inline-block text-[7px] font-black px-1.5 py-0.5 bg-orange-500/10 text-orange-500 rounded uppercase tracking-widest">HQ</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-white/5">
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} Primeline IT Services LLC.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
