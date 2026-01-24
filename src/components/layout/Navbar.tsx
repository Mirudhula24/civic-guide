import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MoreVertical, Settings, HelpCircle, LogIn, LogOut, Languages, Volume2 } from "lucide-react";
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
  { label: "Home", path: "/home" },
  { label: "Speak", path: "/speak" },
  { label: "Assistance History", path: "/history" },
];

export function Navbar() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
        >
          Nada
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                location.pathname === link.path
                  ? "bg-mint text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-56 rounded-2xl bg-card border-2 border-border/50 shadow-medium p-2"
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

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-center gap-1 pb-2 px-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200",
              location.pathname === link.path
                ? "bg-mint text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
