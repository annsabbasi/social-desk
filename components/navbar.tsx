"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none"
    >
      <div className="container max-w-7xl flex items-center justify-between px-6 py-3 bg-primary backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-primary/30 pointer-events-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-10 w-10 bg-primary-foreground rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
            <Share2 className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-black tracking-tighter italic text-primary-foreground">SocialDesk</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {["Features", "Platforms", "Pricing"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-black uppercase tracking-[0.2em] text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:flex font-black uppercase tracking-widest text-[10px] text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
            Log In
          </Button>
          <Button className="rounded-full px-6 font-black uppercase tracking-widest text-[10px] h-10 bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-all">
            Get Started
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
