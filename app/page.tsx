import { Check, Share2, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = ["Product", "Features", "Pricing", "Resources"]

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="Primary"
          className="flex w-full max-w-2xl items-center justify-between gap-2 rounded-full border border-border bg-card/80 p-1.5 pl-5 shadow-sm backdrop-blur-md"
        >
          <a href="#" className="flex items-center gap-2 pr-2">
            <span className="flex size-5 items-center justify-center rounded-md bg-foreground text-[10px] font-bold text-background">
              S
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground">SocialDesk</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="hidden rounded-full px-4 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground sm:inline-flex"
            >
              Sign in
            </Button>
            <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              Request a Demo
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:pt-40">
        {/* Subtle background gradients */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 30% 20%, color-mix(in oklch, var(--brand-purple) 12%, transparent), transparent), radial-gradient(50% 45% at 75% 30%, color-mix(in oklch, var(--brand-blue) 10%, transparent), transparent)",
          }}
        />
        <div className="mx-auto max-w-5xl">
          {/* Node graph */}
          <div className="relative mx-auto h-[300px] w-full max-w-4xl sm:h-[340px]">
            {/* Connecting lines */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 800 340"
              fill="none"
              preserveAspectRatio="none"
            >
              <g stroke="var(--border)" strokeWidth="1.5">
                <path d="M150 150 L250 110" />
                <path d="M150 190 L250 230" />
                <path d="M250 110 L400 170" />
                <path d="M250 230 L400 170" />
                <path d="M400 170 L560 110" />
                <path d="M400 170 L560 230" />
                <path d="M560 110 L680 170" />
                <path d="M560 230 L640 250" />
              </g>
              <g>
                <circle cx="250" cy="110" r="4" fill="var(--brand-yellow)" />
                <circle cx="250" cy="230" r="4" fill="var(--brand-blue)" />
                <circle cx="560" cy="110" r="4" fill="var(--brand-red)" />
                <circle cx="560" cy="230" r="4" fill="var(--brand-purple)" />
              </g>
            </svg>

            {/* Pinterest */}
            <FloatCard className="left-[2%] top-[34%]" delay="0s">
              <IconCard bg="oklch(0.55 0.21 22)" tint="oklch(0.99 0 0)">
                <SocialIcon name="pinterest" />
              </IconCard>
            </FloatCard>

            {/* Instagram */}
            <FloatCard className="left-[26%] top-[12%]" delay="0.6s">
              <IconCard bg="oklch(0.62 0.21 12)" tint="oklch(0.99 0 0)">
                <SocialIcon name="instagram" />
              </IconCard>
            </FloatCard>

            {/* Facebook */}
            <FloatCard className="left-[26%] top-[58%]" delay="1.1s">
              <IconCard bg="var(--brand-blue)" tint="oklch(0.99 0 0)">
                <SocialIcon name="facebook" />
              </IconCard>
            </FloatCard>

            {/* Central purple */}
            <FloatCard className="left-1/2 top-[42%] -translate-x-1/2" delay="0.3s">
              <div
                className="flex size-24 items-center justify-center rounded-3xl shadow-xl sm:size-28"
                style={{ background: "var(--brand-purple)" }}
              >
                <span className="flex size-12 items-center justify-center rounded-full border-2 border-white/70 sm:size-14">
                  <Share2 className="size-6 text-white sm:size-7" strokeWidth={2.4} />
                </span>
              </div>
            </FloatCard>

            {/* YouTube */}
            <FloatCard className="right-[26%] top-[12%]" delay="0.9s">
              <IconCard bg="var(--brand-red)" tint="oklch(0.99 0 0)">
                <SocialIcon name="youtube" />
              </IconCard>
            </FloatCard>

            {/* X */}
            <FloatCard className="right-[2%] top-[34%]" delay="0.5s">
              <IconCard bg="oklch(0.2 0 0)" tint="oklch(0.99 0 0)">
                <SocialIcon name="x" size="size-6" />
              </IconCard>
            </FloatCard>

            {/* TikTok */}
            <FloatCard className="right-[18%] top-[64%]" delay="1.3s">
              <IconCard bg="oklch(0.18 0 0)" tint="oklch(0.99 0 0)">
                <SocialIcon name="tiktok" />
              </IconCard>
            </FloatCard>
          </div>

          {/* Copy */}
          <div className="relative mx-auto -mt-4 max-w-3xl text-center">
            <h1 className="text-balance text-5xl font-bold leading-[0.95] tracking-tight text-foreground sm:text-7xl">
              Schedule smarter.
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--primary), var(--brand-blue))",
                }}
              >
                Grow faster.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              The AI-powered social media platform that helps you create, schedule, and analyze content across all
              platforms in one place.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="rounded-xl bg-primary px-8 py-6 text-base font-medium text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
              >
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-border bg-card px-8 py-6 text-base font-medium text-foreground hover:bg-muted"
              >
                <Play className="size-4 fill-current" strokeWidth={0} />
                Watch Demo
              </Button>
            </div>

            <ul className="mt-8 flex flex-col items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground sm:flex-row">
              {["No credit card required", "14-day free trial", "Cancel anytime"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Trust strip */}
          <div className="relative mx-auto mt-20 max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Trusted by teams at</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-60">
              {["Vercel", "Stripe", "Linear", "Notion", "Figma", "Slack"].map((name) => (
                <span key={name} className="text-xl font-semibold tracking-tight text-foreground">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function FloatCard({
  children,
  className,
  delay,
}: {
  children: React.ReactNode
  className?: string
  delay: string
}) {
  return (
    <div className={`absolute ${className ?? ""}`}>
      <div className="animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: delay }}>
        {children}
      </div>
    </div>
  )
}

function IconCard({
  children,
  bg,
  tint,
}: {
  children: React.ReactNode
  bg: string
  tint: string
}) {
  return (
    <div
      className="flex size-14 items-center justify-center rounded-2xl border border-border/50 shadow-lg sm:size-16"
      style={{ background: bg, color: tint }}
    >
      {children}
    </div>
  )
}

function SocialIcon({ name, size = "size-7" }: { name: string; size?: string }) {
  return (
    <span
      role="img"
      aria-label={name}
      className={size}
      style={{
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(/social/${name}.svg)`,
        maskImage: `url(/social/${name}.svg)`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  )
}
