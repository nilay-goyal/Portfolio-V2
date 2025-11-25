"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MiniGame from "../components/MiniGame";

const menuItems = [
  { label: "PROJECTS", href: "/projects", icon: "DATA" },
  { label: "RESUME", href: "/resume", icon: "CARD" },
  { label: "CONTACT", href: "/contact", icon: "MAIL" },
  { label: "MINI GAME", href: "#", icon: "GAME" },
];

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameActive) return; // Disable menu controls when game is active

      if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : menuItems.length - 1));
      } else if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev < menuItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === "Enter") {
        if (menuItems[selectedIndex].label === "MINI GAME") {
          setIsGameActive(true);
        } else {
          // Navigate to the link
          window.location.href = menuItems[selectedIndex].href;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGameActive, selectedIndex]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f8f0d0]">
      {/* Main Container */}
      <div className="w-full max-w-5xl">

        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-[#2d2d2d] mb-4 pixel-text-shadow tracking-tighter uppercase">
            NILAY GOYAL
          </h1>
          <div className="inline-block bg-[#e85d75] text-white px-4 py-1 text-xs tracking-widest border-2 border-[#2d2d2d] shadow-[4px_4px_0_0_#2d2d2d]">
            SOFTWARE ENGINEER
          </div>
        </div>

        {/* GBA Frame */}
        <div className="pixel-border-red p-4 md:p-8 relative">
          {/* Screen Area */}
          <div className="pixel-inset p-4 md:p-6 bg-[#e0f8cf]">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Profile & Bio */}
              <div className="flex flex-col gap-6 h-full">
                {/* Profile Header */}
                <div className="flex items-center gap-4 h-20">
                  {/* Avatar */}
                  <div className="w-20 h-20 bg-[#f8f0d0] border-2 border-[#2d2d2d] flex items-center justify-center overflow-hidden shadow-sm relative shrink-0">
                    <img
                      src="/profile.png"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#2d2d2d]">PLAYER 1</h2>
                    <div className="flex items-center gap-1 text-xs text-[#606060] font-bold mt-1">
                      <span>📍</span>
                      <span>Toronto, ON, Canada</span>
                    </div>
                    <div className="mt-1 bg-[#4a90e2] text-white text-[10px] px-2 py-0.5 inline-block rounded-sm">
                      LVL 99
                    </div>
                  </div>
                </div>

                {/* Bio Dialog Box */}
                <div className="pixel-border bg-white p-6 text-xs font-medium text-[#2d2d2d] leading-loose relative flex-1 flex flex-col justify-center gap-4">
                  <div className="absolute -top-2 left-4 bg-white px-1 text-[10px] text-[#4a90e2] font-bold">
                    BIO
                  </div>
                  <p>
                    Hey there! I’m a software engineer interested in ML research, LLMs, alignment, and game design.
                  </p>
                  <p>
                    I like turning messy problems into real systems, backend, full stack, and code‑focused ML.
                  </p>
                  <p>
                    I love meeting new people, so if you’re building something you care about, <a href="https://www.linkedin.com/in/nilay-goyal/" target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-2 hover:text-[#4a90e2] font-bold">reach out</a>.
                  </p>
                </div>
              </div>

              {/* Right Column: Menu OR Game */}
              <div className="flex flex-col gap-6 h-full min-h-[300px]">
                {isGameActive ? (
                  <MiniGame onExit={() => setIsGameActive(false)} />
                ) : (
                  <>
                    {/* Social Buttons (Aligned with Profile Header) */}
                    <div className="flex items-end justify-end gap-4 h-20 pb-2">
                      <a
                        href="https://www.linkedin.com/in/nilay-goyal/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2d2d2d] hover:text-[#0077b5] transition-colors transform hover:scale-110"
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a
                        href="https://github.com/nilay-goyal/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2d2d2d] hover:text-[#333] transition-colors transform hover:scale-110"
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>

                    <div className="pixel-border bg-white p-4 flex-1 flex flex-col justify-center">
                      <div className="bg-[#2d2d2d] text-white text-[10px] py-1 px-2 mb-4 text-center font-bold tracking-wider">
                        MAIN MENU
                      </div>
                      <div className="space-y-2">
                        {menuItems.map((item, index) => (
                          <div
                            key={item.label}
                            onClick={() => {
                              setSelectedIndex(index);
                              if (item.label === "MINI GAME") {
                                setIsGameActive(true);
                              }
                            }}
                          >
                            {item.label === "MINI GAME" ? (
                              <div
                                className={`flex items-center justify-between px-3 py-3 cursor-pointer transition-all border-2 ${selectedIndex === index
                                  ? "bg-[#4a90e2] text-white border-[#2d2d2d]"
                                  : "bg-white text-[#2d2d2d] border-transparent hover:bg-[#f0f0f0]"
                                  }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-xs">
                                    {item.icon}
                                  </span>
                                  <span className="text-xs md:text-sm font-bold tracking-wide">
                                    {item.label}
                                  </span>
                                </div>

                                {selectedIndex === index && (
                                  <span className="text-white text-xs animate-blink">
                                    ◄
                                  </span>
                                )}
                              </div>
                            ) : (
                              <Link href={item.href} className="block">
                                <div
                                  onMouseEnter={() => setSelectedIndex(index)}
                                  className={`flex items-center justify-between px-3 py-3 cursor-pointer transition-all border-2 ${selectedIndex === index
                                    ? "bg-[#4a90e2] text-white border-[#2d2d2d]"
                                    : "bg-white text-[#2d2d2d] border-transparent hover:bg-[#f0f0f0]"
                                    }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs">
                                      {item.icon}
                                    </span>
                                    <span className="text-xs md:text-sm font-bold tracking-wide">
                                      {item.label}
                                    </span>
                                  </div>

                                  {selectedIndex === index && (
                                    <span className="text-white text-xs animate-blink">
                                      ◄
                                    </span>
                                  )}
                                </div>
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Info Text */}
                    <div className="mt-0 text-center text-xs font-bold text-[#2d2d2d]/70 h-6 flex items-center justify-center">
                      <p className="flex items-center justify-center gap-2">
                        <span className="animate-blink">PRESS START TO SELECT</span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Decorative Power LED */}
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 flex flex-col gap-2">
            <div className="w-4 h-16 bg-[#c03028] border-2 border-[#2d2d2d] rounded-r-md shadow-md"></div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-[#2d2d2d]/40 text-[10px] font-bold">
          © 2025 NILAY GOYAL • NINTENDO INSPIRED
        </div>
      </div>
    </div>
  );
}

