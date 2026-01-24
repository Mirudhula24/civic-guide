import { useState } from "react";
import { Send, Mic } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { ChatBubble } from "@/components/ChatBubble";
import { QuickActionPill } from "@/components/QuickActionPill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm Nada, your government scheme assistant. How can I help you today?",
    isUser: false,
    timestamp: "10:00 AM",
  },
];

const quickActions = ["Yes", "No", "Repeat", "Help"];

export default function Speak() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: "I understand you're looking for assistance. Let me find the best government schemes that match your needs. Could you tell me more about your specific requirement?",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: action,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: action === "Help" 
          ? "I can help you find government schemes for education, healthcare, housing, and more. Just describe your need or ask a question!"
          : `You selected "${action}". How would you like me to proceed?`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 800);
  };

  const handleMicClick = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setInputValue("I need help with education scholarship");
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Chat Area */}
      <main className="flex-1 pt-28 md:pt-20 pb-40 px-4 overflow-y-auto">
        <div className="container mx-auto max-w-2xl space-y-4">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </main>

      {/* Quick Actions & Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/50 p-4">
        <div className="container mx-auto max-w-2xl space-y-4">
          {/* Quick Action Pills */}
          <div className="flex gap-2 justify-center flex-wrap">
            {quickActions.map((action) => (
              <QuickActionPill
                key={action}
                label={action}
                onClick={() => handleQuickAction(action)}
              />
            ))}
          </div>

          {/* Input Bar */}
          <div className="flex items-center gap-3">
            <Button
              variant="mic"
              size="icon-lg"
              onClick={handleMicClick}
              className={cn(
                "shrink-0",
                isListening && "mic-listening"
              )}
            >
              <Mic className="h-6 w-6" />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="pr-12 h-12 rounded-2xl border-2 border-border/50 focus:border-primary/50 bg-card"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-xl text-primary hover:bg-primary/10"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
