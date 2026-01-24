"use client";

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

const rotatingWords = ["accessible", "simple", "inclusive", "human", "clear"];

export function Hero() {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const currentWord = useMemo(() => rotatingWords[currentWordIndex], [currentWordIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-pastel flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              <span className="block mb-2">Government schemes,</span>
              <span className="block">
                made{" "}
                <span className="relative inline-block min-w-[200px] md:min-w-[280px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWord}
                      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute left-0 text-primary"
                    >
                      {currentWord}
                    </motion.span>
                  </AnimatePresence>
                  <span className="invisible">{rotatingWords[0]}</span>
                </span>
                .
              </span>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl mx-auto"
          >
            Just speak your need — Nada will guide you.
          </motion.p>

          {/* Hero Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate("/speak")}
                className="gap-3"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Mic className="h-6 w-6" />
                </motion.div>
                Speak Your Need
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-mint" />
              <span>500+ Schemes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sky" />
              <span>12 Languages</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-lavender" />
              <span>Voice-First</span>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/30"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
