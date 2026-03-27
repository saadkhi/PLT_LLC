'use client';

import React, { useState, useEffect } from 'react';

export default function ContactPage() {
    const [offices, setOffices] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/offices')
            .then(res => res.json())
            .then(data => setOffices(data))
            .catch(err => console.error('Failed to fetch offices', err));
    }, []);

    return (
        <div className="px-2 sm:px-4 md:px-8 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 sm:mt-6 md:mt-8 text-center font-bold">Contact Us</h1>
            <section className="py-6 sm:py-8 md:py-10 bg-gray-100">

                <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">

                    {/* Contact Form */}
                    <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-md min-h-[300px]">
                        <h3 className="text-xl sm:text-3xl font-semibold text-black mb-6">
                            Send Us a Message
                        </h3>

                        <form action="/api/contact" method="POST" className="space-y-4 sm:space-y-6">
                            <div>
                                <input type="text" name="name" placeholder="Full Name"
                                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                            </div>
                            <div>
                                <input type="email" name="email" placeholder="Email Address"
                                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
                            </div>
                            <div>
                                <input type="text" name="subject" placeholder="Subject"
                                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                            </div>
                            <div>
                                <textarea name="message" rows={4} placeholder="Your Message"
                                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" required></textarea>
                            </div>

                            <button type="submit"
                                className="w-full bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-500 transition transform hover:scale-[1.02]">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Details */}
                    <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-md min-h-[300px] overflow-hidden">
                        <h3 className="text-xl sm:text-3xl font-semibold text-black mb-6">Get in Touch</h3>

                        {offices.length > 0 ? (
                            <div className="space-y-8">
                                {offices.map(office => (
                                    <div key={office.id} className="pb-8 border-b border-gray-100 last:border-0">
                                        <h4 className="font-black text-xl mb-4 tracking-tight uppercase">
                                            {office.name}
                                        </h4>
                                        <div className="space-y-3 text-sm sm:text-base font-medium text-gray-600">
                                            <p><span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-1">Address</span> {office.address}</p>
                                            <p><span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-1">Phone</span> {office.phone}</p>
                                            <p><span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-1">Email</span>
                                                <a href={`mailto:${office.email}`} className="text-orange-500 hover:underline inline-block"> {office.email}</a>
                                            </p>
                                            <p><span className="text-[10px] font-black text-gray-300 uppercase tracking-widest block mb-1">Office Hours</span> {office.office_hours}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-sm sm:text-lg"><span className="font-semibold text-black">Address:</span> 5410 BROOKWAY WILLOW DR, SPRING TX 77379-2840, USA</p>
                                <p className="text-sm sm:text-lg"><span className="font-semibold text-black">Phone:</span> +1 (302) 367-9366</p>
                                <p className="text-sm sm:text-lg"><span className="font-semibold text-black">Email:</span>
                                    <a href="mailto:hr@primeline.com" className="text-blue-600 hover:underline"> hr@primeline.com</a>
                                </p>
                                <p className="text-sm sm:text-lg"><span className="font-semibold text-black">Office Hours:</span> Mon - Fri (9:00 AM - 6:00 PM)</p>
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </div>
    );
}
