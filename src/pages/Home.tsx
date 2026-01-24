"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { MicrophoneButton } from "@/components/MicrophoneButton";
import { QuickCard } from "@/components/QuickCard";
import { useNavigate } from "react-router-dom";

const quickCards = [
  {
    title: "Scholarship Assistance",
    description: "Need help with scholarship? Check eligibility now",
    link: "/speak",
    variant: "mint" as const,
  },
  {
    title: "Housing Scheme",
    description: "Explore government housing benefits for your family",
    link: "/speak",
    variant: "sky" as const,
  },
  {
    title: "Healthcare Support",
    description: "Access affordable healthcare programs in your area",
    link: "/speak",
    variant: "lavender" as const,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function Home() {
  const navigate = useNavigate();

  const handleStartListening = () => {
    navigate("/speak");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-32 md:pb-12 px-4">
        <motion.div 
          className="container mx-auto max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Welcome Section */}
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Welcome back, Arjun
            </h1>
            <p className="text-muted-foreground">
              How can I assist you today?
            </p>
          </motion.div>

          {/* Central Microphone */}
          <motion.div 
            className="flex justify-center mb-16"
            variants={itemVariants}
          >
            <MicrophoneButton 
              size="hero" 
              showLabel 
              onStartListening={handleStartListening}
            />
          </motion.div>

          {/* Quick Cards Section */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {quickCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <QuickCard
                    title={card.title}
                    description={card.description}
                    link={card.link}
                    variant={card.variant}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
