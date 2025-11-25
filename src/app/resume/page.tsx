"use client";

import { useState } from "react";
import Link from "next/link";

const tabs = ["About", "Skills", "Experience", "Education"];

const skills = [
    { name: "React/Next.js", level: 95, color: "bg-[#4a90e2]" },
    { name: "TypeScript", level: 90, color: "bg-[#4a90e2]" },
    { name: "Node.js", level: 85, color: "bg-[#9bbc0f]" },
    { name: "UI/UX Design", level: 80, color: "bg-[#9d7bb8]" },
    { name: "Database", level: 75, color: "bg-[#e85d75]" },
    { name: "DevOps", level: 70, color: "bg-[#ffd93d]" },
];

const experience = [
    {
        title: "Senior Developer",
        company: "Tech Corp",
        period: "2022 - Present",
        description: "Leading frontend development team",
    },
    {
        title: "Full Stack Dev",
        company: "StartupXYZ",
        period: "2020 - 2022",
        description: "Built scalable web applications",
    },
    {
        title: "Junior Developer",
        company: "Code Academy",
        period: "2018 - 2020",
        description: "Learned and grew as developer",
    },
];

const education = [
    {
        degree: "Master of CS",
        school: "Tech University",
        year: "2018",
        grade: "3.9 GPA",
    },
    {
        degree: "Bachelor of CS",
        school: "State College",
        year: "2016",
        grade: "3.8 GPA",
    },
];

export default function ResumePage() {
    const [activeTab, setActiveTab] = useState(0);
    const [hpAnimation, setHpAnimation] = useState(false);

    const handleTabChange = (index: number) => {
        setActiveTab(index);
        setHpAnimation(true);
        setTimeout(() => setHpAnimation(false), 500);
    };

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
                            IDNo. 2025
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Panel - Trainer Info */}
                    <div className="lg:col-span-1">
                        <div className="pixel-border p-4">
                            {/* Avatar */}
                            <div className="pixel-inset p-8 mb-4 flex items-center justify-center bg-[#e0f8cf]">
                                <div className="text-7xl drop-shadow-md transform hover:scale-110 transition-transform cursor-pointer">
                                    😊
                                </div>
                            </div>

                            {/* Trainer Info */}
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-bold text-[#2d2d2d] mb-2">TRAINER</h2>
                                <div className="bg-[#ffd93d] text-[#2d2d2d] px-4 py-1 inline-block text-xs font-bold border-2 border-[#2d2d2d] shadow-[2px_2px_0_0_#2d2d2d]">
                                    LEVEL 99
                                </div>
                            </div>

                            {/* HP Bar */}
                            <div className="mb-6 bg-[#f0f0f0] p-3 rounded border-2 border-[#2d2d2d]">
                                <div className="flex justify-between text-[10px] font-bold text-[#606060] mb-1">
                                    <span>HP</span>
                                    <span>999/999</span>
                                </div>
                                <div className="h-4 bg-[#2d2d2d] p-0.5">
                                    <div
                                        className={`h-full bg-gradient-to-r from-[#70c0a0] to-[#50a080] transition-all duration-500 ${hpAnimation ? "animate-shake" : ""
                                            }`}
                                        style={{ width: "100%" }}
                                    >
                                        <div className="w-full h-1/2 bg-white/30" />
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="space-y-2 text-xs font-bold text-[#404040]">
                                <div className="flex justify-between bg-[#e0f8cf] p-2 border-2 border-[#9bbc0f]">
                                    <span>ATTACK</span>
                                    <span className="text-[#285068]">★★★★★</span>
                                </div>
                                <div className="flex justify-between bg-[#e0f8cf] p-2 border-2 border-[#9bbc0f]">
                                    <span>DEFENSE</span>
                                    <span className="text-[#285068]">★★★★☆</span>
                                </div>
                                <div className="flex justify-between bg-[#e0f8cf] p-2 border-2 border-[#9bbc0f]">
                                    <span>SPEED</span>
                                    <span className="text-[#285068]">★★★★★</span>
                                </div>
                                <div className="flex justify-between bg-[#e0f8cf] p-2 border-2 border-[#9bbc0f]">
                                    <span>SPECIAL</span>
                                    <span className="text-[#285068]">★★★★★</span>
                                </div>
                            </div>

                            {/* Badges */}
                            <div className="mt-6 pt-4 border-t-2 border-dashed border-[#2d2d2d]">
                                <p className="text-[10px] font-bold text-[#808080] mb-3 text-center uppercase tracking-wider">Badges Earned</p>
                                <div className="grid grid-cols-4 gap-2">
                                    {["🏆", "⭐", "💎", "🎯", "🔥", "⚡", "💻", "🎨"].map((badge, i) => (
                                        <div
                                            key={i}
                                            className="bg-[#ffd93d] border-2 border-[#2d2d2d] aspect-square flex items-center justify-center text-xl hover:scale-110 transition-transform cursor-help shadow-[2px_2px_0_0_#2d2d2d]"
                                            title="Badge Earned!"
                                        >
                                            {badge}
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
                                    onClick={() => handleTabChange(index)}
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

                            {/* About Tab */}
                            {activeTab === 0 && (
                                <div className="animate-slide-in space-y-6">
                                    <h3 className="text-xl font-bold text-[#2d2d2d] border-b-4 border-[#e0e0e0] pb-2">ABOUT ME</h3>
                                    <div className="text-sm leading-relaxed text-[#404040] space-y-4 font-medium">
                                        <p>
                                            A passionate developer with a love for creating pixel-perfect experiences.
                                            Started my journey in 2016 and haven't looked back since!
                                        </p>
                                        <div className="bg-[#e0f8cf] border-2 border-[#9bbc0f] p-4">
                                            <p className="text-xs mb-2 text-[#2d2d2d] font-bold">💡 FUN FACT:</p>
                                            <p className="text-xs">
                                                I've completed over 50+ projects and helped train 10+ junior developers.
                                                My secret? Lots of coffee and pixel art breaks!
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-8">
                                        <div className="bg-[#ffd93d] border-2 border-[#2d2d2d] p-4 text-center shadow-[4px_4px_0_0_#2d2d2d]">
                                            <div className="text-3xl font-bold text-[#2d2d2d] mb-1">50+</div>
                                            <div className="text-[10px] font-bold text-[#605010] uppercase">Projects</div>
                                        </div>
                                        <div className="bg-[#ffd93d] border-2 border-[#2d2d2d] p-4 text-center shadow-[4px_4px_0_0_#2d2d2d]">
                                            <div className="text-3xl font-bold text-[#2d2d2d] mb-1">6+</div>
                                            <div className="text-[10px] font-bold text-[#605010] uppercase">Years Exp</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Skills Tab */}
                            {activeTab === 1 && (
                                <div className="animate-slide-in space-y-6">
                                    <h3 className="text-xl font-bold text-[#2d2d2d] border-b-4 border-[#e0e0e0] pb-2">SKILL STATS</h3>
                                    <div className="space-y-4">
                                        {skills.map((skill, index) => (
                                            <div key={skill.name}>
                                                <div className="flex justify-between text-xs font-bold text-[#404040] mb-1">
                                                    <span>{skill.name}</span>
                                                    <span>{skill.level}/100</span>
                                                </div>
                                                <div className="h-5 bg-[#f0f0f0] border-2 border-[#2d2d2d] overflow-hidden">
                                                    <div
                                                        className={`h-full ${skill.color} transition-all duration-1000 ease-out flex items-center justify-end pr-2 relative`}
                                                        style={{
                                                            width: `${skill.level}%`,
                                                            animationDelay: `${index * 0.1}s`
                                                        }}
                                                    >
                                                        <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20" />
                                                    </div>
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
                                                    <div className="flex gap-2">
                                                        <span className="bg-[#ffd93d] px-2 py-1 text-[10px] font-bold border border-[#2d2d2d]">
                                                            {edu.year}
                                                        </span>
                                                        <span className="bg-[#9bbc0f] text-white px-2 py-1 text-[10px] font-bold border border-[#2d2d2d]">
                                                            {edu.grade}
                                                        </span>
                                                    </div>
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
