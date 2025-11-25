"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setFormData({ name: "", email: "", message: "" });
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen p-4 bg-[#f8f0d0]">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="pixel-border-blue p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="pixel-button bg-[#e85d75] text-white px-4 py-2 text-xs font-bold">
                                ← BACK
                            </Link>
                            <div>
                                <h1 className="text-3xl md:text-4xl text-white drop-shadow-md tracking-wider font-bold">
                                    MAIL SYSTEM
                                </h1>
                                <p className="text-white/80 text-xs tracking-widest uppercase">Pokémon Center PC</p>
                            </div>
                        </div>

                        <div className="hidden md:block text-white/50 text-4xl">
                            💻
                        </div>
                    </div>
                </div>

                {/* PC Screen */}
                <div className="pixel-border p-8 relative bg-[#9bbc0f]">
                    {/* Screen Glare */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                    <div className="pixel-inset p-6 bg-[#e0f8cf] relative z-10">
                        {/* PC Header */}
                        <div className="pixel-border bg-white p-2 mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff3030] animate-pulse" />
                                <span className="text-xs font-bold text-[#2d2d2d]">SYSTEM ONLINE</span>
                            </div>
                            <span className="text-xs font-bold text-[#2d2d2d]">ID: 001</span>
                        </div>

                        {/* Form Container */}
                        <div className="pixel-border bg-white p-6 mb-6">
                            <h2 className="text-lg font-bold text-[#2d2d2d] mb-4 border-b-2 border-[#e0e0e0] pb-2 uppercase">
                                Compose Message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#606060] mb-1 uppercase">Trainer Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[#f8f8f8] border-2 border-[#d0d0d0] p-3 text-sm font-medium text-[#2d2d2d] focus:border-[#4a90e2] focus:bg-white outline-none transition-colors"
                                        placeholder="Enter your name..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#606060] mb-1 uppercase">Email Address:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-[#f8f8f8] border-2 border-[#d0d0d0] p-3 text-sm font-medium text-[#2d2d2d] focus:border-[#4a90e2] focus:bg-white outline-none transition-colors"
                                        placeholder="trainer@pokemon.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#606060] mb-1 uppercase">Message Content:</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full bg-[#f8f8f8] border-2 border-[#d0d0d0] p-3 text-sm font-medium text-[#2d2d2d] focus:border-[#4a90e2] focus:bg-white outline-none transition-colors resize-none"
                                        placeholder="Write your message here..."
                                    />
                                    <div className="text-right text-[10px] text-[#808080] mt-1">
                                        {formData.message.length}/500 characters
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full pixel-button text-sm font-bold text-white uppercase tracking-wider ${isSubmitting
                                        ? "bg-[#808080] cursor-not-allowed"
                                        : "bg-[#4a90e2] hover:bg-[#3880d0]"
                                        }`}
                                >
                                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                                </button>
                            </form>
                        </div>

                        {/* Quick Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { label: "EMAIL", value: "nilay800@gmail.com", href: "mailto:nilay800@gmail.com", icon: "📧", color: "bg-[#e0f8cf] border-[#c0e0b0]" },
                                { label: "LINKEDIN", value: "nilay-goyal", href: "https://www.linkedin.com/in/nilay-goyal/", icon: "💼", color: "bg-[#d0e8f8] border-[#b0d0e0]" },
                                { label: "GITHUB", value: "nilay-goyal", href: "https://github.com/nilay-goyal", icon: "💻", color: "bg-[#f0d0e0] border-[#e0b0c0]" },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target={item.label === "EMAIL" ? "_self" : "_blank"}
                                    rel="noopener noreferrer"
                                    className={`${item.color} border-2 p-3 text-center hover:brightness-95 cursor-pointer transition-all border-[#2d2d2d] shadow-[2px_2px_0_0_#2d2d2d] block`}
                                >
                                    <div className="text-2xl mb-1">{item.icon}</div>
                                    <div className="text-[10px] font-bold text-[#606060]">{item.label}</div>
                                    <div className="text-xs font-bold text-[#2d2d2d] truncate">{item.value}</div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-[#2d2d2d]/40 text-[10px] font-bold mt-8">
                    Messages are transmitted via PC Storage System
                </div>

                {/* Success Dialog */}
                {showSuccess && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                        <div className="pixel-border bg-white p-1 max-w-sm w-full animate-slide-in shadow-2xl">
                            <div className="border-2 border-[#e0e0e0] p-6 text-center">
                                <h3 className="text-xl font-bold text-[#2d2d2d] mb-6">Message sent</h3>
                                <button
                                    onClick={() => setShowSuccess(false)}
                                    className="pixel-button bg-[#4a90e2] text-white px-6 py-2 text-xs font-bold uppercase hover:bg-[#3880d0] w-full"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
