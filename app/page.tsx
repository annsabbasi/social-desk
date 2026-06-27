import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
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
  ChevronDown
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-linear-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Trusted by 10,000+ creators
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl text-foreground">
              Master your <span className="text-primary italic">Social Reach</span> with Olive-grade Precision
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
              The only social media management tool that combines professional analytics with an organic, intuitive workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20">
                Start for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base bg-background/50 backdrop-blur">
                <PlayCircle className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
            <div className="mt-16 w-full max-w-5xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-card border border-border rounded-xl shadow-2xl overflow-hidden aspect-[16/9] flex items-center justify-center">
                 <Layout className="h-20 w-20 text-primary/10" />
                 <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-transparent"></div>
                 <div className="absolute top-4 left-4 right-4 h-8 bg-muted/30 rounded-t-lg border-b border-border flex items-center px-4 gap-2">
                    <div className="w-2 h-2 rounded-full bg-destructive/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-foreground/50 pt-8">
                    [ Interactive Dashboard Preview ]
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section id="platforms" className="py-20 border-y border-border bg-muted/50">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-12">Integrated with your favorite platforms</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              {[
                { icon: <Twitter className="h-8 w-8" />, name: "Twitter" },
                { icon: <Linkedin className="h-8 w-8" />, name: "LinkedIn" },
                { icon: <svg role="img" viewBox="0 0 24 24" className="h-8 w-8 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>, name: "Pinterest" },
                { icon: <Instagram className="h-8 w-8" />, name: "Instagram" },
                { icon: <Facebook className="h-8 w-8" />, name: "Facebook" },
              ].map((platform, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {platform.icon}
                  <span className="font-bold text-lg">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-primary font-bold tracking-tight mb-4 italic text-lg">— FEATURES</h2>
                <h3 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to grow your digital presence</h3>
              </div>
              <p className="text-muted-foreground max-w-xs text-right">
                Professional tools built for teams that care about consistency and results.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Calendar className="h-6 w-6" />,
                  title: "Smart Scheduling",
                  desc: "Visual calendar that helps you plan weeks of content in minutes. Drag-and-drop simplicity."
                },
                {
                  icon: <BarChart3 className="h-6 w-6" />,
                  title: "Advanced Analytics",
                  desc: "Get deep insights into what works. Track engagement, reach, and conversion across all channels."
                },
                {
                  icon: <Zap className="h-6 w-6" />,
                  title: "AI Power-ups",
                  desc: "Let our AI suggest the best hashtags, optimal posting times, and even draft your captions."
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Team Collaboration",
                  desc: "Seamlessly manage approvals and feedback with your team and clients in one place."
                },
                {
                  icon: <MessageSquare className="h-6 w-6" />,
                  title: "Unified Inbox",
                  desc: "Respond to comments and messages from all platforms in a single, organized stream."
                },
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: "Enterprise Security",
                  desc: "Role-based access control and advanced security to keep your brand accounts safe."
                }
              ].map((feature, idx) => (
                <Card key={idx} className="bg-card/50 border-border hover:border-primary/50 transition-colors group">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed mt-2">
                      {feature.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">How it Works</h2>
              <p className="text-primary-foreground/70 text-lg">
                Go from zero to a fully automated social presence in three simple steps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: "01", title: "Connect Accounts", desc: "Link all your social profiles securely in one click." },
                { step: "02", title: "Plan & Create", desc: "Use our visual editor and AI tools to craft the perfect posts." },
                { step: "03", title: "Scale & Grow", desc: "Watch your engagement soar with automated posting and insights." }
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="text-8xl font-black opacity-10 absolute -top-8 -left-4 select-none">
                    {item.step}
                  </div>
                  <h4 className="text-2xl font-bold mb-4 relative z-10">{item.title}</h4>
                  <p className="text-primary-foreground/80 leading-relaxed relative z-10">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Loved by digital marketing teams</h2>
              <div className="flex justify-center gap-1 text-primary">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "SocialDesk transformed how we handle our clients' Meta accounts. The scheduling is flawless.",
                  author: "Sarah J.",
                  role: "Agency Director"
                },
                {
                  quote: "The olive theme is just the start. The AI insights actually improved our reach by 40% in two months.",
                  author: "Marcus K.",
                  role: "Growth Marketer"
                },
                {
                  quote: "Simple, powerful, and aesthetic. Finally a tool that doesn't feel like it was built in 2005.",
                  author: "Elena R.",
                  role: "Content Creator"
                }
              ].map((t, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-background border border-border shadow-sm">
                  <p className="italic text-lg mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {t.author[0]}
                    </div>
                    <div>
                      <div className="font-bold">{t.author}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, transparent pricing</h2>
              <p className="text-muted-foreground text-lg">
                Choose the plan that fits your growth stage. No hidden fees.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Free",
                  price: "0",
                  desc: "Perfect for getting started",
                  features: ["3 Social Accounts", "10 Posts per month", "Basic Analytics", "1 Team Member"]
                },
                {
                  name: "Pro",
                  price: "29",
                  desc: "For growing brands",
                  features: ["15 Social Accounts", "Unlimited Posts", "Advanced AI Tools", "5 Team Members", "Custom Reports"],
                  popular: true
                },
                {
                  name: "Agency",
                  price: "99",
                  desc: "For large organizations",
                  features: ["Unlimited Accounts", "Unlimited Everything", "API Access", "Priority Support", "White Labeling"]
                }
              ].map((plan, idx) => (
                <div key={idx} className={`relative flex flex-col p-8 rounded-2xl border ${plan.popular ? 'border-primary shadow-xl shadow-primary/10' : 'border-border'} bg-card`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-8">{plan.desc}</p>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.popular ? "default" : "outline"} className="w-full h-12 rounded-xl">
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-muted/50 border-t border-border">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Can I cancel my subscription at any time?", a: "Yes, you can cancel your subscription at any time from your account settings. You will continue to have access until the end of your billing cycle." },
                { q: "Do you offer a free trial?", a: "We have a generous free-forever plan that allows you to explore the basic features of SocialDesk." },
                { q: "Which social platforms do you support?", a: "We currently support Twitter, LinkedIn, Pinterest, and Meta (Instagram and Facebook). We are working on adding TikTok and Threads soon." },
                { q: "Can I manage multiple clients with one account?", a: "Absolutely! Our Agency plan is specifically designed for multi-client management with team collaboration features." }
              ].map((faq, idx) => (
                <div key={idx} className="bg-background rounded-xl border border-border p-6 cursor-pointer hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="font-bold text-lg">{faq.q}</h4>
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="bg-primary rounded-[3rem] p-8 md:p-20 text-primary-foreground flex flex-col items-center text-center gap-8 overflow-hidden relative shadow-2xl shadow-primary/20">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Ready to grow your social reach?</h2>
                <p className="text-primary-foreground/80 text-xl mb-10">
                  Join 10,000+ creators and businesses who use SocialDesk to master their online presence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold shadow-lg shadow-black/10">
                    Get Started for Free
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-10 text-lg bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10">
                    Talk to an Expert
                  </Button>
                </div>
              </div>

              {/* Floating icons for visual interest */}
              <div className="absolute top-10 left-10 opacity-10 animate-bounce">
                <Users className="h-16 w-16" />
              </div>
              <div className="absolute bottom-10 right-10 opacity-10 animate-pulse">
                <Zap className="h-20 w-20" />
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-tr from-black/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
