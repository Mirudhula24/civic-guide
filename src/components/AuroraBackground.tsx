"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode, useRef, useState, useEffect } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", () => setIsHovering(true));
      container.addEventListener("mouseleave", () => setIsHovering(false));
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", () => setIsHovering(true));
        container.removeEventListener("mouseleave", () => setIsHovering(false));
      }
    };
  }, []);

  return (
    <main>
      <div
        ref={containerRef}
        className={cn(
          "relative flex flex-col min-h-screen bg-white text-foreground transition-bg overflow-hidden",
          className
        )}
        {...props}
      >
        {/* Animated Aurora Gradient Layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary aurora wave */}
          <div
            className={cn(
              "absolute -inset-[10px] opacity-50 transition-opacity duration-700",
              isHovering ? "opacity-70" : "opacity-50"
            )}
            style={{
              background: `
                radial-gradient(
                  ellipse 80% 50% at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
                  hsla(200, 80%, 85%, 0.4) 0%,
                  transparent 50%
                ),
                radial-gradient(
                  ellipse 60% 40% at ${100 - mousePosition.x * 100}% ${100 - mousePosition.y * 100}%,
                  hsla(270, 60%, 88%, 0.35) 0%,
                  transparent 50%
                )
              `,
              transition: "background 0.3s ease-out",
            }}
          />

          {/* Animated gradient bands */}
          <div
            className={cn(
              `
              [--aurora-gradient:repeating-linear-gradient(100deg,hsla(200,80%,90%,0.8)_10%,hsla(220,70%,85%,0.6)_15%,hsla(270,60%,90%,0.7)_20%,hsla(200,80%,88%,0.6)_25%,hsla(180,70%,92%,0.8)_30%)]
              [--aurora-accent:repeating-linear-gradient(100deg,hsla(210,85%,85%,0.6)_0%,hsla(240,70%,88%,0.5)_7%,hsla(280,60%,92%,0.6)_12%,hsla(200,75%,87%,0.5)_18%,hsla(170,65%,90%,0.7)_22%)]
              [background-image:var(--aurora-gradient),var(--aurora-accent)]
              [background-size:400%,300%]
              [background-position:50%_50%,50%_50%]
              filter
              blur-[15px]
              after:content-[""]
              after:absolute
              after:inset-0
              after:[background-image:var(--aurora-gradient),var(--aurora-accent)]
              after:[background-size:300%,250%]
              after:animate-aurora
              after:[background-attachment:fixed]
              after:mix-blend-soft-light
              `,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`,
              "absolute -inset-[10px] opacity-60"
            )}
          />

          {/* Interactive floating orb - follows mouse */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-3xl transition-all duration-700 ease-out"
            style={{
              background: `radial-gradient(circle, hsla(200, 75%, 88%, 0.5) 0%, hsla(220, 65%, 90%, 0.3) 40%, transparent 70%)`,
              left: `calc(${mousePosition.x * 100}% - 250px)`,
              top: `calc(${mousePosition.y * 100}% - 250px)`,
              opacity: isHovering ? 0.6 : 0.3,
              transform: `scale(${isHovering ? 1.1 : 1})`,
            }}
          />

          {/* Secondary orb - inverse movement */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full blur-3xl transition-all duration-1000 ease-out"
            style={{
              background: `radial-gradient(circle, hsla(270, 55%, 90%, 0.4) 0%, hsla(280, 50%, 92%, 0.2) 40%, transparent 70%)`,
              right: `calc(${mousePosition.x * 100}% - 200px)`,
              bottom: `calc(${mousePosition.y * 100}% - 200px)`,
              opacity: isHovering ? 0.5 : 0.25,
            }}
          />

          {/* Static ambient orbs for depth */}
          <div className="absolute top-[10%] right-[15%] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-sky/25 via-lavender/15 to-transparent blur-3xl opacity-40 animate-float" />
          <div className="absolute bottom-[15%] left-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-mint/20 via-sky/15 to-transparent blur-3xl opacity-35 animate-float" style={{ animationDelay: "-1.5s" }} />
          <div className="absolute top-[40%] left-[30%] w-[250px] h-[250px] rounded-full bg-gradient-to-r from-lavender/15 via-transparent to-mint/10 blur-3xl opacity-30 animate-float" style={{ animationDelay: "-3s" }} />
        </div>

        {/* Soft overlay for text readability */}
        {showRadialGradient && (
          <div className="absolute inset-0 bg-white/30 pointer-events-none" />
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </div>
    </main>
  );
};
