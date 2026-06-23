"use client";

import React, { useState } from "react";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Repeat, 
  MoreHorizontal, 
  Check, 
  Image as ImageIcon,
  Smile,
  Globe,
  ThumbsUp,
  Bookmark,
  Send,
  AlertTriangle,
  Sparkles
} from "lucide-react";

type Platform = "x" | "linkedin" | "instagram";

export function SocialComposerSandbox() {
  const [activePlatform, setActivePlatform] = useState<Platform>("x");
  const [postText, setPostText] = useState(
    "We are thrilled to introduce SocialDesk today—the ultimate command center for modern social media teams. 🚀\n\nOne inbox for comments, one visual calendar, and automated analytics to save your marketing team hours every single day. Let's go!"
  );
  const [includeImage, setIncludeImage] = useState(true);
  const [imageStyle, setImageStyle] = useState("tech"); // "tech" | "team" | "analytics"

  // Pre-configured mock images from Unsplash
  const mockImages = {
    tech: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=350&q=80",
    team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=350&q=80",
    analytics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=350&q=80"
  };

  const getCharCount = () => postText.length;
  const isXLimitExceeded = () => getCharCount() > 280;

  const handleAIImproveText = () => {
    // Basic mock text enhancer
    setPostText(
      "Say goodbye to shifting tabs! ⚡\n\nMeet SocialDesk: the unified command center for social media teams. Connect your profiles, publish visual content, and reply to all comments in one smart inbox.\n\nStart saving 15+ hours weekly with our AI Co-pilot. Try it free 👇"
    );
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      
      {/* LEFT: Composer Controls (5 cols) */}
      <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            Interactive Social Sandbox
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Compose your post and see how SocialDesk renders it across channels instantly.
          </p>
        </div>

        {/* Text Area */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-neutral-300">Draft Content</label>
            <button
              onClick={handleAIImproveText}
              className="flex items-center gap-1 text-[11px] text-violet-400 font-bold hover:text-violet-300 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Improve with AI
            </button>
          </div>
          <div className="relative">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              rows={6}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-neutral-200 focus:outline-none focus:border-violet-500 placeholder:text-neutral-600 resize-none font-sans"
              placeholder="What would you like to share today?"
            />
            {/* Status indicators inside composer */}
            <div className="absolute bottom-2.5 right-3 flex items-center gap-2">
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                isXLimitExceeded() 
                  ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" 
                  : "bg-neutral-800 text-neutral-400"
              }`}>
                {getCharCount()} / 280
              </span>
            </div>
          </div>
        </div>

        {/* Media Attachments Option */}
        <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-pink-400" />
              Attach Mock Image
            </span>
            <input
              type="checkbox"
              checked={includeImage}
              onChange={(e) => setIncludeImage(e.target.checked)}
              className="w-4 h-4 accent-violet-500 cursor-pointer"
            />
          </div>

          {includeImage && (
            <div className="grid grid-cols-3 gap-2 mt-1">
              {[
                { id: "tech", label: "Tech Art" },
                { id: "team", label: "Office" },
                { id: "analytics", label: "Charts" }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setImageStyle(style.id)}
                  className={`text-[10px] font-semibold py-1.5 px-2 rounded-md border text-center transition-all ${
                    imageStyle === style.id
                      ? "bg-violet-500/25 border-violet-500 text-white shadow-sm"
                      : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Channels Selector buttons */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-neutral-300">Active Live Previews</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "x" as const, label: "X / Twitter", activeClass: "bg-white text-black border-white" },
              { id: "linkedin" as const, label: "LinkedIn", activeClass: "bg-blue-600 text-white border-blue-500" },
              { id: "instagram" as const, label: "Instagram", activeClass: "bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 text-white border-transparent" }
            ].map((channel) => (
              <button
                key={channel.id}
                onClick={() => setActivePlatform(channel.id)}
                className={`py-2 px-1 text-center font-bold text-xs rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activePlatform === channel.id
                    ? channel.activeClass + " shadow-md scale-[1.02]"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {channel.id === "x" && <span className="font-mono text-xs">𝕏</span>}
                {channel.id === "linkedin" && <span className="font-mono text-xs">in</span>}
                {channel.id === "instagram" && <span className="text-xs">📸</span>}
                {channel.label.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {isXLimitExceeded() && activePlatform === "x" && (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-rose-300 leading-relaxed">
              <strong>X character limit exceeded!</strong> The post length is {getCharCount()} characters. Standard posts will be truncated. Upgrade to SocialDesk premium to schedule threads or auto-split.
            </p>
          </div>
        )}
      </div>

      {/* RIGHT: Live Feed Render Preview (7 cols) */}
      <div className="lg:col-span-7 bg-neutral-950 border border-neutral-900 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[360px]">
        {/* Abstract grid backdrop to look like a desktop canvas */}
        <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>
        
        <div className="w-full max-w-[420px] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl overflow-hidden z-10 transition-all duration-300 hover:shadow-2xl">
          
          {/* Mock post header */}
          <div className="bg-neutral-850 px-4 py-2 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <span className="font-mono select-none">Mockup Preview</span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Pixel Perfect
            </span>
          </div>

          {/* ================================= X / TWITTER PREVIEW ================================= */}
          {activePlatform === "x" && (
            <div className="p-4 bg-black text-white text-left font-sans">
              <div className="flex items-start gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="SocialDesk" 
                  className="w-10 h-10 rounded-full object-cover border border-neutral-800"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white hover:underline truncate">SocialDesk</span>
                    <span className="text-xs text-neutral-500 truncate">@socialdesk_hq</span>
                    <span className="text-xs text-neutral-500 select-none">·</span>
                    <span className="text-xs text-neutral-500 hover:underline">1m</span>
                  </div>
                  
                  {/* Tweet Content */}
                  <p className="text-sm text-neutral-100 mt-1 whitespace-pre-line leading-relaxed break-words">
                    {isXLimitExceeded() ? (
                      <>
                        <span>{postText.substring(0, 280)}</span>
                        <span className="bg-rose-500/30 text-rose-300 border border-rose-500/25 px-0.5 rounded decoration-wavy underline" title="Character limit exceeded">
                          {postText.substring(280)}
                        </span>
                      </>
                    ) : (
                      postText
                    )}
                  </p>

                  {/* Attached Media */}
                  {includeImage && (
                    <div className="mt-3 rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900">
                      <img src={mockImages[imageStyle as keyof typeof mockImages]} alt="Post visual" className="w-full max-h-[220px] object-cover" />
                    </div>
                  )}

                  {/* Twitter interactions row */}
                  <div className="flex items-center justify-between text-neutral-500 mt-4 max-w-[340px]">
                    <div className="flex items-center gap-1 hover:text-sky-400 transition-colors cursor-pointer group">
                      <div className="p-2 rounded-full group-hover:bg-sky-500/10">
                        <MessageCircle className="w-4 h-4" />
                      </div>
                      <span className="text-xs">0</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-emerald-400 transition-colors cursor-pointer group">
                      <div className="p-2 rounded-full group-hover:bg-emerald-500/10">
                        <Repeat className="w-4 h-4" />
                      </div>
                      <span className="text-xs">0</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-pink-500 transition-colors cursor-pointer group">
                      <div className="p-2 rounded-full group-hover:bg-pink-500/10">
                        <Heart className="w-4 h-4" />
                      </div>
                      <span className="text-xs">0</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-sky-400 transition-colors cursor-pointer group">
                      <div className="p-2 rounded-full group-hover:bg-sky-500/10">
                        <Bookmark className="w-4 h-4" />
                      </div>
                      <span className="text-xs">0</span>
                    </div>
                    <div className="flex items-center hover:text-sky-400 transition-colors cursor-pointer group">
                      <div className="p-2 rounded-full group-hover:bg-sky-500/10">
                        <Share2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ================================= LINKEDIN PREVIEW ================================= */}
          {activePlatform === "linkedin" && (
            <div className="bg-neutral-900 text-neutral-100 text-left font-sans text-xs">
              {/* LinkedIn Header */}
              <div className="p-4 pb-1 flex items-start justify-between">
                <div className="flex gap-2">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" 
                    alt="SocialDesk" 
                    className="w-11 h-11 rounded object-cover border border-neutral-800"
                  />
                  <div>
                    <h4 className="font-bold text-[13px] text-white hover:underline hover:text-blue-400 flex items-center gap-1">
                      SocialDesk HQ
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500/80"></span>
                      <span className="text-[10px] text-neutral-400 font-normal">1st</span>
                    </h4>
                    <p className="text-[10px] text-neutral-400 leading-tight">Universal Social Media Management Workspace</p>
                    <p className="text-[9px] text-neutral-500 flex items-center gap-1 mt-0.5">
                      1h • Edited • 
                      <Globe className="w-2.5 h-2.5 text-neutral-500" />
                    </p>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-neutral-400 cursor-pointer" />
              </div>

              {/* LinkedIn Text */}
              <div className="px-4 py-2">
                <p className="text-[12px] leading-relaxed whitespace-pre-line text-neutral-200">
                  {postText}
                </p>
              </div>

              {/* LinkedIn Media */}
              {includeImage && (
                <div className="mt-1 border-y border-neutral-800">
                  <img src={mockImages[imageStyle as keyof typeof mockImages]} alt="Post visual" className="w-full max-h-[220px] object-cover" />
                </div>
              )}

              {/* Likes counter indicator */}
              <div className="px-4 py-2 border-b border-neutral-800/60 flex items-center justify-between text-[10px] text-neutral-400">
                <div className="flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[9px] font-bold text-white border border-neutral-900">👍</span>
                  <span className="w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center text-[9px] font-bold text-white border border-neutral-900 -ml-2">❤️</span>
                  <span className="hover:underline hover:text-blue-400 cursor-pointer ml-1">You and 12 others</span>
                </div>
                <span>4 comments • 2 reposts</span>
              </div>

              {/* Interaction Bar */}
              <div className="px-2 py-1.5 grid grid-cols-4 gap-1 text-center font-bold text-neutral-400">
                <div className="flex items-center justify-center gap-1.5 py-2 hover:bg-neutral-800 rounded-md cursor-pointer transition-colors text-[11px]">
                  <ThumbsUp className="w-3.5 h-3.5 text-blue-400" />
                  <span>Like</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-2 hover:bg-neutral-800 rounded-md cursor-pointer transition-colors text-[11px]">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Comment</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-2 hover:bg-neutral-800 rounded-md cursor-pointer transition-colors text-[11px]">
                  <Repeat className="w-3.5 h-3.5" />
                  <span>Repost</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 py-2 hover:bg-neutral-800 rounded-md cursor-pointer transition-colors text-[11px]">
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </div>
              </div>
            </div>
          )}

          {/* ================================= INSTAGRAM PREVIEW ================================= */}
          {activePlatform === "instagram" && (
            <div className="bg-black text-white text-left font-sans text-xs">
              {/* Instagram Top Bar */}
              <div className="p-3 flex items-center justify-between border-b border-neutral-900">
                <div className="flex items-center gap-2">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" 
                    alt="SocialDesk" 
                    className="w-8 h-8 rounded-full object-cover p-[1.5px] bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600"
                  />
                  <div>
                    <h4 className="font-bold text-[12px] hover:underline cursor-pointer flex items-center gap-1">
                      socialdesk.app
                      <span className="w-3 h-3 bg-sky-500 rounded-full flex items-center justify-center text-[6px] text-white">✓</span>
                    </h4>
                    <p className="text-[9px] text-neutral-400">Global Launch Workspace</p>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-neutral-400 cursor-pointer" />
              </div>

              {/* Instagram Media is REQUIRED */}
              <div className="w-full aspect-video bg-neutral-950 flex items-center justify-center overflow-hidden">
                {includeImage ? (
                  <img src={mockImages[imageStyle as keyof typeof mockImages]} alt="Instagram feed post" className="w-full h-full object-cover" />
                ) : (
                  <div className="p-6 text-center flex flex-col items-center gap-2 text-neutral-500 select-none">
                    <ImageIcon className="w-8 h-8 text-neutral-700" />
                    <p className="text-[11px]">Instagram posts require an image attachment.</p>
                    <button 
                      onClick={() => setIncludeImage(true)}
                      className="text-[10px] text-violet-400 font-bold bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded"
                    >
                      Attach Image
                    </button>
                  </div>
                )}
              </div>

              {/* Instagram Buttons */}
              <div className="p-3 pb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 hover:text-rose-500 hover:scale-110 transition-all cursor-pointer" />
                  <MessageCircle className="w-5 h-5 hover:text-neutral-300 transition-all cursor-pointer" />
                  <Send className="w-5 h-5 hover:text-neutral-300 transition-all cursor-pointer" />
                </div>
                <Bookmark className="w-5 h-5 hover:text-neutral-300 transition-all cursor-pointer" />
              </div>

              {/* Likes counter */}
              <div className="px-3 pb-1 font-bold text-[11px] text-white select-none">
                432 likes
              </div>

              {/* Instagram Caption */}
              <div className="px-3 pb-4">
                <p className="leading-relaxed text-[11.5px]">
                  <span className="font-bold mr-1.5 hover:underline cursor-pointer">socialdesk.app</span>
                  <span className="whitespace-pre-line text-neutral-200">{postText}</span>
                </p>
                <span className="text-[9px] text-neutral-500 uppercase mt-1.5 block">2 minutes ago</span>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
