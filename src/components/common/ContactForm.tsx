'use client';

import React, { useState } from 'react';

const ContactForm = () => {
    const [status, setStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: null, message: '' });

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok && result.success) {
                setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus({ type: 'error', message: result.error || 'Something went wrong. Please try again.' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Failed to connect. Please check your internet and try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-10 sm:p-14 rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full">
            <h3 className="text-xl sm:text-3xl font-semibold text-[#0A2540] mb-6">
                Send Us a Message
            </h3>

            {status.type && (
                <div className={`mb-6 p-4 rounded-xl text-sm font-semibold ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                    <input type="text" name="name" placeholder="Full Name"
                        className="w-full p-4 text-base md:text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                </div>
                <div>
                    <input type="email" name="email" placeholder="Email Address"
                        className="w-full p-4 text-base md:text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                </div>
                <div>
                    <input type="text" name="subject" placeholder="Subject"
                        className="w-full p-4 text-base md:text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                    <textarea name="message" rows={4} placeholder="Your Message"
                        className="w-full p-4 text-base md:text-lg rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" required></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-navy-900 text-white px-6 py-4 text-base md:text-lg rounded-xl font-semibold transition transform hover:scale-[1.02] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-500'
                        }`}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
