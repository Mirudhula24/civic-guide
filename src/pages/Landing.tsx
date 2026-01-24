"use client";

import { Suspense, lazy } from "react";
import { Hero } from "@/components/Hero";
import { ProblemStatement } from "@/components/ProblemStatement";
import { SolutionSection } from "@/components/SolutionSection";
import { Navbar } from "@/components/layout/Navbar";

// Lazy load the shader background for better performance
const ShaderBackground = lazy(() => 
  import("@/components/ShaderBackground").then(mod => ({ default: mod.ShaderBackground }))
);

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Three.js Shader Background */}
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-gradient-pastel" />}>
        <ShaderBackground />
      </Suspense>

      {/* Navigation */}
      <Navbar />

      {/* Content */}
      <main>
        <Hero />
        <ProblemStatement />
        <SolutionSection />
        
        {/* Footer */}
        <footer className="py-12 px-6 border-t border-border/50">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              Nada — The Civic Bridge • Built for public systems, civic access, and inclusion.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
