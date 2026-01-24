import { useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-pastel flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Animated Hero Text */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span className="inline-block animate-fade-in" style={{ animationDelay: "0ms" }}>
              Government schemes,
            </span>
            <br />
            <span 
              className="inline-block animate-fade-in text-primary" 
              style={{ animationDelay: "400ms" }}
            >
              explained in your language.
            </span>
          </h1>
          
          {/* Subtext */}
          <p 
            className="text-lg md:text-xl text-muted-foreground mb-12 animate-fade-in max-w-xl mx-auto"
            style={{ animationDelay: "800ms" }}
          >
            Just speak your need — Nada will guide you.
          </p>

          {/* Hero Button */}
          <div 
            className="animate-fade-in"
            style={{ animationDelay: "1200ms" }}
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/speak")}
              className="gap-3 animate-float"
            >
              <Mic className="h-6 w-6" />
              Speak Your Need
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-secondary/40 animate-pulse" style={{ animationDelay: "300ms" }} />
          <div className="w-2 h-2 rounded-full bg-accent/40 animate-pulse" style={{ animationDelay: "600ms" }} />
        </div>
      </main>
    </div>
  );
}
