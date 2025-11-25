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
      <div className="w-full max-w-3xl">

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
              <div className="space-y-4">
                {/* Profile Header */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-20 h-20 bg-[#f8f0d0] border-2 border-[#2d2d2d] flex items-center justify-center overflow-hidden shadow-sm relative">
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
                      LVL 25
                    </div>
                  </div>
                </div>

                {/* Bio Dialog Box */}
                <div className="pixel-border bg-white p-4 text-xs md:text-sm font-medium text-[#2d2d2d] leading-relaxed relative">
                  <div className="absolute -top-2 left-4 bg-white px-1 text-[10px] text-[#4a90e2] font-bold">
                    BIO
                  </div>
                  <p className="mb-2">
                    Hello! I'm a software engineer passionate about ML, game design, & being intentional with my work.
                  </p>
                  <p className="mb-2">
                    Interested in ML research, LLMs, alignment, and code capabilities.
                  </p>
                  <p>
                    I love meeting new people! Keep in touch with me 🌱
                  </p>
                </div>
              </div>

              {/* Right Column: Menu OR Game */}
              <div className="flex flex-col justify-center min-h-[300px]">
                {isGameActive ? (
                  <MiniGame onExit={() => setIsGameActive(false)} />
                ) : (
                  <>
                    <div className="pixel-border bg-white p-2">
                      <div className="bg-[#2d2d2d] text-white text-[10px] py-1 px-2 mb-2 text-center font-bold tracking-wider">
                        MAIN MENU
                      </div>
                      <div className="space-y-1">
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
                    <div className="mt-4 text-center text-xs font-bold text-[#2d2d2d]/70">
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

