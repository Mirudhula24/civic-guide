import { Navbar } from "@/components/layout/Navbar";
import { HistoryCard } from "@/components/HistoryCard";

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

export default function History() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 md:pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Assistance History
            </h1>
            <p className="text-muted-foreground">
              Track your scheme applications and conversations
            </p>
          </div>

          {/* History Cards */}
          <div className="space-y-4">
            {historyItems.map((item, index) => (
              <HistoryCard
                key={item.schemeName}
                schemeName={item.schemeName}
                lastUpdated={item.lastUpdated}
                status={item.status}
                link={item.link}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Empty State Message */}
          {historyItems.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <p className="text-muted-foreground mb-4">
                No assistance history yet
              </p>
              <p className="text-sm text-muted-foreground">
                Start a conversation to explore government schemes
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
