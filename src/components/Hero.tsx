"use client";

import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mic, MessageCircle, ArrowRight, GraduationCap, Home, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingPaths } from "@/components/ui/background-paths";

const languages = ["English", "हिंदी", "मराठी", "বাংলা", "தமிழ்", "తెలుగు"];

const quickActions = [
  {
    title: "Scholarship",
    icon: GraduationCap,
    message: "I want to know about Scholarships",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500"
  },
  {
    title: "Housing",
    icon: Home,
    message: "I need help with Housing schemes",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-500"
  },
  {
    title: "Healthcare",
    icon: HeartPulse,
    message: "I want to find Healthcare benefits",
    color: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-500"
  }
];

export function Hero() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  // Fade out scroll indicator as user scrolls
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const scrollIndicatorY = useTransform(scrollY, [0, 150], [0, 20]);

  const handleScrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/91XXXXXXXXXX?text=Hi%20Civic%20Bridge,%20I%20need%20help", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col relative pt-20 overflow-hidden">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12 relative z-10 transition-all duration-300">
        <div className="max-w-4xl mx-auto text-center w-full mt-4 md:mt-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm text-foreground shadow-lg">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              The Civic Bridge
            </span>
          </motion.div>

          {/* Animated Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-4"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
              Apni Baat, Sarkar Tak
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-xl mx-auto font-medium"
          >
            Your voice, to the government
          </motion.p>

          {/* Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button
                size="xl"
                onClick={() => navigate("/chat?voice=true")}
                className="w-full sm:w-auto gap-3 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/25 rounded-full px-8 h-14 text-lg"
              >
                <Mic className="h-5 w-5" />
                Speak Now
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="xl"
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto gap-3 bg-white/50 hover:bg-white/80 backdrop-blur-md border-white/20 shadow-lg rounded-full px-8 h-14 text-lg"
              >
                <MessageCircle className="h-5 w-5 text-green-600" />
                Continue on WhatsApp
              </Button>
            </motion.div>
          </motion.div>

          {/* Language Selector Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mb-14"
          >
            <p className="text-sm text-foreground/70 mb-4 font-medium uppercase tracking-wider">Available in your language</p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {languages.map((lang, idx) => (
                <motion.button
                  key={lang}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="px-4 py-2 md:px-5 rounded-full bg-white/40 backdrop-blur-lg border border-white/50 text-sm font-medium shadow-sm hover:shadow-md hover:bg-white/60 transition-all text-foreground"
                >
                  {lang}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Quick Action Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="w-full"
          >
            <p className="text-sm text-foreground/70 mb-6 font-medium uppercase tracking-wider">Quick Actions</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.title}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    onClick={() => navigate(`/chat?prefill=${encodeURIComponent(action.message)}`)}
                    className={`cursor-pointer rounded-3xl p-6 text-left flex flex-col justify-between bg-gradient-to-br ${action.color} backdrop-blur-xl border border-white/50 shadow-xl hover:shadow-2xl transition-all h-full min-h-[140px]`}
                  >
                    <div className={`p-3 rounded-full bg-white/90 w-fit mb-4 shadow-sm ${action.iconColor}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{action.title}</h3>
                      <p className="text-sm text-foreground/70 mt-1 flex items-center gap-1">
                        Get help <ArrowRight className="h-3 w-3" />
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator - fades out on scroll and clickable */}
        <motion.div
          className="mt-12 md:mt-16 mb-4 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            opacity: scrollIndicatorOpacity,
            y: scrollIndicatorY
          }}
          transition={{ delay: 1.2 }}
          onClick={handleScrollToContent}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-foreground/60 hover:text-foreground/80 transition-colors"
          >
            <span className="text-xs font-medium">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border-2 border-foreground/30 hover:border-foreground/50 flex justify-center pt-1.5 transition-colors">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-foreground/50"
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
