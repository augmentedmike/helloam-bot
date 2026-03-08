function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
      <path d="M2 7L5.5 10.5L12 4" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FREE_FEATURES = [
  "Email support — we respond",
  "Documentation & setup guides",
  "Community updates as AM evolves",
];

const LIVE_FEATURES = [
  "Screenshare session with the founder",
  "Troubleshooting & live fixes",
  "Training on AM's capabilities",
  "Workflow design & custom setup",
  "Book as many sessions as you need",
];

export default function Plans() {
  return (
    <section
      id="support"
      className="px-6 py-24"
      style={{
        background: "rgba(0,229,255,0.02)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "#00E5FF" }}
          >
            Support
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            We&apos;re here when you need us.
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#666666" }}>
            AM runs on your device — no subscriptions, no monthly fees.
            Support is available free by email, or live with the founder when you need hands-on help.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Free email */}
          <div
            className="flex flex-col rounded-2xl p-8"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <h3 className="text-lg font-bold text-white mb-1">Email Support</h3>
            <p className="text-sm mb-6" style={{ color: "#666666" }}>
              Included with every AM. Always free.
            </p>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-bold text-white">Free</span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check />
                  <span className="text-sm" style={{ color: "#888888" }}>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="mailto:hello@helloam.bot"
              className="block text-center px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#cccccc",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Email Us
            </a>
          </div>

          {/* Live session */}
          <div
            className="relative flex flex-col rounded-2xl p-8"
            style={{
              background: "rgba(0,229,255,0.06)",
              border: "1px solid rgba(0,229,255,0.3)",
              boxShadow: "0 0 40px rgba(0,229,255,0.08)",
            }}
          >
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap"
              style={{ background: "#00E5FF", color: "#0a0a0a" }}
            >
              With the Founder
            </div>

            <h3 className="text-lg font-bold text-white mb-1">Live Session</h3>
            <p className="text-sm mb-6" style={{ color: "#666666" }}>
              Screenshare directly with Michael. Book as needed.
            </p>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-bold text-white">$100</span>
              <span style={{ color: "#555555" }}>/ 30 min</span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {LIVE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check />
                  <span className="text-sm" style={{ color: "#888888" }}>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#waitlist"
              className="block text-center px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ background: "#00E5FF", color: "#0a0a0a" }}
            >
              Reserve My AM
            </a>
          </div>
        </div>

        <p className="text-center mt-8 text-sm" style={{ color: "#444444" }}>
          No subscriptions. No recurring fees. Pay only when you want live help.
          <br />
          Need something beyond that?{" "}
          <a
            href="mailto:augmentedmike@gmail.com"
            className="transition-colors hover:text-white"
            style={{ color: "#666666", textDecoration: "underline" }}
          >
            augmentedmike@gmail.com
          </a>{" "}
          — let&apos;s talk.
        </p>
      </div>
    </section>
  );
}
