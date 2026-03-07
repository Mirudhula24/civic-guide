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
import { useAppContext } from "@/context/AppContext";
import { ApiService } from "@/services/api";
import { useSearchParams, useNavigate } from "react-router-dom";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const quickActions = ["Yes", "No", "Repeat", "Help"];

// Helper function to get formatted time
const getFormattedTime = () => {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export default function Chat() {
  const { language, userId } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([]); // start empty
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Use searchParams to optionally pre-fill the chat input or start voice search
  const initialMessage = searchParams.get("prefill") || searchParams.get("message") || "";
  const isVoiceActive = searchParams.get("voice") === "true";

  const [inputValue, setInputValue] = useState(initialMessage);
  const [isListening, setIsListening] = useState(isVoiceActive);
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(typeof window !== 'undefined' ? !navigator.onLine : false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // ---------- Clear searchParams on mount to avoid stuck state ----------
  useEffect(() => {
    if (initialMessage || isVoiceActive) {
      navigate("/chat", { replace: true });
    }
  }, [initialMessage, isVoiceActive, navigate]);

  // ---------- Helper to append messages safely ----------
  const appendMessage = (newMessage: Omit<Message, "id">) => {
    setMessages((prev) => [
      ...prev,
      { ...newMessage, id: prev.length + 1 },
    ]);
  };

  // ---------- Initial welcome message & URL Params & Offline Listener ----------
  useEffect(() => {
    appendMessage({
      text: "Hello! I'm Civic Bridge, your government scheme assistant. How can I help you today?",
      isUser: false,
      timestamp: getFormattedTime(),
    });

    // Network Status
    if (typeof window !== 'undefined') {
      const handleOnline = () => setIsOffline(false);
      const handleOffline = () => setIsOffline(true);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      // Setup Speech Recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;

        // Map our language context to BCP-47 tags
        const langMap: Record<string, string> = {
          en: 'en-IN', hi: 'hi-IN', te: 'te-IN', ta: 'ta-IN',
          mr: 'mr-IN', bn: 'bn-IN', gu: 'gu-IN', kn: 'kn-IN',
          ml: 'ml-IN', pa: 'pa-IN', ur: 'ur-IN'
        };
        recognitionRef.current.lang = langMap[language] || 'en-IN';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }

      if (isVoiceActive) {
        setTimeout(() => {
          if (recognitionRef.current) {
            try {
              recognitionRef.current.start();
              setIsListening(true);
            } catch (e) {
              console.error("Auto mic start failed", e);
            }
          }
        }, 500);
      }

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        if (recognitionRef.current) {
          recognitionRef.current.abort();
        }
      };
    }
  }, [language]);

  // ---------- Scroll to bottom on new messages ----------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ---------- Handle sending user message ----------
  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    if (isOffline) {
      setErrorMsg("You're offline — your message will send when reconnected");
      setTimeout(() => setErrorMsg(null), 3500);
      return;
    }

    const userText = inputValue;
    appendMessage({
      text: userText,
      isUser: true,
      timestamp: getFormattedTime(),
    });

    setInputValue("");
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await ApiService.postAskAI(userText, language, userId || undefined);
      const aiResponseText = response.response || "I'm sorry, I couldn't process that response.";

      appendMessage({
        text: aiResponseText,
        isUser: false,
        timestamp: getFormattedTime(),
      });

      // Text-to-Speech (Placeholder for Amazon Polly)
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(aiResponseText);
        const langMap: Record<string, string> = {
          en: 'en-IN', hi: 'hi-IN', te: 'te-IN', ta: 'ta-IN',
          mr: 'mr-IN', bn: 'bn-IN', gu: 'gu-IN', kn: 'kn-IN',
          ml: 'ml-IN', pa: 'pa-IN', ur: 'ur-IN'
        };
        utterance.lang = langMap[language] || 'en-IN';
        window.speechSynthesis.speak(utterance);
      }

    } catch (error) {
      setErrorMsg("Connection issue, tap to retry.");
      appendMessage({
        text: "Sorry, I am having trouble connecting to the server. Please try again.",
        isUser: false,
        timestamp: getFormattedTime(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ---------- Handle quick action buttons ----------
  const handleQuickAction = async (action: string) => {
    if (isLoading) return;

    appendMessage({
      text: action,
      isUser: true,
      timestamp: getFormattedTime(),
    });

    setIsLoading(true);

    try {
      const response = await ApiService.postAskAI(action, language, userId || undefined);
      appendMessage({
        text: response.response || `You selected "${action}". How would you like me to proceed?`,
        isUser: false,
        timestamp: getFormattedTime(),
      });
    } catch (error) {
      appendMessage({
        text: "Sorry, I am having trouble connecting to the server. Please try again.",
        isUser: false,
        timestamp: getFormattedTime(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ---------- Handle microphone click (Real Speech Recognition) ----------
  const handleMicClick = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    if (!recognitionRef.current) {
      setErrorMsg("Voice recognition is not supported in this browser.");
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }

    try {
      recognitionRef.current.start();
      setIsListening(true);
      setInputValue(""); // clear input when starting
      setErrorMsg(null);
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
      // Reset if it somehow was manually aborted
      setIsListening(false);
    }
  };

  return (
    <AuroraBackground showRadialGradient={false} className="bg-gradient-to-br from-white to-gray-50/50">
      <Navbar />

      {/* Status Banners */}
      <div className="fixed top-20 left-0 right-0 z-40 flex flex-col items-center pointer-events-none px-4">
        <AnimatePresence>
          {isOffline && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mt-2 px-5 py-2.5 bg-amber-500/90 backdrop-blur-md text-white border border-amber-400/50 rounded-full shadow-lg text-sm font-medium flex items-center gap-3 pointer-events-auto"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              You're offline — your message will send when reconnected
            </motion.div>
          )}
          {errorMsg && !isOffline && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mt-2 px-5 py-2.5 bg-destructive/90 backdrop-blur-md text-white border border-destructive-foreground/20 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 cursor-pointer pointer-events-auto hover:bg-destructive transition-colors"
              onClick={() => {
                setErrorMsg(null);
                if (inputValue.trim()) handleSend();
              }}
            >
              {errorMsg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex items-center gap-2 mb-4 drop-shadow-sm ml-2"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex flex-shrink-0 items-center justify-center backdrop-blur-md border border-white/20">
                  <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
              </motion.div>
            )}
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
          <div className="bg-card/70 backdrop-blur-xl border border-border/40 shadow-lg rounded-[2rem] p-2 flex items-center gap-2 relative overflow-hidden">
            <motion.div whileTap={{ scale: 0.95 }} className="relative z-10">
              <Button
                variant="mic"
                size="icon-lg"
                onClick={handleMicClick}
                className={cn(
                  "shrink-0 relative shadow-md hover:shadow-lg transition-all border-none",
                  isListening ? "bg-red-500 hover:bg-red-600 text-white" : "bg-primary hover:bg-primary/90 text-white"
                )}
              >
                {isListening ? <div className="w-3 h-3 rounded-sm bg-background" /> : <Mic className="h-6 w-6" />}
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
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full text-primary hover:bg-primary/10 w-10 h-10 transition-all hover:scale-105"
              >
                {isLoading ? <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" /> : <Send className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
