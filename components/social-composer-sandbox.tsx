"use client";

import React, { useState } from "react";
import { Sparkles, Image, Hash, AtSign, BarChart2, X } from "lucide-react";

const PLATFORMS = ["X (Twitter)", "LinkedIn", "Instagram"] as const;
type Platform = typeof PLATFORMS[number];

const CHAR_LIMITS: Record<Platform, number> = {
  "X (Twitter)": 280,
  LinkedIn: 3000,
  Instagram: 2200,
};

const PLATFORM_COLORS: Record<Platform, string> = {
  "X (Twitter)": "#1A1714",
  LinkedIn: "#0A66C2",
  Instagram: "#C13584",
};

const AI_SUGGESTIONS: Record<Platform, string> = {
  "X (Twitter)": "Transform your social media workflow. SocialDesk brings every inbox, post, and insight into one elegant workspace — built for teams that move fast. #SocialMedia #Productivity",
  LinkedIn: "We built SocialDesk because managing multiple social platforms shouldn't feel like a second job.\n\nEvery reply. Every comment. Every DM — unified into one beautifully organised workspace. With AI-assisted drafts, a visual content calendar, and deep analytics, your team can focus on what actually matters: genuine connection.\n\nReady to transform your workflow?",
  Instagram: "One workspace. Every platform. Zero chaos. ✨\n\nMeet SocialDesk — the tool that brings your entire social presence together. Schedule posts, manage conversations, and track performance from a single, beautiful dashboard.\n\nLink in bio to start your free trial. 🔗\n\n#SocialMediaManagement #ContentCreator #ProductivityTools #SocialDesk",
};

export function SocialComposerSandbox() {
  const [platform, setPlatform] = useState<Platform>("X (Twitter)");
  const [text, setText] = useState("Introducing SocialDesk — the workspace built for social teams who value clarity, speed, and elegance.");
  const [hasImage, setHasImage] = useState(false);
  const [generating, setGenerating] = useState(false);

  const limit = CHAR_LIMITS[platform];
  const remaining = limit - text.length;
  const pct = Math.min((text.length / limit) * 100, 100);

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => {
      setText(AI_SUGGESTIONS[platform]);
      setGenerating(false);
    }, 900);
  }

  return (
    <div style={{ background: "#FAFAF8", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Platform tabs */}
      <div className="flex border-b" style={{ borderColor: "rgba(224,216,206,0.5)" }}>
        {PLATFORMS.map(p => (
          <button key={p} onClick={() => setPlatform(p)}
            className="flex-1 py-3 text-[11px] font-medium border-b-2 transition-colors"
            style={{
              borderColor: platform === p ? PLATFORM_COLORS[p] : "transparent",
              color: platform === p ? PLATFORM_COLORS[p] : "#9E9892",
              background: "transparent",
            }}>
            {p}
          </button>
        ))}
      </div>

      <div className="p-5">
        {/* Avatar + textarea */}
        <div className="flex gap-3 mb-4">
          <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-semibold text-white"
            style={{ background: PLATFORM_COLORS[platform] }}>
            SD
          </div>
          <div className="flex-1">
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              rows={5}
              className="w-full resize-none text-[13px] leading-[1.75] outline-none bg-transparent"
              style={{ color: "#1A1714", caretColor: "#B5935A" }}
              placeholder="What would you like to share?"
            />
            {hasImage && (
              <div className="relative rounded-lg overflow-hidden mt-2"
                style={{ border: "1px solid rgba(224,216,206,0.6)" }}>
                <div className="h-32 flex items-center justify-center text-[11px]"
                  style={{ background: "rgba(240,235,227,0.5)", color: "#9E9892" }}>
                  Image attached
                </div>
                <button onClick={() => setHasImage(false)}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(26,23,20,0.5)" }}>
                  <X size={10} className="text-white" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "rgba(224,216,206,0.5)" }}>
          <div className="flex items-center gap-1">
            <button onClick={() => setHasImage(v => !v)}
              className="p-2 rounded-lg transition-colors hover:bg-[rgba(240,235,227,0.8)]"
              title="Attach image">
              <Image size={14} style={{ color: hasImage ? "#B5935A" : "#9E9892" }} />
            </button>
            <button className="p-2 rounded-lg transition-colors hover:bg-[rgba(240,235,227,0.8)]">
              <Hash size={14} style={{ color: "#9E9892" }} />
            </button>
            <button className="p-2 rounded-lg transition-colors hover:bg-[rgba(240,235,227,0.8)]">
              <AtSign size={14} style={{ color: "#9E9892" }} />
            </button>
            <button className="p-2 rounded-lg transition-colors hover:bg-[rgba(240,235,227,0.8)]">
              <BarChart2 size={14} style={{ color: "#9E9892" }} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Character ring */}
            <div className="relative w-7 h-7">
              <svg className="w-7 h-7 -rotate-90" viewBox="0 0 28 28">
                <circle cx="14" cy="14" r="11" fill="none" strokeWidth="2" stroke="rgba(224,216,206,0.6)" />
                <circle cx="14" cy="14" r="11" fill="none" strokeWidth="2"
                  stroke={remaining < 20 ? "#C13584" : remaining < 50 ? "#FFBD2E" : "#B5935A"}
                  strokeDasharray={`${2 * Math.PI * 11}`}
                  strokeDashoffset={`${2 * Math.PI * 11 * (1 - pct / 100)}`}
                  strokeLinecap="round" />
              </svg>
              {remaining < 50 && (
                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-medium"
                  style={{ color: remaining < 20 ? "#C13584" : "#9E9892" }}>
                  {remaining}
                </span>
              )}
            </div>

            <button onClick={handleGenerate} disabled={generating}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all"
              style={{ background: "rgba(181,147,90,0.1)", color: "#B5935A", border: "1px solid rgba(181,147,90,0.25)" }}>
              <Sparkles size={12} className={generating ? "animate-spin" : ""} />
              {generating ? "Writing…" : "AI Improve"}
            </button>

            <button className="px-4 py-1.5 rounded-lg text-[11px] font-medium text-white transition-all"
              style={{ background: PLATFORM_COLORS[platform] }}>
              Schedule
            </button>
          </div>
        </div>

        {/* Preview label */}
        <p className="mt-4 text-[10px]" style={{ color: "#9E9892" }}>
          Formatted for <span style={{ color: "#B5935A" }}>{platform}</span> · {text.length}/{limit} characters
        </p>
      </div>
    </div>
  );
}
