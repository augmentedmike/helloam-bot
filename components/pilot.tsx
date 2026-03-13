import ContactButton from "@/components/contact-button";

function Check() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
      <path d="M2 6.5L5 9.5L11 3.5" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PILOT_PERKS = [
  "Early hardware delivery — ahead of the July 2026 launch",
  "Direct access to the founder for feedback sessions",
  "Influence the roadmap — your use case shapes the product",
  "Discounted or complimentary hardware in exchange for structured feedback",
  "Recognition as a founding pilot partner",
];

const WHO_QUALIFIES = [
  { label: "High-performers", desc: "Founders, operators, executives who push productivity to its limits" },
  { label: "Researchers & academics", desc: "Anyone studying AI, human-computer interaction, or digital companionship" },
  { label: "Organizations & teams", desc: "Companies exploring AI-augmented workflows at the individual level" },
  { label: "YouTubers & social media companies", desc: "Content creators and social brands who live online and need an AI that keeps up" },
  { label: "Creators & builders", desc: "People who will document, share, and amplify what Am can do" },
];

export default function Pilot() {
  return (
    <section
      id="pilot"
      className="px-6 py-24"
      style={{
        background: "rgba(0,229,255,0.015)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "#00E5FF" }}
          >
            Pilot Program
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Help us build the future.
            <br />
            <span style={{ color: "#00E5FF" }}>Get early access.</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#666666" }}>
            We&apos;re selecting a small group of individuals and organizations to receive
            early hardware and dedicated support — in exchange for real-world feedback
            that shapes Am into what it&apos;s meant to be.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Who qualifies */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h3 className="text-lg font-bold text-white mb-5">Who qualifies</h3>
            <div className="space-y-4">
              {WHO_QUALIFIES.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ background: "#00E5FF" }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#666666" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What you get */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: "rgba(0,229,255,0.05)",
              border: "1px solid rgba(0,229,255,0.2)",
              boxShadow: "0 0 40px rgba(0,229,255,0.05)",
            }}
          >
            <div
              className="absolute -top-3.5 left-1/2"
              style={{ display: "none" }}
            />
            <h3 className="text-lg font-bold text-white mb-5">What pilot partners get</h3>
            <ul className="space-y-3">
              {PILOT_PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5">
                  <Check />
                  <span className="text-sm" style={{ color: "#aaaaaa" }}>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <ContactButton
            category="Pilot Program"
            subject="Pilot Program Application"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-100 cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "#cccccc",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            Apply for Pilot Access
          </ContactButton>
          <p className="mt-4 text-sm" style={{ color: "#444444" }}>
            Tell us who you are and how you plan to use Am.
            We review applications personally and reach out within a few days.
          </p>
        </div>
      </div>
    </section>
  );
}
