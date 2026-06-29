"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Share2, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const navLinks = ["Features", "Platforms", "Pricing"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!scrolled) setOpen(false);
  }, [scrolled]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none"
    >
      <div className="w-full max-w-7xl pointer-events-auto flex flex-col items-center">
        {/* Main bar */}
        <motion.div
          animate={{ maxWidth: scrolled ? "680px" : "80rem" }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="w-full flex items-center justify-between px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl overflow-hidden"
        >
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
              <Share2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-black tracking-tighter italic whitespace-nowrap">Plan My Canvas</span>
          </Link>

          {/* Full nav — visible when not scrolled */}
          <AnimatePresence>
            {!scrolled && (
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden md:flex items-center gap-8 px-8"
              >
                {navLinks.map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
                  >
                    {item}
                  </Link>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Full buttons — visible when not scrolled */}
          <AnimatePresence>
            {!scrolled && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-4 shrink-0"
              >
                <Button variant="ghost" className="hidden sm:flex font-bold uppercase tracking-widest text-xs whitespace-nowrap">
                  Log In
                </Button>
                <Button className="rounded-full px-6 font-black uppercase tracking-widest text-xs h-10 shadow-lg shadow-primary/20 whitespace-nowrap">
                  Get Started
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hamburger — visible only when scrolled */}
          <AnimatePresence>
            {scrolled && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen((v) => !v)}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/10 transition-colors shrink-0"
                aria-label="Toggle menu"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Dropdown — only when scrolled + open */}
        <AnimatePresence>
          {scrolled && open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              style={{ maxWidth: "680px" }}
              className="w-full mt-3 px-6 py-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col gap-4"
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-white/5 transition-colors px-4 py-3 rounded-xl"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
              <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                <Button variant="ghost" className="w-full font-bold uppercase tracking-widest text-xs justify-start">
                  Log In
                </Button>
                <Button className="w-full rounded-full font-black uppercase tracking-widest text-xs h-10 shadow-lg shadow-primary/20">
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
