"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { COLORS } from "@/lib/colors";
import { useColor } from "@/context/color-context";
import { usePersonalization } from "@/context/personalization-context";
import { NameTag } from "@/components/ui/name-tag";
import { useWebHaptics } from "web-haptics/react";

function CheckoutModal({ open, onClose, color, mode, qty, deposit }: { open: boolean; onClose: () => void; color: string; mode: string; qty: number; deposit: number }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  if (!open) return null;

  async function handleSubmit() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Valid email required";
    if (!line1.trim()) errs.line1 = "Required";
    if (!city.trim()) errs.city = "Required";
    if (!state.trim()) errs.state = "Required";
    if (!zip.trim()) errs.zip = "Required";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setApiError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color, mode, qty, name, email, address: { line1, line2, city, state, postal_code: zip, country: "US" } }),
      });
      const data = await res.json();
      if (!res.ok) { setApiError(data.error || "Something went wrong."); setLoading(false); return; }
      window.location.href = data.url;
    } catch {
      setApiError("Network error. Please try again.");
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-[#555] outline-none focus:ring-1 focus:ring-[#00E5FF]";
  const inputStyle = (field: string) => ({
    background: "rgba(255,255,255,0.06)",
    border: errors[field] ? "1px solid #ff4444" : "1px solid rgba(255,255,255,0.1)",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl p-6 space-y-4"
        style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-white">Complete your pre-order</h3>
          <button onClick={onClose} className="text-[#555] hover:text-white text-xl leading-none cursor-pointer">×</button>
        </div>
        <p className="text-sm" style={{ color: "#888" }}>
          Deposit: <strong className="text-white">${deposit.toLocaleString()}</strong> — you&apos;ll be redirected to Stripe to pay.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <input type="text" placeholder="Full name" value={name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }} className={inputClass} style={inputStyle("name")} />
            {errors.name && <p className="text-xs mt-1" style={{ color: "#ff4444" }}>{errors.name}</p>}
          </div>
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }} className={inputClass} style={inputStyle("email")} />
            {errors.email && <p className="text-xs mt-1" style={{ color: "#ff4444" }}>{errors.email}</p>}
          </div>
        </div>

        <p className="text-sm font-semibold pt-1" style={{ color: "#aaaaaa" }}>Shipping address</p>
        <div>
          <input type="text" placeholder="Street address" value={line1} onChange={(e) => { setLine1(e.target.value); setErrors((p) => ({ ...p, line1: "" })); }} className={inputClass} style={inputStyle("line1")} />
          {errors.line1 && <p className="text-xs mt-1" style={{ color: "#ff4444" }}>{errors.line1}</p>}
        </div>
        <input type="text" placeholder="Apt, suite, unit (optional)" value={line2} onChange={(e) => setLine2(e.target.value)} className={inputClass} style={inputStyle("")} />
        <div className="grid grid-cols-3 gap-3">
          <div>
            <input type="text" placeholder="City" value={city} onChange={(e) => { setCity(e.target.value); setErrors((p) => ({ ...p, city: "" })); }} className={inputClass} style={inputStyle("city")} />
            {errors.city && <p className="text-xs mt-1" style={{ color: "#ff4444" }}>{errors.city}</p>}
          </div>
          <div>
            <input type="text" placeholder="State" value={state} onChange={(e) => { setState(e.target.value); setErrors((p) => ({ ...p, state: "" })); }} className={inputClass} style={inputStyle("state")} />
            {errors.state && <p className="text-xs mt-1" style={{ color: "#ff4444" }}>{errors.state}</p>}
          </div>
          <div>
            <input type="text" placeholder="ZIP" value={zip} onChange={(e) => { setZip(e.target.value); setErrors((p) => ({ ...p, zip: "" })); }} className={inputClass} style={inputStyle("zip")} />
            {errors.zip && <p className="text-xs mt-1" style={{ color: "#ff4444" }}>{errors.zip}</p>}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center justify-center w-full px-8 py-4 rounded-xl text-base font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-100 disabled:opacity-50 cursor-pointer"
          style={{ background: "#00E5FF", color: "#0a0a0a", boxShadow: "0 0 48px rgba(0,229,255,0.25)" }}
        >
          {loading ? "Redirecting to Stripe…" : `Pay $${deposit.toLocaleString()} Deposit`}
        </button>
        {apiError && <p className="text-center text-sm" style={{ color: "#ff4444" }}>{apiError}</p>}
        <p className="text-center text-[10px]" style={{ color: "#444" }}>Secure checkout via Stripe. Deposit is non-refundable.</p>
      </div>
    </div>
  );
}

const SINGLE_PRICE = Number(process.env.NEXT_PUBLIC_SINGLE_PRICE) || 1500;
const RACK_PRICE = Number(process.env.NEXT_PUBLIC_RACK_PRICE) || 1200;
const RACK_MAX_PER_RACK = Number(process.env.NEXT_PUBLIC_RACK_MAX_PER_RACK) || 6;
const RACK_MAX_PER_CUSTOMER = Number(process.env.NEXT_PUBLIC_RACK_MAX_PER_CUSTOMER) || 12;
const SINGLE_DEPOSIT = SINGLE_PRICE / 2;
const RACK_DEPOSIT = RACK_PRICE / 2;

const PAYMENT_PLANS = [
  { months: 0,  label: "Pay at launch", monthly: SINGLE_DEPOSIT,                       total: SINGLE_DEPOSIT },
  { months: 3,  label: "3 months",      monthly: Math.ceil(SINGLE_DEPOSIT / 3),        total: SINGLE_DEPOSIT },
  { months: 6,  label: "6 months",      monthly: Math.ceil(SINGLE_DEPOSIT / 6),        total: SINGLE_DEPOSIT },
  { months: 12, label: "12 months",     monthly: Math.ceil(SINGLE_DEPOSIT / 12),       total: SINGLE_DEPOSIT },
];

const INCLUDES = [
  "Pre-installed Am software, configured and named for you",
  "White glove video setup with the founder",
  "Your machine number — registered to you, forever",
  "Hardware, skin, labor & shipping included",
  "Shipped from Austin, TX — AGI built in America",
  "Plug in. Turn on. Meet Am.",
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
  const [rackQty, setRackQty] = useState(2);
  const [showCheckout, setShowCheckout] = useState(false);

  const color = COLORS.find((c) => c.id === selectedColor)!;
  const plan = PAYMENT_PLANS[planIdx];

  // Computed pricing
  const unitPrice = mode === "rack" ? RACK_PRICE : SINGLE_PRICE;
  const qty = mode === "rack" ? rackQty : 1;
  const totalPrice = unitPrice * qty;
  const deposit = totalPrice / 2;
  const remaining = totalPrice / 2;
  const monthlyPayment = plan.months > 0 ? Math.ceil(remaining / plan.months) : remaining;
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
          <NameTag /> runs locally, not in the cloud.
          <br />
          <span style={{ color: "#00E5FF" }}>Not in a browser tab.</span>
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "#777777" }}>
          Each Am ships as a dedicated personal device — pre-installed, pre-configured, and
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

      {/* Countdown — full width */}
      <div className="mb-12 rounded-2xl px-5 py-4" style={{ background: "rgba(0,229,255,0.04)", border: "1px solid rgba(0,229,255,0.15)" }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-center" style={{ color: "#00E5FF" }}>
          Shipping July 1, 2026
        </p>
        <div className="grid grid-cols-4 gap-3 text-center max-w-lg mx-auto">
          {[
            { value: countdown.days,    label: "Days" },
            { value: countdown.hours,   label: "Hours" },
            { value: countdown.minutes, label: "Min" },
            { value: countdown.seconds, label: "Sec" },
          ].map(({ value, label }) => (
            <div key={label} className="rounded-xl py-3" style={{ background: "rgba(0,0,0,0.3)" }}>
              <div className="text-3xl font-bold text-white tabular-nums">{String(value).padStart(2, "0")}</div>
              <div className="text-[10px] font-medium mt-1" style={{ color: "#555" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left — device image */}
        <div className="relative">
          {/* Color picker — desktop, above image */}
          <div className="hidden lg:block mb-6">
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

          <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <Image
              key={color.img}
              src={color.img}
              alt={`Am device in ${color.label} skin on a desk`}
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
                { label: "Am Device", sub: "Mac Mini M1 8GB · skin · setup · shipping", price: mode === "rack" ? `$${RACK_PRICE.toLocaleString()}/unit` : `$${SINGLE_PRICE.toLocaleString()}`, bright: false },
                { label: "Am Software", sub: "Free and open source, always", price: "Free", bright: true },
                { label: "Anthropic Compute", sub: `Your AI fuel — ${cap(pronouns.subject)} pays Anthropic directly`, price: "$20–$200/mo", bright: false },
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
          {/* Single vs rack */}
          <div className="mb-8">
            <p className="text-sm font-semibold mb-4" style={{ color: "#aaaaaa" }}>Configuration</p>
            <div
              className="inline-flex rounded-xl p-1 w-full sm:w-auto"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {[
                { id: "single" as const, label: "Single Am", sub: `$${SINGLE_PRICE.toLocaleString()} one-time` },
                { id: "rack"   as const, label: "Stack",      sub: `$${RACK_PRICE.toLocaleString()} each · min 2 · up to ${RACK_MAX_PER_RACK}` },
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

          {/* Rack quantity selector */}
          {mode === "rack" && (
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3" style={{ color: "#aaaaaa" }}>
                Quantity <span className="font-normal" style={{ color: "#555" }}>(up to {RACK_MAX_PER_RACK} per rack · max 1 rack per customer)</span>
              </p>
              <div className="inline-flex items-center gap-4 rounded-xl px-4 py-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <button
                  onClick={() => setRackQty((q) => Math.max(2, q - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold transition-colors hover:text-white"
                  style={{ color: "#666", background: "rgba(255,255,255,0.06)" }}
                >
                  −
                </button>
                <span className="text-xl font-bold text-white tabular-nums w-6 text-center">{rackQty}</span>
                <button
                  onClick={() => setRackQty((q) => Math.min(RACK_MAX_PER_RACK, q + 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold transition-colors hover:text-white"
                  style={{ color: "#666", background: "rgba(255,255,255,0.06)" }}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Payment plan selector — applies to remaining half */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-3" style={{ color: "#aaaaaa" }}>How to pay the remaining half at launch</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { months: 0,  label: "Pay at launch" },
                { months: 3,  label: "3 months" },
                { months: 6,  label: "6 months" },
                { months: 12, label: "12 months" },
              ].map((p, i) => (
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
                      ${Math.ceil(remaining / p.months)}/mo
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price display */}
          <div className="mb-8">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-5xl font-bold text-white">${totalPrice.toLocaleString()}</span>
              <span style={{ color: "#555555" }}>{mode === "rack" ? `total · ${rackQty} unit${rackQty > 1 ? "s" : ""} × $${RACK_PRICE.toLocaleString()}` : "total"}</span>
            </div>
            <p className="text-sm" style={{ color: "#555555" }}>
              <strong style={{ color: "#ffffff" }}>${deposit.toLocaleString()} deposit now</strong> · remaining ${remaining.toLocaleString()} due at launch
              {plan.months > 0 && (
                <> · <strong style={{ color: "#00E5FF" }}>${monthlyPayment}/mo × {plan.months} months (0% interest)</strong></>
              )}
            </p>
            <p className="text-xs mt-1" style={{ color: "#00E5FF" }}>Shipping July 2026</p>
          </div>

          {/* Includes */}
          <ul className="mb-10 space-y-2.5">
            {INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <Check />
                <span className="text-sm" style={{ color: "#888888" }}>{item}</span>
              </li>
            ))}
          </ul>

          {/* Order summary */}
          <div
            className="rounded-2xl p-6 mb-6"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex gap-4 items-center mb-5">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative">
                <Image src={color.img} alt={`Am in ${color.label}`} fill className="object-cover" sizes="64px" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Am Device{mode === "rack" ? ` × ${rackQty}` : ""} — {color.label}</p>
                <p className="text-xs" style={{ color: "#666" }}>Mac Mini M1 · Pre-installed · Numbered{mode === "rack" ? " · Rack-mount ready" : ""}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: "#888" }}>{mode === "rack" ? `${rackQty} × $${RACK_PRICE.toLocaleString()}` : "Device price"}</span>
                <span className="text-white font-semibold">${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#888" }}>Deposit today (50%)</span>
                <span className="font-bold" style={{ color: "#00E5FF" }}>${deposit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#888" }}>Due at launch</span>
                <span className="text-white">${remaining.toLocaleString()}{plan.months > 0 ? ` (${plan.months} mo)` : ""}</span>
              </div>
              {plan.months > 0 && (
                <div className="flex justify-between pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "#888" }}>${monthlyPayment}/mo × {plan.months} months</span>
                  <span style={{ color: "#00E5FF" }}>0% interest</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setShowCheckout(true)}
            className="flex items-center justify-center w-full px-8 py-5 rounded-xl text-base font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-100 cursor-pointer"
            style={{ background: "#00E5FF", color: "#0a0a0a", boxShadow: "0 0 48px rgba(0,229,255,0.25)" }}
          >
            Pre-Order Now — ${deposit.toLocaleString()} Deposit
          </button>
          <CheckoutModal open={showCheckout} onClose={() => setShowCheckout(false)} color={color.id} mode={mode} qty={qty} deposit={deposit} />
          <p className="mt-3 text-center text-xs" style={{ color: "#444444" }}>
            Secure checkout via Stripe.
          </p>
          <p className="mt-2 text-center text-[10px] leading-relaxed" style={{ color: "#333" }}>
            Pre-order deposits are non-refundable. You may decline to pay the remaining balance at launch,
            but your deposit will not be returned. By placing this order you agree to these terms.
            Sold by Tylt LLC, a Delaware corporation.
          </p>
          <p className="mt-4 text-center">
            <a href="#waitlist" className="text-xs transition-colors hover:text-white" style={{ color: "#555", textDecoration: "underline" }}>
              Not ready to buy? Join the mailing list instead →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
