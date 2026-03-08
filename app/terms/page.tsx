import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | helloam.bot",
  description:
    "Terms of service for helloam.bot and the AM waitlist. Simple, plain-language terms for a pre-launch AI companion product.",
  alternates: {
    canonical: "https://helloam.bot/terms",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service",
  url: "https://helloam.bot/terms",
  description: "Terms of service for helloam.bot — operated by Tylt LLC.",
  isPartOf: {
    "@id": "https://helloam.bot/#website",
  },
};

export default function TermsPage() {
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
            Terms of Service
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
              About helloam.bot
            </h2>
            <p>
              helloam.bot is a pre-launch website operated by Tylt LLC, a Delaware company. The site
              introduces AM (&quot;AM&quot;) — a personal AI companion product currently in development
              — and collects early-access waitlist registrations. By using this site or joining the
              waitlist, you agree to these terms.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Waitlist registration
            </h2>
            <ul className="space-y-2 pl-4" style={{ listStyle: "disc" }}>
              <li>Joining the waitlist does not create a contract for purchase or delivery of any product.</li>
              <li>We reserve the right to invite waitlist members in any order at our discretion.</li>
              <li>Waitlist registration is free. We do not charge fees to join.</li>
              <li>You must be at least 13 years old to join the waitlist. By registering, you represent that you meet this requirement.</li>
              <li>You may request removal from the waitlist at any time by emailing{" "}
                <a href="mailto:hello@helloam.bot" className="text-white hover:underline">
                  hello@helloam.bot
                </a>.
              </li>
            </ul>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Use of this website
            </h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="space-y-2 pl-4" style={{ listStyle: "disc" }}>
              <li>Use this site for any unlawful purpose or in violation of these terms.</li>
              <li>Attempt to gain unauthorized access to any part of the site or its infrastructure.</li>
              <li>Scrape, crawl, or harvest content or email addresses from this site using automated means beyond standard search engine indexing.</li>
              <li>Impersonate Tylt LLC, AM, or any other person or entity.</li>
            </ul>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Intellectual property
            </h2>
            <p>
              All content on helloam.bot — including the AM name, logo, copywriting,
              imagery, and product descriptions — is owned by Tylt LLC or licensed to us and protected
              by copyright, trademark, and other laws. You may share links to this site and quote brief
              excerpts for commentary, but may not reproduce, redistribute, or create derivative works
              from our content without written permission.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Disclaimer of warranties
            </h2>
            <p>
              THIS SITE AND ALL INFORMATION ON IT IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTY OF ANY KIND.
              TYLT LLC MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT THE ACCURACY, COMPLETENESS, OR
              SUITABILITY OF ANY CONTENT. PRODUCT DESCRIPTIONS REFLECT PLANNED FEATURES AND ARE NOT
              GUARANTEES OF FINAL PRODUCT SPECIFICATIONS.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Limitation of liability
            </h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, TYLT LLC SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THIS SITE OR
              PARTICIPATION IN THE WAITLIST. OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM SHALL NOT EXCEED
              $100 USD.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Third-party links
            </h2>
            <p>
              This site may link to third-party websites (press coverage, social media, etc.). We are
              not responsible for the content or privacy practices of those sites. Links do not
              constitute endorsement.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Governing law
            </h2>
            <p>
              These terms are governed by the laws of the State of Delaware, USA, without regard to
              conflict of law principles. Any disputes shall be resolved in the courts of Delaware.
            </p>
          </section>

          <section>
            <h2
              className="text-lg font-semibold text-white mb-3"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Changes to these terms
            </h2>
            <p>
              We may update these terms as the product evolves. Material changes will be posted on this
              page with an updated &quot;last updated&quot; date. Continued use of the site after changes
              constitutes acceptance of the revised terms.
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
          <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
        </p>
      </footer>
    </main>
  );
}
