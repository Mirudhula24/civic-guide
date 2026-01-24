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

export default function Home() {
  const navigate = useNavigate();

  const handleStartListening = () => {
    navigate("/speak");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 md:pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Welcome Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Welcome back, Arjun
            </h1>
            <p className="text-muted-foreground">
              How can I assist you today?
            </p>
          </div>

          {/* Central Microphone */}
          <div 
            className="flex justify-center mb-16 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <MicrophoneButton 
              size="hero" 
              showLabel 
              onStartListening={handleStartListening}
            />
          </div>

          {/* Quick Cards Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
              Quick Actions
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {quickCards.map((card, index) => (
                <QuickCard
                  key={card.title}
                  title={card.title}
                  description={card.description}
                  link={card.link}
                  variant={card.variant}
                  delay={400 + index * 100}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
