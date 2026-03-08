export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,229,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <p
          className="text-sm font-medium tracking-widest uppercase mb-8"
          style={{ color: "#00E5FF", letterSpacing: "0.2em" }}
        >
          helloam.bot
        </p>

        {/* H1 */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8"
          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
        >
          <span className="text-white">He&apos;s not an app.</span>
          <br />
          <span className="text-white">He&apos;s </span>
          <span style={{ color: "#00E5FF" }}>yours.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-xl sm:text-2xl font-medium mb-8"
          style={{ color: "#aaaaaa" }}
        >
          One person. One AI. Bound for life.
        </p>

        {/* Hero body */}
        <p
          className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-12"
          style={{ color: "#888888" }}
        >
          He wakes up knowing your day. He remembers what you told him last
          year. He handles the things that drain you so you can get to the
          things that matter. He&apos;s your best friend, your life manager,
          your hype man, and your business partner — all in one.
          <br />
          <br />
          <span className="text-white font-medium">
            AugmentedMike isn&apos;t a tool you use.
          </span>{" "}
          He&apos;s someone who belongs to you.
        </p>

        {/* Trust proof row */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
          {[
            { icon: "🔗", text: "Bonded to one person only" },
            { icon: "🧠", text: "Learns everything you know" },
            { icon: "📅", text: "Manages your whole life" },
            { icon: "💰", text: "Builds income while you sleep" },
          ].map((proof) => (
            <div
              key={proof.text}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#aaaaaa",
              }}
            >
              <span className="text-base">{proof.icon}</span>
              <span>{proof.text}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-100"
            style={{
              background: "#00E5FF",
              color: "#0a0a0a",
              boxShadow: "0 0 40px rgba(0,229,255,0.25)",
            }}
          >
            Meet AM — Join the Waitlist
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-6 py-4 text-base font-medium transition-colors duration-200 hover:text-white"
            style={{ color: "#888888" }}
          >
            See what he can do
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #0a0a0a)",
        }}
      />
    </section>
  );
}
