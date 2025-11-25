"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

// --- Constants ---
const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 400;
const GRAVITY = 0.8;
const FLAP_STRENGTH = -12;
const PIPE_SPEED = 4;
const PIPE_SPAWN_RATE = 80; // Frames
const PIPE_GAP = 150;

interface FlappyBirdProps {
    onGameOver: (score: number) => void;
}

export interface FlappyBirdHandle {
    flap: () => void;
}

const FlappyBird = forwardRef<FlappyBirdHandle, FlappyBirdProps>(({ onGameOver }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);
    const frameCountRef = useRef(0);
    const scoreRef = useRef(0);
    const isGameOverRef = useRef(false);

    // Game State Refs (Mutable for performance)
    const birdRef = useRef({
        y: CANVAS_HEIGHT / 2,
        velocity: 0,
        width: 30,
        height: 30,
        color: "#ffd93d"
    });

    const pipesRef = useRef<Array<{ x: number; topHeight: number; passed: boolean }>>([]);

    // Expose flap method
    useImperativeHandle(ref, () => ({
        flap: () => {
            if (isGameOverRef.current) {
                resetGame();
            } else {
                birdRef.current.velocity = FLAP_STRENGTH;
            }
        }
    }));

    const resetGame = () => {
        birdRef.current = {
            y: CANVAS_HEIGHT / 2,
            velocity: 0,
            width: 30,
            height: 30,
            color: "#ffd93d"
        };
        pipesRef.current = [];
        scoreRef.current = 0;
        isGameOverRef.current = false;
        frameCountRef.current = 0;
    };

    const update = () => {
        if (isGameOverRef.current) return;

        const bird = birdRef.current;
        const pipes = pipesRef.current;

        // Bird Physics
        bird.velocity += GRAVITY;
        bird.y += bird.velocity;

        // Pipe Spawning
        if (frameCountRef.current % PIPE_SPAWN_RATE === 0) {
            const minPipeHeight = 50;
            const maxPipeHeight = CANVAS_HEIGHT - PIPE_GAP - minPipeHeight;
            const topHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) + minPipeHeight;

            pipes.push({
                x: CANVAS_WIDTH,
                topHeight,
                passed: false
            });
        }

        // Pipe Movement & Collision
        for (let i = pipes.length - 1; i >= 0; i--) {
            const pipe = pipes[i];
            pipe.x -= PIPE_SPEED;

            // Remove off-screen pipes
            if (pipe.x + 50 < 0) {
                pipes.splice(i, 1);
                continue;
            }

            // Collision Detection
            // Bird bounds
            const birdLeft = 50; // Bird x is fixed at 50
            const birdRight = 50 + bird.width;
            const birdTop = bird.y;
            const birdBottom = bird.y + bird.height;

            // Pipe bounds
            const pipeLeft = pipe.x;
            const pipeRight = pipe.x + 50;
            const topPipeBottom = pipe.topHeight;
            const bottomPipeTop = pipe.topHeight + PIPE_GAP;

            // Check collision with top pipe OR bottom pipe
            if (
                birdRight > pipeLeft &&
                birdLeft < pipeRight &&
                (birdTop < topPipeBottom || birdBottom > bottomPipeTop)
            ) {
                gameOver();
            }

            // Score update
            if (!pipe.passed && birdLeft > pipeRight) {
                scoreRef.current += 1;
                pipe.passed = true;
            }
        }

        // Ground/Ceiling Collision
        if (bird.y + bird.height > CANVAS_HEIGHT || bird.y < 0) {
            gameOver();
        }

        frameCountRef.current++;
    };

    const gameOver = () => {
        isGameOverRef.current = true;
        onGameOver(scoreRef.current);
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear Background
        ctx.fillStyle = "#70c5ce"; // Sky blue
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw Pipes
        ctx.fillStyle = "#73bf2e"; // Pipe green
        pipesRef.current.forEach(pipe => {
            // Top Pipe
            ctx.fillRect(pipe.x, 0, 50, pipe.topHeight);
            // Bottom Pipe
            ctx.fillRect(pipe.x, pipe.topHeight + PIPE_GAP, 50, CANVAS_HEIGHT - (pipe.topHeight + PIPE_GAP));

            // Pipe Borders
            ctx.strokeStyle = "#558c22";
            ctx.lineWidth = 2;
            ctx.strokeRect(pipe.x, 0, 50, pipe.topHeight);
            ctx.strokeRect(pipe.x, pipe.topHeight + PIPE_GAP, 50, CANVAS_HEIGHT - (pipe.topHeight + PIPE_GAP));
        });

        // Draw Bird
        const bird = birdRef.current;
        ctx.fillStyle = bird.color;
        ctx.fillRect(50, bird.y, bird.width, bird.height);

        // Bird Eye
        ctx.fillStyle = "#fff";
        ctx.fillRect(50 + 20, bird.y + 4, 8, 8);
        ctx.fillStyle = "#000";
        ctx.fillRect(50 + 24, bird.y + 6, 4, 4);

        // Draw Score
        ctx.fillStyle = "#fff";
        ctx.font = "bold 40px 'Courier New', monospace";
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.strokeText(scoreRef.current.toString(), CANVAS_WIDTH / 2 - 10, 50);
        ctx.fillText(scoreRef.current.toString(), CANVAS_WIDTH / 2 - 10, 50);

        // Game Over Overlay
        if (isGameOverRef.current) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            ctx.fillStyle = "#fff";
            ctx.font = "bold 30px 'Courier New', monospace";
            ctx.fillText("GAME OVER", CANVAS_WIDTH / 2 - 80, CANVAS_HEIGHT / 2);
            ctx.font = "20px 'Courier New', monospace";
            ctx.fillText("Press Space or Gesture", CANVAS_WIDTH / 2 - 110, CANVAS_HEIGHT / 2 + 40);
            ctx.fillText("to Restart", CANVAS_WIDTH / 2 - 60, CANVAS_HEIGHT / 2 + 70);
        }
    };

    const loop = () => {
        update();
        draw();
        requestRef.current = requestAnimationFrame(loop);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(loop);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="rounded-lg shadow-2xl pixel-border bg-[#70c5ce]"
            style={{ imageRendering: "pixelated" }}
        />
    );
});

FlappyBird.displayName = "FlappyBird";

export default FlappyBird;
