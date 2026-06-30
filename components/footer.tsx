"use client";

import Link from "next/link";
import { Share2, Github, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#1B2311" }}>
      {/* Top edge accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-4 pt-20 pb-10 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: "oklch(0.47 0.1 128)" }}>
                <Share2 className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-white tracking-tight">Plan My Canvas</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              The elegant workspace for modern social media teams. Create, schedule, and grow — all in one place.
            </p>
            <div className="flex gap-3">
              {[
                {
                  label: "X",
                  svg: <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.855L1.254 2.25H8.08l4.258 5.626zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                },
                {
                  label: "GitHub",
                  svg: <Github className="h-3.5 w-3.5" />,
                },
                {
                  label: "LinkedIn",
                  svg: <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                },
              ].map(({ label, svg }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="h-8 w-8 rounded-xl border flex items-center justify-center transition-all duration-200 hover:border-white/20"
                  style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                  }}
                >
                  {svg}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-5">
              <h3 className="text-xs font-semibold tracking-widest uppercase" style={{ color: "oklch(0.74 0.08 130)" }}>
                Product
              </h3>
              <ul className="flex flex-col gap-3">
                {["Features", "Integrations", "Pricing", "Changelog"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm transition-colors duration-200" style={{ color: "rgba(255,255,255,0.45)" }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)")}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-xs font-semibold tracking-widest uppercase" style={{ color: "oklch(0.74 0.08 130)" }}>
                Company
              </h3>
              <ul className="flex flex-col gap-3">
                {["About", "Blog", "Careers", "Legal"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm transition-colors duration-200" style={{ color: "rgba(255,255,255,0.45)" }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)")}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4">
            <div className="p-6 rounded-2xl border" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
              <h3 className="text-base font-semibold text-white mb-2">Stay in the loop</h3>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>
                Get updates on new features, tips, and product news.
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full h-11 rounded-xl px-4 text-sm outline-none transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.85)",
                  }}
                />
                <button
                  className="absolute right-1.5 top-1.5 h-8 w-8 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80"
                  style={{ background: "oklch(0.47 0.1 128)" }}
                >
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} Plan My Canvas. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(item => (
              <Link key={item} href="#" className="text-xs transition-colors duration-200" style={{ color: "rgba(255,255,255,0.3)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
