"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  BarChart3,
  Calendar,
  Zap,
  Users,
  ArrowRight,
  Layout,
  CheckCircle2,
  PlayCircle,
  MessageSquare,
  Shield,
  Star,
  ChevronDown,
  Globe,
  Sparkles,
  MousePointer2,
  Rocket
} from "lucide-react";
import React from "react";

const SectionHeader = ({ title, subtitle, label }: { title: string, subtitle: string, label?: string }) => (
  <div className="flex flex-col items-center text-center mb-20">
    {label && (
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-primary font-bold tracking-widest text-xs uppercase mb-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10"
      >
        {label}
      </motion.span>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-transparent"
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-muted-foreground text-lg max-w-2xl"
    >
      {subtitle}
    </motion.p>
  </div>
);

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/30 selection:text-primary-foreground overflow-x-hidden">
      <Navbar />

      <main className="flex-grow relative">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-[120vh] pointer-events-none -z-10 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 100, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -45, 0],
              x: [0, -50, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[20%] -right-[5%] w-[40%] h-[50%] bg-primary/10 rounded-full blur-[100px]"
          />
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 p-1 rounded-full bg-linear-to-r from-primary/20 via-primary/40 to-primary/20 backdrop-blur-md border border-primary/30 inline-flex items-center gap-2 pr-4"
              >
                <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ml-1">New</span>
                <span className="text-xs font-medium text-foreground/80">AI-Powered Analytics 2.0 is now live</span>
                <ArrowRight className="h-3 w-3 text-primary" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8 bg-linear-to-b from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent italic"
              >
                SOCIAL MEDIA <br />
                <span className="text-primary not-italic">REMASTERED.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
              >
                The ultimate command center for modern digital architects.
                Manage, automate, and dominate across every platform.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-6 items-center"
              >
                <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-transform active:scale-95">
                  Launch Command Center
                  <Rocket className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-10 text-lg rounded-2xl bg-background/50 backdrop-blur border-border/50 hover:bg-muted/50 transition-colors">
                  View Blueprints
                </Button>
              </motion.div>
            </div>

            {/* Outclass Dashboard Preview */}
            <motion.div
              style={{ scale, opacity }}
              className="mt-24 relative max-w-6xl mx-auto group"
            >
              <div className="absolute -inset-1 bg-linear-to-r from-primary/50 via-primary/20 to-primary/50 rounded-[2.5rem] blur-2xl opacity-30 transition duration-1000 group-hover:opacity-50"></div>
              <div className="relative bg-black/5 dark:bg-white/5 backdrop-blur-3xl rounded-[2rem] border border-white/20 p-4 shadow-2xl shadow-primary/10 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-10 border-b border-white/10 flex items-center px-6 gap-2 bg-white/5">
                   <div className="flex gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                   </div>
                   <div className="mx-auto text-[10px] text-white/30 font-mono tracking-widest uppercase">dashboard.socialdesk.io</div>
                </div>
                <div className="pt-10 aspect-video bg-linear-to-br from-primary/5 via-background to-primary/5 flex items-center justify-center overflow-hidden">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Layout className="h-32 w-32 text-primary/20" />
                  </motion.div>
                  {/* Decorative Dashboard Elements */}
                  <div className="absolute top-20 left-10 w-48 h-32 rounded-xl bg-white/5 border border-white/10 p-4">
                     <div className="w-full h-2 bg-primary/20 rounded-full mb-3"></div>
                     <div className="w-2/3 h-2 bg-white/10 rounded-full mb-6"></div>
                     <div className="flex justify-between items-end h-10">
                        <div className="w-2 bg-primary/40 rounded-t-sm h-[40%]"></div>
                        <div className="w-2 bg-primary/60 rounded-t-sm h-[70%]"></div>
                        <div className="w-2 bg-primary/80 rounded-t-sm h-[90%]"></div>
                        <div className="w-2 bg-primary/40 rounded-t-sm h-[50%]"></div>
                     </div>
                  </div>
                  <div className="absolute bottom-10 right-10 w-64 h-40 rounded-xl bg-white/5 border border-white/10 p-6 flex flex-col gap-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                        <div className="flex-1 space-y-1.5">
                           <div className="w-full h-1.5 bg-white/10 rounded-full"></div>
                           <div className="w-1/2 h-1.5 bg-white/5 rounded-full"></div>
                        </div>
                     </div>
                     <div className="flex-1 bg-white/5 rounded-lg flex items-center justify-center font-mono text-[8px] text-white/20 uppercase tracking-[0.2em]">Live Feed Analytics</div>
                  </div>
                </div>
              </div>

              {/* Floating SVG Animation Elements */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-12 w-24 h-24 bg-primary/20 rounded-full blur-xl mix-blend-screen"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-16 -left-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl mix-blend-screen"
              />
            </motion.div>
          </div>
        </section>

        {/* Marquee Platform Section */}
        <section className="py-20 border-y border-white/5 bg-primary/5 backdrop-blur-sm overflow-hidden">
          <div className="flex gap-16 whitespace-nowrap overflow-hidden group">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-16 items-center"
            >
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-default">
                    <Twitter className="h-10 w-10" /> <span className="text-3xl font-bold tracking-tighter">TWITTER</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-default">
                    <Linkedin className="h-10 w-10" /> <span className="text-3xl font-bold tracking-tighter">LINKEDIN</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-default">
                    <Instagram className="h-10 w-10" /> <span className="text-3xl font-bold tracking-tighter">INSTAGRAM</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-default">
                    <Facebook className="h-10 w-10" /> <span className="text-3xl font-bold tracking-tighter">FACEBOOK</span>
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-default">
                    <svg role="img" viewBox="0 0 24 24" className="h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg> <span className="text-3xl font-bold tracking-tighter">PINTEREST</span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="features" className="py-40">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader
              label="Intelligence"
              title="Built for the high-frequency creator"
              subtitle="Proprietary tech that works faster than you can think. Scale your brand across the digital landscape."
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[800px]">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="md:col-span-8 relative rounded-[2.5rem] bg-linear-to-br from-primary/20 via-primary/5 to-primary/20 border border-white/10 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-12 h-full flex flex-col">
                  <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mb-8 shadow-xl shadow-primary/30">
                    <Sparkles className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-4xl font-bold mb-4">Neural Post Engine</h3>
                  <p className="text-lg text-muted-foreground max-w-md">Our AI doesn't just write captions; it understands your brand voice and predicts engagement metrics before you hit send.</p>
                  <div className="mt-auto pt-12 flex items-center gap-6">
                    <div className="flex -space-x-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-12 w-12 rounded-full border-2 border-background bg-muted" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Join 12k+ Power Users</span>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/10 to-transparent pointer-events-none" />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="md:col-span-4 relative rounded-[2.5rem] bg-card border border-white/10 overflow-hidden p-12 group"
              >
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-8">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Real-time <br />Flow State</h3>
                <p className="text-muted-foreground leading-relaxed">Latency-free analytics that update as the world reacts to your content.</p>
                <div className="mt-8 h-24 bg-primary/5 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden">
                   <motion.div
                    animate={{ x: [-100, 100] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-full h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent blur-sm"
                   />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="md:col-span-4 relative rounded-[2.5rem] bg-card border border-white/10 overflow-hidden p-12 group"
              >
                <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-8">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Global Reach</h3>
                <p className="text-muted-foreground leading-relaxed">Optimize posting times for every timezone automatically.</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="md:col-span-8 relative rounded-[2.5rem] bg-linear-to-br from-muted via-card to-muted border border-white/10 overflow-hidden p-12 group"
              >
                <div className="flex flex-col md:flex-row gap-12 items-center h-full">
                  <div className="flex-1">
                    <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mb-8 shadow-xl shadow-primary/30">
                      <Users className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-4xl font-bold mb-4">Atomic Approval</h3>
                    <p className="text-lg text-muted-foreground">The most efficient feedback loop for agencies. One-click approvals from clients.</p>
                  </div>
                  <div className="flex-1 w-full flex flex-col gap-4">
                    <div className="h-14 bg-white/5 rounded-xl border border-white/10 flex items-center px-4 justify-between">
                       <span className="text-sm font-medium">Post Draft #412</span>
                       <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 font-bold uppercase">Pending</span>
                    </div>
                    <div className="h-14 bg-white/5 rounded-xl border border-white/10 flex items-center px-4 justify-between translate-x-4">
                       <span className="text-sm font-medium">Campaign: Summer 24</span>
                       <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-500 font-bold uppercase">Approved</span>
                    </div>
                    <div className="h-14 bg-white/5 rounded-xl border border-white/10 flex items-center px-4 justify-between translate-x-8">
                       <span className="text-sm font-medium">Reels Optimization</span>
                       <span className="text-[10px] px-2 py-0.5 rounded bg-primary/20 text-primary font-bold uppercase">Ready</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Workflows with SVG Path Animation */}
        <section className="py-40 bg-black/5 dark:bg-white/5 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block"
                >
                  Blueprint
                </motion.span>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight italic uppercase tracking-tighter">
                  How we build your <br />
                  <span className="text-primary not-italic">Empire.</span>
                </h2>
                <div className="space-y-12">
                  {[
                    { step: "01", title: "Sync the Grid", desc: "One-click OAuth integration with every social protocol. Secure, encrypted, and instantaneous." },
                    { step: "02", title: "Automate Intent", desc: "Set your strategy and let our AI agents handle the repetitive grunt work." },
                    { step: "03", title: "Optimize Output", desc: "Analyze the data flow and adjust your trajectory for maximum growth." }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2 }}
                      className="flex gap-8 group"
                    >
                      <div className="text-4xl font-black text-primary/20 group-hover:text-primary transition-colors duration-500 shrink-0 select-none">{item.step}</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 uppercase tracking-wide group-hover:translate-x-2 transition-transform duration-500">{item.title}</h4>
                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-square flex items-center justify-center">
                 <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
                 <svg viewBox="0 0 200 200" className="w-full h-full max-w-md drop-shadow-2xl">
                    <motion.path
                      d="M100 20 C140 20 180 60 180 100 C180 140 140 180 100 180 C60 180 20 140 20 100 C20 60 60 20 100 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-primary/20"
                    />
                    <motion.circle
                      cx="100" cy="20" r="4"
                      className="fill-primary"
                      animate={{
                        offsetDistance: ["0%", "100%"]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      style={{
                        offsetPath: "path('M100 20 C140 20 180 60 180 100 C180 140 140 180 100 180 C60 180 20 140 20 100 C20 60 60 20 100 20')"
                      }}
                    />
                    <motion.path
                      d="M40 100 L160 100"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-primary/20"
                    />
                    <motion.path
                      d="M100 40 L100 160"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-primary/20"
                    />
                    <g className="text-primary">
                      <rect x="85" y="85" width="30" height="30" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
                      <path d="M100 90 L100 110 M90 100 L110 100" stroke="currentColor" strokeWidth="1" />
                    </g>
                 </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section - Ultra Modern */}
        <section id="pricing" className="py-40">
          <div className="container mx-auto px-4 md:px-8">
            <SectionHeader
              label="Pricing"
              title="Scale at the speed of thought"
              subtitle="Choose your tier and unlock the future of social management."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "SOLO",
                  price: "0",
                  features: ["3 Accounts", "Essential AI", "Daily Analytics"]
                },
                {
                  name: "ELITE",
                  price: "49",
                  features: ["20 Accounts", "Full AI Suite", "Instant Approvals", "Priority Flow"],
                  featured: true
                },
                {
                  name: "EMPIRE",
                  price: "199",
                  features: ["Unlimited Sync", "Custom AI Models", "White Label Command", "Dedicated Architect"]
                }
              ].map((plan, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  className={`p-10 rounded-[3rem] border flex flex-col h-full group transition-all duration-500 ${plan.featured ? 'bg-primary text-primary-foreground border-primary shadow-2xl shadow-primary/30' : 'bg-card border-white/5 hover:border-primary/50'}`}
                >
                  <div className={`text-xs font-black tracking-[0.3em] uppercase mb-12 ${plan.featured ? 'text-primary-foreground/50' : 'text-primary'}`}>{plan.name}</div>
                  <div className="flex items-baseline gap-2 mb-12">
                    <span className="text-6xl font-black italic leading-none">${plan.price}</span>
                    <span className={`text-sm uppercase font-bold tracking-widest ${plan.featured ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>/mo</span>
                  </div>
                  <div className="space-y-6 flex-grow mb-12">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-4 text-sm font-medium">
                        <div className={`h-1.5 w-1.5 rounded-full ${plan.featured ? 'bg-primary-foreground' : 'bg-primary'}`} />
                        {f}
                      </div>
                    ))}
                  </div>
                  <Button
                    variant={plan.featured ? "secondary" : "default"}
                    className={`h-16 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-500 ${plan.featured ? 'bg-white text-black hover:bg-white/90' : 'group-hover:shadow-lg group-hover:shadow-primary/20'}`}
                  >
                    Select Plan
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Outclass CTA Section */}
        <section className="py-40">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="bg-primary rounded-[4rem] p-12 md:p-32 text-center relative overflow-hidden group"
            >
              <div className="relative z-10">
                <h2 className="text-5xl md:text-9xl font-black text-primary-foreground tracking-tighter leading-[0.8] italic uppercase mb-12">
                  THE FUTURE <br />
                  <span className="text-black not-italic opacity-80">IS YOURS.</span>
                </h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
                   <Button size="lg" variant="secondary" className="h-20 px-16 rounded-[2rem] text-xl font-black uppercase tracking-widest bg-white text-black hover:scale-105 transition-transform">
                      Get Started Now
                   </Button>
                   <div className="text-primary-foreground/60 text-sm font-medium tracking-widest flex items-center gap-2">
                      <Globe className="h-4 w-4" /> NO CREDIT CARD REQUIRED
                   </div>
                </div>
              </div>

              {/* Massive Decorative SVG Pattern */}
              <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
                 <motion.svg
                  animate={{ rotate: 360 }}
                  transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                  viewBox="0 0 100 100" className="w-[150%] h-[150%]"
                 >
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 2" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 1" />
                    <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.1" />
                 </motion.svg>
              </div>
              <div className="absolute inset-0 bg-linear-to-tr from-black/20 to-transparent pointer-events-none"></div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
