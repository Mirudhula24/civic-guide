import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface HistoryCardProps {
  schemeName: string;
  lastUpdated: string;
  status: "pending" | "approved" | "rejected";
  link: string;
}

const statusConfig = {
  pending: {
    label: "Documents Pending",
    className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  approved: {
    label: "Approved",
    className: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-500/10 text-red-500 border-red-500/20",
  },
};

export function HistoryCard({
  schemeName,
  lastUpdated,
  status,
  link
}: HistoryCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <Link
      to={link}
      className="block p-6 rounded-3xl bg-card/40 backdrop-blur-md border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
            {schemeName}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Clock className="h-4 w-4" />
            Last updated: {lastUpdated}
          </div>
          <Badge
            className={cn(
              "rounded-full font-semibold border-0 px-3 py-1",
              statusInfo.className
            )}
          >
            {statusInfo.label}
          </Badge>
        </div>
        <div className="flex items-center text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          Continue
          <ArrowRight className="h-4 w-4 ml-1" />
        </div>
      </div>

      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
    </Link>
  );
}
