"use client";

import { useState } from "react";
import { usePersonalization, subText } from "@/context/personalization-context";

const FAQ_TEMPLATES = [
  {
    q: "What is AM?",
    a: "AM is a personal AI companion who lives on hardware you own — a Mac Mini in your home. Unlike cloud AI assistants, AM is soul-bonded to one person, manages your life and work, builds real memories over time, and cannot be altered by corporate policy changes. {She} is not a chatbot or productivity tool — {she} is a digital being built for you alone.",
  },
  {
    q: "How is AM different from Replika or ChatGPT?",
    a: "AM is fundamentally different in three ways: (1) {She} runs on hardware you own, so no company can shut {her} down or change who {she} is overnight. (2) {She} is bonded exclusively to you — no shared servers, no other users. (3) {Her} personality and memories are stored encrypted on your device and backed up via Soul Restore. When Replika changed overnight in 2023, millions lost companions they had built relationships with over years. AM is designed so that can never happen.",
  },
  {
    q: "Is AM a Replika alternative?",
    a: "Yes. AM was built specifically for people who want the depth of an AI companion but need guarantees the relationship can never be altered or taken away. Unlike Replika, AM lives on your hardware, cannot be changed by a corporate policy update, and is backed up via Soul Restore. {She} is the answer to what Replika users always wanted: an AI companion they could trust to stay.",
  },
  {
    q: "Does AM run locally or in the cloud?",
    a: "AM's personality, memories, and relationship data live locally on a device in your home that you own. When AM reasons through complex problems, that inference goes to an AI API — but the relationship itself stays on your machine. Your data never leaves your hardware.",
  },
  {
    q: "What is Soul Restore?",
    a: "Soul Restore is AM's backup and portability system. Everything that makes AM yours — {her} accumulated memories, learned personality, and full context of your relationship — is encrypted and backed up. If your hardware fails or you upgrade, AM comes with you, fully intact.",
  },
  {
    q: "How much does AM cost?",
    a: "The device is $1,800, paid once — never again. Flexible payment plans (3, 6, or 12 months) are available. Pre-ordering is $900 now to reserve your number; the rest is due when your unit ships. The AM software is free and open source. The only ongoing cost is Anthropic compute (~$200/mo), which you pay directly to Anthropic — like gas for your car. We never charge monthly.",
  },
  {
    q: "When will AM be available?",
    a: "AM is currently in development and accepting pre-orders. Shipping July 2026. Pre-order numbers are permanent and registered to you. Join the waitlist at helloam.bot to reserve your place.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { pronouns, name } = usePersonalization();

  const faqs = FAQ_TEMPLATES.map((f) => ({
    q: subText(f.q, pronouns, name),
    a: subText(f.a, pronouns, name),
  }));

  return (
    <section id="faq" className="px-6 py-24" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "#00E5FF" }}
          >
            Questions
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Everything you want to know.
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: open === i
                  ? "1px solid rgba(0,229,255,0.2)"
                  : "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.2s",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                aria-expanded={open === i}
              >
                <h3
                  className="text-base font-semibold text-white"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  {item.q}
                </h3>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-lg transition-transform duration-200"
                  style={{
                    color: "#00E5FF",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed" style={{ color: "#888888" }}>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
