"use client";

import { useEffect, useRef } from "react";

interface AudioVisualizerProps {
    isActive: boolean;
    barColor?: string;
}

export function AudioVisualizer({ isActive, barColor = "rgb(74, 181, 170)" }: AudioVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size (for retina displays)
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const bars = 40; // Number of bars
        const barWidth = rect.width / bars;
        let time = 0;

        const animate = () => {
            if (!isActive) {
                ctx.clearRect(0, 0, rect.width, rect.height);
                // Draw a flat line when inactive
                ctx.beginPath();
                ctx.moveTo(0, rect.height / 2);
                ctx.lineTo(rect.width, rect.height / 2);
                ctx.strokeStyle = barColor; // Use prop color
                ctx.globalAlpha = 0.3;
                ctx.lineWidth = 2;
                ctx.stroke();
                return;
            }

            ctx.clearRect(0, 0, rect.width, rect.height);
            time += 0.1;

            for (let i = 0; i < bars; i++) {
                // Simulating audio data with sine waves + noise
                const x = i * barWidth + barWidth / 2;

                // Combine multiple sine waves for more "natural" look
                const noise = Math.random() * 0.5 + 0.5;
                const baseHeight =
                    Math.sin(i * 0.2 + time) * 20 +
                    Math.sin(i * 0.1 - time * 1.5) * 15 +
                    Math.cos(i * 0.4 + time * 0.5) * 10;

                const height = Math.abs(baseHeight * noise) + 5;
                const centerY = rect.height / 2;

                ctx.fillStyle = barColor; // Use prop color
                ctx.globalAlpha = 0.8;

                // Draw rounded pill for each bar
                const radius = barWidth * 0.4;
                const h = height * 1.5; // Scale height

                ctx.beginPath();
                ctx.roundRect(
                    x - barWidth * 0.4,
                    centerY - h / 2,
                    barWidth * 0.8,
                    h,
                    radius
                );
                ctx.fill();
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isActive, barColor]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
