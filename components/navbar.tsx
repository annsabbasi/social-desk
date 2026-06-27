import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Share2 className="h-6 w-6 text-primary" />
          <span>SocialDesk</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="#platforms" className="text-muted-foreground hover:text-foreground transition-colors">Platforms</Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex">Log in</Button>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </header>
  );
}
