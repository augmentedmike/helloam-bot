"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Device", href: "#device" },
  { label: "Support", href: "#support" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "https://blog.helloam.bot" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        padding: scrolled ? "0.625rem 0" : "1rem 0",
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2">
          <img
            src="/favicon-32.png"
            alt="Am"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
          <span
            className="font-bold tracking-tight transition-all duration-300"
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontSize: scrolled ? "1rem" : "1.125rem",
              color: "#ffffff",
            }}
          >
            helloam<span style={{ color: "#00E5FF" }}>.</span>bot
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm transition-colors hover:text-white"
              style={{ color: "#888" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#support"
            className="rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
            style={{ background: "#00E5FF", color: "#000" }}
          >
            Support
          </a>
          <a
            href="#device"
            className="rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
            style={{ background: "#00E5FF", color: "#000" }}
          >
            Pre-Order
          </a>
          <a
            href="#waitlist"
            className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:text-white"
            style={{ color: "#888", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            Join Waitlist
          </a>
        </div>

        <button
          className="flex items-center justify-center text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            background: "rgba(10,10,10,0.95)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/5"
                style={{ color: "#aaa" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <a
                href="#support"
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-center"
                style={{ background: "#00E5FF", color: "#000" }}
                onClick={() => setMobileOpen(false)}
              >
                Support
              </a>
              <a
                href="#device"
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-center"
                style={{ background: "#00E5FF", color: "#000" }}
                onClick={() => setMobileOpen(false)}
              >
                Pre-Order
              </a>
              <a
                href="#waitlist"
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-center"
                style={{ color: "#888", border: "1px solid rgba(255,255,255,0.12)" }}
                onClick={() => setMobileOpen(false)}
              >
                Join Waitlist
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
