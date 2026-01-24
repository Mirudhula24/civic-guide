"use client";

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const rotatingWords = ["accessible", "inclusive", "simple", "human", "local"];

export function Hero() {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const currentWord = useMemo(() => rotatingWords[currentWordIndex], [currentWordIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000); // Slower for readability

    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppClick = () => {
    // WhatsApp business link - replace with actual number
    window.open("https://wa.me/919876543210?text=Hi%20Nada%2C%20I%20need%20help%20finding%20a%20government%20scheme", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col relative pt-20">
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              The Civic Bridge
            </span>
          </motion.div>

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
                      transition={{ duration: 0.5, ease: "easeInOut" }}
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
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto"
          >
            Speak once. Nada handles the complexity.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
                Speak Now
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                size="xl"
                onClick={handleWhatsAppClick}
                className="gap-3 border-2 hover:bg-green-50 hover:border-green-200"
              >
                <MessageCircle className="h-6 w-6 text-green-600" />
                Continue on WhatsApp
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
              <div className="w-2 h-2 rounded-full bg-mint-deep" />
              <span>500+ Schemes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sky-deep" />
              <span>12 Languages</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-lavender-deep" />
              <span>Voice-First</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator - positioned below content with proper spacing */}
        <motion.div 
          className="mt-auto pt-12 pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground/60"
          >
            <span className="text-xs">Scroll to learn more</span>
            <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
