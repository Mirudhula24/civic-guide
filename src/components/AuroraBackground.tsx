"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col min-h-screen bg-white text-foreground transition-bg",
          className
        )}
        {...props}
      >
        {/* Aurora gradient layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={cn(
              `
              [--aurora-gradient:repeating-linear-gradient(100deg,hsl(200,80%,90%)_10%,hsl(220,70%,85%)_15%,hsl(270,60%,90%)_20%,hsl(200,80%,88%)_25%,hsl(180,70%,92%)_30%)]
              [--aurora-accent:repeating-linear-gradient(100deg,hsl(210,85%,85%)_0%,hsl(240,70%,88%)_7%,hsl(280,60%,92%)_12%,hsl(200,75%,87%)_18%,hsl(170,65%,90%)_22%)]
              [background-image:var(--aurora-gradient),var(--aurora-accent)]
              [background-size:400%,300%]
              [background-position:50%_50%,50%_50%]
              filter
              blur-[12px]
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

          {/* Secondary aurora layer for depth */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={cn(
              `
              [--aurora-soft:repeating-linear-gradient(120deg,hsl(190,75%,92%)_5%,hsl(230,65%,90%)_12%,hsl(260,55%,93%)_18%,hsl(200,70%,91%)_24%)]
              [background-image:var(--aurora-soft)]
              [background-size:350%]
              animate-aurora-slow
              filter
              blur-[20px]
              `,
              "absolute inset-0 opacity-40"
            )}
          />

          {/* Floating orbs for additional visual interest */}
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[15%] right-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-sky/30 via-lavender/20 to-transparent blur-3xl opacity-50"
          />
          <motion.div
            animate={{
              x: [0, -25, 35, 0],
              y: [0, 30, -25, 0],
              scale: [1, 0.9, 1.05, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[20%] left-[15%] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-mint/25 via-sky/20 to-transparent blur-3xl opacity-40"
          />
          <motion.div
            animate={{
              x: [0, 20, -15, 0],
              y: [0, -20, 15, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-lavender/15 via-transparent to-mint/15 blur-3xl opacity-35"
          />
        </div>

        {/* Soft overlay for better text readability */}
        {showRadialGradient && (
          <div className="absolute inset-0 bg-white/40 pointer-events-none" />
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </div>
    </main>
  );
}
