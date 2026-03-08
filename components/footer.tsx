export default function Footer() {
  return (
    <footer className="px-6 py-12" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <p className="font-semibold text-white text-sm">helloam.bot</p>
            <p className="text-xs mt-1" style={{ color: "#555555" }}>
              An AGI Digital Companion & Worker. Yours forever.
            </p>
            <p className="text-xs mt-1" style={{ color: "#444444" }}>
              Shipped from Austin, TX · AGI built in Austin by a proud American company.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <a href="https://twitter.com/augmentedmike" target="_blank" rel="noopener noreferrer" className="text-xs transition-colors hover:text-white" style={{ color: "#555555" }}>Twitter / X</a>
            <a href="/press" className="text-xs transition-colors hover:text-white" style={{ color: "#555555" }}>Press</a>
            <a href="/contact" className="text-xs transition-colors hover:text-white" style={{ color: "#555555" }}>Contact</a>
          </div>
        </div>

        {/* Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p className="text-xs" style={{ color: "#333333" }}>
            © 2025 Tylt LLC · Delaware · All rights reserved
          </p>
          <div className="flex gap-4">
            <a href="/privacy" className="text-xs transition-colors hover:text-white" style={{ color: "#333333" }}>Privacy</a>
            <a href="/terms" className="text-xs transition-colors hover:text-white" style={{ color: "#333333" }}>Terms</a>
            <a href="https://miniclaw.bot" target="_blank" rel="noopener noreferrer" className="text-xs transition-colors hover:text-white" style={{ color: "#333333" }}>Powered by MiniClaw</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
