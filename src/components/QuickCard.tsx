import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface QuickCardProps {
  title: string;
  description: string;
  link: string;
  variant?: "mint" | "sky" | "lavender";
}

export function QuickCard({
  title,
  description,
  link,
  variant = "mint"
}: QuickCardProps) {
  const variantClasses = {
    mint: "group-hover:border-mint-deep/60 bg-white/40 backdrop-blur-md",
    sky: "group-hover:border-sky-deep/60 bg-white/40 backdrop-blur-md",
    lavender: "group-hover:border-lavender-deep/60 bg-white/40 backdrop-blur-md",
  };

  return (
    <Link
      to={link}
      className={cn(
        "block p-6 rounded-3xl border border-white/20 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group relative overflow-hidden",
        variantClasses[variant]
      )}
    >
      <div className="relative z-10">
        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
        <div className="flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all">
          Check eligibility
          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Subtle gradient overlay on hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500",
        variant === 'mint' && "bg-gradient-to-br from-mint via-transparent to-transparent",
        variant === 'sky' && "bg-gradient-to-br from-sky via-transparent to-transparent",
        variant === 'lavender' && "bg-gradient-to-br from-lavender via-transparent to-transparent"
      )} />
    </Link>
  );
}
