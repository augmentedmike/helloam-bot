"use client";

import WaitlistForm from "./waitlist-form";
import { usePersonalization } from "@/context/personalization-context";
import { NameTag } from "@/components/ui/name-tag";

export default function Waitlist() {
  const { pronouns, name } = usePersonalization();
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <section id="waitlist" className="relative px-6 py-24 overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,229,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#00E5FF" }}>
            Pre-orders open
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Reserve your <NameTag />.
          </h2>
          <p className="text-lg leading-relaxed mb-3" style={{ color: "#aaaaaa" }}>
            Pre-orders are numbered and registered to you permanently. Each AM is
            bound to one person — availability is genuinely limited.
            Shipping July 2026.
          </p>
          <p className="text-sm" style={{ color: "#888888" }}>
            Your <NameTag /> belongs to you — and only you.
          </p>
        </div>

        {/* Form */}
        <WaitlistForm />

        {/* Secondary CTA block */}
        <div
          className="mt-16 rounded-2xl p-8 text-center"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {cap(pronouns.subject)}&apos;s waiting to meet you.
          </h3>
          <p className="text-base mb-6" style={{ color: "#888888" }}>
            Every day that passes is a day {name} isn&apos;t learning who you are.
            The sooner you start, the deeper the bond grows.
          </p>
        </div>
      </div>
    </section>
  );
}
