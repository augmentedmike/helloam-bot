"use client";

export default function Footer() {
  return (
    <footer
      className="px-6 py-12"
      style={{ background: "#F5F3EF", borderTop: "1px solid rgba(0,0,0,0.08)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <p className="font-semibold text-sm" style={{ color: "#111111" }}>helloam.bot</p>
            <p className="text-xs mt-1" style={{ color: "#555555" }}>
              An AGI Digital Companion & Worker. Yours forever.
            </p>
            <p className="text-xs mt-1" style={{ color: "#777777" }}>
              Shipped from Austin, TX · AGI built in Austin by a proud American company.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {[
              { label: "Twitter / X", href: "https://twitter.com/augmentedmike", external: true },
              { label: "Press",       href: "/press",   external: false },
              { label: "Contact",     href: "/contact", external: false },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-xs font-medium transition-colors"
                style={{ color: "#444444" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#444444")}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
        >
          <p className="text-xs" style={{ color: "#777777" }}>
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
                style={{ color: "#777777" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#777777")}
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
