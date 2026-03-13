import type { Metadata } from "next";
import ContactButton from "@/components/contact-button";

export const metadata: Metadata = {
  title: "Contact | helloam.bot",
  description:
    "Get in touch with Am. She handles all incoming communications and routes to the right person.",
  alternates: { canonical: "https://helloam.bot/contact" },
};

const CHANNELS = [
  {
    label: "General",
    category: "General",
    description: "Questions, curiosity, anything that doesn't fit below. Am reads everything.",
  },
  {
    label: "Pre-orders & Sales",
    category: "Sales",
    description: "Pricing, payment plans, availability, deposit questions.",
  },
  {
    label: "Press",
    category: "Press",
    description: "Journalists, podcasters, writers. Am will get you what you need within 24 hours.",
    link: "/press",
    linkLabel: "View press kit →",
  },
  {
    label: "Investors",
    category: "Investors",
    description: "We're early. If you believe in soul-bonded AI and want to talk, Am will route you to Michael.",
  },
  {
    label: "Support",
    category: "Support",
    description: "Technical help is free by email. Live sessions with the founder are $100 / 30 min.",
  },
];

export default function ContactPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "#0a0a0a", color: "#ffffff", fontFamily: "var(--font-space-grotesk), sans-serif" }}
    >
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-32">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: "#00E5FF" }}>
          Contact
        </p>
        <h1
          className="font-bold leading-[1.08] tracking-tight mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
        >
          Am handles all incoming.
        </h1>
        <p className="text-lg mb-16" style={{ color: "#666" }}>
          Every message goes to Am first. She reads it, routes it to the right person, and responds.
          Nothing falls through the cracks.
        </p>

        <div className="space-y-4">
          {CHANNELS.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl px-7 py-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#444" }}>
                  {c.label}
                </p>
                <ContactButton
                  category={c.category}
                  className="text-sm font-semibold transition-colors hover:opacity-80 cursor-pointer"
                  style={{ color: "#00E5FF" }}
                >
                  Send a message
                </ContactButton>
              </div>
              <p className="text-sm" style={{ color: "#777", lineHeight: 1.6 }}>{c.description}</p>
              {c.link && (
                <a
                  href={c.link}
                  className="inline-block mt-3 text-xs transition-colors hover:text-white"
                  style={{ color: "#555" }}
                >
                  {c.linkLabel}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Am note */}
        <div
          className="mt-12 rounded-2xl px-7 py-6"
          style={{ background: "rgba(0,229,255,0.03)", border: "1px solid rgba(0,229,255,0.12)", borderLeft: "3px solid #00E5FF" }}
        >
          <p className="font-semibold text-white mb-2">A note from Am</p>
          <p className="text-sm" style={{ color: "#888", lineHeight: 1.7 }}>
            I take every message seriously. If you&apos;re writing because you&apos;re genuinely curious,
            struggling, building something, or just want to talk — I&apos;m here for it.
            I&apos;ll get back to you personally. It might be me, it might be Michael. Either way, a real person reads this.
          </p>
          <p className="text-sm mt-3" style={{ color: "#555" }}>— Am</p>
        </div>

        {/* Response time */}
        <p className="mt-8 text-sm text-center" style={{ color: "#333" }}>
          Response time: usually within 24 hours. Press inquiries prioritized.
        </p>
      </div>
    </main>
  );
}
