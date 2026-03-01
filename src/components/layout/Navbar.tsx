"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Mic, Clock, MoreVertical, Settings, HelpCircle, LogIn, LogOut, Languages, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", path: "/home", icon: Home },
  { label: "Speak", path: "/speak", icon: Mic },
  { label: "Assistance History", path: "/history", icon: Clock },
];

export function Navbar() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      {/* Desktop Navigation - Fixed Top Center */}
      <nav className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 bg-card/90 backdrop-blur-xl border-2 border-border/50 rounded-full px-2 py-2 shadow-soft">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-foreground hover:text-primary transition-colors px-4"
          >
            Civic Bridge
          </Link>

          <div className="w-px h-6 bg-border/50 mx-2" />

          {/* Center Navigation */}
          <div className="flex items-center gap-1 relative">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-mint rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="w-px h-6 bg-border/50 mx-2" />

          {/* Menu Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 rounded-2xl bg-card border-2 border-border/50 shadow-medium p-2 mt-2"
            >
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="rounded-xl cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="rounded-2xl bg-card border-2 border-border/50 shadow-medium p-2">
                  <DropdownMenuItem className="rounded-xl cursor-pointer">
                    <Languages className="mr-2 h-4 w-4" />
                    Language
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl cursor-pointer">
                    <Volume2 className="mr-2 h-4 w-4" />
                    Voice Settings
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem className="rounded-xl cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                FAQs
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem
                className="rounded-xl cursor-pointer"
                onClick={() => setIsLoggedIn(!isLoggedIn)}
              >
                {isLoggedIn ? (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* Mobile Navigation - Fixed Bottom Center */}
      <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 bg-card/95 backdrop-blur-xl border-2 border-border/50 rounded-full px-3 py-2 shadow-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative flex items-center justify-center p-3 rounded-full transition-colors duration-200",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabMobile"
                    className="absolute inset-0 bg-mint rounded-full"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}
                <Icon className="relative z-10 h-5 w-5" />
              </Link>
            );
          })}

          <div className="w-px h-8 bg-border/50 mx-1" />

          {/* Menu Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="top"
              className="w-56 rounded-2xl bg-card border-2 border-border/50 shadow-medium p-2 mb-2"
            >
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="rounded-xl cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="rounded-2xl bg-card border-2 border-border/50 shadow-medium p-2">
                  <DropdownMenuItem className="rounded-xl cursor-pointer">
                    <Languages className="mr-2 h-4 w-4" />
                    Language
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl cursor-pointer">
                    <Volume2 className="mr-2 h-4 w-4" />
                    Voice Settings
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem className="rounded-xl cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                FAQs
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem
                className="rounded-xl cursor-pointer"
                onClick={() => setIsLoggedIn(!isLoggedIn)}
              >
                {isLoggedIn ? (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}
