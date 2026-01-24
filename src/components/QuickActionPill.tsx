import { Button } from "@/components/ui/button";

interface QuickActionPillProps {
  label: string;
  onClick?: () => void;
}

export function QuickActionPill({ label, onClick }: QuickActionPillProps) {
  return (
    <Button 
      variant="pill" 
      size="pill" 
      onClick={onClick}
      className="hover:scale-105 transition-transform"
    >
      {label}
    </Button>
  );
}
