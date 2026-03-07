import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  timestamp?: string;
  animate?: boolean;
}

export function ChatBubble({ message, isUser = false, timestamp, animate = true }: ChatBubbleProps) {
  const [displayedText, setDisplayedText] = useState(isUser || !animate ? message : "");

  useEffect(() => {
    if (isUser || !animate) {
      setDisplayedText(message);
      return;
    }

    // Reset displayed text when message changes
    setDisplayedText("");
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(message.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [message, isUser, animate]);

  return (
    <div
      className={cn(
        "flex w-full animate-slide-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "max-w-[85%] md:max-w-[75%] p-4 rounded-3xl shadow-lg backdrop-blur-md relative overflow-hidden",
        isUser
          ? "bubble-user rounded-br-sm bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground border border-white/20 shadow-primary/20"
          : "bubble-ai rounded-bl-sm bg-white/10 dark:bg-black/20 border border-white/30 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
      )}>
        {/* Subtle inner highlight for 3D effect */}
        <div className="absolute inset-0 rounded-3xl border border-white/20 dark:border-white/5 pointer-events-none mix-blend-overlay"></div>

        <p className={cn(
          "text-sm md:text-base leading-relaxed relative z-10",
          isUser ? "text-primary-foreground font-medium" : "text-foreground font-medium"
        )}>
          {displayedText}
          {!isUser && animate && displayedText.length < message.length && (
            <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-primary/70 animate-pulse rounded-full" />
          )}
        </p>
        {timestamp && (
          <p className={cn(
            "text-[10px] mt-2 opacity-70",
            isUser ? "text-primary-foreground text-right" : "text-muted-foreground text-left"
          )}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}