import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  message: string;
  isUser?: boolean;
  timestamp?: string;
}

export function ChatBubble({ message, isUser = false, timestamp }: ChatBubbleProps) {
  return (
    <div 
      className={cn(
        "flex w-full animate-slide-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "max-w-[80%] md:max-w-[70%]",
        isUser ? "bubble-user" : "bubble-ai"
      )}>
        <p className="text-foreground text-sm md:text-base leading-relaxed">
          {message}
        </p>
        {timestamp && (
          <p className={cn(
            "text-xs mt-2 text-muted-foreground",
            isUser ? "text-right" : "text-left"
          )}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
