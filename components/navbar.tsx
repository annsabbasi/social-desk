"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const navLinks = ["Product", "Pricing", "Integrations", "Help"];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-5 pointer-events-none backdrop-blur-xl [mask-image:linear-gradient(to_bottom,black,black_70%,transparent)]"
    >
      <div className="w-full max-w-7xl pointer-events-auto flex flex-col items-center">
        <div
          className="w-full relative flex items-center justify-between px-5 h-[52px] backdrop-blur-xl border border-border/70 rounded-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          style={{ backgroundColor: "#f0f2f0" }}
        >
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center justify-center" aria-label="Go to homepage">
            <Image src="/logo-icon.png" alt="Plan My Canvas" width={72} height={72} className="object-contain w-[72px] h-[72px]" priority />
          </Link>

          {/* Nav links — centered */}
          <nav className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-5">
            <Link
              href="#signin"
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              Sign In
            </Link>
            <button className="bg-primary text-primary-foreground rounded-[10px] px-5 py-2 text-[13px] font-semibold whitespace-nowrap hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 transition-all duration-200">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
