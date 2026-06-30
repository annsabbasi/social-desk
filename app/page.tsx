"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { DashboardPreview } from "@/components/dashboard-preview";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  CheckCircle2,
  Globe,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Clock,
} from "lucide-react";
import React from "react";

// ─── Shared section header ────────────────────────────────────────────────────
const SectionHeader = ({
  title,
  subtitle,
  label,
}: {
  title: string;
  subtitle: string;
  label?: string;
}) => (
  <div className="flex flex-col items-center text-center mb-16">
    {label && (
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-1.5 text-primary font-semibold tracking-wider text-[11px] uppercase mb-5 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15"
      >
        <span className="w-1 h-1 rounded-full bg-primary" />
        {label}
      </motion.span>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08 }}
      className="text-3xl md:text-[2.75rem] font-semibold tracking-tight text-foreground mb-4 leading-[1.15] max-w-2xl"
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.16 }}
      className="text-muted-foreground text-base leading-relaxed max-w-xl"
    >
      {subtitle}
    </motion.p>
  </div>
);


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
          {/* Subtle ambient background */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full blur-[140px] opacity-40" style={{ background: "oklch(0.74 0.08 130)" }} />
            <div className="absolute top-1/2 left-[-200px] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" style={{ background: "oklch(0.47 0.1 128)" }} />
          </div>

          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-[4.5rem] lg:text-[5rem] font-semibold tracking-tight text-foreground leading-[1.07] mb-6 italic"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                All Accounts,
                <br />
                <span className="text-primary">One Canvas.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10"
              >
                Create, schedule, and analyze content across every platform from one elegant workspace — built for creators, agencies, and enterprise teams.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 items-center mb-12"
              >
                <button className="group h-12 px-7 text-[13px] font-semibold rounded-[10px] bg-primary text-primary-foreground flex items-center gap-2 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <button className="h-12 px-7 text-[13px] font-medium rounded-[10px] border border-border bg-card text-foreground hover:bg-muted/60 transition-colors">
                  Watch Demo
                </button>
              </motion.div>

            </div>

            {/* Dashboard Preview */}
            <DashboardPreview />
          </div>
        </section>

        {/* ── Platform Marquee ─────────────────────────────────────────────── */}
        <section className="py-14 bg-accent border-y border-border overflow-hidden">
          <p className="text-center text-xs font-semibold tracking-widest uppercase mb-6" style={{ color: "#181B13" }}>
            Publish to every platform
          </p>
          <div className="flex gap-12 whitespace-nowrap overflow-hidden">
            <motion.div
              animate={{ x: [0, -1100] }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="flex gap-12 items-center shrink-0"
            >
              {[...Array(3)].map((_, i) => (
                <React.Fragment key={i}>
                  {[
                    { name: "X / Twitter", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.855L1.254 2.25H8.08l4.258 5.626zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                    { name: "LinkedIn", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                    { name: "Instagram", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> },
                    { name: "Facebook", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                    { name: "Pinterest", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg> },
                    { name: "TikTok", svg: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
                  ].map(({ name, svg }) => (
                    <div key={name + i} className="flex items-center gap-2.5 cursor-default select-none transition-opacity hover:opacity-80" style={{ color: "#181B13" }}>
                      {svg}
                      <span className="text-sm font-medium">{name}</span>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Features — Premium Bento Grid ───────────────────────────────── */}
        <section id="features" className="py-32">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader
              label="Features"
              title="Everything your team needs to grow"
              subtitle="A complete toolkit for modern social media — from AI-powered content creation to real-time analytics and seamless collaboration."
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Large — AI Engine */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4 }}
                className="md:col-span-7 bg-card border border-border rounded-3xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.05)] overflow-hidden relative group"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-7">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">AI Content Engine</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                    Our AI understands your brand voice and generates captions, hashtags, and post ideas — optimized for your audience and ideal posting times.
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-7 w-7 rounded-full border-2 border-card bg-accent" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">Trusted by 12,000+ creators</span>
                  </div>
                </div>
                {/* Decorative ring */}
                <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full border border-primary/8" />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border border-primary/6" />
              </motion.div>

              {/* Small — Analytics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08, duration: 0.4 }}
                whileHover={{ y: -3 }}
                className="md:col-span-5 bg-card border border-border rounded-3xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.05)] group"
              >
                <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-7">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Real-time Analytics</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Live engagement metrics that update as your audience reacts to your content.
                </p>
                {/* Mini bar chart */}
                <div className="flex items-end gap-1 h-14">
                  {[40, 58, 44, 72, 53, 84, 68, 90, 62, 78, 95, 72].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm transition-all duration-300"
                      style={{
                        height: `${h}%`,
                        background: i === 10 ? "oklch(0.47 0.1 128)" : "oklch(0.47 0.1 128 / 0.22)",
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Small — Scheduling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12, duration: 0.4 }}
                whileHover={{ y: -3 }}
                className="md:col-span-4 bg-card border border-border rounded-3xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
              >
                <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-7">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Smart Scheduling</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Auto-detect optimal posting times across all timezones for maximum reach and engagement.
                </p>
              </motion.div>

              {/* Large — Collaboration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18, duration: 0.4 }}
                whileHover={{ y: -3 }}
                className="md:col-span-8 bg-card border border-border rounded-3xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.05)] overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start h-full">
                  <div className="flex-1">
                    <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-7">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Team Collaboration</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Streamlined approval workflows for agencies and teams. Clients review and approve with a single click.
                    </p>
                  </div>
                  <div className="flex-1 w-full flex flex-col gap-2.5 self-center">
                    {[
                      { label: "Campaign Draft #12", status: "Pending", cls: "text-amber-700 bg-amber-50 border-amber-200" },
                      { label: "Summer Campaign", status: "Approved", cls: "text-emerald-700 bg-emerald-50 border-emerald-200" },
                      { label: "Q3 Content Plan", status: "Ready", cls: "text-primary bg-primary/8 border-primary/20" },
                    ].map((item, i) => (
                      <div key={i} className={`flex items-center justify-between px-4 py-3 rounded-[10px] bg-background border border-border ${i === 1 ? "translate-x-3" : i === 2 ? "translate-x-6" : ""}`}>
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${item.cls}`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        <section className="py-32 bg-accent">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-1.5 text-primary font-semibold tracking-wider text-[11px] uppercase mb-6 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15"
                >
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  How it works
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-[2.75rem] font-semibold tracking-tight text-foreground mb-12 leading-[1.15]"
                >
                  From setup to scale in three steps.
                </motion.h2>
                <div className="space-y-9">
                  {[
                    {
                      step: "01",
                      title: "Connect your accounts",
                      desc: "One-click OAuth integration with every major social platform. Secure, encrypted, and instant.",
                    },
                    {
                      step: "02",
                      title: "Create and schedule",
                      desc: "Use our AI assistant to craft content and schedule posts at optimal times across all platforms.",
                    },
                    {
                      step: "03",
                      title: "Analyze and grow",
                      desc: "Track performance with real-time analytics and adjust your strategy for maximum growth.",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.12, duration: 0.45 }}
                      className="flex gap-6 group cursor-default"
                    >
                      <div className="text-2xl font-bold select-none mt-0.5 transition-colors duration-300 group-hover:text-primary/50" style={{ color: "oklch(0.47 0.1 128 / 0.2)" }}>
                        {item.step}
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-foreground mb-1.5">{item.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Visual card stack */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-sm bg-card border border-border rounded-3xl p-7 shadow-[0_16px_48px_rgba(0,0,0,0.07)]">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">
                    This week's snapshot
                  </p>
                  <div className="space-y-3">
                    {[
                      { icon: CheckCircle2, text: "12 posts scheduled across 4 platforms", sub: "Next: Instagram · Today at 3 PM", color: "text-primary" },
                      { icon: TrendingUp, text: "Engagement up 34% this month", sub: "Highest performing: LinkedIn Carousel", color: "text-chart-2" },
                      { icon: MessageSquare, text: "28 comments responded to", sub: "Via Engagement inbox · 4 pending", color: "text-chart-4" },
                    ].map(({ icon: Icon, text, sub, color }, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12 + 0.2 }}
                        className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-background border border-border"
                      >
                        <div className={`mt-0.5 shrink-0 ${color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-foreground">{text}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pricing ──────────────────────────────────────────────────────── */}
        <section id="pricing" className="py-32">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader
              label="Pricing"
              title="Simple, transparent pricing"
              subtitle="Start free and scale as your team grows. No hidden fees, no surprises — cancel anytime."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {[
                {
                  name: "Solo",
                  price: "0",
                  period: "Free forever",
                  desc: "Perfect for individuals getting started with social media.",
                  features: [
                    "3 Social accounts",
                    "30 scheduled posts/month",
                    "Basic analytics",
                    "Community support",
                  ],
                  cta: "Get started free",
                  featured: false,
                },
                {
                  name: "Pro",
                  price: "49",
                  period: "per month",
                  desc: "For growing teams and professional creators.",
                  features: [
                    "20 Social accounts",
                    "Unlimited scheduled posts",
                    "Advanced analytics & reports",
                    "Team collaboration & approvals",
                    "Priority support",
                  ],
                  cta: "Start free trial",
                  featured: true,
                },
                {
                  name: "Enterprise",
                  price: "199",
                  period: "per month",
                  desc: "For agencies managing multiple brands at scale.",
                  features: [
                    "Unlimited accounts",
                    "Custom AI brand voice models",
                    "White-label options",
                    "Dedicated success manager",
                    "SLA & uptime guarantee",
                  ],
                  cta: "Contact sales",
                  featured: false,
                },
              ].map((plan, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  className={`relative p-8 rounded-3xl border flex flex-col transition-all duration-300 ${
                    plan.featured
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_24px_60px_rgba(0,0,0,0.12)]"
                      : "bg-card border-border shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:border-primary/25"
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="text-[11px] font-semibold px-3.5 py-1 rounded-full bg-card text-primary border border-primary/20 whitespace-nowrap shadow-sm">
                        Most popular
                      </span>
                    </div>
                  )}

                  <div className={`text-[11px] font-semibold tracking-widest uppercase mb-5 ${plan.featured ? "text-primary-foreground/55" : "text-primary"}`}>
                    {plan.name}
                  </div>

                  <div className="flex items-baseline gap-1 mb-1.5">
                    <span className="text-4xl font-bold tracking-tight">${plan.price}</span>
                    {plan.price !== "0" && (
                      <span className={`text-sm ${plan.featured ? "text-primary-foreground/55" : "text-muted-foreground"}`}>/mo</span>
                    )}
                  </div>
                  <p className={`text-xs mb-2 ${plan.featured ? "text-primary-foreground/55" : "text-muted-foreground"}`}>
                    {plan.period}
                  </p>
                  <p className={`text-sm mb-7 leading-relaxed ${plan.featured ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                    {plan.desc}
                  </p>

                  <div className="space-y-3 flex-grow mb-8">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${plan.featured ? "text-primary-foreground/60" : "text-primary"}`} />
                        <span className={plan.featured ? "text-primary-foreground/85" : "text-foreground/80"}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`h-11 w-full rounded-[10px] text-[13px] font-semibold transition-all duration-200 ${
                      plan.featured
                        ? "bg-white text-primary hover:bg-white/90 shadow-sm"
                        : "border border-border bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md hover:shadow-primary/15"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-accent border border-border rounded-3xl p-12 md:p-20 text-center overflow-hidden"
            >
              {/* Ambient gradients */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none">
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[80px] opacity-50" style={{ background: "oklch(0.74 0.08 130 / 0.3)" }} />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[80px] opacity-40" style={{ background: "oklch(0.47 0.1 128 / 0.15)" }} />
              </div>

              <div className="relative z-10">
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-1.5 text-primary font-semibold tracking-wider text-[11px] uppercase mb-6 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15"
                >
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  Get started today
                </motion.span>

                <h2 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight leading-[1.15] mb-5">
                  Ready to manage smarter?
                </h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
                  Join thousands of creators and agencies who save hours every week with Plan My Canvas.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <button className="group h-12 px-8 text-[13px] font-semibold rounded-[10px] bg-primary text-primary-foreground flex items-center gap-2 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-200">
                    Start for free
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    No credit card required
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
