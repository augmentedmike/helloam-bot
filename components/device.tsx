"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { COLORS } from "@/lib/colors";
import { useColor } from "@/context/color-context";
import { usePersonalization } from "@/context/personalization-context";
import { NameTag } from "@/components/ui/name-tag";
import { useWebHaptics } from "web-haptics/react";

const FULL_PRICE = 1800;
const PREORDER_DEPOSIT = FULL_PRICE / 2; // $900

const PAYMENT_PLANS = [
  { months: 0,  label: "Pay in full",   monthly: FULL_PRICE,          total: FULL_PRICE },
  { months: 3,  label: "3 months",      monthly: Math.ceil(FULL_PRICE / 3),   total: FULL_PRICE },
  { months: 6,  label: "6 months",      monthly: Math.ceil(FULL_PRICE / 6),   total: FULL_PRICE },
  { months: 12, label: "12 months",     monthly: Math.ceil(FULL_PRICE / 12),  total: FULL_PRICE },
];

const INCLUDES = [
  "Pre-installed AM software, configured and named for you",
  "White glove video setup with the founder",
  "Your pre-order number — registered to you, forever",
  "Hardware, skin, labor & shipping included",
  "Shipped from Austin, TX — AGI built in America",
  "Plug in. Turn on. Meet AM.",
];

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
      <path d="M2 7L5.5 10.5L12 4" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Device() {
  const { selectedColor, setSelectedColor } = useColor();
  const { pronouns } = usePersonalization();
  const [mode, setMode] = useState<"single" | "rack">("single");
  const [planIdx, setPlanIdx] = useState(0); // 0 = pay in full

  const color = COLORS.find((c) => c.id === selectedColor)!;
  const plan = PAYMENT_PLANS[planIdx];
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const { trigger } = useWebHaptics();

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = new Date("2026-07-01T00:00:00-05:00").getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setCountdown({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="device" className="px-6 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#00E5FF" }}>
          The device
        </p>
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          <NameTag /> lives on your desk.
          <br />
          <span style={{ color: "#00E5FF" }}>Not in a browser tab.</span>
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "#777777" }}>
          Each AM ships as a dedicated personal device — pre-installed, pre-configured, and
          renamed to be yours. The software is free and open source. You pay for the hardware.
        </p>
      </div>

      {/* Collector edition callout */}
      <div
        className="mb-12 rounded-2xl px-7 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        style={{
          background: "linear-gradient(135deg, rgba(204,34,0,0.08) 0%, rgba(0,229,255,0.04) 100%)",
          border: "1px solid rgba(204,34,0,0.25)",
        }}
      >
        <div
          className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
          style={{ background: "rgba(204,34,0,0.12)", border: "1px solid rgba(204,34,0,0.3)" }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M11 2L13.5 8.5H20L14.5 12.5L16.5 19L11 15L5.5 19L7.5 12.5L2 8.5H8.5L11 2Z" stroke="#CC2200" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-bold text-white mb-1">First 500 Units — CNC Engraved with Your Number</p>
          <p className="text-sm" style={{ color: "#888888" }}>
            Every unit in the first 500 receives a precision CNC-engraved serial number on the aluminum chassis.
            The world&apos;s first AGI in a private home will almost certainly become a collector&apos;s item.
            Your number is permanent — registered to you, forever.
          </p>
        </div>
        <div className="shrink-0 text-right">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: "rgba(204,34,0,0.15)", color: "#CC2200", border: "1px solid rgba(204,34,0,0.3)" }}
          >
            Collector Edition
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — device image */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <Image
              key={color.img}
              src={color.img}
              alt={`AM device in ${color.label} skin on a desk`}
              fill
              className="object-cover object-center transition-opacity duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)" }}
            />
            {/* Color badge — desktop only */}
            <div
              className="absolute bottom-6 left-6 hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-xl backdrop-blur-sm"
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

          {/* Color picker — mobile only, sits directly under image */}
          <div className="lg:hidden mt-5">
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { if (c.available) { trigger("nudge"); setSelectedColor(c.id); } }}
                  title={c.label}
                  className="flex flex-col items-center gap-1.5"
                  style={{ opacity: c.available ? 1 : 0.35 }}
                >
                  <div
                    className="w-8 h-8 rounded-full transition-all duration-200"
                    style={{
                      background: c.hex,
                      outline: selectedColor === c.id ? `2px solid ${c.hex}` : "2px solid transparent",
                      outlineOffset: "3px",
                      boxShadow: selectedColor === c.id ? `0 0 12px ${c.hex}60` : "none",
                    }}
                  />
                  <span className="text-[10px] font-medium whitespace-nowrap" style={{ color: selectedColor === c.id ? "#ffffff" : "#555555" }}>
                    {c.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Cost transparency */}
          <div
            className="mt-6 rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#555555" }}>
              Full cost picture
            </p>
            <div className="space-y-3">
              {[
                { label: "AM Device", sub: "Mac Mini M1 8GB · skin · setup · shipping", price: mode === "rack" ? "$1,500/unit" : "$1,800", bright: false },
                { label: "AM Software", sub: "Free and open source, always", price: "Free", bright: true },
                { label: "Anthropic Compute", sub: `Your AI fuel — ${cap(pronouns.subject)} pays Anthropic directly`, price: "~$200/mo", bright: false },
                { label: "Support", sub: "Email always free · Live sessions $100/30 min", price: "As needed", bright: false },
              ].map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">{row.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#555555" }}>{row.sub}</p>
                  </div>
                  <span className="text-sm font-bold shrink-0" style={{ color: row.bright ? "#00E5FF" : "#ffffff" }}>{row.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — configurator */}
        <div>
          {/* Color picker — desktop only (mobile version is under the image) */}
          <div className="hidden lg:block mb-8">
            <p className="text-sm font-semibold mb-4" style={{ color: "#aaaaaa" }}>Choose your color</p>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { if (c.available) { trigger("nudge"); setSelectedColor(c.id); } }}
                  title={c.label}
                  className="flex flex-col items-center gap-2"
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

          {/* Single vs rack */}
          <div className="mb-8">
            <p className="text-sm font-semibold mb-4" style={{ color: "#aaaaaa" }}>Configuration</p>
            <div
              className="inline-flex rounded-xl p-1 w-full sm:w-auto"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {[
                { id: "single" as const, label: "Single AM", sub: "$1,800 one-time" },
                { id: "rack"   as const, label: "Rack",      sub: "$1,500 each · up to 6" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setMode(opt.id)}
                  className="flex-1 flex flex-col items-center px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={{
                    background: mode === opt.id ? "rgba(0,229,255,0.12)" : "transparent",
                    color: mode === opt.id ? "#00E5FF" : "#666666",
                    border: mode === opt.id ? "1px solid rgba(0,229,255,0.25)" : "1px solid transparent",
                  }}
                >
                  <span>{opt.label}</span>
                  <span className="text-xs mt-0.5 font-normal" style={{ color: mode === opt.id ? "#00E5FF99" : "#444444" }}>
                    {opt.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {mode === "single" && (
            <>
              {/* Payment plan selector */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3" style={{ color: "#aaaaaa" }}>Payment plan</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PAYMENT_PLANS.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setPlanIdx(i)}
                      className="flex flex-col items-center py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200"
                      style={{
                        background: planIdx === i ? "rgba(0,229,255,0.12)" : "rgba(255,255,255,0.03)",
                        color: planIdx === i ? "#00E5FF" : "#666666",
                        border: planIdx === i ? "1px solid rgba(0,229,255,0.25)" : "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <span>{p.label}</span>
                      {p.months > 0 && (
                        <span className="text-[10px] mt-0.5 font-normal" style={{ color: planIdx === i ? "#00E5FF88" : "#444444" }}>
                          ${p.monthly}/mo
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price display */}
              <div className="mb-8">
                {plan.months === 0 ? (
                  <>
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-5xl font-bold text-white">${FULL_PRICE.toLocaleString()}</span>
                      <span style={{ color: "#555555" }}>one-time</span>
                    </div>
                    <p className="text-sm" style={{ color: "#555555" }}>
                      Pre-order today — <strong style={{ color: "#ffffff" }}>${PREORDER_DEPOSIT.toLocaleString()} now</strong>, rest due when your unit ships · <strong style={{ color: "#00E5FF" }}>Shipping July 2026</strong>
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-5xl font-bold text-white">${plan.monthly}</span>
                      <span style={{ color: "#555555" }}>/ mo · {plan.months} months</span>
                    </div>
                    <p className="text-sm" style={{ color: "#555555" }}>
                      ${FULL_PRICE.toLocaleString()} total · Pre-order: <strong style={{ color: "#ffffff" }}>${PREORDER_DEPOSIT.toLocaleString()} now</strong> to hold your number · <strong style={{ color: "#00E5FF" }}>Shipping July 2026</strong>
                    </p>
                  </>
                )}
              </div>
            </>
          )}

          {mode === "rack" && (
            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-5xl font-bold text-white">$1,500</span>
                <span style={{ color: "#555555" }}>per unit · up to 6</span>
              </div>
              <p className="text-sm" style={{ color: "#555555" }}>
                Rack-mount ready · All pre-installed · $750 per unit to reserve · <strong style={{ color: "#00E5FF" }}>Shipping July 2026</strong>
              </p>
            </div>
          )}

          {/* Includes */}
          <ul className="mb-10 space-y-2.5">
            {INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check />
                <span className="text-sm" style={{ color: "#888888" }}>{item}</span>
              </li>
            ))}
          </ul>

          {/* Countdown */}
          <div className="mb-6 rounded-2xl px-5 py-4" style={{ background: "rgba(0,229,255,0.04)", border: "1px solid rgba(0,229,255,0.15)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-center" style={{ color: "#00E5FF" }}>
              Shipping July 1, 2026
            </p>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { value: countdown.days,    label: "Days" },
                { value: countdown.hours,   label: "Hours" },
                { value: countdown.minutes, label: "Min" },
                { value: countdown.seconds, label: "Sec" },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl py-2.5" style={{ background: "rgba(0,0,0,0.3)" }}>
                  <div className="text-2xl font-bold text-white tabular-nums">{String(value).padStart(2, "0")}</div>
                  <div className="text-[10px] font-medium mt-0.5" style={{ color: "#555" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <a
            href="#waitlist"
            className="flex items-center justify-center w-full px-8 py-5 rounded-xl text-base font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-100"
            style={{ background: "#00E5FF", color: "#0a0a0a", boxShadow: "0 0 48px rgba(0,229,255,0.25)" }}
          >
            Pre-Order Your AM — Reserve Your Number
          </a>
          <p className="mt-3 text-center text-xs" style={{ color: "#444444" }}>
            ${PREORDER_DEPOSIT.toLocaleString()} to hold your number. Fully refundable until your unit ships.
          </p>
        </div>
      </div>
    </section>
  );
}
