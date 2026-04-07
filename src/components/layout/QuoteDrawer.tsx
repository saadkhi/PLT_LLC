'use client';

import React, { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';

const QuoteDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('open-quote-drawer', handleOpen);
        return () => window.removeEventListener('open-quote-drawer', handleOpen);
    }, []);

    const closeDrawer = () => setIsOpen(false);

    // Prevent scrolling when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <>
            {/* Drawer Form */}
            <div
                id="quote-drawer"
                className={`fixed top-0 right-0 h-full w-[90%] sm:w-[450px] bg-white shadow-2xl transform transition-transform duration-500 ease-out z-[70] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-8 border-b border-gray-50">
                    <div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-black leading-none">Get a <span className="text-orange-500">Quote</span></h2>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mt-2">Start your project today</p>
                    </div>
                    <button
                        onClick={closeDrawer}
                        className="p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-50"
                    >
                        <X size={28} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    <form action="/api/contact" method="POST" className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 px-1">Full Name</label>
                            <input type="text" name="name" placeholder="Ali Khan"
                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 transition-all font-medium text-black placeholder:text-gray-300" required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 px-1">Email Address</label>
                            <input type="email" name="email" placeholder="ali@example.com"
                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 transition-all font-medium text-black placeholder:text-gray-300" required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 px-1">Subject</label>
                            <input type="text" name="subject" placeholder="Project Inquiry"
                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 transition-all font-medium text-black placeholder:text-gray-300" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 px-1">Your Message</label>
                            <textarea name="message" rows={5} placeholder="Tell us about your project..."
                                className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 transition-all font-medium text-black placeholder:text-gray-300 resize-none"
                                required></textarea>
                        </div>

                        <button type="submit"
                            className="w-full bg-black text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center shadow-xl shadow-gray-200">
                            <span>Send Message</span>
                            <Send size={18} className="ml-3" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 z-[65] ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeDrawer}
            />
        </>
    );
};

export default QuoteDrawer;
