"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { HistoryCard } from "@/components/HistoryCard";
import { AuroraBackground } from "@/components/AuroraBackground";

const historyItems = [
  {
    schemeName: "Post-Matric Scholarship",
    lastUpdated: "2 days ago",
    status: "pending" as const,
    link: "/speak",
  },
  {
    schemeName: "Pradhan Mantri Awas Yojana",
    lastUpdated: "1 week ago",
    status: "review" as const,
    link: "/speak",
  },
  {
    schemeName: "Ayushman Bharat Health Insurance",
    lastUpdated: "2 weeks ago",
    status: "complete" as const,
    link: "/speak",
  },
  {
    schemeName: "Skill India Training Program",
    lastUpdated: "1 month ago",
    status: "complete" as const,
    link: "/speak",
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
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function History() {
  return (
    <AuroraBackground>
      <Navbar />

      <main className="pt-24 pb-32 md:pb-12 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground">
              Assistance History
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your scheme applications and conversations
            </p>
          </motion.div>

          {/* History Cards */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {historyItems.map((item) => (
              <motion.div key={item.schemeName} variants={itemVariants}>
                <HistoryCard
                  schemeName={item.schemeName}
                  lastUpdated={item.lastUpdated}
                  status={item.status}
                  link={item.link}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State Message */}
          {historyItems.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl text-muted-foreground mb-4 font-medium">
                No assistance history yet
              </p>
              <p className="text-sm text-muted-foreground">
                Start a conversation to explore government schemes
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </AuroraBackground>
  );
}
