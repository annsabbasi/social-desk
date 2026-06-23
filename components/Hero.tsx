"use client"

import {
  Instagram,
  PenSquare,
  Users,
  BarChart3,
  CalendarClock,
  Heart,
  CheckCircle2,
  Play,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"

type FloatingCardProps = {
  icon: React.ReactNode
  label: string
  sublabel: string
  className?: string
  delay?: string
  accent?: string
}

function FloatingCard({ icon, label, sublabel, className, delay, accent }: FloatingCardProps) {
  return (
    <div
      className={`absolute hidden lg:flex items-center gap-3 rounded-2xl border border-border bg-card/80 px-4 py-3 shadow-lg shadow-foreground/5 backdrop-blur-md animate-[float_6s_ease-in-out_infinite] transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl ${className ?? ""}`}
      style={{ animationDelay: delay }}
    >
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent ?? "bg-secondary text-secondary-foreground"}`}>
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-semibold leading-tight text-card-foreground">{label}</span>
        <span className="text-xs leading-tight text-muted-foreground">{sublabel}</span>
      </span>
    </div>
  )
}

export default function Hero() {
  const benefits = ["No credit card required", "14-day free trial", "Cancel anytime"]
  const logos = ["Vercel", "Stripe", "Linear", "Notion", "Figma", "Slack"]

  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Keyframes for subtle floating motion */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
      `}</style>

      {/* Subtle radial glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, oklch(0.93 0.04 264 / 0.55), transparent 70%), radial-gradient(40% 40% at 85% 20%, oklch(0.9 0.06 320 / 0.4), transparent 70%), radial-gradient(45% 45% at 12% 30%, oklch(0.9 0.05 230 / 0.4), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28 lg:pt-32">
        {/* Visual area */}
        <div className="relative mx-auto h-[260px] w-full max-w-4xl sm:h-[320px]">
          {/* Connecting lines */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 hidden h-full w-full lg:block"
            preserveAspectRatio="none"
          >
            <line x1="22%" y1="32%" x2="50%" y2="50%" stroke="var(--border)" strokeWidth="1" />
            <line x1="20%" y1="68%" x2="50%" y2="50%" stroke="var(--border)" strokeWidth="1" />
            <line x1="6%" y1="50%" x2="50%" y2="50%" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 4" />
            <line x1="78%" y1="30%" x2="50%" y2="50%" stroke="var(--border)" strokeWidth="1" />
            <line x1="80%" y1="70%" x2="50%" y2="50%" stroke="var(--border)" strokeWidth="1" />
            <line x1="94%" y1="50%" x2="50%" y2="50%" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 4" />
          </svg>

          {/* Central dashboard card */}
          <div
            className="absolute left-1/2 top-1/2 w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-card p-4 shadow-2xl shadow-foreground/10 animate-[floatSlow_7s_ease-in-out_infinite] sm:w-[300px]"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <CalendarClock className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-card-foreground">Content Hub</span>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                <CheckCircle2 className="h-3 w-3 text-primary" />
                Published
              </span>
            </div>

            {/* Calendar row */}
            <div className="mb-3 grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex h-7 items-center justify-center rounded-md text-[10px] font-medium ${
                    i === 3
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Content management rows */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-lg border border-border p-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                  <PenSquare className="h-3.5 w-3.5" />
                </span>
                <div className="h-1.5 flex-1 rounded-full bg-muted">
                  <div className="h-1.5 w-3/4 rounded-full bg-primary" />
                </div>
              </div>

              {/* Analytics overview */}
              <div className="flex items-end gap-1.5 rounded-lg border border-border p-2">
                {[40, 65, 50, 80, 60, 95].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-muted" style={{ height: 38 }}>
                    <div
                      className="w-full rounded-t bg-primary"
                      style={{ height: `${h}%`, marginTop: `${100 - h}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Left cards */}
          <FloatingCard
            className="left-0 top-[18%]"
            delay="0s"
            icon={<Instagram className="h-5 w-5" />}
            label="Instagram"
            sublabel="3 posts queued"
            accent="bg-primary text-primary-foreground"
          />
          <FloatingCard
            className="left-[-2%] top-[58%]"
            delay="1.2s"
            icon={<PenSquare className="h-5 w-5" />}
            label="Create"
            sublabel="Draft a post"
          />
          <FloatingCard
            className="left-[10%] top-[92%]"
            delay="2s"
            icon={<Users className="h-5 w-5" />}
            label="Team"
            sublabel="4 collaborators"
          />

          {/* Right cards */}
          <FloatingCard
            className="right-0 top-[16%]"
            delay="0.6s"
            icon={<BarChart3 className="h-5 w-5" />}
            label="Analytics"
            sublabel="+24% reach"
            accent="bg-primary text-primary-foreground"
          />
          <FloatingCard
            className="right-[-2%] top-[58%]"
            delay="1.6s"
            icon={<CalendarClock className="h-5 w-5" />}
            label="Scheduled"
            sublabel="Today, 4:00 PM"
          />
          <FloatingCard
            className="right-[8%] top-[92%]"
            delay="2.4s"
            icon={<Heart className="h-5 w-5" />}
            label="Engagement"
            sublabel="1.2k interactions"
          />
        </div>

        {/* Headline */}
        <div className="mx-auto mt-10 max-w-3xl text-center sm:mt-14">
          <h1 className="text-balance text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            <span className="block">Schedule smarter.</span>
            <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Grow faster.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            The AI-powered social media platform that helps you create, schedule, and analyze
            content across all platforms in one place.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="w-full px-8 text-base shadow-lg shadow-foreground/10 sm:w-auto">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full gap-2 px-8 text-base sm:w-auto bg-transparent"
            >
              <Play className="h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Benefits row */}
          <ul className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary">
                  <Check className="h-3 w-3 text-primary" />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Trust section */}
        <div className="mt-16 border-t border-border pt-10">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Trusted by teams at
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60 grayscale">
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-lg font-semibold tracking-tight text-muted-foreground transition-opacity hover:opacity-100"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
