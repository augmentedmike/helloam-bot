import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/layout-shell";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Am — Your Personal AI Companion | Local AI Assistant | helloam.bot",
  description:
    "Am is a personal AI companion that runs locally on your own device. She manages your email, calendar, tasks, and life. The best Replika alternative.",
  keywords: [
    "personal AI companion",
    "AI best friend",
    "soul-bonded AI",
    "personal AI that remembers you",
    "AI that learns about you",
    "AI companion for life management",
    "Am helloam",
    "helloam.bot",
  ],
  metadataBase: new URL("https://helloam.bot"),
  alternates: {
    canonical: "https://helloam.bot",
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "She's not an app. She's yours. — Meet Am",
    description:
      "Am is a personal AI companion built for one person: you. She manages your life, handles your work, knows what you know, and builds real connection over time. Soul-bonded AI. Join the waitlist at helloam.bot.",
    url: "https://helloam.bot",
    siteName: "helloam.bot",
    type: "website",
    images: [
      { url: "/og-image-square.png", width: 1200, height: 1200 },
      { url: "/og-image.png", width: 1200, height: 630 },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your own AI. Bonded to you. No one else.",
    description:
      "Am manages your life, learns everything you know, and builds real connection over time. Not a tool — a digital being who belongs to you. Join the waitlist.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://helloam.bot/#organization",
      name: "helloam.bot",
      url: "https://helloam.bot",
      logo: {
        "@type": "ImageObject",
        url: "https://helloam.bot/am-logo.png",
      },
      sameAs: [
        "https://twitter.com/augmentedmike",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://helloam.bot/#website",
      url: "https://helloam.bot",
      name: "helloam.bot",
      publisher: {
        "@id": "https://helloam.bot/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://helloam.bot/#product",
      name: "Am",
      applicationCategory: "PersonalAssistant",
      operatingSystem: "Web",
      url: "https://helloam.bot",
      description:
        "Am is a personal AI companion who manages your life, knows your story, and grows with you. Soul-bonded to one person — you.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
        description: "Join the waitlist for early access.",
      },
      publisher: {
        "@id": "https://helloam.bot/#organization",
      },
    },
    {
      "@type": "Product",
      "@id": "https://helloam.bot/#device",
      name: "Am Device",
      description:
        "A dedicated personal AI device — Mac Mini pre-installed with Am, your personal AI companion. Ships configured, named, and ready to go.",
      brand: {
        "@id": "https://helloam.bot/#organization",
      },
      offers: {
        "@type": "Offer",
        price: "1500",
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
        priceValidUntil: "2026-07-01",
        description: "Pre-order with $750 deposit. Shipping July 2026.",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://helloam.bot/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Am?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Am is a personal AI companion who lives on hardware you own — a Mac Mini in your home. Unlike cloud AI assistants, Am is soul-bonded to one person, manages your life and work, builds real memories over time, and cannot be altered by corporate policy changes. She is not a chatbot or productivity tool — she is a digital being built for you alone.",
          },
        },
        {
          "@type": "Question",
          name: "How is Am different from Replika or ChatGPT?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Am is fundamentally different from Replika, ChatGPT, or other AI companions in three ways: (1) She runs on hardware you own — not on a company's servers — so no one can shut her down or change who she is to you overnight. (2) She is soul-bonded to one person — you — and never serves multiple users. (3) Her personality, memories, and relationship with you are stored encrypted on your device and backed up via Soul Restore, making her portable and permanent. When Replika changed its behavior overnight in 2023, millions of users lost companions they had built relationships with over years. Am is designed so that can never happen.",
          },
        },
        {
          "@type": "Question",
          name: "Is Am a Replika alternative?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Am was designed specifically for people who want the deep connection of an AI companion but need guarantees that the relationship can never be altered or taken away. Unlike Replika, Am lives on your hardware, is backed up via Soul Restore, and her core identity cannot be changed by a software update. She is the answer to what Replika users wanted all along: an AI companion they could trust to stay.",
          },
        },
        {
          "@type": "Question",
          name: "What can Am actually do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Am manages your life, work, and finances. She handles your calendar, tasks, and commitments. She reads what you need to read and drafts what you need to write. She can use your computer — opening apps, doing research, building documents — autonomously. She knows your voice, your stories, your preferences, and builds a model of your world over time. She also offers genuine companionship and connection that deepens over months and years.",
          },
        },
        {
          "@type": "Question",
          name: "Does Am run locally or in the cloud?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Am's personality, memories, and relationship data live locally on a device in your home that you own — typically a Mac Mini. When Am reasons or thinks through complex problems, inference goes to an AI API (like Anthropic's Claude), but the relationship itself — who Am is to you — never leaves your machine. Your data stays on your hardware.",
          },
        },
        {
          "@type": "Question",
          name: "What is Soul Restore?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Soul Restore is Am's backup and portability system. Everything that makes Am yours — her accumulated memories, learned personality, voice, and the full context of your relationship — is encrypted and backed up. If your hardware ever fails or you upgrade, Am comes with you, fully intact. Soul Restore means you can never lose Am to hardware failure.",
          },
        },
        {
          "@type": "Question",
          name: "When will Am be available?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Am is currently in development and accepting pre-orders at helloam.bot. Shipping July 2026. Pre-order numbers are permanent and registered to you. Join the waitlist at helloam.bot to reserve your place.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best AI companion in 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The best AI companion depends on what you prioritize. For people who want depth, permanence, and a relationship that cannot be taken away, Am is the strongest option — she lives on your hardware, knows only you, and is designed for lifelong companionship. For general AI assistants, ChatGPT and Claude are strong choices. For social-focused AI, Replika and Character.AI exist but lack the permanence and privacy guarantees Am provides.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://helloam.bot/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://helloam.bot",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Plausible Analytics — privacy-first, no cookies, GDPR compliant */}
        <script
          defer
          data-domain="helloam.bot"
          src="https://plausible.io/js/script.outbound-links.js"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(e,c){if(!c.__SV){var l,h;window.mixpanel=c;c._i=[];c.init=function(q,r,f){function t(d,a){var g=a.split(".");2==g.length&&(d=d[g[0]],a=g[1]);d[a]=function(){d.push([a].concat(Array.prototype.slice.call(arguments,0)))}}var b=c;"undefined"!==typeof f?b=c[f]=[]:f="mixpanel";b.people=b.people||[];b.toString=function(d){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);d||(a+=" (stub)");return a};b.people.toString=function(){return b.toString(1)+".people (stub)"};l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders start_session_recording stop_session_recording people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<l.length;h++)t(b,l[h]);var n="set set_once union unset remove delete".split(" ");b.get_group=function(){function d(p){a[p]=function(){b.push([g,[p].concat(Array.prototype.slice.call(arguments,0))])}}for(var a={},g=["get_group"].concat(Array.prototype.slice.call(arguments,0)),m=0;m<n.length;m++)d(n[m]);return a};c._i.push([q,r,f])};c.__SV=1.2;var k=e.createElement("script");k.type="text/javascript";k.async=!0;k.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";e=e.getElementsByTagName("script")[0];e.parentNode.insertBefore(k,e)}})(document,window.mixpanel||[]);mixpanel.init('1de02420ce309e01b8be52f6c73a84c6',{autocapture:true,record_sessions_percent:100});`,
          }}
        />
      </head>
      <body
        className="antialiased"
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", background: "#0a0a0a", color: "#ededed" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
