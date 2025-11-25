"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const projects = [
    {
        id: 1,
        name: "R.E.A.C.T.",
        type: "Electric",
        description: "Smartphone-based analysis of colorimetric paper sensors.",
        details: [
            "Built a cross-platform React Native/Expo app with an image-processing pipeline (focus checks, Canny edge detection, ROI segmentation, RGB extraction) for paper-sensor analysis.",
            "Implemented reference-patch calibration to correct lighting/device variability and compute biomarker levels for NGAL, creatinine, and CXCL9.",
            "Designed an accessible UI with streamlined test/history flows, backed by local storage + Firebase sync for persistent results."
        ],
        tech: ["React Native", "Expo", "Firebase", "OpenCV"],
        image: "/react_project.png",
        color: "bg-[#ffd93d]",
        stats: { hp: 80, atk: 95, def: 70 },
        links: {
            wiki: "https://2025.igem.wiki/mcmaster-canada/project-description",
            github: "https://github.com/nilay-goyal/REACT"
        }
    },
    {
        id: 2,
        name: "PRISM",
        type: "Psychic",
        description: "Advanced data visualization and analytics suite",
        tech: ["D3.js", "WebGL", "Next.js"],
        image: "🔮",
        color: "bg-[#9d7bb8]",
        stats: { hp: 75, atk: 90, def: 85 }
    },
    {
        id: 3,
        name: "Babble Bear",
        type: "Normal",
        description: "Language learning assistant with AI chat",
        tech: ["OpenAI API", "React Native", "Node.js"],
        image: "🐻",
        color: "bg-[#c9de6d]",
        stats: { hp: 90, atk: 60, def: 80 }
    },
    {
        id: 4,
        name: "Sugar",
        type: "Fairy",
        description: "Modern UI component library for web apps",
        tech: ["TypeScript", "CSS Modules", "Storybook"],
        image: "✨",
        color: "bg-[#e85d75]",
        stats: { hp: 65, atk: 85, def: 60 }
    },
    {
        id: 5,
        name: "Karma Farm",
        type: "Grass",
        description: "Community-driven sustainable farming platform",
        tech: ["Vue.js", "Firebase", "IoT"],
        image: "🌱",
        color: "bg-[#9bbc0f]",
        stats: { hp: 85, atk: 70, def: 75 }
    },
    {
        id: 6,
        name: "getREALS",
        type: "Water",
        description: "Real estate analytics and listing service",
        tech: ["PostgreSQL", "Next.js", "Leaflet"],
        image: "🏠",
        color: "bg-[#4a90e2]",
        stats: { hp: 70, atk: 80, def: 70 }
    },
    {
        id: 7,
        name: "Ctrl+F",
        type: "Steel",
        description: "Intelligent document search engine",
        tech: ["Elasticsearch", "Python", "React"],
        image: "🔍",
        color: "bg-[#b8b8d0]",
        stats: { hp: 60, atk: 90, def: 65 }
    },
    {
        id: 8,
        name: "Omni3D",
        type: "Dragon",
        description: "Web-based 3D modeling and rendering engine",
        tech: ["Three.js", "WebGL", "WASM"],
        image: "🧊",
        color: "bg-[#7038f8]",
        stats: { hp: 80, atk: 95, def: 80 }
    },
    {
        id: 9,
        name: "HERMES",
        type: "Flying",
        description: "High-speed distributed messaging system",
        tech: ["Go", "Kafka", "gRPC"],
        image: "🕊️",
        color: "bg-[#a890f0]",
        stats: { hp: 75, atk: 100, def: 60 }
    },
];

const filterOptions = ["All", "Electric", "Psychic", "Normal", "Fairy", "Grass", "Water", "Steel", "Dragon"];

export default function ProjectsPage() {
    const [filter, setFilter] = useState("All");
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

    const filteredProjects = filter === "All"
        ? projects
        : projects.filter((p) => p.type === filter);

    return (
        <div className="min-h-screen p-4 bg-[#f8f0d0]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="pixel-border-red p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="pixel-button bg-[#4a90e2] text-white px-4 py-2 text-sm font-bold">
                                ← BACK
                            </Link>
                            <div>
                                <h1 className="text-2xl md:text-4xl mb-2 text-white drop-shadow-md font-bold">Projédex</h1>
                                <p className="text-xs md:text-sm text-white/80 font-bold">PROJECT COLLECTION</p>
                            </div>
                        </div>
                        <div className="text-right text-sm font-bold text-white">
                            <p>SEEN: {filteredProjects.length}</p>
                            <p className="text-xs opacity-70">OWN: {projects.length}</p>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs (Visual Only) */}
                <div className="pixel-border bg-white p-4 mb-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {filterOptions.map((option) => (
                            <div
                                key={option}
                                className={`pixel-button px-4 py-2 text-xs md:text-sm font-bold cursor-default ${option === "All"
                                    ? "bg-[#4a90e2] text-white"
                                    : "bg-[#c9de6d] text-[#2d2d2d] opacity-80"
                                    }`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="pixel-border bg-white p-4 hover:scale-105 transition-transform cursor-pointer animate-slide-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* Project Header */}
                            <div className="flex items-start gap-3 mb-3">
                                <div className="text-sm font-bold text-[#2d2d2d]/50">
                                    #{project.id.toString().padStart(3, "0")}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm md:text-base mb-1 leading-tight font-bold text-[#2d2d2d]">{project.name}</h3>
                                    <div className={`inline-block ${project.color} text-white px-2 py-1 text-[10px] font-bold border border-[#2d2d2d]`}>
                                        {project.type}
                                    </div>
                                </div>
                            </div>

                            {/* Project Image */}
                            <div className="pixel-inset bg-[#f0f8ff] mb-3 p-8 flex items-center justify-center border-2 border-[#d0d0d0] h-48 relative overflow-hidden">
                                {project.image.startsWith("/") ? (
                                    <Image
                                        src={project.image}
                                        alt={project.name}
                                        fill
                                        className="object-contain p-4"
                                    />
                                ) : (
                                    <div className="text-6xl filter drop-shadow-md transform hover:scale-110 transition-transform">{project.image}</div>
                                )}
                            </div>

                            {/* Tech Stack Preview */}
                            <div className="flex flex-wrap gap-1">
                                {project.tech.map((tech) => (
                                    <span key={tech} className="text-[10px] bg-[#f0f0f0] px-1 border border-[#d0d0d0] text-[#606060]">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="pixel-border-thin bg-white p-4 text-center text-xs font-bold text-[#2d2d2d]/60">
                    <p className="mb-2">Click on a project to view Data Entry</p>
                </div>
            </div>

            {/* Modal */}
            {selectedProject && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedProject(null)}>
                    <div className="pixel-border bg-[#f8f0d0] w-full max-w-5xl relative shadow-2xl" onClick={e => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="bg-[#e85d75] p-4 border-b-4 border-[#2d2d2d] flex justify-between items-center">
                            <h2 className="text-xl md:text-2xl font-bold text-white tracking-wider">{selectedProject.name}</h2>
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="text-white hover:text-[#ffd93d] font-bold text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left: Image & Stats */}
                            <div>
                                <div className="pixel-inset bg-white p-8 flex items-center justify-center mb-4 border-4 border-[#2d2d2d] h-64 relative">
                                    {selectedProject.image.startsWith("/") ? (
                                        <Image
                                            src={selectedProject.image}
                                            alt={selectedProject.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    ) : (
                                        <div className="text-8xl animate-bounce-selector">{selectedProject.image}</div>
                                    )}
                                </div>
                                <div className="space-y-2 text-xs font-bold">
                                    <div className="flex items-center gap-2">
                                        <span className="w-12">HP</span>
                                        <div className="flex-1 bg-[#2d2d2d] h-3 p-0.5">
                                            <div className="bg-[#ff3030] h-full" style={{ width: `${selectedProject.stats.hp}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-12">ATK</span>
                                        <div className="flex-1 bg-[#2d2d2d] h-3 p-0.5">
                                            <div className="bg-[#f8b030] h-full" style={{ width: `${selectedProject.stats.atk}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-12">DEF</span>
                                        <div className="flex-1 bg-[#2d2d2d] h-3 p-0.5">
                                            <div className="bg-[#4a90e2] h-full" style={{ width: `${selectedProject.stats.def}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Info */}
                            <div className="space-y-4 flex flex-col h-full">
                                <div className="bg-white border-2 border-[#2d2d2d] p-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                                    <p className="text-xs font-bold text-[#e85d75] mb-2">TYPE / {selectedProject.type}</p>
                                    <p className="text-sm font-medium text-[#2d2d2d] leading-relaxed mb-4">
                                        {selectedProject.description}
                                    </p>

                                    {/* Detailed Bullet Points */}
                                    {(selectedProject as any).details && (
                                        <ul className="list-disc pl-4 space-y-2 text-xs text-[#404040]">
                                            {(selectedProject as any).details.map((detail: string, i: number) => (
                                                <li key={i}>{detail}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-xs font-bold text-[#2d2d2d] mb-2 uppercase">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.tech.map(tech => (
                                            <span key={tech} className="bg-[#ffd93d] border-2 border-[#2d2d2d] px-3 py-1 text-xs font-bold shadow-[2px_2px_0_0_#2d2d2d]">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 mt-auto grid grid-cols-2 gap-4">
                                    {(selectedProject as any).links?.wiki && (
                                        <a
                                            href={(selectedProject as any).links.wiki}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="pixel-button bg-[#9bbc0f] text-[#2d2d2d] py-3 text-sm font-bold uppercase hover:bg-[#8bac0f] text-center"
                                        >
                                            View Wiki
                                        </a>
                                    )}
                                    {(selectedProject as any).links?.github ? (
                                        <a
                                            href={(selectedProject as any).links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="pixel-button bg-[#4a90e2] text-white py-3 text-sm font-bold uppercase hover:bg-[#3880d0] text-center"
                                        >
                                            GitHub
                                        </a>
                                    ) : (
                                        <button className="pixel-button bg-[#e0e0e0] text-[#808080] py-3 text-sm font-bold uppercase cursor-not-allowed">
                                            No Source
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

