"use client";

import Image from "next/image";
import { useState } from "react";

const COLORS = [
  { id: "red",     label: "AM Red",        hex: "#CC2200", available: true,  signature: true },
  { id: "black",   label: "Midnight",      hex: "#1a1a1a", available: true  },
  { id: "silver",  label: "Starlight",     hex: "#c8c8c0", available: true  },
  { id: "white",   label: "Arctic White",  hex: "#f0efeb", available: true  },
  { id: "blue",    label: "Ocean",         hex: "#2563a8", available: false },
  { id: "green",   label: "Forest",        hex: "#166534", available: false },
];

const INCLUDES = [
  "Your AM device — pre-installed, configured, and named",
  "White glove video setup with the founder",
  "Your pre-order number registered to you, forever",
  "Hardware, skin, labor & shipping included",
  "Plug in. Turn on. Meet AM.",
  "Priority support included for 1 year",
];

export default function Device() {
  const [selectedColor, setSelectedColor] = useState("red");
  const [payment, setPayment] = useState<"deposit" | "full">("deposit");

  const color = COLORS.find((c) => c.id === selectedColor)!;

  return (
    <section id="device" className="px-6 py-28 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#00E5FF" }}>
          The device
        </p>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          AM lives on your desk.
          <br />
          <span style={{ color: "#00E5FF" }}>Not in a browser tab.</span>
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "#777777" }}>
          Each AM ships as a dedicated personal device — pre-installed, pre-configured, and
          renamed to be yours. Choose your color. We handle the rest.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — device visual */}
        <div className="relative">
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src="/am/am-desk.jpg"
              alt="The AM device on a professional desk"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)",
              }}
            />
            {/* Color badge overlay */}
            <div
              className="absolute bottom-6 left-6 flex items-center gap-3 px-4 py-2.5 rounded-xl backdrop-blur-sm"
              style={{ background: "rgba(10,10,10,0.8)", border: `1px solid ${color.hex}40` }}
            >
              <div className="w-3 h-3 rounded-full" style={{ background: color.hex, boxShadow: `0 0 8px ${color.hex}80` }} />
              <span className="text-sm font-medium text-white">{color.label} skin</span>
              {color.signature && (
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#CC220020", color: "#CC2200" }}>
                  Signature
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right — configurator */}
        <div>
          {/* Color picker */}
          <div className="mb-8">
            <p className="text-sm font-semibold mb-4" style={{ color: "#aaaaaa" }}>
              Choose your color
            </p>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => c.available && setSelectedColor(c.id)}
                  title={c.label}
                  className="group relative flex flex-col items-center gap-2"
                  style={{ opacity: c.available ? 1 : 0.35 }}
                >
                  <div
                    className="w-9 h-9 rounded-full transition-all duration-200"
                    style={{
                      background: c.hex,
                      outline: selectedColor === c.id ? `2px solid ${c.hex}` : "2px solid transparent",
                      outlineOffset: "3px",
                      boxShadow: selectedColor === c.id ? `0 0 12px ${c.hex}60` : "none",
                    }}
                  />
                  <span className="text-[10px] font-medium whitespace-nowrap" style={{ color: selectedColor === c.id ? "#ffffff" : "#555555" }}>
                    {c.available ? c.label : `${c.label} (soon)`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Payment toggle */}
          <div className="mb-8">
            <p className="text-sm font-semibold mb-4" style={{ color: "#aaaaaa" }}>
              Payment
            </p>
            <div
              className="inline-flex rounded-xl p-1"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {[
                { id: "deposit" as const, label: "50% Deposit", sub: "$999.50 today" },
                { id: "full" as const,    label: "Pay in Full",  sub: "$1,999 today" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPayment(opt.id)}
                  className="flex flex-col items-center px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={{
                    background: payment === opt.id ? "rgba(0,229,255,0.12)" : "transparent",
                    color: payment === opt.id ? "#00E5FF" : "#666666",
                    border: payment === opt.id ? "1px solid rgba(0,229,255,0.25)" : "1px solid transparent",
                  }}
                >
                  <span>{opt.label}</span>
                  <span className="text-xs mt-0.5 font-normal" style={{ color: payment === opt.id ? "#00E5FF99" : "#444444" }}>
                    {opt.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-8">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-5xl font-bold text-white">
                {payment === "deposit" ? "$999.50" : "$1,999"}
              </span>
              <span style={{ color: "#555555" }}>
                {payment === "deposit" ? "today · $999.50 before shipping" : "one-time"}
              </span>
            </div>
            <p className="text-sm" style={{ color: "#555555" }}>
              Fully refundable until your unit ships · Shipping July 2026
            </p>
          </div>

          {/* Includes */}
          <ul className="mb-10 space-y-2.5">
            {INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 text-xs" style={{ color: "#00E5FF" }}>✓</span>
                <span className="text-sm" style={{ color: "#888888" }}>{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#waitlist"
            className="flex items-center justify-center w-full px-8 py-5 rounded-xl text-base font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-100"
            style={{ background: "#00E5FF", color: "#0a0a0a", boxShadow: "0 0 48px rgba(0,229,255,0.25)" }}
          >
            Pre-Order Your AM — Reserve #
          </a>
          <p className="mt-3 text-center text-xs" style={{ color: "#444444" }}>
            Pre-orders are numbered and registered to you permanently.
          </p>
        </div>
      </div>
    </section>
  );
}
