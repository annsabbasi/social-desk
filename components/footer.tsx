"use client";

import Link from "next/link";
import { Share2, Github, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-white/5 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 pt-24 pb-12 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 shadow-xl shadow-primary/20">
                <Share2 className="h-7 w-7 text-primary-foreground" />
              </div>
              <span className="text-3xl font-black tracking-tighter italic uppercase">SocialDesk</span>
            </Link>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
              The ultimate command center for modern digital architects. Dominate the digital landscape with precision and speed.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-black tracking-[0.3em] uppercase text-primary">Ecosystem</h3>
              <ul className="flex flex-col gap-4">
                {["Features", "Integrations", "Pricing", "Changelog"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h3 className="text-xs font-black tracking-[0.3em] uppercase text-primary">Company</h3>
              <ul className="flex flex-col gap-4">
                {["About", "Journal", "Careers", "Legal"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4">
            <div className="p-8 rounded-[2rem] bg-linear-to-br from-primary/10 via-background to-primary/5 border border-white/10 relative group">
              <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4">Transmission</h3>
              <p className="text-sm text-muted-foreground mb-6">Receive low-latency updates on our latest features and blueprints.</p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="ARCHITECT@EMAIL.COM"
                  className="w-full h-14 bg-background border border-white/10 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-widest focus:outline-hidden focus:border-primary/50 transition-colors"
                />
                <Button size="icon" className="absolute right-2 top-2 h-10 w-10 rounded-lg group-hover:scale-105 transition-transform">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          <p>© {new Date().getFullYear()} SocialDesk Command Systems</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Protocol</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
