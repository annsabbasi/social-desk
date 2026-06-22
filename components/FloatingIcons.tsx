import Image from "next/image";
import { PlayCircle } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

const iconSize = 32;

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path d="M9 2v12c0 1.657 1.343 3 3 3 1.049 0 1.978-.532 2.53-1.35" stroke="#0f172a" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 7V2h-2v10c0 1.105.895 2 2 2 1.105 0 2-.895 2-2V4h2V2h-4Z" fill="#25F4EE" />
      <path d="M14 7V2h-2v10c0 1.105.895 2 2 2 1.105 0 2-.895 2-2V4h2V2h-4Z" stroke="#0f172a" strokeWidth="1.2" />
      <path d="M13.5 7.5c-1.657 0-3-1.343-3-3" stroke="#FF004F" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path d="M12 4.5c-3.59 0-6.5 2.91-6.5 6.5 0 1.7.69 3.24 1.8 4.35l3.85 3.85c1.1 1.1 2.9 1.1 4 0 1.1-1.1 1.1-2.9 0-4l-3.85-3.85a3.998 3.998 0 0 0-1.8-1.05" stroke="#4f46e5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 9.5V12l1.5 1.5" stroke="#ec4899" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type IconCardProps = {
  icon: ReactNode;
  label: string;
  style?: React.CSSProperties;
};

function IconCard({ icon, label, style }: IconCardProps) {
  return (
    <div
      className="absolute z-10 flex h-[140px] w-[140px] items-center justify-center rounded-[24px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
      style={style}
      aria-label={label}
    >
      <div className="flex h-full w-full items-center justify-center text-slate-950">
        {icon}
      </div>
    </div>
  );
}

export function FloatingIcons() {
  return (
    <div className="relative mx-auto h-[320px] w-full max-w-[900px]">
      <IconCard
        icon={<Image src="/Instagram-Logo.png" alt="Instagram" width={80} height={80} className="object-contain" />}
        label="Instagram"
        style={{ top: 0, left: "0%", transform: "rotate(-3deg)" }}
      />
      <IconCard
        icon={<Image src="/Facebook-Logo.png" alt="Facebook" width={80} height={80} className="object-contain" />}
        label="Facebook"
        style={{ top: 0, right: "0%", transform: "rotate(2deg)" }}
      />
      <IconCard
        icon={<Image src="/youtube-logo.webp" alt="YouTube" width={80} height={80} className="object-contain" />}
        label="YouTube"
        style={{ bottom: "25%", left: "15%", transform: "rotate(1deg)" }}
      />
    
      <IconCard
        icon={<Image src="/threads-icon.avif" alt="Threads" width={50} height={50} className="object-contain" />}
        label="Threads"
        style={{ bottom: "10%", left: "50%", transform: "translateX(-50%) rotate(-1deg)" }}
      />
      <IconCard
        icon={<Image src="/LinkedIn_icon.png" alt="LinkedIn" width={40} height={40} className="object-contain" />}
        label="LinkedIn"
        style={{ bottom: "25%", right: "18%", transform: "rotate(1deg)" }}
      />
    </div>
  );
}
