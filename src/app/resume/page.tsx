"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const tabs = ["Resume", "Skills", "Experience", "Education"];

const skillCategories = [
    {
        title: "Languages",
        skills: ["Go", "Rust", "Python", "C++", "Java", "JavaScript", "TypeScript", "C#", "SQL", "Shell"],
        color: "bg-[#f08030]", // Fire/Fighting color
        icon: "🗣️"
    },
    {
        title: "Frameworks/Libraries",
        skills: ["React", "Node.js", "Express.js", "Django", "gRPC", "Kafka", "Pandas", "NumPy", "ASP.NET", "PyTorch"],
        color: "bg-[#6890f0]", // Water/Flying color
        icon: "📚"
    },
    {
        title: "Developer Tools",
        skills: ["Git", "Linux", "Docker", "Kubernetes", "Jenkins", "AWS", "Azure", "PostgreSQL", "MongoDB", "Redis", "ElasticSearch"],
        color: "bg-[#78c850]", // Grass/Bug color
        icon: "🛠️"
    }
];

const experience = [
    {
        title: "Payments & Backend Intern",
        company: "Mimic",
        period: "Sept 2025 – Present",
        description: "High-Performance Crypto Payments",
    },
    {
        title: "Software Engineer Intern",
        company: "Ajna",
        period: "May 2025 – Aug 2025",
        description: "Marketplace Backend & LLMs",
    },
    {
        title: "Full Stack Intern",
        company: "Retrofit",
        period: "May 2025 – Aug 2025",
        description: "Cross-Platform & Microservices",
    },
    {
        title: "Software Engineer Intern",
        company: "ICD",
        period: "Jan 2025 – Apr 2025",
        description: "ETL Pipelines & Observability",
    },
    {
        title: "ML Engineer",
        company: "iGEM",
        period: "Sept 2024 – Dec 2024",
        description: "Bio-ML & Transformers",
    },
    {
        title: "Full Stack Intern",
        company: "ProjectHumanCity",
        period: "May 2024 – Aug 2024",
        description: "Full Stack & CI/CD",
    },
];

const education = [
    {
        degree: "Bachelor of Engineering in Software Engineering",
        school: "McMaster University",
        year: "",
        grade: "",
    },
    {
        degree: "Bachelor of Arts in Economics",
        school: "McMaster University",
        year: "",
        grade: "",
    },
];

export default function ResumePage() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="min-h-screen p-4 bg-[#f8f0d0]">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="pixel-border-red p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="pixel-button bg-[#4a90e2] text-white px-4 py-2 text-xs font-bold">
                                ← BACK
                            </Link>
                            <div>
                                <h1 className="text-3xl md:text-4xl text-white drop-shadow-md tracking-wider font-bold">
                                    TRAINER CARD
                                </h1>
                                <p className="text-white/80 text-xs tracking-widest uppercase">Profile & Stats</p>
                            </div>
                        </div>

                        <div className="hidden md:block text-white/20 text-6xl font-bold tracking-tighter">
                            Nilay Goyal
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Panel - Trainer Info */}
                    <div className="lg:col-span-1">
                        <div className="pixel-border p-4">
                            {/* Avatar */}
                            <div className="pixel-inset p-4 mb-4 flex items-center justify-center bg-[#e0f8cf] border-4 border-[#2d2d2d]">
                                <div className="w-40 h-40 relative border-2 border-[#2d2d2d] shadow-md overflow-hidden">
                                    <Image
                                        src="/profile.png"
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Trainer Info */}
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-bold text-[#2d2d2d] mb-2">TRAINER</h2>
                                <div className="bg-[#ffd93d] text-[#2d2d2d] px-4 py-1 inline-block text-xs font-bold border-2 border-[#2d2d2d] shadow-[2px_2px_0_0_#2d2d2d]">
                                    LEVEL 99
                                </div>
                            </div>

                            {/* About Section (Moved from Tab) */}
                            <div className="mb-6 bg-[#f0f0f0] p-4 rounded border-2 border-[#2d2d2d]">
                                <h3 className="text-xs font-bold text-[#2d2d2d] border-b-2 border-[#d0d0d0] pb-1 mb-2 uppercase">About Me</h3>
                                <div className="text-[10px] leading-relaxed text-[#404040] font-medium space-y-2">
                                    <p>
                                        Software Engineering student building useful real-world systems. Recently working on payments, marketplaces, and the frontier of ML & biology.
                                    </p>
                                    <div className="bg-[#e0f8cf] border border-[#9bbc0f] p-2">
                                        <p className="text-[10px] mb-1 text-[#2d2d2d] font-bold">💡 FUN FACT:</p>
                                        <p className="text-[10px]">
                                            I've secured victory in over 10 hackathons. Most recently, I traveled to Paris to compete globally at iGEM 2025.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="mt-6 pt-4 border-t-2 border-dashed border-[#2d2d2d]">
                                <p className="text-[10px] font-bold text-[#808080] mb-3 text-center uppercase tracking-wider">Badges Earned</p>
                                <div className="grid grid-cols-4 gap-2">
                                    {[
                                        { name: "Go", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
                                        { name: "Rust", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" },
                                        { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                                        { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                                        { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                                        { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
                                        { name: "Django", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
                                        { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                                    ].map((badge) => (
                                        <div
                                            key={badge.name}
                                            className="bg-white border-2 border-[#2d2d2d] aspect-square flex items-center justify-center p-2 hover:scale-110 transition-transform cursor-help shadow-[2px_2px_0_0_#2d2d2d]"
                                            title={`${badge.name} Badge Earned!`}
                                        >
                                            <img
                                                src={badge.url}
                                                alt={badge.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Tabbed Content */}
                    <div className="lg:col-span-2">
                        {/* Tab Navigation */}
                        <div className="flex gap-1 mb-0">
                            {tabs.map((tab, index) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(index)}
                                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wide border-2 border-b-0 border-[#2d2d2d] transition-all ${activeTab === index
                                        ? "bg-white text-[#2d2d2d] translate-y-1 z-10"
                                        : "bg-[#e0e0e0] text-[#808080] hover:bg-[#d0d0d0]"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="pixel-border p-8 min-h-[500px] relative z-0">

                            {/* Resume Tab (Replaces About) */}
                            {activeTab === 0 && (
                                <div className="animate-slide-in h-full flex flex-col">
                                    <h3 className="text-xl font-bold text-[#2d2d2d] border-b-4 border-[#e0e0e0] pb-2 w-full text-left mb-4">OFFICIAL RESUME</h3>

                                    <div className="flex-1 w-full aspect-[8.5/11] border-4 border-[#2d2d2d] bg-[#525252] shadow-inner">
                                        <iframe
                                            src="/resume.pdf#view=FitH"
                                            className="w-full h-full"
                                            title="Resume"
                                        />
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <a href="/resume.pdf" download="Nilay_Goyal_Resume.pdf" className="pixel-button bg-[#4a90e2] text-white px-6 py-3 text-xs font-bold uppercase hover:bg-[#3880d0] flex items-center gap-2">
                                            <span>💾</span> Download PDF
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Skills Tab */}
                            {activeTab === 1 && (
                                <div className="animate-slide-in space-y-8">
                                    <h3 className="text-xl font-bold text-[#2d2d2d] border-b-4 border-[#e0e0e0] pb-2">SKILL STATS</h3>

                                    <div className="grid gap-6">
                                        {skillCategories.map((category, index) => (
                                            <div key={category.title} className="bg-[#f8f8f8] border-2 border-[#2d2d2d] p-4 shadow-[4px_4px_0_0_#e0e0e0]">
                                                <div className="flex items-center gap-2 mb-4 border-b-2 border-dashed border-[#d0d0d0] pb-2">
                                                    <span className="text-2xl">{category.icon}</span>
                                                    <h4 className="text-sm font-bold text-[#2d2d2d] uppercase tracking-wider">{category.title}</h4>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {category.skills.map((skill) => (
                                                        <div
                                                            key={skill}
                                                            className={`${category.color} text-white text-xs font-bold px-3 py-1.5 border-2 border-[#2d2d2d] shadow-[2px_2px_0_0_#2d2d2d] hover:-translate-y-1 hover:shadow-[3px_3px_0_0_#2d2d2d] transition-all cursor-default`}
                                                        >
                                                            {skill}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Experience Tab */}
                            {activeTab === 2 && (
                                <div className="animate-slide-in space-y-6">
                                    <h3 className="text-xl font-bold text-[#2d2d2d] border-b-4 border-[#e0e0e0] pb-2">BATTLE HISTORY</h3>
                                    <div className="space-y-4">
                                        {experience.map((exp, index) => (
                                            <div key={index} className="bg-[#e0f8cf] border-2 border-[#9bbc0f] p-4 hover:bg-[#d0f0c0] transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="text-sm font-bold text-[#2d2d2d]">{exp.title}</h4>
                                                        <p className="text-xs text-[#2e5c8a] font-bold">{exp.company}</p>
                                                    </div>
                                                    <div className="bg-[#ffd93d] text-[#2d2d2d] px-2 py-1 text-[10px] font-bold border border-[#2d2d2d]">
                                                        {exp.period}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-[#404040] leading-relaxed">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Education Tab */}
                            {activeTab === 3 && (
                                <div className="animate-slide-in space-y-6">
                                    <h3 className="text-xl font-bold text-[#2d2d2d] border-b-4 border-[#e0e0e0] pb-2">TRAINING LOG</h3>
                                    <div className="space-y-4">
                                        {education.map((edu, index) => (
                                            <div key={index} className="flex items-start gap-4 p-4 border-2 border-[#f0f0f0] hover:border-[#4a90e2] transition-colors">
                                                <div className="bg-[#f0f0f0] p-3 text-2xl border border-[#d0d0d0]">🎓</div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-bold text-[#2d2d2d] mb-1">{edu.degree}</h4>
                                                    <p className="text-xs text-[#606060] mb-2">{edu.school}</p>
                                                    {/* Removed dates and grades as requested, but keeping structure if needed later */}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-[#2d2d2d]/40 text-[10px] font-bold mt-8">
                    Use tabs to navigate • Data verified by Professor Oak
                </div>
            </div>
        </div>
    );
}
