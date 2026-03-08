import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | helloam.bot",
  description:
    "Privacy policy for helloam.bot and AM. We collect minimal data, never sell it, and are committed to protecting your personal information.",
  alternates: {
    canonical: "https://helloam.bot/privacy",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  url: "https://helloam.bot/privacy",
  description: "Privacy policy for helloam.bot — the home of AM, your personal AI companion.",
  isPartOf: {
    "@id": "https://helloam.bot/#website",
  },
};

export default function PrivacyPage() {
  return (
    <main style={{ background: "#0a0a0a", color: "#ededed", minHeight: "100vh" }}>
      {/* Nav */}
      <div className="px-6 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
          style={{ color: "#666666" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to helloam.bot
        </a>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-12">
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "#00E5FF" }}
          >
            Legal
          </p>
          <h1
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: "#555555" }}>
            Last updated: March 2025 · Tylt LLC · Delaware
          </p>
        </header>

        <div className="space-y-10 text-sm leading-relaxed" style={{ color: "#aaaaaa" }}>
          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Who we are
            </h2>
            <p>
              helloam.bot is operated by Tylt LLC, a Delaware company. We build AM — a
              personal AI companion designed to live on hardware you own, bonded to one person: you.
              Questions about this policy? Email us at{" "}
              <a href="mailto:hello@helloam.bot" className="text-white hover:underline">
                hello@helloam.bot
              </a>
              .
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              What we collect
            </h2>
            <p className="mb-4">
              We collect the minimum information necessary to operate this website and deliver the
              waitlist:
            </p>
            <ul className="space-y-2 pl-4" style={{ listStyle: "disc" }}>
              <li>
                <strong className="text-white">Email address</strong> — when you join the waitlist.
                Used only to contact you about AM&apos;s launch and early access.
              </li>
              <li>
                <strong className="text-white">Basic analytics</strong> — aggregate page views and
                traffic sources via privacy-respecting analytics. No individual tracking, no cross-site
                cookies.
              </li>
              <li>
                <strong className="text-white">Technical logs</strong> — standard server logs
                (IP addresses, browser type, referrer). Retained for 30 days, used only for security
                and debugging.
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              What we do not collect
            </h2>
            <ul className="space-y-2 pl-4" style={{ listStyle: "disc" }}>
              <li>We do not sell your data. Ever.</li>
              <li>We do not share your email with third parties for marketing.</li>
              <li>We do not use tracking pixels, Facebook Pixel, Google Ads remarketing, or similar cross-site tracking.</li>
              <li>
                AM&apos;s memories and personality data live on your device — not our servers. When AM
                is shipped, your personal AI data stays on hardware you own.
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              How we use your information
            </h2>
            <ul className="space-y-2 pl-4" style={{ listStyle: "disc" }}>
              <li>To send you waitlist updates and launch announcements (email only).</li>
              <li>To understand aggregate traffic patterns and improve the site.</li>
              <li>To respond to support requests and questions.</li>
            </ul>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Third-party services
            </h2>
            <p className="mb-4">
              This website uses the following third-party services, each with their own privacy policy:
            </p>
            <ul className="space-y-2 pl-4" style={{ listStyle: "disc" }}>
              <li>
                <strong className="text-white">Vercel</strong> — hosting and CDN. Processes request
                logs per their{" "}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                  privacy policy
                </a>
                .
              </li>
              <li>
                <strong className="text-white">Google Fonts</strong> — served locally via Next.js
                font optimization. No requests to Google servers at runtime.
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Your rights (GDPR / CCPA)
            </h2>
            <p className="mb-4">
              You have the right to access, correct, or delete any personal data we hold about you.
              To exercise these rights:
            </p>
            <ul className="space-y-2 pl-4" style={{ listStyle: "disc" }}>
              <li>
                Email{" "}
                <a href="mailto:hello@helloam.bot" className="text-white hover:underline">
                  hello@helloam.bot
                </a>{" "}
                with your request. We will respond within 30 days.
              </li>
              <li>To unsubscribe from the waitlist, reply to any email with &quot;unsubscribe&quot; or email us directly.</li>
              <li>California residents may request disclosure of any personal information shared with third parties for direct marketing purposes. We do not share personal information for this purpose.</li>
            </ul>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Data retention
            </h2>
            <p>
              Waitlist email addresses are retained until you request deletion or AM launches and the
              waitlist closes. Server logs are retained for 30 days. We do not retain payment data (we
              collect no payments at this time).
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Cookies
            </h2>
            <p>
              This site uses only essential cookies required for basic functionality. We do not use
              advertising, analytics, or tracking cookies. No cookie consent banner is required because
              we do not set non-essential cookies.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Children
            </h2>
            <p>
              This service is not directed at children under 13. We do not knowingly collect personal
              information from children. If you believe we have inadvertently collected information from
              a child, contact us immediately at{" "}
              <a href="mailto:hello@helloam.bot" className="text-white hover:underline">
                hello@helloam.bot
              </a>
              .
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Changes to this policy
            </h2>
            <p>
              We may update this policy as our product evolves. Material changes will be communicated
              to waitlist subscribers via email. The &quot;last updated&quot; date at the top of this page
              reflects the most recent revision.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Contact
            </h2>
            <p>
              Tylt LLC · 1111B S Governors Ave #7126 · Dover, DE 19904 · USA
              <br />
              <a href="mailto:hello@helloam.bot" className="text-white hover:underline">
                hello@helloam.bot
              </a>
            </p>
          </section>
        </div>
      </article>

      <footer
        className="px-6 py-8 text-center text-xs border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)", color: "#444444" }}
      >
        <p>
          &copy; 2025 Tylt LLC &middot; Delaware &middot;{" "}
          <a href="/" className="hover:text-white transition-colors">helloam.bot</a>
          {" "}&middot;{" "}
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
        </p>
      </footer>
    </main>
  );
}
