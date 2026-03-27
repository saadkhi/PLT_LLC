'use client';

import React, { useState, useEffect } from 'react';

const QuoteDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const quoteBtn = document.getElementById('quote-btn');
        if (quoteBtn) {
            quoteBtn.onclick = () => setIsOpen(true);
        }
    }, []);

    const closeDrawer = () => setIsOpen(false);

    return (
        <>
            {/* Drawer Form */}
            <div
                id="quote-drawer"
                className={`fixed top-0 right-0 h-full w-96 max-w-full bg-white shadow-xl transform transition-transform duration-300 z-[60] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-black">Get a Quote</h2>
                        <button onClick={closeDrawer} className="text-gray-500 hover:text-black text-2xl">&times;</button>
                    </div>

                    <form action="/api/contact" method="POST" className="flex-1 flex flex-col space-y-4">
                        <input type="text" name="name" placeholder="Full Name"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                        <input type="email" name="email" placeholder="Email Address"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                        <input type="text" name="subject" placeholder="Subject"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        <textarea name="message" rows={4} placeholder="Message"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required></textarea>

                        <button type="submit"
                            className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            {/* Overlay when drawer is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-[55]"
                    onClick={closeDrawer}
                ></div>
            )}
        </>
    );
};

export default QuoteDrawer;
