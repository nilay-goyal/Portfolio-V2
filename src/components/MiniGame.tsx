"use client";

import { useRef, useEffect } from "react";
import FlappyBird, { FlappyBirdHandle } from "./FlappyBird";
import { useWizard } from "../context/WizardContext";

interface MiniGameProps {
    onExit: () => void;
}

export default function MiniGame({ onExit }: MiniGameProps) {
    const flappyBirdRef = useRef<FlappyBirdHandle>(null);
    const { setGameMode, setOnFlap } = useWizard();

    const handleFlap = () => {
        if (flappyBirdRef.current) {
            flappyBirdRef.current.flap();
        }
    };

    const handleGameOver = (score: number) => {
        console.log("Game Over! Score:", score);
    };

    // Integrate with Wizard Context
    useEffect(() => {
        setGameMode(true);
        setOnFlap(handleFlap);

        return () => {
            setGameMode(false);
            setOnFlap(null);
        };
    }, [setGameMode, setOnFlap]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                e.preventDefault(); // Prevent scrolling
                handleFlap();
            }
            if (e.key === "Escape") {
                onExit();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onExit]);

    return (
        <div className="relative flex items-center justify-center bg-[#2d2d2d] p-4 rounded-lg shadow-2xl pixel-border">
            <div className="relative">
                <FlappyBird ref={flappyBirdRef} onGameOver={handleGameOver} />

                {/* UI Overlay */}
                <div className="absolute top-4 left-4 pointer-events-none">
                    <div className="bg-white/90 p-2 rounded pixel-border-thin text-xs font-bold text-[#2d2d2d]">
                        <p>Space or Fist to Flap</p>
                        <p>ESC to Exit</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
