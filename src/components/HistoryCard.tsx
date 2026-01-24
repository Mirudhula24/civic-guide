import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface HistoryCardProps {
  schemeName: string;
  lastUpdated: string;
  status: "pending" | "complete" | "review";
  link: string;
  delay?: number;
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
  link,
  delay = 0 
}: HistoryCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <Link 
      to={link}
      className="block card-pastel p-5 group animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {schemeName}
          </h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Clock className="h-3 w-3" />
            Last updated: {lastUpdated}
          </div>
          <Badge 
            className={cn(
              "rounded-full font-medium border-0",
              statusInfo.className
            )}
          >
            {statusInfo.label}
          </Badge>
        </div>
        <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Continue
          <ArrowRight className="h-4 w-4 ml-1" />
        </div>
      </div>
    </Link>
  );
}
