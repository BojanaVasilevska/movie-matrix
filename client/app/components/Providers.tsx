"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./ui/Tooltip";
import { Toaster } from "./ui/Toaster";
import { Toaster as Sonner } from "./ui/Sonner";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Navigation />
        {children}
      </TooltipProvider>
      <Footer />
    </QueryClientProvider>
  );
}
