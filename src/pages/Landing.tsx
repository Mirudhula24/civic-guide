"use client";

import { Hero } from "@/components/Hero";
import { ProblemStatement } from "@/components/ProblemStatement";
import { SolutionSection } from "@/components/SolutionSection";
import { Navbar } from "@/components/layout/Navbar";
import { AuroraBackground } from "@/components/AuroraBackground";

export default function Landing() {
  return (
    <AuroraBackground>
      {/* Navigation */}
      <Navbar />

      {/* Content */}
      <Hero />
      <ProblemStatement />
      <SolutionSection />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Civic Bridge — The Civic Bridge • Built for public systems, civic access, and inclusion.
          </p>
        </div>
      </footer>
    </AuroraBackground>
  );
}
