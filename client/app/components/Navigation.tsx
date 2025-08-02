"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Film, User, Menu, X } from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "../lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "My Panel", href: "/panel", icon: User },
];

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname() || "/";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-card/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 text-foreground font-bold text-xl group"
          >
            <div className="bg-gradient-main p-3 rounded-2xl shadow-neon group-hover:shadow-glow transition-all duration-300 border border-white/20">
              <Film className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="hidden sm:block text-2xl font-extrabold tracking-tight">
              MOVIE MATRIX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 font-medium",
                    isActive(item.href)
                      ? "bg-gradient-main text-primary-foreground shadow-neon border border-white/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-gradient-glass backdrop-blur-lg border border-transparent hover:border-white/20"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <Button
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            variant="ghost"
            size="sm"
            className="md:hidden text-foreground hover:bg-gradient-glass backdrop-blur-lg border border-white/20 rounded-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                      isActive(item.href)
                        ? "bg-gradient-form text-white shadow-form"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
