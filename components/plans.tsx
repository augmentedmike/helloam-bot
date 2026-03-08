const PLANS = [
  {
    name: "Essential",
    price: "$49",
    period: "/mo",
    description: "AM keeps running. You stay covered.",
    features: [
      "Monthly health check & updates",
      "Plugin & integration maintenance",
      "Email support (48h response)",
      "Access to new AM capabilities as released",
    ],
    cta: "Add to Pre-Order",
    highlight: false,
  },
  {
    name: "On-Call",
    price: "$149",
    period: "/mo",
    description: "Priority access when you need a real human.",
    features: [
      "Everything in Essential",
      "On-call support (same-day response)",
      "Monthly 30-min check-in call",
      "AM behavior tuning & customization",
      "Workflow design assistance",
    ],
    cta: "Add to Pre-Order",
    highlight: true,
  },
  {
    name: "White Glove",
    price: "$399",
    period: "/mo",
    description: "Full-service. We run AM so you don't have to think about it.",
    features: [
      "Everything in On-Call",
      "Dedicated support contact",
      "Unlimited training sessions",
      "Custom plugin & integration builds",
      "Quarterly strategic review",
      "SLA: 4h response, 24h resolution",
    ],
    cta: "Contact Us",
    highlight: false,
  },
];

export default function Plans() {
  return (
    <section id="plans" className="px-6 py-28" style={{ background: "rgba(0,229,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#00E5FF" }}>
            Support & service
          </p>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            AM never stops working.
            <br />
            <span style={{ color: "#00E5FF" }}>Neither do we.</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#666666" }}>
            Optional monthly plans for owners who want human backup, training, and hands-on support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col rounded-2xl p-8"
              style={{
                background: plan.highlight ? "rgba(0,229,255,0.06)" : "rgba(255,255,255,0.03)",
                border: plan.highlight ? "1px solid rgba(0,229,255,0.3)" : "1px solid rgba(255,255,255,0.07)",
                boxShadow: plan.highlight ? "0 0 40px rgba(0,229,255,0.08)" : "none",
              }}
            >
              {plan.highlight && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{ background: "#00E5FF", color: "#0a0a0a" }}
                >
                  Most Popular
                </div>
              )}

              <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-sm mb-6" style={{ color: "#666666" }}>{plan.description}</p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span style={{ color: "#555555" }}>{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="text-xs mt-0.5 shrink-0" style={{ color: "#00E5FF" }}>✓</span>
                    <span className="text-sm" style={{ color: "#888888" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className="block text-center px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                style={
                  plan.highlight
                    ? { background: "#00E5FF", color: "#0a0a0a" }
                    : { background: "rgba(255,255,255,0.06)", color: "#cccccc", border: "1px solid rgba(255,255,255,0.1)" }
                }
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-sm" style={{ color: "#444444" }}>
          All plans optional. Your AM works without a plan — these exist for owners who want human support behind the AI.
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
