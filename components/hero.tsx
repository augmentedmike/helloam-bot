"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const HERO_IMAGES = [
  {
    src: "/am/am-room.jpg",
    alt: "AM in your home — the red Mac Mini on the shelf, always on",
    scene: "The Home",
  },
  {
    src: "/am/am-desk.jpg",
    alt: "AM at your desk — running while you work",
    scene: "The Office",
  },
  {
    src: "/am/am-student.jpg",
    alt: "AM in your dorm — never lets you fall behind",
    scene: "The Dorm",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % HERO_IMAGES.length);
        setVisible(true);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden">
      {/* ── LEFT: copy ── */}
      <div className="relative z-10 flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-24 py-24 lg:py-0 lg:w-[52%] xl:w-[50%]">
        <p
          className="text-xs font-semibold tracking-[0.25em] uppercase mb-8"
          style={{ color: "#00E5FF" }}
        >
          helloam.bot
        </p>

        <h1
          className="text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          <span className="text-white">He lives</span>
          <br />
          <span className="text-white">on your desk.</span>
          <br />
          <span className="text-white">He runs </span>
          <span style={{ color: "#00E5FF" }}>your life.</span>
        </h1>

        <p className="text-lg sm:text-xl font-medium mb-6" style={{ color: "#aaaaaa" }}>
          A Mac Mini. Pre-installed with AM. Yours forever.
        </p>

        <p className="text-base leading-relaxed max-w-lg mb-10" style={{ color: "#777777" }}>
          AM arrives as a physical device — set up, named, and ready to go.
          He wakes up knowing your day. He handles your email, your calendar,
          your finances, your work. He learns everything about you over time.
          <br /><br />
          <span className="font-semibold" style={{ color: "#cccccc" }}>
            Not a subscription. Not a chatbot.
          </span>{" "}
          A digital companion who lives in your home and belongs to you alone.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { icon: "⚡", text: "Always on. Always yours." },
            { icon: "🔗", text: "Bonded to one person only" },
            { icon: "🧠", text: "Learns everything you know" },
            { icon: "💰", text: "Builds income while you sleep" },
          ].map((proof) => (
            <div
              key={proof.text}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#999999",
              }}
            >
              <span>{proof.icon}</span>
              <span>{proof.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-4">
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center px-7 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-100 whitespace-nowrap"
            style={{ background: "#00E5FF", color: "#0a0a0a", boxShadow: "0 0 48px rgba(0,229,255,0.3)" }}
          >
            Reserve Your AM
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-4 py-4 text-base font-medium transition-colors hover:text-white"
            style={{ color: "#666666" }}
          >
            See what he can do <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* ── RIGHT: rotating image ── */}
      <div className="relative lg:w-[48%] xl:w-[50%] min-h-[60vw] lg:min-h-0">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.15) 20%, transparent 45%), linear-gradient(to top, #0a0a0a 0%, transparent 18%)",
          }}
        />

        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <Image
            src={HERO_IMAGES[current].src}
            alt={HERO_IMAGES[current].alt}
            fill
            priority={current === 0}
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Scene label */}
        <div
          className="absolute top-8 right-8 z-20 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-opacity duration-300"
          style={{
            background: "rgba(10,10,10,0.6)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#00E5FF",
            opacity: visible ? 1 : 0,
          }}
        >
          {HERO_IMAGES[current].scene}
        </div>

        {/* Always on badge */}
        <div
          className="absolute bottom-10 left-8 z-20 flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-sm"
          style={{ background: "rgba(10,10,10,0.75)", border: "1px solid rgba(0,229,255,0.25)" }}
        >
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00E5FF" }} />
          <span className="text-sm font-medium text-white">AM is always on</span>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-10 right-8 z-20 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setVisible(false); setTimeout(() => { setCurrent(i); setVisible(true); }, 300); }}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === current ? "#00E5FF" : "rgba(255,255,255,0.3)",
                transform: i === current ? "scale(1.4)" : "scale(1)",
              }}
              aria-label={`Show image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 w-[40%] h-full"
        style={{ background: "radial-gradient(ellipse 60% 50% at 0% 50%, rgba(0,229,255,0.05) 0%, transparent 70%)" }}
      />
    </section>
  );
}
