"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Plus, Bell, Sun } from "lucide-react";
import { DashboardMockup } from "@/components/dashboard-mockup";
import { SocialComposerSandbox } from "@/components/social-composer-sandbox";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  ivory: "#F7F4EF",
  cream: "#F0EBE3",
  border: "#E0D8CE",
  ink: "#1A1714",
  muted: "#4F4A45",
  subtle: "#75706A",
  dark: "#0D0B09",
  darkMid: "#1A1714",
  darkBdr: "rgba(247,244,239,0.1)",
  bronze: "#8A9B38",
  oliveLight: "#F2F5E8",
} as const;

// ─── Easing & Transitions ─────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_SOFT = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Variants ─────────────────────────────────────────────────────────────────
const vFadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE, delay: d } }),
};
const vFadeIn = {
  hidden: { opacity: 0 },
  visible: (d = 0) => ({ opacity: 1, transition: { duration: 0.7, ease: EASE_SOFT, delay: d } }),
};
const vSlideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 1.0, ease: EASE, delay: d } }),
};
const vSlideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 1.0, ease: EASE, delay: d } }),
};

// ─── Data ──────────────────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    n: "01", title: "Universal Inbox", tag: "Engagement",
    body: "Every reply, comment, and direct message from X, LinkedIn, and Instagram converges into one elegantly organised workspace. Assign threads, filter by urgency, and respond with precision — without switching tabs.",
  },
  {
    n: "02", title: "Visual Calendar", tag: "Scheduling",
    body: "Plan and visualise your cross-platform content strategy at a glance. Drag, drop, copy, and auto-queue drafts into optimal timing slots recommended by AI — from one intuitive scheduling interface.",
  },
  {
    n: "03", title: "AI Composer", tag: "Creation",
    body: "Instantly refine copy tone, auto-generate relevant hashtags, translate posts, and split long-form content into threads. Your AI co-pilot surfaces the most engaging variation of every message you write.",
  },
  {
    n: "04", title: "Cross-Platform Analytics", tag: "Intelligence",
    body: "Aggregate followers, click-through rates, and interaction data across every connected channel. Generate presentation-ready reports for clients in a single click, formatted exactly as you need them.",
  },
  {
    n: "05", title: "Team Workspaces", tag: "Collaboration",
    body: "Assign comment threads to team members, draft posts in private staging areas, and create multi-step approval workflows that protect your brand voice across every piece of outgoing content.",
  },
  {
    n: "06", title: "Bank-Grade Security", tag: "Trust",
    body: "Secure OAuth integrations protect accounts at every layer. Manage login access for hundreds of channels without sharing credentials — your clients' trust is your most valuable asset.",
  },
];

const CASE_STUDIES = [
  {
    client: "BrandStudio",
    type: "Creative Agency · 5 Seats",
    capability: "Universal Inbox",
    metric: "15 hrs/wk saved",
    quote: "Before Plan My Canvas, we were constantly logging in and out of client accounts. Now our entire support team works from one unified inbox and never misses a message.",
    author: "Clara Reynolds",
    role: "Founder, BrandStudio",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&h=80&q=80",
  },
  {
    client: "FlowCorp",
    type: "Marketing Team · 12 Seats",
    capability: "Visual Calendar",
    metric: "3× content output",
    quote: "The visual calendar transformed how we plan campaigns. Drag-and-drop scheduling across six platforms, with AI suggesting our best posting windows — it's unlike anything we've used before.",
    author: "Marcus Vance",
    role: "Marketing Director, FlowCorp",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80",
  },
  {
    client: "DevPulse",
    type: "Enterprise · 45 Seats",
    capability: "Analytics Suite",
    metric: "50% lower tool cost",
    quote: "We consolidated our entire social media toolset into Plan My Canvas. Cut tool spend in half and our team alignment has never been stronger — one platform, one source of truth.",
    author: "Tariq Mahmood",
    role: "Head of Social, DevPulse",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&h=80&q=80",
  },
];

const TIMELINE = [
  {
    year: "2022",
    headline: "Founded",
    body: "Three former social media managers, exhausted from juggling seven apps, built the tool they always needed. Plan My Canvas was born from frustration and a belief that better was possible.",
  },
  {
    year: "2023",
    headline: "Public Launch",
    body: "100 beta teams. X (Twitter), LinkedIn, and Instagram integration. The world's first true unified social inbox — in one elegant workspace. Teams started saving hours every day.",
  },
  {
    year: "2024",
    headline: "AI Co-Pilot",
    body: "10,000 teams onboarded. The AI Composer launched — refining copy, generating hashtags, creating threads. Teams began saving an average of eight hours per week, every week.",
  },
  {
    year: "2025",
    headline: "Enterprise Tier",
    body: "12,000+ teams. Seven platforms. White-label reporting and enterprise approvals. Plan My Canvas became the command center for major agencies and Fortune 500 social teams worldwide.",
  },
];

const FAQS = [
  {
    q: "Which social platforms does Plan My Canvas support?",
    a: "Plan My Canvas integrates fully with X (Twitter), LinkedIn Pages & Profiles, Instagram Business, Facebook Pages, YouTube Channels, TikTok, and Pinterest. New channels are added regularly based on API availability.",
  },
  {
    q: "How does the AI Co-pilot enhance posts?",
    a: "Our AI assistant is fine-tuned on top-performing social copy. It can refine your draft to be more engaging, trim for character limits, auto-create X threads, or match a specific brand voice — professional, witty, or conversational.",
  },
  {
    q: "Can I manage multiple clients with separate workspaces?",
    a: "Absolutely. Professional and Enterprise plans support isolated client workspaces, customisable review workflows, and white-label PDF and web analytics reports delivered directly to your clients.",
  },
  {
    q: "Is there a free trial, and can I cancel anytime?",
    a: "Yes — a fully functional 14-day trial is available on all plans with no credit card required. You can upgrade, downgrade, or cancel at any time directly from your billing settings.",
  },
  {
    q: "How long does setup take?",
    a: "Most teams are fully connected in under five minutes. Connect your social accounts via OAuth, invite team members, and you're live — no migration, no training, no headaches.",
  },
];

const PRICING = [
  {
    name: "Starter",
    tagline: "For creators and freelancers",
    mo: "Free", yr: "Free",
    items: ["Up to 3 social profiles", "1 user seat", "100 scheduled posts/mo", "Basic analytics", "Standard support"],
    cta: "Get Started Free",
    featured: false,
  },
  {
    name: "Professional",
    tagline: "For growing teams and agencies",
    mo: 49, yr: 39,
    items: ["Up to 15 social profiles", "3 team seats", "Unlimited scheduling", "Universal Inbox", "AI Co-pilot", "Custom PDF reports", "Priority support"],
    cta: "Begin with Professional",
    featured: true,
  },
  {
    name: "Enterprise",
    tagline: "For large-scale organisations",
    mo: 149, yr: 119,
    items: ["Unlimited profiles", "10 team seats", "Approval workflows", "White-label reports", "SLA & API access", "Dedicated account lead"],
    cta: "Request Enterprise Demo",
    featured: false,
  },
];

// ─── Micro Components ──────────────────────────────────────────────────────────

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className="text-[10px] tracking-[0.28em] uppercase mb-4"
      style={{ color: light ? `${C.ivory}40` : C.subtle, fontFamily: "var(--font-dm-sans)" }}>
      {children}
    </p>
  );
}

function Heading({
  children, light = false, size = "lg", className = "",
}: {
  children: React.ReactNode; light?: boolean; size?: "sm" | "md" | "lg" | "xl"; className?: string;
}) {
  const sizes = { xl: "text-[52px] md:text-[68px] lg:text-[84px]", lg: "text-[40px] md:text-[52px] lg:text-[60px]", md: "text-[32px] md:text-[42px] lg:text-[48px]", sm: "text-[24px] md:text-[30px]" };
  return (
    <h2 className={`font-extrabold leading-[0.9] tracking-tight ${sizes[size]} ${className}`}
      style={{ color: light ? C.ivory : C.ink, fontFamily: "var(--font-display)" }}>
      {children}
    </h2>
  );
}

function Divider({ light = false }: { light?: boolean }) {
  return <div className="w-full h-px" style={{ background: light ? C.darkBdr : C.border }} />;
}

function CapRow({ n, title, tag, body, idx }: typeof CAPABILITIES[0] & { idx: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className="group py-10 md:py-12 border-b cursor-default"
      style={{ borderColor: C.border }}
      initial="hidden" animate={inView ? "visible" : "hidden"} custom={idx * 0.055} variants={vFadeUp}>
      <div className="grid grid-cols-12 gap-4 md:gap-8 items-baseline">
        <span className="col-span-2 md:col-span-1 text-[10px] tracking-[0.2em] uppercase"
          style={{ color: C.subtle, fontFamily: "var(--font-dm-sans)" }}>{n}</span>
        <h3 className="col-span-10 md:col-span-3 text-[20px] md:text-[24px] font-extrabold tracking-tight"
          style={{ color: C.ink, fontFamily: "var(--font-display)" }}>{title}</h3>
        <p className="col-span-12 md:col-span-6 md:pl-4 text-[14px] leading-[1.8]"
          style={{ color: C.muted }}>{body}</p>
        <div className="col-span-12 md:col-span-2 flex md:justify-end">
          <span className="text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 border"
            style={{ color: C.subtle, borderColor: C.border }}>{tag}</span>
        </div>
      </div>
    </motion.div>
  );
}

function CaseStudyRow({ cs, idx }: { cs: typeof CASE_STUDIES[0]; idx: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = idx % 2 === 0;
  return (
    <motion.div ref={ref} className="border-b py-20 md:py-24"
      style={{ borderColor: C.border }}
      initial="hidden" animate={inView ? "visible" : "hidden"}>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
        {/* Text side */}
        <motion.div className={isEven ? "order-1" : "order-1 lg:order-2"}
          variants={isEven ? vSlideLeft : vSlideRight} custom={0}>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border"
              style={{ color: C.subtle, borderColor: C.border, fontFamily: "var(--font-dm-sans)" }}>
              {cs.capability}
            </span>
            <span className="text-[11px]" style={{ color: C.subtle }}>{cs.type}</span>
          </div>
          <p className="text-[22px] md:text-[26px] lg:text-[30px] font-semibold leading-[1.4] mb-8"
            style={{ color: C.ink, fontFamily: "var(--font-display)" }}>
            &ldquo;{cs.quote}&rdquo;
          </p>
          <div className="flex items-center gap-4 mb-10">
            <img src={cs.avatar} alt={cs.author}
              className="w-10 h-10 rounded-full object-cover"
              style={{ border: `1px solid ${C.border}` }} />
            <div>
              <p className="text-[13px]" style={{ color: C.ink }}>{cs.author}</p>
              <p className="text-[10px] tracking-[0.15em] uppercase mt-0.5"
                style={{ color: C.subtle, fontFamily: "var(--font-dm-sans)" }}>{cs.role}</p>
            </div>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-[52px] md:text-[64px] font-black leading-none"
              style={{ color: C.ink, fontFamily: "var(--font-display)" }}>
              {cs.metric.split(" ")[0]}
            </span>
            <span className="text-[13px] leading-snug max-w-[120px]"
              style={{ color: C.muted }}>
              {cs.metric.split(" ").slice(1).join(" ")}
            </span>
          </div>
        </motion.div>

        {/* Visual side */}
        <motion.div className={`${isEven ? "order-2" : "order-2 lg:order-1"} relative`}
          variants={isEven ? vSlideRight : vSlideLeft} custom={0.1}>
          <div className="relative overflow-hidden rounded"
            style={{ border: `1px solid ${C.border}`, boxShadow: "0 24px 60px rgba(26,23,20,0.1)" }}>
            <div className="absolute top-0 left-0 right-0 h-1"
              style={{ background: C.bronze }} />
            <div className="p-8" style={{ background: C.oliveLight }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[18px] font-bold" style={{ color: C.ink, fontFamily: "var(--font-display)" }}>
                    {cs.client}
                  </p>
                  <p className="text-[11px] tracking-[0.12em] uppercase mt-1"
                    style={{ color: C.subtle, fontFamily: "var(--font-dm-sans)" }}>{cs.type}</p>
                </div>
                <ArrowUpRight style={{ width: 18, height: 18, color: C.subtle }} />
              </div>
              <Divider />
              <div className="mt-6 grid grid-cols-2 gap-6">
                {[
                  ["Capability", cs.capability],
                  ["Result", cs.metric],
                  ["Team", cs.type.split("·")[1]?.trim() || ""],
                  ["Status", "Active"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[9px] tracking-[0.2em] uppercase mb-1"
                      style={{ color: C.subtle, fontFamily: "var(--font-dm-sans)" }}>{k}</p>
                    <p className="text-[14px]" style={{ color: C.ink }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Decoration */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full -z-10 opacity-30"
            style={{ background: C.bronze, filter: "blur(40px)" }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function TimelineItem({ year, headline, body, idx }: typeof TIMELINE[0] & { idx: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className="grid grid-cols-12 gap-6 md:gap-10 border-b py-12"
      style={{ borderColor: C.border }}
      initial="hidden" animate={inView ? "visible" : "hidden"} custom={idx * 0.1} variants={vFadeUp}>
      <div className="col-span-12 md:col-span-2">
        <span className="text-[40px] md:text-[52px] font-black leading-none"
          style={{ color: C.ink, fontFamily: "var(--font-display)" }}>{year}</span>
      </div>
      <div className="col-span-12 md:col-span-3 md:pt-3">
        <p className="text-[20px] md:text-[24px] font-bold"
          style={{ color: C.ink, fontFamily: "var(--font-display)" }}>{headline}</p>
      </div>
      <div className="col-span-12 md:col-span-7 md:pt-3">
        <p className="text-[14px] leading-[1.85]" style={{ color: C.muted }}>{body}</p>
      </div>
    </motion.div>
  );
}

function FaqItem({ q, a, idx, open, onToggle }: typeof FAQS[0] & { idx: number; open: boolean; onToggle: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className="border-b" style={{ borderColor: C.border }}
      initial="hidden" animate={inView ? "visible" : "hidden"} custom={idx * 0.07} variants={vFadeUp}>
      <button onClick={onToggle}
        className="w-full flex items-start justify-between py-7 text-left gap-6 group">
        <span className="text-[17px] md:text-[20px] font-bold flex-1 group-hover:opacity-60 transition-opacity duration-300"
          style={{ color: C.ink, fontFamily: "var(--font-display)" }}>{q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE_SOFT }}>
          <Plus style={{ width: 16, height: 16, color: C.subtle, marginTop: 4, flexShrink: 0 }} />
        </motion.div>
      </button>
      <motion.div initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.45, ease: EASE_SOFT }}
        className="overflow-hidden">
        <p className="pb-7 text-[14px] leading-[1.85] max-w-2xl" style={{ color: C.muted }}>{a}</p>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [billing, setBilling] = useState<"mo" | "yr">("yr");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Contact form
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn(); // run once on mount
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleSubscribe = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  const handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSent(true);
  };


  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: C.ivory }}>

      {/* ════════════════════════════════════════════════════════════════════
          NAVIGATION
      ════════════════════════════════════════════════════════════════════ */}
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          height: scrolled ? "64px" : "84px",
          background: scrolled ? "#7A8B30" : C.bronze,
          borderBottom: `1px solid rgba(255,255,255,0.1)`,
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          boxShadow: scrolled ? "0 2px 24px rgba(30,46,4,0.18)" : "none",
          transition: prefersReducedMotion ? "none" : "height 300ms ease, background 300ms ease, box-shadow 300ms ease",
        }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between gap-8 h-full">

          {/* Brand */}
          <a href="/" className="font-bold tracking-tight shrink-0"
            style={{
              color: "#ffffff",
              fontFamily: "var(--font-display)",
              fontSize: scrolled ? "14px" : "16px",
              transition: prefersReducedMotion ? "none" : "font-size 300ms ease",
            }}>
            Plan My Canvas
          </a>

          {/* Nav links */}
          <nav className="hidden md:flex items-center flex-1 justify-center"
            style={{
              gap: scrolled ? "20px" : "32px",
              transition: prefersReducedMotion ? "none" : "gap 300ms ease",
            }}>
            {[
              ["Product", "features"],
              ["Pricing", "pricing"],
              ["Integration", "platform"],
              ["Blog", ""],
              ["Help", ""],
            ].map(([label, id]) => (
              <button key={label}
                onClick={() => id && scrollTo(id)}
                className="hover:opacity-70 font-bold"
                style={{
                  color: "rgba(255,255,255,0.92)",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: scrolled ? "15px" : "17px",
                  transition: prefersReducedMotion ? "none" : "font-size 300ms ease, opacity 200ms ease",
                }}>
                {label}
              </button>
            ))}
          </nav>

          {/* Right: icons + CTA */}
          <div className="flex items-center shrink-0"
            style={{
              gap: scrolled ? "8px" : "16px",
              transition: prefersReducedMotion ? "none" : "gap 300ms ease",
            }}>
            <button className="rounded hover:opacity-60 transition-opacity duration-200"
              style={{ color: "rgba(255,255,255,0.8)", padding: scrolled ? "6px" : "8px" }}>
              <Bell style={{ width: scrolled ? 14 : 16, height: scrolled ? 14 : 16, transition: prefersReducedMotion ? "none" : "all 300ms ease" }} />
            </button>
            <button className="rounded hover:opacity-60 transition-opacity duration-200"
              style={{ color: "rgba(255,255,255,0.8)", padding: scrolled ? "6px" : "8px" }}>
              <Sun style={{ width: scrolled ? 14 : 16, height: scrolled ? 14 : 16, transition: prefersReducedMotion ? "none" : "all 300ms ease" }} />
            </button>
            <a href="#pricing"
              className="group inline-flex items-center gap-2 font-bold rounded"
              style={{
                background: "#ffffff",
                color: C.bronze,
                fontFamily: "var(--font-dm-sans)",
                fontSize: scrolled ? "13px" : "15px",
                padding: scrolled ? "7px 16px" : "9px 22px",
                transition: prefersReducedMotion ? "none" : "font-size 300ms ease, padding 300ms ease, opacity 200ms ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}>
              Start Free Trial
              <ArrowRight style={{ width: 14, height: 14 }} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>

        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════════
          HERO — Dark, cinematic, full-screen
      ════════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative flex flex-col justify-between overflow-hidden"
        style={{ background: C.ivory }}>
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full"
            style={{ background: `${C.bronze}0C`, filter: "blur(120px)" }} />
          <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full"
            style={{ background: `${C.bronze}08`, filter: "blur(100px)" }} />
        </div>

        {/* Headline area */}
        <motion.div className="flex-1 max-w-[1440px] mx-auto w-full px-6 md:px-12 pt-[100px] md:pt-[116px] pb-4"
          style={{ opacity: heroOpacity, y: heroY }}>

          {/* Main headline */}
          <div className="max-w-[1100px]">
            {[
              { text: "All", accent: false },
              { text: "Accounts,", accent: false },
              { text: "One", accent: true },
              { text: "Canvas.", accent: true },
            ].map(({ text, accent }, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span className="block font-black leading-[0.88] tracking-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: accent ? C.bronze : C.ink,
                    fontSize: "clamp(48px, 7.5vw, 108px)",
                  }}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.0, ease: EASE, delay: 0.4 + i * 0.1 }}>
                  {text}
                </motion.span>
              </div>
            ))}
          </div>

        </motion.div>

        {/* Bottom bar with CTAs */}
        <motion.div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 pb-14"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease: EASE }}>
          <div className="h-px w-full" style={{ background: "#000000" }} />
          <div className="mt-6 pb-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Left: subtitle */}
            <p className="text-[17px] leading-relaxed max-w-md"
              style={{ color: C.muted, fontFamily: "var(--font-dm-sans)" }}>
              The AI-powered social media platform that helps you create, schedule, and analyze content across all platforms in one place.
            </p>
            {/* Right: CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href="#pricing"
                className="group inline-flex items-center gap-3 px-7 py-4 rounded text-[12px] font-bold tracking-[0.18em] uppercase transition-colors duration-200"
                style={{ background: C.bronze, color: C.ivory, fontFamily: "var(--font-dm-sans)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#7A8B30"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.bronze; }}>
                Start Free Trial
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" style={{ width: 14, height: 14 }} />
              </a>
              <button onClick={() => scrollTo("platform")}
                className="px-7 py-4 rounded text-[12px] font-bold tracking-[0.18em] uppercase transition-colors duration-200"
                style={{ color: C.muted, border: `1px solid ${C.border}`, fontFamily: "var(--font-dm-sans)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.ink; (e.currentTarget as HTMLElement).style.borderColor = C.ink; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = C.muted; (e.currentTarget as HTMLElement).style.borderColor = C.border; }}>
                Explore Platform
              </button>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
          <div className="w-px h-10 overflow-hidden" style={{ background: C.border }}>
            <motion.div className="w-full" style={{ background: C.bronze, height: "40px" }}
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.3 }} />
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          TICKER
      ════════════════════════════════════════════════════════════════════ */}
      <div className="h-14 flex items-center overflow-hidden border-y" style={{ background: C.darkMid, borderColor: C.darkBdr }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, si) => (
            <span key={si} className="flex items-center">
              {["X (TWITTER)", "LINKEDIN", "INSTAGRAM", "FACEBOOK", "TIKTOK", "PINTEREST", "YOUTUBE"].map((p, i) => (
                <React.Fragment key={i}>
                  <span className="text-[13px] font-semibold tracking-[0.2em] uppercase mx-10"
                    style={{ color: `${C.ivory}70`, fontFamily: "var(--font-dm-sans)" }}>{p}</span>
                  <span className="text-[16px]" style={{ color: `${C.ivory}30` }}>·</span>
                </React.Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ background: C.ivory }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            {/* Left column */}
            <motion.div className="lg:col-span-5"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
              variants={vSlideLeft} custom={0}>
              <Label>The Company</Label>
              <Heading size="lg" className="mb-10">
                We didn&apos;t build another dashboard.{" "}
                <span style={{ color: C.bronze }}>We built a command centre.</span>
              </Heading>
              <p className="text-[15px] leading-[1.85] mb-8" style={{ color: C.muted }}>
                Social media management has always meant switching between apps, missing messages, and losing hours to admin. Plan My Canvas changes that — one unified workspace for every platform, every conversation, every metric.
              </p>
              <p className="text-[15px] leading-[1.85]" style={{ color: C.muted }}>
                Built by three former social media managers who were exhausted by the chaos, Plan My Canvas brings precision and clarity to the world&apos;s most dynamic communications medium.
              </p>
            </motion.div>

            {/* Right column — abstract stat panel */}
            <motion.div className="lg:col-span-7 lg:pl-8"
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
              variants={vSlideRight} custom={0.15}>
              <div className="rounded overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
                {/* Top: accent bar */}
                <div className="h-1 w-full" style={{ background: C.bronze }} />
                <div className="p-10 md:p-14" style={{ background: C.oliveLight }}>
                  <div className="grid grid-cols-2 gap-10 mb-14">
                    {[
                      ["2022", "Year Founded"],
                      ["12,000+", "Active Teams"],
                      ["7", "Platforms"],
                      ["99.9%", "Uptime SLA"],
                    ].map(([val, lbl]) => (
                      <div key={lbl} className="border-l pl-6" style={{ borderColor: C.border }}>
                        <p className="text-[42px] md:text-[52px] font-black leading-none"
                          style={{ color: C.ink, fontFamily: "var(--font-display)" }}>{val}</p>
                        <p className="text-[10px] tracking-[0.2em] uppercase mt-2"
                          style={{ color: C.subtle, fontFamily: "var(--font-dm-sans)" }}>{lbl}</p>
                      </div>
                    ))}
                  </div>
                  <Divider />
                  <p className="text-[20px] md:text-[24px] font-extrabold leading-[1.3] mt-10"
                    style={{ color: C.ink, fontFamily: "var(--font-display)" }}>
                    &ldquo;One platform. Every channel.{" "}
                    <span style={{ color: C.bronze }}>Infinite clarity.</span>&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CAPABILITIES
      ════════════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-32 md:py-40 scroll-mt-14" style={{ background: C.ivory }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b pb-10 mb-2"
            style={{ borderColor: C.border }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={vFadeUp} custom={0}>
              <Label>Platform Capabilities</Label>
              <Heading size="lg">Six Superpowers</Heading>
            </motion.div>
            <motion.p className="hidden md:block text-[14px] leading-[1.8] max-w-xs text-right"
              style={{ color: C.muted }}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={vFadeIn} custom={0.2}>
              Built with intention for teams who demand precision and creativity in equal measure.
            </motion.p>
          </div>
          {CAPABILITIES.map((c, i) => <CapRow key={i} {...c} idx={i} />)}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PLATFORM PREVIEW — Dark, cinematic
      ════════════════════════════════════════════════════════════════════ */}
      <section id="platform" className="py-32 md:py-40 scroll-mt-14" style={{ background: C.dark }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={vFadeUp} custom={0}>
              <Label light>Interactive Preview</Label>
              <Heading size="lg" light>The Workspace</Heading>
              <p className="mt-5 text-[14px] leading-[1.8] max-w-md mx-auto"
                style={{ color: `${C.ivory}45` }}>
                Explore the platform live. Switch between Universal Inbox, Visual Calendar, and Analytics.
              </p>
            </motion.div>
          </div>
          <motion.div className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${C.darkBdr}`, boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}>
            <DashboardMockup />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CASE STUDIES
      ════════════════════════════════════════════════════════════════════ */}
      <section id="stories" className="py-32 md:py-40 scroll-mt-14" style={{ background: C.oliveLight }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b pb-10"
            style={{ borderColor: C.border }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={vFadeUp} custom={0}>
              <Label>Client Stories</Label>
              <Heading size="lg">Proof in Practice</Heading>
            </motion.div>
            <motion.p className="hidden md:block text-[14px] leading-[1.8] max-w-xs text-right"
              style={{ color: C.muted }}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={vFadeIn} custom={0.2}>
              Real teams, real results. See how Plan My Canvas transforms daily workflow.
            </motion.p>
          </div>
          {CASE_STUDIES.map((cs, i) => <CaseStudyRow key={i} cs={cs} idx={i} />)}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          LIVE COMPOSER
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40" style={{ background: C.ivory }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <motion.div className="lg:col-span-4"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={vFadeUp} custom={0}>
              <Label>Live Demonstration</Label>
              <Heading size="md" className="mb-6">Try It Now</Heading>
              <p className="text-[14px] leading-[1.85]" style={{ color: C.muted }}>
                Type your copy, generate AI improvements, or toggle an image. Watch the composer adapt to every platform&apos;s formatting in real time.
              </p>
            </motion.div>
            <motion.div className="lg:col-span-8"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}>
              <div className="rounded-xl overflow-hidden"
                style={{ border: `1px solid ${C.border}`, boxShadow: "0 20px 60px rgba(26,23,20,0.07)" }}>
                <SocialComposerSandbox />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          TIMELINE / EXPERIENCE
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40" style={{ background: C.oliveLight }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b pb-10 mb-2"
            style={{ borderColor: C.border }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={vFadeUp} custom={0}>
              <Label>The Journey</Label>
              <Heading size="lg">Our Story</Heading>
            </motion.div>
          </div>
          {TIMELINE.map((t, i) => <TimelineItem key={i} {...t} idx={i} />)}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          URGENCY CTA BREAK
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-44 overflow-hidden" style={{ background: C.dark }}>
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
            style={{ background: `${C.bronze}08`, filter: "blur(120px)" }} />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          {/* Headline */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={vFadeUp} custom={0}>
            <p className="text-[10px] tracking-[0.32em] uppercase mb-8"
              style={{ color: `${C.ivory}30`, fontFamily: "var(--font-dm-sans)" }}>
              No Risk · Full Access · Instant Setup
            </p>
            <h2 className="font-black leading-[0.88] tracking-tight mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(52px, 8vw, 112px)",
                color: C.ivory,
              }}>
              Your Brand{" "}
              <span style={{ color: C.bronze }}>Won&apos;t Wait.</span>
            </h2>
            <p className="text-[16px] md:text-[18px] leading-[1.7] max-w-xl mx-auto mb-12"
              style={{ color: `${C.ivory}50`, fontFamily: "var(--font-dm-sans)" }}>
              Get your first workspace live in under 5 minutes.
              <br />Free for 14 days — no credit card required.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={vFadeUp} custom={0.15}
            className="mb-10">
            <a href="#pricing"
              className="group inline-flex items-center gap-4 px-10 py-5 rounded text-[12px] font-bold tracking-[0.18em] uppercase transition-colors duration-200"
              style={{ background: C.ivory, color: C.dark, fontFamily: "var(--font-dm-sans)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.bronze; (e.currentTarget as HTMLElement).style.color = C.ivory; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.ivory; (e.currentTarget as HTMLElement).style.color = C.dark; }}>
              Start Free Today
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" style={{ width: 14, height: 14 }} />
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={vFadeIn} custom={0.3}>
            {[
              "No credit card",
              "Cancel anytime",
              "Setup in 5 minutes",
              "All platforms included",
            ].map((badge) => (
              <div key={badge}
                className="flex items-center gap-2 px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase"
                style={{ border: `1px solid ${C.ivory}15`, color: `${C.ivory}50`, fontFamily: "var(--font-dm-sans)" }}>
                <Check style={{ width: 11, height: 11, color: C.bronze, flexShrink: 0 }} />
                {badge}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PRICING
      ════════════════════════════════════════════════════════════════════ */}
      <section id="pricing" className="py-32 md:py-40 scroll-mt-14" style={{ background: C.ivory }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b pb-10 mb-16"
            style={{ borderColor: C.border }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={vFadeUp} custom={0}>
              <Label>Investment</Label>
              <Heading size="lg">Pricing</Heading>
            </motion.div>
            <motion.div className="mt-8 md:mt-0"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={vFadeIn} custom={0.2}>
              <div className="inline-flex rounded overflow-hidden border" style={{ borderColor: C.border }}>
                {([["mo", "Monthly"], ["yr", "Annual — Save 20%"]] as const).map(([key, lbl]) => (
                  <button key={key} onClick={() => setBilling(key)}
                    className="px-5 py-2.5 text-[12px] font-bold tracking-[0.15em] uppercase transition-all duration-200"
                    style={{ fontFamily: "var(--font-dm-sans)", background: billing === key ? C.ink : "transparent", color: billing === key ? C.ivory : C.muted }}>
                    {lbl}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {PRICING.map((p, i) => (
              <motion.div key={i} className="flex flex-col overflow-hidden"
                style={{ background: p.featured ? C.ink : "transparent", border: `1px solid ${p.featured ? C.ink : C.border}`, marginLeft: i > 0 ? "-1px" : 0 }}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                custom={i * 0.1} variants={vFadeUp}>
                {p.featured && <div className="h-1 w-full shrink-0" style={{ background: C.bronze }} />}
                <div className="p-8 md:p-10 flex flex-col flex-1">
                <div className="mb-8">
                  <p className="text-[10px] tracking-[0.25em] uppercase mb-3"
                    style={{ color: p.featured ? `${C.ivory}50` : C.subtle, fontFamily: "var(--font-dm-sans)" }}>{p.tagline}</p>
                  <Heading size="sm" light={p.featured}>{p.name}</Heading>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[52px] font-black leading-none"
                      style={{ color: p.featured ? C.ivory : C.ink, fontFamily: "var(--font-display)" }}>
                      {p[billing] === "Free" ? "Free" : `$${p[billing]}`}
                    </span>
                    {p[billing] !== "Free" && (
                      <span className="text-[12px]" style={{ color: p.featured ? `${C.ivory}45` : C.subtle, fontFamily: "var(--font-dm-sans)" }}>/mo</span>
                    )}
                  </div>
                </div>
                <div className="flex-1 border-t pt-8 mb-8" style={{ borderColor: p.featured ? `${C.ivory}15` : C.border }}>
                  <ul className="flex flex-col gap-4">
                    {p.items.map((item, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-[13px] leading-snug"
                        style={{ color: p.featured ? `${C.ivory}70` : C.muted }}>
                        <Check style={{ width: 13, height: 13, marginTop: 2, color: p.featured ? C.ivory : C.ink, flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#"
                  className="group flex items-center justify-between px-5 py-4 rounded text-[12px] font-bold tracking-[0.15em] uppercase transition-all duration-200"
                  style={{ background: p.featured ? C.ivory : "transparent", color: p.featured ? C.ink : C.muted, border: p.featured ? "none" : `1px solid ${C.border}`, fontFamily: "var(--font-dm-sans)" }}
                  onMouseEnter={e => { if (!p.featured) { (e.currentTarget as HTMLElement).style.background = C.cream; (e.currentTarget as HTMLElement).style.color = C.ink; } else { (e.currentTarget as HTMLElement).style.background = C.cream; } }}
                  onMouseLeave={e => { if (!p.featured) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = C.muted; } else { (e.currentTarget as HTMLElement).style.background = C.ivory; } }}>
                  {p.cta}
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" style={{ width: 13, height: 13 }} />
                </a>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p className="mt-8 text-center text-[12px]" style={{ color: C.subtle }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={vFadeIn} custom={0.4}>
            All plans include a 14-day free trial. No credit card required.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40" style={{ background: C.oliveLight }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <motion.div className="lg:col-span-4"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={vFadeUp} custom={0}>
              <Label>Questions</Label>
              <Heading size="lg" className="mb-6">Common Queries</Heading>
              <p className="text-[14px] leading-[1.85]" style={{ color: C.muted }}>
                Can&apos;t find what you need? Reach us at{" "}
                <a href="mailto:support@planmycanvas.io" style={{ color: C.ink, textDecoration: "underline" }}>
                  support@planmycanvas.io
                </a>
              </p>
            </motion.div>
            <div className="lg:col-span-8 border-t" style={{ borderColor: C.border }}>
              {FAQS.map((f, i) => (
                <FaqItem key={i} {...f} idx={i} open={faqOpen === i} onToggle={() => setFaqOpen(faqOpen === i ? null : i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-40" style={{ background: C.dark }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            {/* Left */}
            <motion.div className="lg:col-span-5"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={vFadeUp} custom={0}>
              <Label light>Get Started</Label>
              <Heading size="lg" light className="mb-8">
                Ready to Command Your Socials?
              </Heading>
              <p className="text-[15px] leading-[1.85] mb-12" style={{ color: `${C.ivory}45` }}>
                Tell us about your team and we&apos;ll get you set up in minutes. No credit card, no commitment — just a better way to work.
              </p>
              <div className="space-y-6">
                {[["Email", "support@planmycanvas.io"], ["Response", "Within 2 hours"], ["Trial", "14 days free"]].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: C.bronze }} />
                    <span className="text-[10px] tracking-[0.2em] uppercase mr-2" style={{ color: `${C.ivory}35`, fontFamily: "var(--font-dm-sans)" }}>{k}</span>
                    <span className="text-[13px]" style={{ color: `${C.ivory}55` }}>{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div className="lg:col-span-7"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={vSlideRight} custom={0.15}>
              {formSent ? (
                <div className="py-20 text-center">
                  <p className="text-[44px] font-extrabold mb-4"
                    style={{ color: C.ivory, fontFamily: "var(--font-display)" }}>Thank you.</p>
                  <p className="text-[14px]" style={{ color: `${C.ivory}45` }}>We&apos;ll be in touch within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-0">
                  {[
                    { label: "Your Name", key: "name", type: "text", placeholder: "Full name" },
                    { label: "Email Address", key: "email", type: "email", placeholder: "you@company.com" },
                    { label: "Company", key: "company", type: "text", placeholder: "Company or agency name" },
                    { label: "How can we help?", key: "message", type: "textarea", placeholder: "Tell us about your team and what you need..." },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key} className="border-b py-5" style={{ borderColor: C.darkBdr }}>
                      <label className="block text-[9px] tracking-[0.25em] uppercase mb-3"
                        style={{ color: `${C.ivory}35`, fontFamily: "var(--font-dm-sans)" }}>{label}</label>
                      {type === "textarea" ? (
                        <textarea
                          required
                          rows={4}
                          placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                          className="w-full bg-transparent text-[15px] outline-none resize-none placeholder:opacity-25"
                          style={{ color: C.ivory, fontFamily: "var(--font-dm-sans)" }} />
                      ) : (
                        <input
                          type={type}
                          required
                          placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                          className="w-full bg-transparent text-[15px] outline-none placeholder:opacity-25"
                          style={{ color: C.ivory, fontFamily: "var(--font-dm-sans)" }} />
                      )}
                    </div>
                  ))}
                  <div className="pt-8">
                    <button type="submit"
                      className="group inline-flex items-center gap-4 px-8 py-5 rounded text-[12px] font-bold tracking-[0.18em] uppercase transition-colors duration-200"
                      style={{ background: C.bronze, color: C.ivory, fontFamily: "var(--font-dm-sans)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#7A8B30"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.bronze; }}>
                      Send Message
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-40 md:py-56 border-t" style={{ background: C.ivory, borderColor: C.border }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div className="max-w-4xl"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={vFadeUp} custom={0}>
            <Label>Begin Today</Label>
            <Heading size="xl" className="mb-10">
              Your Social Presence,<br />
              <span style={{ color: C.bronze }}>Perfectly Orchestrated.</span>
            </Heading>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a href="#pricing"
                className="group inline-flex items-center gap-3 px-9 py-5 rounded text-[12px] font-bold tracking-[0.18em] uppercase transition-colors duration-200"
                style={{ background: C.bronze, color: C.ivory, fontFamily: "var(--font-dm-sans)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#7A8B30"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.bronze; }}>
                Start 14-Day Free Trial
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" style={{ width: 14, height: 14 }} />
              </a>
              <a href="mailto:support@planmycanvas.io"
                className="group inline-flex items-center gap-3 px-9 py-5 rounded text-[12px] font-bold tracking-[0.18em] uppercase transition-colors duration-200"
                style={{ color: C.muted, border: `1px solid ${C.border}`, fontFamily: "var(--font-dm-sans)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.ink; (e.currentTarget as HTMLElement).style.borderColor = C.ink; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = C.muted; (e.currentTarget as HTMLElement).style.borderColor = C.border; }}>
                Talk to the Team
              </a>
            </div>
            <p className="mt-8 text-[12px]" style={{ color: C.subtle, fontFamily: "var(--font-dm-sans)" }}>
              No credit card required · Cancel anytime · Setup in under 5 minutes
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════════════ */}
      <footer className="py-20 border-t" style={{ background: C.dark, borderColor: C.darkBdr }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-4">
              <p className="text-[13px] font-medium tracking-[0.15em] uppercase mb-5"
                style={{ color: C.ivory, fontFamily: "var(--font-dm-sans)" }}>Plan My Canvas</p>
              <p className="text-[13px] leading-[1.85] max-w-xs mb-8"
                style={{ color: `${C.ivory}40` }}>
                All accounts. One Canvas. The unified social media workspace for teams who demand precision, speed, and clarity.
              </p>
              <div className="flex items-center gap-5">
                {[
                  { label: "X", href: "https://x.com", icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
                  { label: "LinkedIn", href: "https://linkedin.com", icon: <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg> },
                  { label: "Instagram", href: "https://instagram.com", icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                    className="transition-colors duration-200" style={{ color: `${C.ivory}35` }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.ivory; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = `${C.ivory}35`; }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Product */}
            <div className="md:col-span-2">
              <p className="text-[9px] tracking-[0.25em] uppercase mb-6"
                style={{ color: `${C.ivory}30`, fontFamily: "var(--font-dm-sans)" }}>Product</p>
              <ul className="space-y-3">
                {[["Features", "#features"], ["Platform", "#platform"], ["Pricing", "#pricing"], ["Stories", "#stories"]].map(([l, h]) => (
                  <li key={l}>
                    <a href={h} className="text-[13px] transition-colors duration-200"
                      style={{ color: `${C.ivory}40` }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.ivory; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = `${C.ivory}40`; }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="md:col-span-2">
              <p className="text-[9px] tracking-[0.25em] uppercase mb-6"
                style={{ color: `${C.ivory}30`, fontFamily: "var(--font-dm-sans)" }}>Company</p>
              <ul className="space-y-3">
                {["About Us", "Press Kit", "Privacy Policy", "Terms of Service"].map(l => (
                  <li key={l}>
                    <a href="#" className="text-[13px] transition-colors duration-200"
                      style={{ color: `${C.ivory}40` }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.ivory; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = `${C.ivory}40`; }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-4">
              <p className="text-[9px] tracking-[0.25em] uppercase mb-6"
                style={{ color: `${C.ivory}30`, fontFamily: "var(--font-dm-sans)" }}>Stay Informed</p>
              <p className="text-[13px] leading-[1.8] mb-5" style={{ color: `${C.ivory}40` }}>
                Bi-weekly updates on new channels, AI features, and platform releases.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-[12px] py-3" style={{ color: `${C.ivory}50` }}>
                  <Check style={{ width: 13, height: 13 }} />
                  Thank you for subscribing.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex rounded overflow-hidden" style={{ border: `1px solid ${C.ivory}15` }}>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 text-[12px] bg-transparent outline-none placeholder:opacity-20"
                    style={{ color: C.ivory, fontFamily: "var(--font-dm-sans)" }} />
                  <button type="submit"
                    className="px-4 py-3 transition-colors duration-200 flex items-center"
                    style={{ background: `${C.ivory}10`, borderLeft: `1px solid ${C.ivory}15`, color: `${C.ivory}50` }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${C.ivory}20`; (e.currentTarget as HTMLElement).style.color = C.ivory; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${C.ivory}10`; (e.currentTarget as HTMLElement).style.color = `${C.ivory}50`; }}>
                    <ArrowUpRight style={{ width: 14, height: 14 }} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t"
            style={{ borderColor: C.darkBdr }}>
            <p className="text-[11px]" style={{ color: `${C.ivory}20`, fontFamily: "var(--font-dm-sans)" }}>
              © {new Date().getFullYear()} Plan My Canvas, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-7">
              {["Security Audited", "System Status: Operational"].map(item => (
                <span key={item} className="text-[11px]"
                  style={{ color: `${C.ivory}20`, fontFamily: "var(--font-dm-sans)" }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
