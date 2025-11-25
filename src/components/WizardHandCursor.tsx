"use client";

import { useEffect, useRef, useState } from 'react';
import {
    GestureRecognizer,
    FilesetResolver,
    GestureRecognizerResult
} from '@mediapipe/tasks-vision';
import { useWizard } from '../context/WizardContext';

export default function WizardHandCursor() {
    const { isGameMode, triggerFlap } = useWizard();

    // Refs to avoid stale closures in the animation loop
    const isGameModeRef = useRef(isGameMode);
    const triggerFlapRef = useRef(triggerFlap);

    useEffect(() => {
        isGameModeRef.current = isGameMode;
    }, [isGameMode]);

    useEffect(() => {
        triggerFlapRef.current = triggerFlap;
    }, [triggerFlap]);

    const [permissionState, setPermissionState] = useState<'idle' | 'asked' | 'granted' | 'denied'>('idle');
    const videoRef = useRef<HTMLVideoElement>(null);
    const [gestureRecognizer, setGestureRecognizer] = useState<GestureRecognizer | null>(null);
    const requestRef = useRef<number | null>(null);
    const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
    const [isClicking, setIsClicking] = useState(false);
    const lastClickTimeRef = useRef(0);
    const lastFlapTimeRef = useRef(0);
    const [loadingStatus, setLoadingStatus] = useState<string>("");
    const [debugInfo, setDebugInfo] = useState<string>("");

    // Ask for permission on mount
    useEffect(() => {
        if (permissionState === 'idle') {
            setPermissionState('asked');
        }
    }, [permissionState]);

    // Initialize MediaPipe
    useEffect(() => {
        if (permissionState !== 'granted') return;

        const loadGestureRecognizer = async () => {
            try {
                setLoadingStatus("Summoning AI...");
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
                );

                const recognizer = await GestureRecognizer.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath:
                            "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
                        delegate: "GPU"
                    },
                    runningMode: "VIDEO",
                    numHands: 1
                });
                setGestureRecognizer(recognizer);
                setLoadingStatus("Ready");
            } catch (error) {
                console.error("Error loading Wizard AI:", error);
                setLoadingStatus("Spell Failed");
            }
        };

        loadGestureRecognizer();
    }, [permissionState]);

    // Camera & Tracking Loop
    useEffect(() => {
        if (permissionState !== 'granted' || !gestureRecognizer) {
            // Cleanup if inactive
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            return;
        }

        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 320, height: 240 }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    requestRef.current = requestAnimationFrame(predictWebcam);
                }
            } catch (err) {
                console.error("Error accessing wizard eye:", err);
            }
        };

        startCamera();

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        };
    }, [permissionState, gestureRecognizer]);

    const predictWebcam = async () => {
        if (!gestureRecognizer || !videoRef.current) return;

        const now = Date.now();
        const video = videoRef.current;

        if (video.currentTime > 0 && !video.paused && !video.ended) {
            try {
                const results = gestureRecognizer.recognizeForVideo(video, now);
                processResults(results);
            } catch (e) {
                // Ignore errors
            }
        }

        requestRef.current = requestAnimationFrame(predictWebcam);
    };

    const processResults = (results: GestureRecognizerResult) => {
        if (results.landmarks && results.landmarks.length > 0) {
            const landmarks = results.landmarks[0];
            const point = landmarks[8]; // Index finger tip

            // Map coordinates (0-1) to screen
            const x = (1 - point.x) * window.innerWidth;
            const y = point.y * window.innerHeight;

            setCursorPos({ x, y });

            // Check gestures
            if (results.gestures.length > 0) {
                const categoryName = results.gestures[0][0].categoryName;
                const score = results.gestures[0][0].score;
                const isFist = (categoryName === "Closed_Fist" || categoryName === "Thumb_Up") && score > 0.5;

                setDebugInfo(`${categoryName} ${(score * 100).toFixed(0)}%`);

                if (isFist) {
                    setIsClicking(true);
                    const now = Date.now();

                    if (isGameModeRef.current) {
                        // Game Mode: Trigger Flap
                        if (now - lastFlapTimeRef.current > 300) {
                            if (triggerFlapRef.current) {
                                triggerFlapRef.current();
                            }
                            lastFlapTimeRef.current = now;
                        }
                    } else {
                        // Cursor Mode: Trigger Click
                        if (now - lastClickTimeRef.current > 500) {
                            triggerClick(x, y);
                            lastClickTimeRef.current = now;
                        }
                    }
                } else {
                    setIsClicking(false);
                }
            }
        } else {
            setDebugInfo("No hand");
        }
    };

    const triggerClick = (x: number, y: number) => {
        // Hide cursor temporarily so we don't click ourselves
        const cursor = document.getElementById('wizard-cursor');
        if (cursor) cursor.style.display = 'none';

        const element = document.elementFromPoint(x, y) as HTMLElement;
        if (element) {
            element.click();
            element.focus();
        }

        if (cursor) cursor.style.display = 'block';
    };

    return (
        <>
            {/* Permission Modal */}
            {permissionState === 'asked' && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg border-4 border-[#2d2d2d] shadow-2xl max-w-sm text-center pixel-border">
                        <div className="text-4xl mb-4">🧙‍♂️✨</div>
                        <h3 className="text-xl font-bold text-[#2d2d2d] mb-2">Wizard Mode?</h3>
                        <p className="text-sm text-[#2d2d2d]/80 mb-6 leading-relaxed">
                            Want to control this website with your hand like a wizard?
                            <br />
                            <span className="text-xs font-bold mt-2 block text-[#4a90e2]">
                                Open Hand = Move Mouse
                                <br />
                                Closed Fist = Click / Flap
                            </span>
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setPermissionState('denied')}
                                className="px-4 py-2 text-xs font-bold text-[#2d2d2d] hover:bg-gray-100 border-2 border-transparent hover:border-[#2d2d2d] transition-all"
                            >
                                No thanks
                            </button>
                            <button
                                onClick={() => setPermissionState('granted')}
                                className="px-6 py-2 text-xs font-bold text-white bg-[#4a90e2] border-2 border-[#2d2d2d] shadow-[4px_4px_0_0_#2d2d2d] hover:translate-y-1 hover:shadow-none transition-all"
                            >
                                YES PLEASE!
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Video Feed - Hidden in Cursor Mode, Visible in Game Mode */}
            <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isGameMode ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <div className="relative border-4 border-[#2d2d2d] rounded-lg overflow-hidden bg-black shadow-xl pixel-border">
                    <video
                        ref={videoRef}
                        className="w-32 h-24 object-cover transform scale-x-[-1]" // Mirror video
                        playsInline
                        muted
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-yellow-400 text-sm font-bold p-1 text-center">
                        {debugInfo || "Loading..."}
                    </div>
                </div>
            </div>

            {/* Custom Cursor (Hidden in Game Mode) */}
            {permissionState === 'granted' && !isGameMode && (
                <div
                    id="wizard-cursor"
                    className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out flex items-center justify-center"
                    style={{
                        left: 0,
                        top: 0,
                        transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
                        opacity: cursorPos.x < 0 ? 0 : 1
                    }}
                >
                    <div className={`text-4xl filter drop-shadow-lg transition-transform ${isClicking ? 'scale-75' : 'scale-100'}`}>
                        {isClicking ? '✊' : '✋'}
                    </div>
                    <div className="absolute inset-0 animate-spin-slow opacity-50">
                        ✨
                    </div>
                </div>
            )}

            {/* Loading Indicator (Only show if NOT in game mode, because game mode has its own overlay) */}
            {permissionState === 'granted' && loadingStatus !== "Ready" && !isGameMode && (
                <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs px-3 py-1 rounded-full z-50">
                    {loadingStatus}
                </div>
            )}

            {/* Game Mode Indicator */}
            {permissionState === 'granted' && isGameMode && (
                <div className="fixed top-4 right-4 bg-[#4a90e2] text-white text-xs px-3 py-1 rounded-full z-50 font-bold border-2 border-white shadow-lg animate-pulse">
                    🎮 Wizard Game Mode Active
                </div>
            )}
        </>
    );
}
