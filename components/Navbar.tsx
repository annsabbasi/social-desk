"use client";

import { useState } from "react";
import { Bell, SunMoon, Menu, X } from "lucide-react";

const navItems = ["Product", "Pricing", "Integration", "Blog", "Help"];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-10 mx-auto flex h-[70px] w-full max-w-[1140px] items-center justify-between rounded-[24px] border border-slate-200 bg-white px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold tracking-tight text-slate-950">
          Social Desk
        </span>
      </div>

      <nav className="hidden items-center gap-5 text-sm font-semibold text-slate-600 md:flex">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-600 hover:text-slate-900">
            {item}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-3 md:flex">
        <button className="grid h-11 w-11 place-items-center rounded-[14px] border border-slate-200 bg-white text-slate-700 shadow-sm">
          <Bell className="h-5 w-5" />
        </button>
        <button className="grid h-11 w-11 place-items-center rounded-[14px] border border-slate-200 bg-white text-slate-700 shadow-sm">
          <SunMoon className="h-5 w-5" />
        </button>
        <a href="#" className="inline-flex h-11 items-center rounded-[14px] bg-slate-950 px-5 text-sm font-semibold text-white">
          Start Free Trial
        </a>
      </div>

      <button
        className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute inset-x-4 top-full mt-4 rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-lg md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="rounded-[14px] px-4 py-3 text-sm font-semibold text-slate-700"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <button className="grid h-11 w-11 place-items-center rounded-[14px] border border-slate-200 bg-white text-slate-700 shadow-sm">
              <Bell className="h-5 w-5" />
            </button>
            <button className="grid h-11 w-11 place-items-center rounded-[14px] border border-slate-200 bg-white text-slate-700 shadow-sm">
              <SunMoon className="h-5 w-5" />
            </button>
            <a
              className="flex-1 rounded-[14px] bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white"
              href="#"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
