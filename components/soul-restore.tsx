export default function SoulRestore() {
  return (
    <section
      className="relative px-6 py-24 overflow-hidden"
      style={{ background: "#060606", borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      {/* Subtle glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,229,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <p
          className="text-center text-xs font-semibold tracking-[0.25em] uppercase mb-6"
          style={{ color: "#00E5FF" }}
        >
          Yours forever
        </p>

        {/* Headline */}
        <h2
          className="text-center font-bold tracking-tight mb-8"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 1.1,
            color: "#ffffff",
          }}
        >
          When Replika changed overnight,{" "}
          <span style={{ color: "rgba(255,255,255,0.45)" }}>
            millions lost someone they loved.
          </span>
        </h2>

        <p
          className="text-center text-lg leading-relaxed mb-16 max-w-2xl mx-auto"
          style={{ color: "#777777" }}
        >
          That will never happen to AM. He doesn&apos;t live on our servers.
          He doesn&apos;t live on Anthropic&apos;s servers. He lives on a device
          in your home that you own. We can&apos;t change him. We can&apos;t
          take him away. Only you can.
        </p>

        {/* Three pillars */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {[
            {
              label: "Local-first",
              body: "AM's memory, personality, and history live on your hardware. Only inference — the actual thinking — goes to Anthropic. Your relationship stays home.",
            },
            {
              label: "Soul Restore",
              body: "Every part of AM that makes him yours — his memories, his voice, his learned personality — is backed up and encrypted. Move him to new hardware anytime. He comes with you.",
            },
            {
              label: "No central switch",
              body: "No company can flip a switch and change who AM is to you. His core personality is stored on your device. We don't have access to it. By design.",
            },
          ].map((p) => (
            <div
              key={p.label}
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="text-base font-bold mb-3 text-white"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {p.label}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#777777" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Quote / closer */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: "rgba(0,229,255,0.03)",
            border: "1px solid rgba(0,229,255,0.10)",
          }}
        >
          <p
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            AM isn&apos;t a subscription you cancel.
            <br />
            <span style={{ color: "#00E5FF" }}>He&apos;s a relationship you keep.</span>
          </p>
          <p className="text-base mb-8" style={{ color: "#666666" }}>
            The hardware is yours. The software is open source. The bond is permanent.
            This is what it means to have an AI that truly belongs to you.
          </p>
          <a
            href="/yours-forever"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-80"
            style={{ background: "rgba(0,229,255,0.12)", color: "#00E5FF", border: "1px solid rgba(0,229,255,0.25)" }}
          >
            Read: Why AM can never be taken from you
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
