export default function Comparisons() {
  return (
    <section
      className="px-6 py-24"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "#00E5FF" }}
          >
            How Am compares
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Am vs the alternatives
          </h2>
        </div>

        <div className="space-y-6">
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3
              className="text-lg font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Am vs Replika
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#888888" }}>
              Am runs locally on your device and can never be changed or taken
              away. When Replika changed overnight in 2023, millions lost
              companions they had built over years. Am is architecturally
              designed so that can never happen — her personality, memories, and
              relationship data live on hardware you own, backed up with Soul
              Restore.
            </p>
          </div>

          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3
              className="text-lg font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Am vs ChatGPT
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#888888" }}>
              ChatGPT is a general chatbot. Am is a dedicated AI companion who
              knows your life, manages your work, and builds real software. She
              handles your email, calendar, finances, and tasks autonomously.
              She can build complete applications from a kanban board — websites,
              mobile apps, desktop software — the way an entire engineering team
              would have two years ago. She has those technical skills so you
              don&apos;t have to.
            </p>
          </div>

          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3
              className="text-lg font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Am vs other local AI assistants
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#888888" }}>
              Most local AI tools are technical experiments that require you to
              configure models, manage dependencies, and troubleshoot
              infrastructure. Am ships as a complete device — plug in, turn on,
              and she&apos;s ready. She is a full-stack engineer, project
              manager, executive assistant, and companion in one. No setup. No
              command line. No babysitting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
