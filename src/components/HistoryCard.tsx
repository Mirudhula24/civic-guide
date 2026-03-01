import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface HistoryCardProps {
  schemeName: string;
  lastUpdated: string;
  status: "pending" | "complete" | "review";
  link: string;
}

const statusConfig = {
  pending: {
    label: "Documents Pending",
    className: "bg-status-pending text-status-pending-text border-status-pending",
  },
  complete: {
    label: "Completed",
    className: "bg-status-complete text-status-complete-text border-status-complete",
  },
  review: {
    label: "Under Review",
    className: "bg-status-review text-status-review-text border-status-review",
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
      className="block p-6 rounded-3xl bg-white/40 backdrop-blur-md border border-white/20 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
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
