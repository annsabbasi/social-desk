"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Calendar,
  BarChart3,
  Settings,
  Plus,
  Send,
  CheckCircle2,
  Inbox,
  Sparkles,
  Users
} from "lucide-react";

type ActiveTab = "inbox" | "publisher" | "analytics";

export function DashboardMockup() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("inbox");
  const [replyText, setReplyText] = useState("");
  const [replied, setReplied] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Social platforms config for mock data
  const platforms = {
    x: { name: "X", color: "bg-black text-white border-neutral-800", icon: "𝕏" },
    linkedin: { name: "LinkedIn", color: "bg-blue-600 text-white", icon: "in" },
    instagram: { name: "Instagram", color: "bg-pink-600 text-white", icon: "📸" }
  };

  // Mock messages for Universal Inbox
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
      platform: "linkedin" as const,
      preview: "Hi! I saw your recent post about the Plan My Canvas API. Is there a developer trial available?",
      time: "5m ago",
      unread: true,
      category: "Question"
    },
    {
      id: 2,
      sender: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
      platform: "x" as const,
      preview: "Loving the new workspace dashboard! It saves me at least 3 hours a day. Highly recommended! 🔥",
      time: "24m ago",
      unread: false,
      category: "Feedback"
    },
    {
      id: 3,
      sender: "Design Studio",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80",
      platform: "instagram" as const,
      preview: "Sent you a DM regarding our collaboration next month. Let me know what you think of the drafts.",
      time: "1h ago",
      unread: false,
      category: "Partnership"
    }
  ]);

  const [selectedMessageId, setSelectedMessageId] = useState(1);
  const selectedMessage = messages.find(m => m.id === selectedMessageId) || messages[0];

  const handleSendReply = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplied(true);
    setTimeout(() => {
      // Simulate marked as read/replied
      setMessages(prev => prev.map(m => m.id === selectedMessage.id ? { ...m, unread: false, preview: "Replied: " + replyText } : m));
      setReplyText("");
      setReplied(false);
    }, 1500);
  };

  const handleSuggestAIReply = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      if (selectedMessage.id === 1) {
        setReplyText("Hi Sarah! Yes, we have a fully-featured developer sandbox with up to 10,000 free operations/month. You can sign up at developer.planmycanvas.io. Let me know if you need assistance!");
      } else if (selectedMessage.id === 2) {
        setReplyText("Thank you so much Alex! We appreciate the shoutout. Keep crushing your social media goals!");
      } else {
        setReplyText("Hello! Thanks for reaching out. We've received your drafts and our design leads will check them and reply within today. Talk soon!");
      }
      setIsGeneratingAI(false);
    }, 1200);
  };

  // Publisher mock data
  const calendarDays = [
    { day: "Mon", date: 22, posts: [{ id: 1, platform: "x", time: "09:30 AM", title: "Product Announcement", status: "Published" }] },
    { day: "Tue", date: 23, posts: [{ id: 2, platform: "linkedin", time: "11:00 AM", title: "Case Study Thread", status: "Scheduled" }] },
    { day: "Wed", date: 24, posts: [{ id: 3, platform: "instagram", time: "03:00 PM", title: "Behind the Scenes Reel", status: "Scheduled" }, { id: 4, platform: "x", time: "07:00 PM", title: "AI Co-pilot Quick Tip", status: "Draft" }] },
    { day: "Thu", date: 25, posts: [] },
    { day: "Fri", date: 26, posts: [{ id: 5, platform: "linkedin", time: "10:00 AM", title: "Weekly Roundup Newsletter", status: "Scheduled" }] },
    { day: "Sat", date: 27, posts: [] },
    { day: "Sun", date: 28, posts: [] }
  ];

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-neutral-200 font-sans flex flex-col h-[520px]">
      
      {/* Dashboard Topbar / Mock Window controls */}
      <div className="bg-neutral-950 px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          <span className="text-xs text-neutral-500 ml-4 font-mono select-none">Plan My Canvas App — WorkSpace v1.2</span>
        </div>
        
        {/* Navigation Tabs inside the Mockup */}
        <div className="flex items-center bg-neutral-900 p-0.5 rounded-lg border border-neutral-800">
          <button
            onClick={() => { setReplyText(""); setSelectedMessageId(1); setActiveTab("inbox"); }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === "inbox" 
                ? "bg-neutral-850 text-white shadow-sm border border-neutral-700/50" 
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
            Universal Inbox
          </button>
          <button
            onClick={() => setActiveTab("publisher")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === "publisher" 
                ? "bg-neutral-850 text-white shadow-sm border border-neutral-700/50" 
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-pink-400" />
            Publisher
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeTab === "analytics" 
                ? "bg-neutral-850 text-white shadow-sm border border-neutral-700/50" 
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
            Analytics
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-neutral-900 px-2.5 py-1 rounded-md border border-neutral-800 text-[10px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Syncing Active
          </div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden bg-neutral-950/40">
        
        {/* Mock Sidebar */}
        <div className="w-16 md:w-48 bg-neutral-950/80 border-r border-neutral-800 flex flex-col justify-between py-4 select-none">
          <div className="flex flex-col gap-1.5 px-3">
            <div className="text-[10px] text-neutral-500 font-bold tracking-wider px-2.5 uppercase hidden md:block mb-2">
              Main Menu
            </div>
            
            <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-white bg-neutral-900 rounded-lg border border-neutral-800/80 cursor-pointer">
              <Inbox className="w-4 h-4 text-violet-400" />
              <span className="hidden md:inline">Command Desk</span>
            </div>
            
            <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40 rounded-lg cursor-pointer transition-colors">
              <Users className="w-4 h-4" />
              <span className="hidden md:inline">Profiles & Channels</span>
            </div>
            
            <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40 rounded-lg cursor-pointer transition-colors">
              <Sparkles className="w-4 h-4" />
              <span className="hidden md:inline">AI Brain / Presets</span>
            </div>
          </div>

          <div className="px-3">
            <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-neutral-500 hover:text-neutral-300 rounded-lg cursor-pointer transition-colors">
              <Settings className="w-4 h-4" />
              <span className="hidden md:inline">Desk Settings</span>
            </div>
          </div>
        </div>

        {/* Content Panel depends on Tab */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* ================================= UNIFIED INBOX ================================= */}
          {activeTab === "inbox" && (
            <div className="flex-1 flex overflow-hidden">
              
              {/* Inbox Left List */}
              <div className="w-full sm:w-64 border-r border-neutral-800 flex flex-col shrink-0 bg-neutral-900/20">
                <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">All Messages</span>
                  <span className="bg-violet-500/10 text-violet-400 border border-violet-500/20 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    1 New
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto divide-y divide-neutral-800/60">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      onClick={() => { setSelectedMessageId(msg.id); setReplyText(""); }}
                      className={`p-3 flex items-start gap-2.5 cursor-pointer text-left transition-all ${
                        selectedMessageId === msg.id 
                          ? "bg-neutral-800/50 border-l-2 border-violet-500" 
                          : "hover:bg-neutral-900/40"
                      }`}
                    >
                      <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full object-cover border border-neutral-700" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-semibold text-white truncate">{msg.sender}</span>
                          <span className="text-[10px] text-neutral-500 shrink-0">{msg.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`text-[9px] px-1 rounded uppercase font-extrabold ${platforms[msg.platform].color}`}>
                            {platforms[msg.platform].icon}
                          </span>
                          <span className="text-[9px] text-neutral-400 bg-neutral-800 px-1 rounded-sm">
                            {msg.category}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 truncate">{msg.preview}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inbox Middle Pane (Active Conversation) */}
              <div className="flex-1 flex flex-col bg-neutral-950/20">
                <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/10">
                  <div className="flex items-center gap-3">
                    <img src={selectedMessage.avatar} alt={selectedMessage.sender} className="w-9 h-9 rounded-full object-cover border border-neutral-700" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">{selectedMessage.sender}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-neutral-400">Customer Support Ticket</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                        <span className="text-[10px] text-amber-400">Awaiting Response</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${platforms[selectedMessage.platform].color}`}>
                      Channel: {platforms[selectedMessage.platform].name}
                    </span>
                  </div>
                </div>

                {/* Chat Stream */}
                <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
                  {/* Incoming message bubble */}
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    <img src={selectedMessage.avatar} alt={selectedMessage.sender} className="w-7 h-7 rounded-full object-cover" />
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl rounded-tl-none p-3 shadow-md">
                      <p className="text-xs leading-relaxed text-neutral-200">{selectedMessage.preview}</p>
                      <span className="text-[9px] text-neutral-500 block mt-1 text-right">{selectedMessage.time}</span>
                    </div>
                  </div>

                  {/* Replied confirmation message */}
                  {replied && (
                    <div className="flex items-start gap-2.5 max-w-[85%] ml-auto justify-end">
                      <div className="bg-violet-600/90 border border-violet-500/20 text-white rounded-2xl rounded-tr-none p-3 shadow-lg flex items-center gap-2.5">
                        <div>
                          <p className="text-xs leading-relaxed">Message delivered successfully.</p>
                          <span className="text-[9px] text-violet-200/70 block mt-1">Just now</span>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-white shrink-0 animate-bounce" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Reply Form */}
                <form onSubmit={handleSendReply} className="p-3 border-t border-neutral-800 bg-neutral-950/60 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSuggestAIReply}
                      disabled={isGeneratingAI}
                      className="flex items-center gap-1.5 bg-violet-600/20 hover:bg-violet-600/30 text-violet-400 border border-violet-500/25 text-[11px] px-2.5 py-1 rounded-md font-semibold transition-all disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      {isGeneratingAI ? "AI Co-pilot Drafting..." : "Generate AI Reply"}
                    </button>
                    <span className="text-[10px] text-neutral-500">Draft replies customized to this sender's history.</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Draft quick response to ${selectedMessage.sender}...`}
                      className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-violet-500 placeholder:text-neutral-600"
                    />
                    <button
                      type="submit"
                      className="bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

          {/* ================================= PUBLISHER CALENDAR ================================= */}
          {activeTab === "publisher" && (
            <div className="flex-1 flex flex-col p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4 bg-neutral-900/30 p-2.5 rounded-lg border border-neutral-800/80">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Weekly Scheduled Desk</h3>
                  <p className="text-[10px] text-neutral-500">June 2026 • Optimal queue engaged</p>
                </div>
                <button className="flex items-center gap-1 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-md hover:from-violet-500 hover:to-pink-500 transition-all select-none shadow-md">
                  <Plus className="w-3.5 h-3.5" />
                  Add Post
                </button>
              </div>

              {/* Weekly grid columns */}
              <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 flex-1">
                {calendarDays.map((item, index) => (
                  <div key={index} className="bg-neutral-900/60 border border-neutral-850 rounded-xl p-2.5 flex flex-col min-h-[90px] relative hover:border-neutral-800 transition-all">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-neutral-500">{item.day}</span>
                      <span className="text-xs font-semibold bg-neutral-950 text-neutral-300 w-5 h-5 rounded-full flex items-center justify-center border border-neutral-800">
                        {item.date}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1 justify-center">
                      {item.posts.length > 0 ? (
                        item.posts.map((post) => (
                          <div 
                            key={post.id} 
                            className={`p-1.5 rounded border text-[10px] font-medium leading-tight text-left shadow-sm ${
                              post.status === "Published" 
                                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" 
                                : post.status === "Scheduled"
                                ? "bg-violet-500/5 border-violet-500/20 text-violet-400"
                                : "bg-neutral-850 border-neutral-700 text-neutral-400"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="font-extrabold px-1 rounded bg-black/40 text-[8px]">
                                {post.platform.toUpperCase()}
                              </span>
                              <span className="text-[8px] opacity-75">{post.time}</span>
                            </div>
                            <div className="truncate font-semibold">{post.title}</div>
                          </div>
                        ))
                      ) : (
                        <div className="h-full flex items-center justify-center border border-dashed border-neutral-850 rounded-lg py-3 text-[10px] text-neutral-700">
                          Empty
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================= ANALYTICS ================================= */}
          {activeTab === "analytics" && (
            <div className="flex-1 flex flex-col p-4 overflow-y-auto gap-4">
              
              {/* Analytics Mini Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-neutral-900 border border-neutral-800/80 p-3 rounded-xl">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Followers</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1 rounded font-bold">+12.4%</span>
                  </div>
                  <div className="text-lg font-bold text-white tracking-tight">48.2k</div>
                  <div className="text-[9px] text-neutral-500 mt-0.5">Across 6 profiles</div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800/80 p-3 rounded-xl">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Engagement</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1 rounded font-bold">+8.2%</span>
                  </div>
                  <div className="text-lg font-bold text-white tracking-tight">6.42%</div>
                  <div className="text-[9px] text-neutral-500 mt-0.5">Avg. interaction rate</div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800/80 p-3 rounded-xl">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Total Reach</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1 rounded font-bold">+24.1%</span>
                  </div>
                  <div className="text-lg font-bold text-white tracking-tight">1.2M</div>
                  <div className="text-[9px] text-neutral-500 mt-0.5">Impressions this month</div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800/80 p-3 rounded-xl">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">AI Savings</span>
                    <span className="text-[10px] bg-violet-500/10 text-violet-400 px-1 rounded font-bold">18 hrs</span>
                  </div>
                  <div className="text-lg font-bold text-white tracking-tight">$462.50</div>
                  <div className="text-[9px] text-neutral-500 mt-0.5">Inbox reply time saved</div>
                </div>
              </div>

              {/* Custom SVG Graphical Chart Mockup */}
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-3.5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Reach & Click Growth Curve</h4>
                    <span className="text-[10px] text-neutral-500">Weekly platform analytics summary</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-violet-500"></span>
                      <span className="text-[9px] text-neutral-400 font-medium">LinkedIn</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
                      <span className="text-[9px] text-neutral-400 font-medium">Instagram</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                      <span className="text-[9px] text-neutral-400 font-medium">Twitter / X</span>
                    </div>
                  </div>
                </div>

                {/* SVG Visual Area Chart */}
                <div className="flex-1 w-full relative min-h-[140px] mt-2 flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 500 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="chart-glow-violet" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="chart-glow-pink" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EC4899" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Chart grids */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="#262626" strokeDasharray="3 3" />
                    <line x1="0" y1="70" x2="500" y2="70" stroke="#262626" strokeDasharray="3 3" />
                    <line x1="0" y1="110" x2="500" y2="110" stroke="#262626" strokeDasharray="3 3" />

                    {/* Pink Line (Instagram) */}
                    <path d="M 0 130 Q 80 90 160 110 T 320 60 T 480 30" fill="none" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 0 130 Q 80 90 160 110 T 320 60 T 480 30 L 480 150 L 0 150 Z" fill="url(#chart-glow-pink)" />

                    {/* Violet Line (LinkedIn) */}
                    <path d="M 0 110 Q 80 50 160 80 T 320 40 T 480 15" fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M 0 110 Q 80 50 160 80 T 320 40 T 480 15 L 480 150 L 0 150 Z" fill="url(#chart-glow-violet)" />
                    
                    {/* Dots on peak */}
                    <circle cx="320" cy="40" r="4" fill="#8B5CF6" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="480" cy="30" r="4" fill="#EC4899" stroke="#ffffff" strokeWidth="1.5" />
                  </svg>

                  {/* Horizontal Chart scale */}
                  <div className="absolute bottom-[-16px] left-0 right-0 flex justify-between text-[8px] text-neutral-500 font-mono font-bold px-2 select-none">
                    <span>WEEK 1</span>
                    <span>WEEK 2</span>
                    <span>WEEK 3</span>
                    <span>WEEK 4</span>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
