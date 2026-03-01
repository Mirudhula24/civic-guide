import { useState } from "react";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MicrophoneButtonProps {
  size?: "default" | "large" | "hero";
  showLabel?: boolean;
  onStartListening?: () => void;
  onStopListening?: () => void;
}

export function MicrophoneButton({ 
  size = "default", 
  showLabel = false,
  onStartListening,
  onStopListening 
}: MicrophoneButtonProps) {
  const [isListening, setIsListening] = useState(false);

  const handleClick = () => {
    if (isListening) {
      setIsListening(false);
      onStopListening?.();
    } else {
      setIsListening(true);
      onStartListening?.();
    }
  };

  const sizeClasses = {
    default: "h-14 w-14",
    large: "h-20 w-20",
    hero: "h-24 w-24",
  };

  const iconSizes = {
    default: "h-6 w-6",
    large: "h-8 w-8",
    hero: "h-10 w-10",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        variant="mic"
        onClick={handleClick}
        className={cn(
          sizeClasses[size],
          isListening ? "mic-listening bg-primary" : "mic-pulse",
          "transition-all duration-500"
        )}
      >
        <Mic className={iconSizes[size]} />
      </Button>
      {showLabel && (
        <span className="text-sm font-medium text-muted-foreground">
          {isListening ? "Listening..." : "Tap to speak"}
        </span>
      )}
    </div>
  );
}
