import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface QuickCardProps {
  title: string;
  description: string;
  link: string;
  variant?: "mint" | "sky" | "lavender";
  delay?: number;
}

export function QuickCard({ 
  title, 
  description, 
  link, 
  variant = "mint",
  delay = 0 
}: QuickCardProps) {
  const variantClasses = {
    mint: "border-mint-deep/40 hover:border-mint-deep bg-gradient-to-br from-mint/50 to-mint",
    sky: "border-sky-deep/40 hover:border-sky-deep bg-gradient-to-br from-sky/50 to-sky",
    lavender: "border-lavender-deep/40 hover:border-lavender-deep bg-gradient-to-br from-lavender/50 to-lavender",
  };

  return (
    <Link 
      to={link}
      className={cn(
        "block card-pastel p-5 border-2 group animate-fade-in",
        variantClasses[variant]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
        Check eligibility 
        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
