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
    if (isUser || !animate || displayedText === message) return;

    let currentIndex = 0;
    // Faster typing speed for better UX
    const interval = setInterval(() => {
      if (currentIndex < message.length) {
        setDisplayedText(prev => prev + message[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [message, isUser, animate]);

  // If message prop changes significantly (new message), reset
  useEffect(() => {
    if (!isUser && animate) {
      setDisplayedText("");
    }
  }, [message, isUser, animate]);

  return (
    <div
      className={cn(
        "flex w-full animate-slide-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "max-w-[80%] md:max-w-[70%] p-4 rounded-2xl shadow-sm",
        isUser
          ? "bubble-user rounded-br-none bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
          : "bubble-ai rounded-bl-none bg-white border border-border/50"
      )}>
        <p className={cn(
          "text-sm md:text-base leading-relaxed",
          isUser ? "text-primary-foreground" : "text-foreground"
        )}>
          {isUser || !animate ? message : (
            <span>
              {displayedText}
              {displayedText.length < message.length && (
                <span className="inline-block w-1 h-4 ml-0.5 align-middle bg-primary animate-pulse" />
              )}
            </span>
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
