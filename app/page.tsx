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
  Layout
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Trusted by 10,000+ creators
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl">
              Elevate your <span className="text-primary">Social Presence</span> with intelligence
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
              Schedule, analyze, and grow your audience across all platforms from a single, beautiful dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-12 px-8 text-base">
                Start for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Watch Demo
              </Button>
            </div>
            <div className="mt-16 w-full max-w-5xl relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-card border border-border rounded-xl shadow-2xl overflow-hidden aspect-[16/9] flex items-center justify-center">
                 <Layout className="h-20 w-20 text-muted/20" />
                 <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-muted-foreground/50">
                    [ Dashboard Preview Image ]
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section id="platforms" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-12">Connect all your accounts</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { icon: <Twitter className="h-6 w-6" />, name: "Twitter / X", color: "text-[#1DA1F2]" },
                { icon: <Linkedin className="h-6 w-6" />, name: "LinkedIn", color: "text-[#0077B5]" },
                { icon: <svg role="img" viewBox="0 0 24 24" className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>, name: "Pinterest", color: "text-[#BD081C]" },
                { icon: <Instagram className="h-6 w-6" />, name: "Meta / Instagram", color: "text-[#E4405F]" },
                { icon: <Facebook className="h-6 w-6" />, name: "Meta / Facebook", color: "text-[#1877F2]" },
              ].map((platform, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 p-6 bg-background rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className={platform.color}>{platform.icon}</div>
                  <span className="font-medium">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to scale</h2>
              <p className="text-muted-foreground">
                Powerful features designed to help you save time and make better decisions for your social media strategy.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-card/50">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <CardTitle>Smart Scheduling</CardTitle>
                  <CardDescription>
                    Plan and schedule your content across all platforms with a unified calendar view.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-card/50">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>
                    Deep dive into your performance metrics to understand what resonates with your audience.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-card/50">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <Zap className="h-6 w-6" />
                  </div>
                  <CardTitle>AI Insights</CardTitle>
                  <CardDescription>
                    Get AI-powered recommendations on the best times to post and content ideas.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="bg-primary rounded-3xl p-8 md:p-16 text-primary-foreground flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
              <div className="relative z-10 max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to grow your social reach?</h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  Join thousands of creators and businesses who use SocialDesk to manage their online presence.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" variant="secondary" className="h-12 px-8">
                    Get Started Now
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10">
                    Contact Sales
                  </Button>
                </div>
              </div>
              <div className="relative z-10 flex items-center justify-center">
                <Users className="h-32 w-32 opacity-20" />
              </div>
              {/* Decorative circle */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
