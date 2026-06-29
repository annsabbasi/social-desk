"use client";

import React, { useState } from "react";
import { Check, BarChart2, Calendar, Inbox, Settings, Bell, Search, ArrowUpRight, Heart, MessageCircle, Repeat2 } from "lucide-react";

const TABS = ["Universal Inbox", "Visual Calendar", "Analytics"] as const;
type Tab = typeof TABS[number];

const MESSAGES = [
  { platform: "X", handle: "@techfounder", avatar: "TF", msg: "Absolutely love the new scheduling flow — saved our team hours this week.", time: "2m", unread: true },
  { platform: "LinkedIn", handle: "Sarah Chen", avatar: "SC", msg: "Could you share more details about the enterprise plan pricing?", time: "14m", unread: true },
  { platform: "Instagram", handle: "@brandstudio", avatar: "BS", msg: "Reposted your latest carousel. The reach was incredible 🔥", time: "1h", unread: false },
  { platform: "X", handle: "@growthmarketer", avatar: "GM", msg: "Does SocialDesk support team collaboration features?", time: "2h", unread: false },
  { platform: "LinkedIn", handle: "James Whitmore", avatar: "JW", msg: "We've been evaluating tools — would love a demo call.", time: "3h", unread: false },
];

const CALENDAR_POSTS = [
  { day: 1, time: "9:00", platform: "X", label: "Product update thread" },
  { day: 3, time: "11:00", platform: "LinkedIn", label: "Thought leadership piece" },
  { day: 5, time: "14:00", platform: "Instagram", label: "Campaign carousel" },
  { day: 8, time: "10:00", platform: "X", label: "Weekly insights" },
  { day: 10, time: "16:00", platform: "LinkedIn", label: "Case study post" },
  { day: 12, time: "9:30", platform: "Instagram", label: "Brand story reel" },
];

const PLATFORM_COLORS: Record<string, string> = {
  X: "#1A1714",
  LinkedIn: "#0A66C2",
  Instagram: "#C13584",
};

function InboxTab() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex h-[480px]">
      <div className="w-[260px] border-r flex flex-col" style={{ borderColor: "rgba(224,216,206,0.4)" }}>
        <div className="px-4 py-3 border-b flex items-center gap-2" style={{ borderColor: "rgba(224,216,206,0.4)" }}>
          <Search size={13} style={{ color: "#9E9892" }} />
          <span className="text-[11px]" style={{ color: "#9E9892" }}>Search messages…</span>
        </div>
        {MESSAGES.map((m, i) => (
          <button key={i} onClick={() => setSelected(i)}
            className="w-full text-left px-4 py-3 border-b transition-colors"
            style={{
              borderColor: "rgba(224,216,206,0.3)",
              background: selected === i ? "rgba(181,147,90,0.08)" : "transparent",
            }}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-semibold text-white"
                style={{ background: PLATFORM_COLORS[m.platform] }}>
                {m.avatar}
              </div>
              <span className="text-[11px] font-medium truncate flex-1" style={{ color: "#1A1714" }}>{m.handle}</span>
              {m.unread && <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#B5935A" }} />}
              <span className="text-[10px]" style={{ color: "#9E9892" }}>{m.time}</span>
            </div>
            <p className="text-[10px] leading-[1.5] truncate" style={{ color: "#6B6560" }}>{m.msg}</p>
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: "rgba(224,216,206,0.4)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold text-white"
            style={{ background: PLATFORM_COLORS[MESSAGES[selected].platform] }}>
            {MESSAGES[selected].avatar}
          </div>
          <div>
            <p className="text-[12px] font-semibold" style={{ color: "#1A1714" }}>{MESSAGES[selected].handle}</p>
            <p className="text-[10px]" style={{ color: "#9E9892" }}>{MESSAGES[selected].platform} · {MESSAGES[selected].time} ago</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="rounded-lg p-4 mb-4 max-w-[85%]" style={{ background: "rgba(240,235,227,0.6)" }}>
            <p className="text-[12px] leading-[1.75]" style={{ color: "#1A1714" }}>{MESSAGES[selected].msg}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <input className="flex-1 rounded-lg px-3 py-2 text-[11px] outline-none"
            style={{ background: "rgba(240,235,227,0.5)", border: "1px solid rgba(224,216,206,0.6)", color: "#1A1714" }}
            placeholder="Write a reply…" />
          <button className="px-4 py-2 rounded-lg text-[11px] font-medium text-white"
            style={{ background: "#1A1714" }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function CalendarTab() {
  const days = Array.from({ length: 14 }, (_, i) => i + 1);
  return (
    <div className="h-[480px] overflow-auto p-6">
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
          <div key={d} className="text-center text-[10px] font-medium pb-1" style={{ color: "#9E9892" }}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => {
          const posts = CALENDAR_POSTS.filter(p => p.day === day);
          return (
            <div key={day} className="min-h-[80px] rounded-lg p-2"
              style={{ background: day === 5 ? "rgba(181,147,90,0.06)" : "rgba(240,235,227,0.4)", border: "1px solid rgba(224,216,206,0.5)" }}>
              <p className="text-[10px] font-medium mb-1" style={{ color: day === 5 ? "#B5935A" : "#6B6560" }}>{day}</p>
              {posts.map((p, i) => (
                <div key={i} className="rounded px-1.5 py-1 mb-1 text-[9px] font-medium text-white truncate"
                  style={{ background: PLATFORM_COLORS[p.platform] }}>
                  {p.time} · {p.label}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AnalyticsTab() {
  const bars = [42, 68, 55, 80, 63, 91, 74, 85, 60, 78, 95, 70];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <div className="h-[480px] p-6">
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Reach", value: "2.4M", delta: "+18%" },
          { label: "Engagement Rate", value: "6.2%", delta: "+3.1%" },
          { label: "Posts Scheduled", value: "148", delta: "+24" },
        ].map((stat, i) => (
          <div key={i} className="rounded-lg p-4" style={{ background: "rgba(240,235,227,0.6)", border: "1px solid rgba(224,216,206,0.5)" }}>
            <p className="text-[10px] mb-1" style={{ color: "#9E9892" }}>{stat.label}</p>
            <p className="text-[20px] font-semibold leading-none" style={{ color: "#1A1714", fontFamily: "'Cormorant Garamond', serif" }}>{stat.value}</p>
            <p className="text-[10px] mt-1" style={{ color: "#B5935A" }}>{stat.delta} this month</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg p-4" style={{ background: "rgba(240,235,227,0.4)", border: "1px solid rgba(224,216,206,0.5)" }}>
        <p className="text-[11px] font-medium mb-4" style={{ color: "#1A1714" }}>Engagement Over Time</p>
        <div className="flex items-end gap-1.5 h-[180px]">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-sm transition-all"
                style={{ height: `${h * 1.6}px`, background: i === 10 ? "#B5935A" : "rgba(181,147,90,0.25)" }} />
              <span className="text-[8px]" style={{ color: "#9E9892" }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardMockup() {
  const [activeTab, setActiveTab] = useState<Tab>("Universal Inbox");

  return (
    <div style={{ background: "#FAFAF8", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(224,216,206,0.5)", background: "#F7F4EF" }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
        </div>
        <div className="flex-1 mx-4 rounded-md px-3 py-1 text-[10px] text-center" style={{ background: "rgba(224,216,206,0.4)", color: "#9E9892" }}>
          app.socialdesk.io/workspace
        </div>
        <Bell size={13} style={{ color: "#9E9892" }} />
        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-semibold text-white" style={{ background: "#B5935A" }}>A</div>
      </div>
      {/* Sidebar + content */}
      <div className="flex">
        <div className="w-12 border-r flex flex-col items-center py-4 gap-4" style={{ borderColor: "rgba(224,216,206,0.4)", background: "#F0EBE3" }}>
          {[Inbox, Calendar, BarChart2, Settings].map((Icon, i) => (
            <button key={i} className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
              style={{ background: i === 0 ? "rgba(181,147,90,0.15)" : "transparent" }}>
              <Icon size={14} style={{ color: i === 0 ? "#B5935A" : "#9E9892" }} />
            </button>
          ))}
        </div>
        <div className="flex-1">
          {/* Tab bar */}
          <div className="flex border-b px-4" style={{ borderColor: "rgba(224,216,206,0.4)" }}>
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-4 py-3 text-[11px] font-medium border-b-2 transition-colors"
                style={{
                  borderColor: activeTab === tab ? "#B5935A" : "transparent",
                  color: activeTab === tab ? "#B5935A" : "#9E9892",
                }}>
                {tab}
              </button>
            ))}
          </div>
          {activeTab === "Universal Inbox" && <InboxTab />}
          {activeTab === "Visual Calendar" && <CalendarTab />}
          {activeTab === "Analytics" && <AnalyticsTab />}
        </div>
      </div>
    </div>
  );
}
