"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Design tokens ────────────────────────────────────────────────────────────
const OLIVE     = "oklch(0.47 0.1 128)";
const PANEL     = "#F5F7F1";
const BORDER    = "#DDE5D4";
const BORDER_SM = "#EBF0E4";
const INK       = "#2C3520";
const INK_MED   = "#4A5637";
const MUTED     = "#7A8B68";
const FAINT     = "#A4B48E";

// ─── Constants ────────────────────────────────────────────────────────────────
const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAYS_FULL  = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const HOURS      = ["8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM"];
const MONTHS     = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const INNER_TABS = ["Publish", "Activity", "Content", "Reports", "Profiles"] as const;
type InnerTab = typeof INNER_TABS[number];
type CalView  = "Month" | "Week" | "Day";

// ─── Scheduled Posts ──────────────────────────────────────────────────────────
interface Post { y:number; m:number; d:number; text:string; color:string; platform:string; time:string; status:string }

const POSTS: Post[] = [
  { y:2026,m:6,d:3,  text:"Brand Story",        color:"#7C6FCD", platform:"Instagram",   time:"10:00 AM", status:"Scheduled" },
  { y:2026,m:6,d:8,  text:"Product Update",     color:"#C5924A", platform:"X (Twitter)", time:"09:00 AM", status:"Published" },
  { y:2026,m:6,d:11, text:"Thought Leadership", color:"#4A8A64", platform:"LinkedIn",    time:"11:00 AM", status:"Scheduled" },
  { y:2026,m:6,d:16, text:"Campaign Launch",    color:"#B85C8E", platform:"Instagram",   time:"02:00 PM", status:"Draft"     },
  { y:2026,m:6,d:18, text:"#CustomerDay",       color:OLIVE,     platform:"X (Twitter)", time:"10:00 AM", status:"Scheduled" },
  { y:2026,m:6,d:18, text:"Reel Drop",          color:"#7C6FCD", platform:"Instagram",   time:"03:00 PM", status:"Scheduled" },
  { y:2026,m:6,d:19, text:"#SpaceDay",          color:"#C5924A", platform:"LinkedIn",    time:"12:00 PM", status:"Published" },
  { y:2026,m:6,d:21, text:"#IceCreamDay",       color:"#B85C8E", platform:"Instagram",   time:"09:00 AM", status:"Scheduled" },
  { y:2026,m:6,d:21, text:"#MangoDay",          color:"#C5924A", platform:"X (Twitter)", time:"11:00 AM", status:"Failed"    },
  { y:2026,m:6,d:22, text:"Weekly Recap",       color:OLIVE,     platform:"LinkedIn",    time:"05:00 PM", status:"Scheduled" },
  { y:2026,m:6,d:23, text:"#GrandmaDay",        color:"#4A8A64", platform:"Instagram",   time:"10:00 AM", status:"Scheduled" },
  { y:2026,m:6,d:24, text:"#SelfCare",          color:"#7C6FCD", platform:"X (Twitter)", time:"02:00 PM", status:"Draft"     },
  { y:2026,m:6,d:25, text:"#InternDay",         color:"#B85C8E", platform:"LinkedIn",    time:"09:00 AM", status:"Scheduled" },
  { y:2026,m:6,d:26, text:"#NothingDay",        color:OLIVE,     platform:"X (Twitter)", time:"04:00 PM", status:"Scheduled" },
];

function postsForDate(y:number, m:number, d:number) {
  return POSTS.filter(p => p.y===y && p.m===m && p.d===d);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function daysInMonth(y:number, m:number)     { return new Date(y, m+1, 0).getDate(); }
function firstDayOfMonth(y:number, m:number) { return new Date(y, m, 1).getDay(); }
function addMonths(date:Date, n:number)      { return new Date(date.getFullYear(), date.getMonth()+n, 1); }
function addDays(date:Date, n:number)        { const d=new Date(date); d.setDate(d.getDate()+n); return d; }
function getWeekStart(date:Date)             { const d=new Date(date); d.setDate(d.getDate()-d.getDay()); return d; }
function sameDay(a:Date, b:Date)             { return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate(); }

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status:string }) {
  const map: Record<string,string> = {
    Scheduled: "bg-[#EEF3EA] text-[#4A6325] border-[#C4D3AE]",
    Published:  "bg-[#E6F4ED] text-[#2D7A5A] border-[#A4D5BC]",
    Draft:      "bg-[#FDF8EE] text-[#8A6425] border-[#F0D898]",
    Failed:     "bg-[#FEF0F0] text-[#8A3535] border-[#F0BABA]",
    Deleted:    "bg-[#F3F5F0] text-[#9BAE88] border-[#D4DBC8]",
    Ready:      "bg-[#EEF3EA] text-[#4A6325] border-[#C4D3AE]",
  };
  return (
    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-[10px] border whitespace-nowrap ${map[status] ?? map.Draft}`}>
      {status}
    </span>
  );
}

// ─── Month View ───────────────────────────────────────────────────────────────
function MonthView({ date }:{ date:Date }) {
  const y=date.getFullYear(), m=date.getMonth();
  const first=firstDayOfMonth(y,m), total=daysInMonth(y,m), prevTotal=daysInMonth(y,m-1);
  const cells: { day:number; cur:boolean; y:number; m:number }[] = [];
  for (let i=0; i<first; i++)    cells.push({ day:prevTotal-first+1+i, cur:false, y, m:m-1 });
  for (let i=1; i<=total; i++)   cells.push({ day:i, cur:true, y, m });
  while (cells.length%7!==0)     cells.push({ day:cells.length-first-total+1, cur:false, y, m:m+1 });
  const weeks: typeof cells[] = [];
  for (let i=0; i<cells.length; i+=7) weeks.push(cells.slice(i,i+7));

  return (
    <>
      <div className="grid grid-cols-7" style={{ borderBottom:`1px solid ${BORDER}`, background:PANEL }}>
        {DAYS_SHORT.map(d => (
          <div key={d} className="text-center py-2.5 border-r last:border-r-0 text-[10px] font-semibold uppercase tracking-wider" style={{ borderColor:BORDER, color:FAINT }}>
            {d}
          </div>
        ))}
      </div>
      {weeks.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7" style={{ borderBottom:wi<weeks.length-1?`1px solid ${BORDER}`:undefined }}>
          {week.map((cell, di) => {
            const posts = cell.cur ? postsForDate(cell.y, cell.m, cell.day) : [];
            return (
              <div
                key={di}
                className="min-h-[72px] border-r last:border-r-0 p-2 transition-colors duration-100"
                style={{ borderColor:BORDER, background:!cell.cur?`${PANEL}99`:"white" }}
                onMouseEnter={e => { if (cell.cur) (e.currentTarget as HTMLElement).style.background = PANEL; }}
                onMouseLeave={e => { if (cell.cur) (e.currentTarget as HTMLElement).style.background = "white"; }}
              >
                <div className="text-[11px] font-semibold mb-1.5" style={{ color:!cell.cur?FAINT:INK_MED }}>
                  {cell.day}
                </div>
                {posts.slice(0,2).map((p, pi) => (
                  <div key={pi} className="text-[8px] px-1.5 py-0.5 mb-0.5 rounded-md font-semibold text-white truncate cursor-default" style={{ background:p.color }}>
                    {p.text}
                  </div>
                ))}
                {posts.length > 2 && (
                  <div className="text-[8px] font-medium" style={{ color:MUTED }}>+{posts.length-2} more</div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

// ─── Week View ────────────────────────────────────────────────────────────────
function WeekView({ date }:{ date:Date }) {
  const weekStart = getWeekStart(date);
  const days = Array.from({ length:7 }, (_,i) => addDays(weekStart,i));
  const today = new Date();

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      <div className="grid grid-cols-[56px_repeat(7,1fr)] sticky top-0 z-10" style={{ borderBottom:`1px solid ${BORDER}`, background:PANEL }}>
        <div style={{ borderRight:`1px solid ${BORDER}` }} />
        {days.map((d,i) => (
          <div key={i} className="text-center py-2.5 border-r last:border-r-0" style={{ borderColor:BORDER, background:sameDay(d,today)?`${OLIVE}10`:undefined }}>
            <div className="text-[9px] font-semibold uppercase" style={{ color:FAINT }}>{DAYS_SHORT[d.getDay()]}</div>
            <div className="text-[13px] font-semibold mt-0.5" style={{ color:sameDay(d,today)?OLIVE:INK_MED }}>{d.getDate()}</div>
          </div>
        ))}
      </div>
      {HOURS.map((hr,hi) => (
        <div key={hi} className="grid grid-cols-[56px_repeat(7,1fr)]" style={{ borderBottom:`1px solid ${BORDER_SM}` }}>
          <div className="text-[9px] font-medium py-2 px-2 text-right border-r" style={{ color:FAINT, borderColor:BORDER }}>
            {hr}
          </div>
          {days.map((d,di) => {
            const posts = postsForDate(d.getFullYear(), d.getMonth(), d.getDate()).filter(p => {
              const h=parseInt(p.time), isPM=p.time.includes("PM");
              const h24=isPM&&h!==12?h+12:(!isPM&&h===12?0:h);
              return h24===(hi+8);
            });
            return (
              <div key={di} className="min-h-[44px] border-r last:border-r-0 p-1" style={{ borderColor:BORDER_SM, background:sameDay(d,today)?`${OLIVE}06`:undefined }}>
                {posts.map((p,pi) => (
                  <div key={pi} className="text-[8px] px-1.5 py-1 rounded-md font-semibold text-white truncate mb-0.5 cursor-default shadow-sm" style={{ background:p.color }}>
                    {p.text}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── Day View ─────────────────────────────────────────────────────────────────
function DayView({ date }:{ date:Date }) {
  const today   = new Date();
  const isToday = sameDay(date, today);
  const posts   = postsForDate(date.getFullYear(), date.getMonth(), date.getDate());

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      <div className="flex items-center gap-3 px-5 py-3 border-b" style={{ background:PANEL, borderColor:BORDER }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm"
          style={isToday ? { background:OLIVE, color:"white" } : { background:BORDER, color:INK_MED }}>
          {date.getDate()}
        </div>
        <div>
          <div className="text-[13px] font-semibold" style={{ color:INK }}>{DAYS_FULL[date.getDay()]}</div>
          <div className="text-[10px]" style={{ color:FAINT }}>{MONTHS[date.getMonth()]} {date.getFullYear()}</div>
        </div>
        {posts.length > 0 && (
          <span className="ml-auto text-[10px] font-semibold text-white px-2.5 py-1 rounded-[10px]" style={{ background:OLIVE }}>
            {posts.length} post{posts.length>1?"s":""}
          </span>
        )}
      </div>
      {HOURS.map((hr,hi) => {
        const slotPosts = posts.filter(p => {
          const h=parseInt(p.time), isPM=p.time.includes("PM");
          const h24=isPM&&h!==12?h+12:(!isPM&&h===12?0:h);
          return h24===(hi+8);
        });
        return (
          <div key={hi} className="flex border-b" style={{ borderColor:BORDER_SM }}>
            <div className="w-16 shrink-0 text-[9px] font-medium py-3 px-3 text-right border-r" style={{ color:FAINT, borderColor:BORDER }}>
              {hr}
            </div>
            <div className="flex-1 min-h-[52px] p-2">
              {slotPosts.map((p,pi) => (
                <div key={pi} className="flex items-center gap-2 px-3 py-2 rounded-[10px] mb-1 text-white cursor-default shadow-sm" style={{ background:p.color }}>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold truncate">{p.text}</div>
                    <div className="text-[9px] opacity-75">{p.platform} · {p.time}</div>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Activity Tab ─────────────────────────────────────────────────────────────
function ActivityTab() {
  const activities = [
    { icon:"✅", text:'Published "Brand Story" to Instagram',    time:"2m ago",   status:"Published", user:"Sarah K." },
    { icon:"✏️", text:'Edited caption for "#CustomerDay" post',  time:"15m ago",  status:"Draft",     user:"James W." },
    { icon:"🗓️", text:'Scheduled "Product Update" for Jul 8',   time:"1h ago",   status:"Scheduled", user:"You"      },
    { icon:"❌", text:'"#MangoDay" post failed to publish',      time:"2h ago",   status:"Failed",    user:"System"   },
    { icon:"🗑️", text:'Deleted "Old Campaign" draft',            time:"3h ago",   status:"Deleted",   user:"Priya M." },
    { icon:"📝", text:'Created draft "#InternDay" for LinkedIn', time:"5h ago",   status:"Draft",     user:"Alex T."  },
    { icon:"✅", text:'Published "#SpaceDay" to LinkedIn',       time:"6h ago",   status:"Published", user:"You"      },
    { icon:"🗓️", text:'Scheduled "Reel Drop" for Jul 18 3 PM',  time:"Yesterday",status:"Scheduled", user:"Sarah K." },
  ];

  return (
    <div className="p-4" style={{ background:PANEL }}>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <input
          className="flex-1 min-w-[120px] text-[11px] px-3 py-2 rounded-[10px] border outline-none transition-colors"
          placeholder="Search activity…"
          style={{ background:"white", borderColor:BORDER, color:INK }}
        />
        {["All","Published","Draft","Scheduled","Failed"].map((f,i) => (
          <span key={f} className="text-[10px] font-semibold px-3 py-1.5 rounded-[10px] cursor-default border transition-colors"
            style={i===0
              ? { background:OLIVE, color:"white", borderColor:OLIVE }
              : { background:"white", color:MUTED, borderColor:BORDER }}>
            {f}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {activities.map((a,i) => (
          <div key={i} className="flex items-center gap-3 bg-white border rounded-[10px] px-4 py-3 cursor-default transition-all hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]" style={{ borderColor:BORDER }}>
            <span className="text-base shrink-0">{a.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold truncate" style={{ color:INK }}>{a.text}</p>
              <p className="text-[9px] mt-0.5" style={{ color:FAINT }}>{a.user} · {a.time}</p>
            </div>
            <StatusBadge status={a.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Content Tab ──────────────────────────────────────────────────────────────
function ContentTab() {
  const [view, setView]     = useState<"Grid"|"List">("Grid");
  const [filter, setFilter] = useState("All");

  const items = [
    { type:"Carousel", platform:"LinkedIn",    title:"5 Tips for Engagement",      status:"Draft",     color:"#7C6FCD" },
    { type:"Reel",     platform:"Instagram",   title:"Behind the Scenes",           status:"Ready",     color:"#B85C8E" },
    { type:"Post",     platform:"X (Twitter)", title:"Product Launch",              status:"Draft",     color:"#4A5637" },
    { type:"Post",     platform:"LinkedIn",    title:"Weekly Industry Roundup",      status:"Scheduled", color:"#7C6FCD" },
    { type:"Video",    platform:"Instagram",   title:"Customer Success Story",       status:"Draft",     color:"#B85C8E" },
    { type:"Post",     platform:"X (Twitter)", title:"How We Built Our Dashboard",   status:"Ready",     color:"#4A5637" },
  ];
  const filters  = ["All","Draft","Ready","Scheduled","Post","Carousel","Reel","Video"];
  const filtered = filter==="All" ? items : items.filter(x => x.status===filter || x.type===filter);
  const typeEmoji: Record<string,string> = { Video:"🎬", Reel:"🎥", Carousel:"🖼️", Post:"📝" };

  return (
    <div className="p-4" style={{ background:PANEL }}>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <input className="text-[11px] px-3 py-2 rounded-[10px] border outline-none w-44" placeholder="Search content…"
          style={{ background:"white", borderColor:BORDER, color:INK }} />
        <div className="flex gap-1 flex-wrap flex-1">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="text-[10px] font-semibold px-3 py-1.5 rounded-[10px] border transition-colors"
              style={filter===f ? { background:OLIVE, color:"white", borderColor:OLIVE } : { background:"white", color:MUTED, borderColor:BORDER }}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex border rounded-[10px] overflow-hidden bg-white" style={{ borderColor:BORDER }}>
          {(["Grid","List"] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className="text-[10px] font-semibold px-3 py-1.5 transition-colors"
              style={view===v ? { background:OLIVE, color:"white" } : { color:MUTED }}>
              {v==="Grid" ? "⊞" : "☰"} {v}
            </button>
          ))}
        </div>
      </div>
      {view==="Grid" ? (
        <div className="grid grid-cols-3 gap-3">
          {filtered.map((item,i) => (
            <div key={i} className="rounded-[10px] border bg-white p-4 cursor-default group transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)]" style={{ borderColor:BORDER }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-[10px] text-white" style={{ background:item.color }}>{item.platform}</span>
                <StatusBadge status={item.status} />
              </div>
              <div className="h-14 rounded-[10px] mb-3 flex items-center justify-center text-xl" style={{ background:`${item.color}12` }}>
                {typeEmoji[item.type] ?? "📝"}
              </div>
              <p className="text-[11px] font-semibold mb-1.5 leading-snug" style={{ color:INK }}>{item.title}</p>
              <span className="text-[9px]" style={{ color:FAINT }}>{item.type}</span>
              <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[9px] px-2 py-1 rounded-[10px] font-medium" style={{ background:PANEL, color:INK_MED }}>Edit</button>
                <button className="text-[9px] px-2 py-1 rounded-[10px] font-medium" style={{ background:PANEL, color:INK_MED }}>Preview</button>
                <button className="text-[9px] px-2 py-1 rounded-[10px] font-medium" style={{ background:"#FEF0F0", color:"#8A3535" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((item,i) => (
            <div key={i} className="flex items-center gap-3 bg-white border rounded-[10px] px-4 py-3 cursor-default group transition-all hover:shadow-[0_2px_12px_rgba(0,0,0,0.05)]" style={{ borderColor:BORDER }}>
              <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-base shrink-0" style={{ background:`${item.color}12` }}>
                {typeEmoji[item.type] ?? "📝"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold truncate" style={{ color:INK }}>{item.title}</p>
                <p className="text-[9px]" style={{ color:FAINT }}>{item.type} · {item.platform}</p>
              </div>
              <StatusBadge status={item.status} />
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[9px] px-2 py-1 rounded-[10px] font-medium" style={{ background:PANEL, color:INK_MED }}>Edit</button>
                <button className="text-[9px] px-2 py-1 rounded-[10px] font-medium" style={{ background:"#FEF0F0", color:"#8A3535" }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Reports Tab (inside Scheduling) ──────────────────────────────────────────
function ReportsSchedulingTab() {
  const bars      = [38,52,61,74,58,83,70,91,65,78,88,72];
  const months    = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const platforms = [
    { name:"Instagram",   posts:42, reach:"1.2M", eng:"7.4%", color:"#B85C8E" },
    { name:"LinkedIn",    posts:28, reach:"680K",  eng:"5.1%", color:"#4A8A64" },
    { name:"X (Twitter)", posts:54, reach:"540K",  eng:"3.8%", color:"#4A5637" },
  ];

  return (
    <div className="p-5" style={{ background:PANEL }}>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          { label:"Total Scheduled", value:"124", delta:"+18%", up:true  },
          { label:"Published Posts",  value:"98",  delta:"+22%", up:true  },
          { label:"Avg. Engagement",  value:"5.4%",delta:"+1.2%",up:true  },
          { label:"Failed Posts",     value:"3",   delta:"-40%", up:true  },
        ].map((s,i) => (
          <div key={i} className="rounded-[10px] border bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" style={{ borderColor:BORDER }}>
            <p className="text-[9px] font-semibold uppercase tracking-wider mb-1.5" style={{ color:FAINT }}>{s.label}</p>
            <p className="text-[22px] font-bold leading-none" style={{ color:INK }}>{s.value}</p>
            <p className="text-[10px] font-semibold mt-1.5" style={{ color:s.up?"#4A8A64":"#8A3535" }}>▲ {s.delta} this month</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 rounded-[10px] border bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" style={{ borderColor:BORDER }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[12px] font-semibold" style={{ color:INK }}>Posts Published per Month</p>
            <span className="text-[9px] font-semibold px-2 py-0.5 rounded-[10px] text-white" style={{ background:OLIVE }}>2026</span>
          </div>
          <div className="flex items-end gap-1.5 h-24">
            {bars.map((h,i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-sm" style={{ height:`${h}%`, background:i===6?OLIVE:`${OLIVE}28` }} />
                <span className="text-[7px] font-medium" style={{ color:FAINT }}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[10px] border bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" style={{ borderColor:BORDER }}>
          <p className="text-[12px] font-semibold mb-3" style={{ color:INK }}>Platform Breakdown</p>
          {platforms.map((p,i) => (
            <div key={i} className="mb-3.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold" style={{ color:INK_MED }}>{p.name}</span>
                <span className="text-[9px]" style={{ color:FAINT }}>{p.posts} posts</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background:BORDER }}>
                <div className="h-full rounded-full" style={{ width:`${(p.posts/124)*100}%`, background:p.color }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[8px]" style={{ color:FAINT }}>Reach: {p.reach}</span>
                <span className="text-[8px] font-semibold" style={{ color:p.color }}>{p.eng} eng.</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Profiles Tab ─────────────────────────────────────────────────────────────
function ProfilesTab() {
  const profiles = [
    { platform:"Instagram",   name:"Plan My Canvas", handle:"@planmycanvas",       status:"Connected",    synced:"2m ago", pages:1, color:"#B85C8E", icon:"📷" },
    { platform:"LinkedIn",    name:"Plan My Canvas", handle:"Plan My Canvas Co.",   status:"Connected",    synced:"5m ago", pages:2, color:"#4A8A64", icon:"💼" },
    { platform:"X (Twitter)", name:"PlanMyCanvas",   handle:"@planmycanvas",        status:"Connected",    synced:"1m ago", pages:1, color:"#4A5637", icon:"✖"  },
    { platform:"Facebook",    name:"Plan My Canvas", handle:"Plan My Canvas Page",  status:"Expired",      synced:"3d ago", pages:1, color:"#4A6BAE", icon:"👍" },
    { platform:"TikTok",      name:"planmycanvas",   handle:"@planmycanvas",        status:"Disconnected", synced:"—",      pages:0, color:"#4A5637", icon:"🎵" },
  ];

  return (
    <div className="p-5" style={{ background:PANEL }}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[12px] font-semibold" style={{ color:INK_MED }}>
          {profiles.filter(p=>p.status==="Connected").length} of {profiles.length} profiles connected
        </p>
        <button className="text-[11px] font-semibold text-white px-4 py-2 rounded-[10px] shadow-sm" style={{ background:OLIVE }}>
          + Add Profile
        </button>
      </div>
      <div className="flex flex-col gap-2.5">
        {profiles.map((p,i) => (
          <div key={i} className="flex items-center gap-4 bg-white border rounded-[10px] px-5 py-4 transition-all hover:shadow-[0_2px_12px_rgba(0,0,0,0.05)]" style={{ borderColor:BORDER }}>
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xl shrink-0 text-white" style={{ background:p.color }}>
              {p.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[12px] font-semibold" style={{ color:INK }}>{p.name}</p>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-[10px] border"
                  style={
                    p.status==="Connected" ? { background:"#E6F4ED",color:"#2D7A5A",borderColor:"#A4D5BC" } :
                    p.status==="Expired"   ? { background:"#FDF8EE",color:"#8A6425",borderColor:"#F0D898" } :
                                             { background:"#F3F5F0",color:MUTED,    borderColor:BORDER     }
                  }>
                  {p.status}
                </span>
              </div>
              <p className="text-[10px] mt-0.5" style={{ color:MUTED }}>{p.platform} · {p.handle}</p>
              <p className="text-[9px] mt-0.5" style={{ color:FAINT }}>
                Last synced: {p.synced}{p.pages>0?` · ${p.pages} page${p.pages>1?"s":""}` :""}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              {p.status==="Connected"    && <button className="text-[10px] font-semibold px-3 py-1.5 rounded-[10px] border" style={{ background:"white", color:MUTED, borderColor:BORDER }}>↻ Sync</button>}
              {p.status==="Expired"      && <button className="text-[10px] font-semibold px-3 py-1.5 rounded-[10px] text-white" style={{ background:OLIVE }}>Reconnect</button>}
              {p.status==="Disconnected" && <button className="text-[10px] font-semibold px-3 py-1.5 rounded-[10px] text-white" style={{ background:OLIVE }}>Connect</button>}
              {p.status==="Connected"    && <button className="text-[10px] font-semibold px-3 py-1.5 rounded-[10px]" style={{ background:"#FEF0F0", color:"#8A3535" }}>Disconnect</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Scheduling Tab ───────────────────────────────────────────────────────────
function SchedulingTab() {
  const [innerTab, setInnerTab] = useState<InnerTab>("Publish");
  const [calView,  setCalView]  = useState<CalView>("Month");
  const [date,     setDate]     = useState(new Date(2026, 6, 1));

  function prevPeriod() {
    if (calView==="Month") setDate(d => addMonths(d,-1));
    else if (calView==="Week") setDate(d => addDays(d,-7));
    else setDate(d => addDays(d,-1));
  }
  function nextPeriod() {
    if (calView==="Month") setDate(d => addMonths(d,1));
    else if (calView==="Week") setDate(d => addDays(d,7));
    else setDate(d => addDays(d,1));
  }
  function periodLabel() {
    if (calView==="Month") return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
    if (calView==="Week") {
      const ws=getWeekStart(date), we=addDays(ws,6);
      return `${MONTHS[ws.getMonth()].slice(0,3)} ${ws.getDate()} – ${ws.getMonth()!==we.getMonth()?MONTHS[we.getMonth()].slice(0,3)+" ":""}${we.getDate()}, ${we.getFullYear()}`;
    }
    return `${DAYS_FULL[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Inner tab bar */}
      <div className="shrink-0 flex items-center justify-between px-5 py-3 border-b bg-white" style={{ borderColor:BORDER }}>
        <div className="flex items-center gap-0.5">
          {INNER_TABS.map(tab => (
            <button key={tab} onClick={() => setInnerTab(tab)}
              className="text-[11px] font-semibold px-3 py-1.5 rounded-[10px] transition-colors"
              style={innerTab===tab ? { background:OLIVE, color:"white" } : { color:FAINT }}>
              {tab}
            </button>
          ))}
        </div>
        <button className="text-white text-[11px] font-semibold px-4 py-1.5 rounded-[10px] flex items-center gap-1.5 shadow-sm cursor-default" style={{ background:OLIVE }}>
          ✏️ Compose
        </button>
      </div>

      {/* Publish sub-controls */}
      {innerTab==="Publish" && (
        <div className="shrink-0 flex items-center justify-between px-5 py-2.5 border-b" style={{ background:PANEL, borderColor:BORDER }}>
          <div className="flex items-center gap-1.5">
            {["Scheduled ▾","Queued ▾","Sent ▾","Overview ▾"].map(f => (
              <span key={f} className="text-[10px] font-medium px-2.5 py-1 rounded-[10px] border cursor-default" style={{ background:"white", color:MUTED, borderColor:BORDER }}>
                {f}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button onClick={prevPeriod} className="w-6 h-6 rounded-[10px] border flex items-center justify-center text-sm" style={{ background:"white", borderColor:BORDER, color:MUTED }}>‹</button>
              <span className="text-[12px] font-semibold min-w-[160px] text-center" style={{ color:INK }}>{periodLabel()}</span>
              <button onClick={nextPeriod} className="w-6 h-6 rounded-[10px] border flex items-center justify-center text-sm" style={{ background:"white", borderColor:BORDER, color:MUTED }}>›</button>
            </div>
            <div className="flex items-center gap-0.5 border rounded-[10px] p-0.5 bg-white" style={{ borderColor:BORDER }}>
              {(["Month","Week","Day"] as CalView[]).map(v => (
                <button key={v} onClick={() => setCalView(v)}
                  className="text-[10px] px-3 py-1 rounded-[10px] font-semibold transition-colors"
                  style={calView===v ? { background:OLIVE, color:"white" } : { color:FAINT }}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div key={innerTab+calView+date.toDateString()} className="h-full flex flex-col"
            initial={{ opacity:0, y:5 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-5 }}
            transition={{ duration:0.16, ease:"easeOut" }}>
            {innerTab==="Publish"  && calView==="Month" && <MonthView date={date} />}
            {innerTab==="Publish"  && calView==="Week"  && <WeekView  date={date} />}
            {innerTab==="Publish"  && calView==="Day"   && <DayView   date={date} />}
            {innerTab==="Activity" && <div className="overflow-y-auto"><ActivityTab /></div>}
            {innerTab==="Content"  && <div className="overflow-y-auto"><ContentTab /></div>}
            {innerTab==="Reports"  && <div className="overflow-y-auto"><ReportsSchedulingTab /></div>}
            {innerTab==="Profiles" && <div className="overflow-y-auto"><ProfilesTab /></div>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Outer Tabs ───────────────────────────────────────────────────────────────
const OUTER_TABS = [
  { label:"Scheduling",    icon:"📅" },
  { label:"Post ideas",    icon:"💡" },
  { label:"Collaboration", icon:"🤝" },
  { label:"Reports",       icon:"📊" },
  { label:"Engagement",    icon:"🚀" },
];

function PostIdeasTab() {
  const ideas = [
    { title:"5 Tips for Better Engagement",  platform:"LinkedIn",    status:"Draft", color:"#7C6FCD" },
    { title:"Behind the Scenes: Our Team",    platform:"Instagram",   status:"Ready", color:"#B85C8E" },
    { title:"Product Launch Announcement",    platform:"X (Twitter)", status:"Draft", color:"#4A5637" },
    { title:"Weekly Industry Roundup",        platform:"LinkedIn",    status:"Ready", color:"#7C6FCD" },
    { title:"Customer Success Story",         platform:"Instagram",   status:"Draft", color:"#B85C8E" },
    { title:"How We Built Our Dashboard",     platform:"X (Twitter)", status:"Ready", color:"#4A5637" },
  ];
  return (
    <div className="p-5 grid grid-cols-3 gap-3 min-h-full content-start" style={{ background:PANEL }}>
      {ideas.map((idea,i) => (
        <div key={i} className="rounded-[10px] border bg-white p-4 cursor-default transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)]" style={{ borderColor:BORDER }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-semibold px-2 py-0.5 rounded-[10px] text-white" style={{ background:idea.color }}>{idea.platform}</span>
            <StatusBadge status={idea.status} />
          </div>
          <p className="text-[12px] font-semibold mb-2.5 leading-snug" style={{ color:INK }}>{idea.title}</p>
          <div className="flex gap-2">
            <button className="text-[9px] px-2 py-1 rounded-[10px] font-medium" style={{ background:PANEL, color:MUTED }}>Edit</button>
            <button className="text-[9px] px-2 py-1 rounded-[10px] font-semibold text-white" style={{ background:OLIVE }}>Schedule</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function CollaborationTab() {
  const tasks = [
    { initials:"SK", task:"Review Q3 content calendar",   info:"Sarah K. · Today",    done:true  },
    { initials:"JW", task:"Approve Instagram captions",   info:"James W. · Tomorrow", done:false },
    { initials:"PM", task:"Design carousel for LinkedIn", info:"Priya M. · Jul 22",   done:false },
    { initials:"AT", task:"Write copy for product launch",info:"Alex T. · Jul 24",    done:false },
    { initials:"SK", task:"Schedule weekly X threads",    info:"Sarah K. · Jul 25",   done:true  },
  ];
  const comments = [
    { initials:"JW", name:"James W.", msg:"Updated the caption for the Monday post — looks good now!", time:"2m ago",  color:"#7C6FCD" },
    { initials:"PM", name:"Priya M.", msg:"Carousel assets are ready for review in Figma.",            time:"18m ago", color:"#B85C8E" },
    { initials:"AT", name:"Alex T.",  msg:"Draft copy shared in the shared doc — please review.",      time:"1h ago",  color:"#C5924A" },
  ];
  return (
    <div className="p-5 grid grid-cols-2 gap-4 min-h-full content-start" style={{ background:PANEL }}>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color:FAINT }}>Tasks</p>
        <div className="flex flex-col gap-2">
          {tasks.map((t,i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-[10px] border bg-white cursor-default transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]" style={{ borderColor:BORDER }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
                style={{ background:t.done?"#4A8A64":OLIVE }}>
                {t.done?"✓":t.initials[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold" style={{ color:t.done?FAINT:INK, textDecoration:t.done?"line-through":"none" }}>{t.task}</p>
                <p className="text-[9px] mt-0.5" style={{ color:FAINT }}>{t.info}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color:FAINT }}>Recent Comments</p>
        <div className="flex flex-col gap-2">
          {comments.map((c,i) => (
            <div key={i} className="p-3 rounded-[10px] border bg-white cursor-default transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]" style={{ borderColor:BORDER }}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0" style={{ background:c.color }}>{c.initials}</div>
                <span className="text-[11px] font-semibold" style={{ color:INK }}>{c.name}</span>
                <span className="text-[9px] ml-auto" style={{ color:FAINT }}>{c.time}</span>
              </div>
              <p className="text-[10px] leading-snug" style={{ color:MUTED }}>{c.msg}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportsTab() {
  const bars   = [42,68,55,80,63,91,74,85,60,78,95,70];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return (
    <div className="p-5 min-h-full" style={{ background:PANEL }}>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          { label:"Total Reach",      value:"2.4M",  delta:"+18%",  up:true  },
          { label:"Engagement Rate",  value:"6.2%",  delta:"+3.1%", up:true  },
          { label:"Link Clicks",      value:"48.3K", delta:"+22%",  up:true  },
          { label:"Followers Gained", value:"1,840", delta:"-4%",   up:false },
        ].map((s,i) => (
          <div key={i} className="rounded-[10px] border bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" style={{ borderColor:BORDER }}>
            <p className="text-[9px] font-semibold uppercase tracking-wider mb-1.5" style={{ color:FAINT }}>{s.label}</p>
            <p className="text-[22px] font-bold leading-none" style={{ color:INK }}>{s.value}</p>
            <p className="text-[10px] font-semibold mt-1.5" style={{ color:s.up?"#4A8A64":"#8A3535" }}>
              {s.up?"▲":"▼"} {s.delta} this month
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-[10px] border bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" style={{ borderColor:BORDER }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-[12px] font-semibold" style={{ color:INK }}>Engagement Over Time</p>
          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-[10px] text-white" style={{ background:OLIVE }}>2026</span>
        </div>
        <div className="flex items-end gap-1.5 h-28">
          {bars.map((h,i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-sm" style={{ height:`${h}%`, background:i===6?OLIVE:`${OLIVE}28` }} />
              <span className="text-[7px] font-medium" style={{ color:FAINT }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EngagementTab() {
  const messages = [
    { handle:"@techfounder",    platform:"X",        msg:"Love the new scheduling flow — saved our team hours!", time:"2m",  unread:true,  color:"#4A5637" },
    { handle:"Sarah Chen",      platform:"LinkedIn",  msg:"Can you share more about the enterprise plan?",        time:"14m", unread:true,  color:"#4A8A64" },
    { handle:"@brandstudio",    platform:"Instagram", msg:"Reposted your carousel — reach was incredible 🔥",     time:"1h",  unread:false, color:"#B85C8E" },
    { handle:"@growthmarketer", platform:"X",         msg:"Does Plan My Canvas support team collaboration?",      time:"2h",  unread:false, color:"#4A5637" },
    { handle:"James Whitmore",  platform:"LinkedIn",  msg:"Would love to schedule a demo call.",                  time:"3h",  unread:false, color:"#4A8A64" },
  ];
  return (
    <div className="flex flex-col min-h-full" style={{ gap:0, background:PANEL }}>
      {messages.map((m,i) => (
        <div key={i} className="flex items-start gap-3 px-5 py-3.5 cursor-default transition-colors border-b"
          style={{ background:m.unread?"white":PANEL, borderColor:BORDER_SM }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = PANEL)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = m.unread?"white":PANEL)}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ background:m.color }}>
            {m.platform[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[12px] font-semibold" style={{ color:INK }}>{m.handle}</span>
              <div className="flex items-center gap-1.5">
                {m.unread && <div className="w-2 h-2 rounded-full" style={{ background:OLIVE }} />}
                <span className="text-[10px] font-medium" style={{ color:FAINT }}>{m.time}</span>
              </div>
            </div>
            <p className="text-[11px] truncate" style={{ color:MUTED }}>{m.msg}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const OUTER_CONTENT: Record<string, React.ReactNode> = {
  Scheduling:    null,
  "Post ideas":  <PostIdeasTab />,
  Collaboration: <CollaborationTab />,
  Reports:       <ReportsTab />,
  Engagement:    <EngagementTab />,
};

// ─── Dashboard Preview ────────────────────────────────────────────────────────
export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("Scheduling");

  return (
    <div className="mt-20 relative max-w-6xl mx-auto">
      <div className="absolute -inset-4 rounded-[2rem] blur-3xl opacity-30 pointer-events-none"
        style={{ background:`linear-gradient(to right,${OLIVE}50,${OLIVE}18,${OLIVE}50)` }} />

      <div className="relative rounded-[1.5rem] overflow-hidden border flex flex-col"
        style={{
          height: "580px",
          background: "white",
          borderColor: BORDER,
          boxShadow: "0 32px 80px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)",
        }}>

        {/* Outer tab strip */}
        <div className="shrink-0 flex items-center gap-2 px-5 py-3.5 border-b overflow-x-auto"
          style={{ background:PANEL, borderColor:BORDER }}>
          {OUTER_TABS.map(tab => (
            <button key={tab.label} onClick={() => setActiveTab(tab.label)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-[10px] text-[11px] font-semibold whitespace-nowrap border transition-all duration-200"
              style={activeTab===tab.label
                ? { background:OLIVE, color:"white", borderColor:OLIVE, boxShadow:"0 2px 8px rgba(0,0,0,0.12)" }
                : { background:"white", color:MUTED, borderColor:BORDER }}>
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} className="h-full flex flex-col"
              initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }}
              transition={{ duration:0.18, ease:"easeOut" }}>
              {activeTab==="Scheduling"
                ? <SchedulingTab />
                : <div className="flex-1 min-h-0 overflow-y-auto">{OUTER_CONTENT[activeTab]}</div>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
