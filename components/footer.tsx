"use client";

export default function Footer() {
  return (
    <footer
      className="px-6 py-12"
      style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <p className="font-semibold text-sm" style={{ color: "#f5f5f5" }}>helloam.bot</p>
            <p className="text-xs mt-1" style={{ color: "#a3a3a3" }}>
              An AGI Digital Companion & Worker. Yours forever.
            </p>
            <p className="text-xs mt-1" style={{ color: "#6b6b6b" }}>
              Shipped from Austin, TX · AGI built in Austin by a proud American company.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {[
              { label: "Press",       href: "/press",   external: false },
              { label: "Contact",     href: "/contact", external: false },
              { label: "Support",     href: "/#support", external: false },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-xs font-medium transition-colors"
                style={{ color: "#a3a3a3" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f5f5")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#a3a3a3")}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Open Source Tools */}
        <div className="flex items-center justify-center gap-6 flex-wrap mb-8">
          {[
            { label: "Voice-to-Text Hotkey Tool", href: "https://github.com/augmentedmike/whisper-hotkey" },
            { label: "AI Comic Generator CLI",    href: "https://github.com/augmentedmike/comic-cli" },
            { label: "Claude Image Optimizer",     href: "https://github.com/augmentedmike/claude-img-opt" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium transition-colors"
              style={{ color: "#a3a3a3" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f5f5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#a3a3a3")}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Legal */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "#6b6b6b" }}>
            © 2026 Tylt LLC · Delaware · All rights reserved
          </p>
          <div className="flex gap-4">
            {[
              { label: "Privacy",           href: "/privacy" },
              { label: "Terms",             href: "/terms" },
              { label: "Powered by MiniClaw", href: "https://miniclaw.bot", external: true },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...("external" in l ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-xs transition-colors"
                style={{ color: "#6b6b6b" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#a3a3a3")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6b6b")}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
