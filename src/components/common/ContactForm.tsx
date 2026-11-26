"use client";

import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const ContactForm = () => {
    const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
        type: null,
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: null, message: "" });

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();

            if (res.ok && result.success) {
                setStatus({ type: "success", message: "Message sent! We'll get back to you within 24 hours." });
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus({ type: "error", message: result.error ?? "Something went wrong. Please try again." });
            }
        } catch {
            setStatus({ type: "error", message: "Connection failed. Check your internet and try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-4xl border border-slate-100 shadow-card p-10 sm:p-12 h-full flex flex-col">
            <div className="mb-8">
                <h3 className="text-2xl font-900 uppercase tracking-tight text-navy-900 mb-2">
                    Send a <span className="gradient-text-warm">Message</span>
                </h3>
                <p className="text-sm text-slate-400 font-400">We reply to every message within 24 hours.</p>
            </div>

            {/* Status banner */}
            {status.type && (
                <div className={`flex items-start gap-3 mb-6 p-4 rounded-2xl text-sm font-600
                    ${status.type === "success"
                        ? "bg-emerald-50 border border-emerald-100 text-emerald-700"
                        : "bg-red-50 border border-red-100 text-red-700"
                    }`}
                >
                    {status.type === "success"
                        ? <CheckCircle size={18} className="shrink-0 mt-0.5" />
                        : <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    }
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-800 uppercase tracking-[0.15em] text-slate-400 block px-1">Full Name</label>
                        <input
                            type="text" name="name" placeholder="Ali Khan"
                            className="input-base"
                            required
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-800 uppercase tracking-[0.15em] text-slate-400 block px-1">Email Address</label>
                        <input
                            type="email" name="email" placeholder="ali@company.com"
                            className="input-base"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-800 uppercase tracking-[0.15em] text-slate-400 block px-1">Subject</label>
                    <input
                        type="text" name="subject" placeholder="Project inquiry / Partnership / General"
                        className="input-base"
                    />
                </div>

                <div className="space-y-1.5 flex-1 flex flex-col">
                    <label className="text-[10px] font-800 uppercase tracking-[0.15em] text-slate-400 block px-1">Your Message</label>
                    <textarea
                        name="message" rows={5}
                        placeholder="Tell us about your project, challenge, or idea..."
                        className="input-base resize-none flex-1 min-h-[120px]"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-primary w-full rounded-2xl py-4 text-sm justify-center mt-auto
                        ${isSubmitting ? "opacity-60 cursor-not-allowed hover:scale-100" : ""}`}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending…
                        </>
                    ) : (
                        <>
                            Send Message
                            <Send size={15} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
