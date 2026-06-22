import { ArrowRight } from "lucide-react";

import { FloatingIcons } from "./FloatingIcons";
import { Navbar } from "./Navbar";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F7F7F7] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1150px] px-6">
        <div className="rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.08)] sm:p-10">
          <div className="flex justify-center">
            <Navbar />
          </div>

          <div className="mx-auto mt-20 max-w-[680px] text-center">
            <h6 className="text-5xl font-extrabold tracking-[-0.03em] text-slate-950 leading-tight sm:text-3xl lg:text-5xl">
              Manage all social media accounts using one  
              {/* <br /> */}
              <span className="mt-4 inline-flex rounded-[12px] bg-[#FFD500] mx-4 px-1 py-0.5 font-extrabold text-slate-950">
                AI-Powered Platform.
              </span>
            </h6>
            

            <p className="mx-auto mt-4 max-w-[600px] text-base leading-7 text-[#6B7280]">
              The AI-powered social media platform that helps you create, schedule, and analyze content across all platforms in one place.
            </p>

            <div className="mt-5 flex justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-[12px] bg-[#2563EB] px-8 py-4 text-base font-semibold text-white"
              >
                Watch Demo
                <ArrowRight className="ml-3 h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto mt-6 hidden h-[320px] max-w-[900px] md:block">
            <FloatingIcons />
          </div>
        </div>
      </div>
    </section>
  );
}
