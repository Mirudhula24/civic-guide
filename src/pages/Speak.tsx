"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { ChatBubble } from "@/components/ChatBubble";
import { QuickActionPill } from "@/components/QuickActionPill";
import { AudioVisualizer } from "@/components/AudioVisualizer";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

<<<<<<< HEAD
const quickActions = ["Yes", "No", "Repeat", "Help"];

// Helper function to get formatted time
const getFormattedTime = () => {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function Speak() {
  const [messages, setMessages] = useState<Message[]>([]); // start empty
=======
const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm Civic Bridge, your government scheme assistant. How can I help you today?",
    isUser: false,
    timestamp: "10:00 AM",
  },
];

const quickActions = ["Yes", "No", "Repeat", "Help"];

export default function Speak() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
>>>>>>> a0264a067352844d45907c9ee6c70e3ce62fea53
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

<<<<<<< HEAD
  // ---------- Helper to append messages safely ----------
  const appendMessage = (newMessage: Omit<Message, "id">) => {
    setMessages((prev) => [
      ...prev,
      { ...newMessage, id: prev.length + 1 },
    ]);
  };

  // ---------- Initial welcome message ----------
  useEffect(() => {
    appendMessage({
      text: "Hello! I'm Civic Bridge, your government scheme assistant. How can I help you today?",
      isUser: false,
      timestamp: getFormattedTime(),
    });
  }, []);

  // ---------- Scroll to bottom on new messages ----------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ---------- Handle sending user message ----------
  const handleSend = () => {
    if (!inputValue.trim()) return;

    appendMessage({
      text: inputValue,
      isUser: true,
      timestamp: getFormattedTime(),
    });

=======
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
>>>>>>> a0264a067352844d45907c9ee6c70e3ce62fea53
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
<<<<<<< HEAD
      appendMessage({
        text: "I understand you're looking for assistance. Let me find the best government schemes that match your needs. Could you tell me more about your specific requirement?",
        isUser: false,
        timestamp: getFormattedTime(),
      });
    }, 1000);
  };

  // ---------- Handle quick action buttons ----------
  const handleQuickAction = (action: string) => {
    appendMessage({
      text: action,
      isUser: true,
      timestamp: getFormattedTime(),
    });

    setTimeout(() => {
      appendMessage({
        text:
          action === "Help"
            ? "I can help you find government schemes for education, healthcare, housing, and more. Just describe your need or ask a question!"
            : `You selected "${action}". How would you like me to proceed?`,
        isUser: false,
        timestamp: getFormattedTime(),
      });
    }, 800);
  };

  // ---------- Handle microphone click (voice simulation) ----------
  const handleMicClick = () => {
    setIsListening(!isListening);

    if (!isListening) {
      setInputValue(""); // reset input before listening
      setTimeout(() => {
        setInputValue("I need help with education scholarship");
        setIsListening(false);
      }, 4000);
=======
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
      }, 4000); // Longer duration to show off the visualizer
>>>>>>> a0264a067352844d45907c9ee6c70e3ce62fea53
    }
  };

  return (
    <AuroraBackground showRadialGradient={false} className="bg-gradient-to-br from-white to-gray-50/50">
      <Navbar />

      {/* Chat Area */}
      <main className="flex-1 pt-24 pb-48 md:pb-40 px-4 overflow-y-auto">
        <div className="container mx-auto max-w-2xl space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ChatBubble
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Quick Actions & Input Bar */}
      <div className="fixed bottom-20 md:bottom-0 left-0 right-0 p-4 z-50">
        <div className="container mx-auto max-w-2xl space-y-4">
          {/* Quick Action Pills */}
          <div className="flex gap-2 justify-center flex-wrap mb-2">
            {quickActions.map((action, index) => (
              <motion.div
                key={action}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <QuickActionPill
                  label={action}
                  onClick={() => handleQuickAction(action)}
                />
              </motion.div>
            ))}
          </div>

          {/* Input Bar */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-[2rem] p-2 flex items-center gap-2 relative overflow-hidden">
<<<<<<< HEAD
            <motion.div whileTap={{ scale: 0.95 }} className="relative z-10">
=======
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="relative z-10"
            >
>>>>>>> a0264a067352844d45907c9ee6c70e3ce62fea53
              <Button
                variant="mic"
                size="icon-lg"
                onClick={handleMicClick}
                className={cn(
                  "shrink-0 relative shadow-md hover:shadow-lg transition-all border-none",
                  isListening ? "bg-red-500 hover:bg-red-600 text-white" : "bg-primary hover:bg-primary/90 text-white"
                )}
              >
                {isListening ? <div className="w-3 h-3 rounded-sm bg-white" /> : <Mic className="h-6 w-6" />}
              </Button>
            </motion.div>

            {/* Visualizer Background for Input Bar */}
            {isListening && (
              <div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
                <AudioVisualizer isActive={isListening} barColor="rgb(74, 181, 170)" />
              </div>
            )}

            <div className="flex-1 relative z-10">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="pr-12 h-12 rounded-xl border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 text-base"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full text-primary hover:bg-primary/10 w-10 h-10 transition-all hover:scale-105"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> a0264a067352844d45907c9ee6c70e3ce62fea53
