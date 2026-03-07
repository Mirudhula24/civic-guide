"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { HistoryCard } from "@/components/HistoryCard";
import { AuroraBackground } from "@/components/AuroraBackground";
import { useAppContext } from "@/context/AppContext";
import { ApiService } from "@/services/api";
import { Inbox } from "lucide-react";

const dummyHistoryItems = [
  {
    schemeName: "Post-Matric Scholarship",
    lastUpdated: "2 days ago",
    status: "pending" as const,
    link: "/chat",
  },
  {
    schemeName: "Pradhan Mantri Awas Yojana",
    lastUpdated: "1 week ago",
    status: "rejected" as const,
    link: "/chat",
  },
  {
    schemeName: "Ayushman Bharat Health Insurance",
    lastUpdated: "2 weeks ago",
    status: "approved" as const,
    link: "/chat",
  },
  {
    schemeName: "Skill India Training Program",
    lastUpdated: "1 month ago",
    status: "approved" as const,
    link: "/chat",
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
  const { userId } = useAppContext();
  const [historyItems, setHistoryItems] = useState(dummyHistoryItems);
  const [isLoading, setIsLoading] = useState(false);

  const [startY, setStartY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const data = await ApiService.getApplications(userId);
      if (data && Array.isArray(data)) {
        if (data.length > 0) {
          const transformed = data.map((app: any) => ({
            schemeName: app.schemeName,
            lastUpdated: app.date || "Recently",
            status: (app.status || "pending").toLowerCase() as "pending" | "approved" | "rejected",
            link: `/chat?prefill=${encodeURIComponent("Status of " + app.schemeName)}`
          }));
          setHistoryItems(transformed);
        }
      }
    } catch (error) {
      console.error("Failed to load applications", error);
    } finally {
      setIsLoading(false);
      setIsPulling(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY > 0) {
      const currentY = e.touches[0].clientY;
      if (currentY - startY > 60) {
        setIsPulling(true);
      }
    }
  };

  const handleTouchEnd = () => {
    if (isPulling) {
      fetchHistory();
    }
    setStartY(0);
  };
  return (
    <AuroraBackground>
      <Navbar />

      <main
        className="pt-24 pb-32 md:pb-12 px-4 min-h-screen relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {isPulling && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50">
            <div className="w-8 h-8 rounded-full border-4 border-primary border-b-transparent animate-spin" />
          </div>
        )}
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
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
          ) : (
            <>
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
                  className="text-center py-16 flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Inbox className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-xl text-muted-foreground mb-4 font-medium">
                    No applications yet — start by asking CivicBridge for help
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>
    </AuroraBackground>
  );
}
