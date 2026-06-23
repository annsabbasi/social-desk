import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  showText?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function Logo({
  showText = true,
  className = "",
  iconClassName = "",
  textClassName = "",
  ...props
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Dynamic Gradient Icon */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${iconClassName}`}
        {...props}
      >
        <defs>
          <linearGradient id="logo-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" /> {/* Violet-500 */}
            <stop offset="50%" stopColor="#EC4899" /> {/* Pink-500 */}
            <stop offset="100%" stopColor="#3B82F6" /> {/* Blue-500 */}
          </linearGradient>
          <filter id="logo-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#8B5CF6" floodOpacity="0.3" />
          </filter>
        </defs>
        
        {/* Abstract "Desk" with connection curves */}
        {/* External ring */}
        <circle cx="16" cy="16" r="14" stroke="url(#logo-grad-primary)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="64 20" />
        
        {/* Core elements representing multiple platforms grouping onto one desk */}
        <rect x="10" y="10" width="12" height="12" rx="3" fill="url(#logo-grad-primary)" filter="url(#logo-glow)" />
        <circle cx="21" cy="21" r="3.5" fill="#ffffff" className="dark:fill-black" />
        <circle cx="21" cy="21" r="2" fill="url(#logo-grad-primary)" />
      </svg>
      
      {showText && (
        <span className={`text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 ${textClassName}`}>
          Social<span className="bg-gradient-to-r from-violet-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">Desk</span>
        </span>
      )}
    </div>
  );
}
