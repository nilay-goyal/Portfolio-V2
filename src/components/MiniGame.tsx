"use client";

import { useState, useEffect, useCallback, useRef } from "react";

type Point = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 15;
const SPEED = 100;

export default function MiniGame({ onExit }: { onExit: () => void }) {
    const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Point>({ x: 15, y: 5 });
    const [direction, setDirection] = useState<Point>({ x: 0, y: -1 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

    // Load high score
    useEffect(() => {
        const saved = localStorage.getItem("gba-snake-highscore");
        if (saved) setHighScore(parseInt(saved));
    }, []);

    // Save high score
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("gba-snake-highscore", score.toString());
        }
    }, [score, highScore]);

    const generateFood = useCallback(() => {
        return {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
    }, []);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood(generateFood());
        setDirection({ x: 0, y: -1 });
        setGameOver(false);
        setScore(0);
        setIsPaused(false);
    };

    const moveSnake = useCallback(() => {
        if (gameOver || isPaused) return;

        setSnake((prevSnake) => {
            const newHead = {
                x: prevSnake[0].x + direction.x,
                y: prevSnake[0].y + direction.y,
            };

            // Check collisions
            if (
                newHead.x < 0 ||
                newHead.x >= GRID_SIZE ||
                newHead.y < 0 ||
                newHead.y >= GRID_SIZE ||
                prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
            ) {
                setGameOver(true);
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake];

            // Check food
            if (newHead.x === food.x && newHead.y === food.y) {
                setScore((s) => s + 10);
                setFood(generateFood());
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, gameOver, isPaused, generateFood]);

    useEffect(() => {
        gameLoopRef.current = setInterval(moveSnake, SPEED);
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [moveSnake]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onExit();
            }

            if (gameOver) {
                if (e.key === "Enter") resetGame();
                return;
            }

            switch (e.key) {
                case "ArrowUp":
                    if (direction.y !== 1) setDirection({ x: 0, y: -1 });
                    break;
                case "ArrowDown":
                    if (direction.y !== -1) setDirection({ x: 0, y: 1 });
                    break;
                case "ArrowLeft":
                    if (direction.x !== 1) setDirection({ x: -1, y: 0 });
                    break;
                case "ArrowRight":
                    if (direction.x !== -1) setDirection({ x: 1, y: 0 });
                    break;
                case "p":
                    setIsPaused((prev) => !prev);
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [direction, gameOver, onExit]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#9bbc0f] p-2 border-4 border-[#2d2d2d]">
            <div className="flex justify-between w-full mb-2 text-[10px] font-bold text-[#0f380f]">
                <span>SCORE: {score}</span>
                <span>HI: {highScore}</span>
            </div>

            <div
                className="relative bg-[#8bac0f] border-2 border-[#0f380f]"
                style={{
                    width: GRID_SIZE * CELL_SIZE,
                    height: GRID_SIZE * CELL_SIZE
                }}
            >
                {snake.map((segment, i) => (
                    <div
                        key={`${segment.x}-${segment.y}`}
                        className="absolute bg-[#0f380f]"
                        style={{
                            left: segment.x * CELL_SIZE,
                            top: segment.y * CELL_SIZE,
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                            borderRadius: i === 0 ? '2px' : '0'
                        }}
                    />
                ))}
                <div
                    className="absolute bg-[#0f380f] rounded-full animate-pulse"
                    style={{
                        left: food.x * CELL_SIZE,
                        top: food.y * CELL_SIZE,
                        width: CELL_SIZE,
                        height: CELL_SIZE,
                    }}
                />

                {gameOver && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0f380f]/80 text-[#9bbc0f]">
                        <p className="text-sm font-bold mb-2">GAME OVER</p>
                        <p className="text-[10px] animate-blink">PRESS ENTER</p>
                    </div>
                )}
            </div>

            <div className="mt-2 text-[10px] text-[#0f380f] text-center">
                ARROWS to Move • ESC to Quit
            </div>
        </div>
    );
}
