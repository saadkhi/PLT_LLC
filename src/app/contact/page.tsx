import prisma from '@/lib/prisma';
import ContactForm from '@/components/common/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default async function ContactPage() {
    const offices = (await (prisma as any).office.findMany({
        orderBy: { is_main: 'desc' }
    })) as any[];

    const mainOffice = offices.find(o => o.is_main);

    return (
        <div className="bg-white min-h-screen">
            {/* Standardized Hero Title */}
            <div className="pt-24 pb-12 px-6 sm:px-12 md:px-20 lg:px-32 text-center">
                <h1 className="text-fluid-h1 font-black uppercase tracking-tighter text-black">
                    Contact <span className="text-orange-500">Us</span>
                </h1>
                <p className="mt-4 text-[10px] sm:text-xs uppercase font-bold tracking-[0.3em] text-gray-400">
                    Let&apos;s discuss your next big project
                </p>
            </div>

            <section className="py-12 bg-gray-50/50 min-h-[60vh]">
                <div className="max-w-screen-xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Contact Details (Left) */}
                    <div className="bg-white p-10 sm:p-14 rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full">
                        <div className="mb-12">
                            <h3 className="text-4xl font-black uppercase tracking-tight text-black mb-4">Get in <span className="text-orange-500">Touch</span></h3>
                            <p className="text-gray-500 font-medium">Have an idea? Let&apos;s talk about how we can help you grow.</p>
                        </div>

                        {mainOffice ? (
                            <div className="space-y-10">
                                <div className="space-y-8">
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                                            <MapPin size={24} className="text-orange-500" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 block mb-1">Address</label>
                                            <p className="text-black font-bold text-lg leading-tight">{mainOffice.address}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                                            <Phone size={24} className="text-orange-500" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 block mb-1">Phone</label>
                                            <p className="text-black font-bold text-lg leading-tight">{mainOffice.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                                            <Mail size={24} className="text-orange-500" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 block mb-1">Email</label>
                                            <a href={`mailto:${mainOffice.email}`} className="text-black font-bold text-lg leading-tight hover:text-orange-500 transition-colors uppercase decoration-orange-500/30 decoration-2">{mainOffice.email}</a>
                                        </div>
                                    </div>

                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                                            <Clock size={24} className="text-orange-500" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 block mb-1">Office Hours</label>
                                            <p className="text-black font-bold text-lg">{mainOffice.office_hours}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Headquarters</p>
                                <div className="space-y-4">
                                    <p className="text-black font-bold text-xl leading-tight">USA Head Office</p>
                                    <p className="text-gray-600 font-medium">5410 BROOKWAY WILLOW DR, SPRING TX 77379-2840, USA</p>
                                    <p className="text-orange-500 font-black">+1 (302) 367-9366</p>
                                </div>
                            </div>
                        )}

                        <div className="mt-auto pt-12 border-t border-gray-50 flex items-center gap-4">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Online & Ready to Help</span>
                        </div>
                    </div>

                    {/* Contact Form (Right) */}
                    <div className="h-full">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </div>
    );
}
