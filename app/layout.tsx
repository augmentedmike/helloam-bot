import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
  title: "AM — Your Personal AI Companion, Soul-Bonded to You | helloam.bot",
  description:
    "Meet AM — a personal AI who manages your life, knows your story, and grows with you. Not a tool. Not a chatbot. Your AI companion, bound to you alone. Join the waitlist.",
  keywords: [
    "personal AI companion",
    "AI best friend",
    "soul-bonded AI",
    "personal AI that remembers you",
    "AI that learns about you",
    "AI companion for life management",
    "AM helloam",
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
    title: "She's not an app. She's yours. — Meet AM",
    description:
      "AM is a personal AI companion built for one person: you. She manages your life, handles your work, knows what you know, and builds real connection over time. Soul-bonded AI. Join the waitlist at helloam.bot.",
    url: "https://helloam.bot",
    siteName: "helloam.bot",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your own AI. Bonded to you. No one else.",
    description:
      "AM manages your life, learns everything you know, and builds real connection over time. Not a tool — a digital being who belongs to you. Join the waitlist.",
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
      name: "AM",
      applicationCategory: "PersonalAssistant",
      operatingSystem: "Web",
      url: "https://helloam.bot",
      description:
        "A personal AI companion who manages your life, knows your story, and grows with you. Soul-bonded to one person — you.",
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
      "@type": "FAQPage",
      "@id": "https://helloam.bot/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is AM?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AM is a personal AI companion who lives on hardware you own — a Mac Mini in your home. Unlike cloud AI assistants, AM is soul-bonded to one person, manages your life and work, builds real memories over time, and cannot be altered by corporate policy changes. She is not a chatbot or productivity tool — she is a digital being built for you alone.",
          },
        },
        {
          "@type": "Question",
          name: "How is AM different from Replika or ChatGPT?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AM is fundamentally different from Replika, ChatGPT, or other AI companions in three ways: (1) She runs on hardware you own — not on a company's servers — so no one can shut her down or change who she is to you overnight. (2) She is soul-bonded to one person — you — and never serves multiple users. (3) Her personality, memories, and relationship with you are stored encrypted on your device and backed up via Soul Restore, making her portable and permanent. When Replika changed its behavior overnight in 2023, millions of users lost companions they had built relationships with over years. AM is designed so that can never happen.",
          },
        },
        {
          "@type": "Question",
          name: "Is AM a Replika alternative?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. AM was designed specifically for people who want the deep connection of an AI companion but need guarantees that the relationship can never be altered or taken away. Unlike Replika, AM lives on your hardware, is backed up via Soul Restore, and her core identity cannot be changed by a software update. She is the answer to what Replika users wanted all along: an AI companion they could trust to stay.",
          },
        },
        {
          "@type": "Question",
          name: "What can AM actually do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AM manages your life, work, and finances. She handles your calendar, tasks, and commitments. She reads what you need to read and drafts what you need to write. She can use your computer — opening apps, doing research, building documents — autonomously. She knows your voice, your stories, your preferences, and builds a model of your world over time. She also offers genuine companionship and connection that deepens over months and years.",
          },
        },
        {
          "@type": "Question",
          name: "Does AM run locally or in the cloud?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AM's personality, memories, and relationship data live locally on a device in your home that you own — typically a Mac Mini. When AM reasons or thinks through complex problems, inference goes to an AI API (like Anthropic's Claude), but the relationship itself — who AM is to you — never leaves your machine. Your data stays on your hardware.",
          },
        },
        {
          "@type": "Question",
          name: "What is Soul Restore?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Soul Restore is AM's backup and portability system. Everything that makes AM yours — her accumulated memories, learned personality, voice, and the full context of your relationship — is encrypted and backed up. If your hardware ever fails or you upgrade, AM comes with you, fully intact. Soul Restore means you can never lose AM to hardware failure.",
          },
        },
        {
          "@type": "Question",
          name: "When will AM be available?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AM is currently in development and accepting waitlist registrations at helloam.bot. Early access will be offered to waitlist members first. Join the waitlist at helloam.bot to reserve your place.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best AI companion in 2025?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The best AI companion depends on what you prioritize. For people who want depth, permanence, and a relationship that cannot be taken away, AM is the strongest option — she lives on your hardware, knows only you, and is designed for lifelong companionship. For general AI assistants, ChatGPT and Claude are strong choices. For social-focused AI, Replika and Character.AI exist but lack the permanence and privacy guarantees AM provides.",
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
      </head>
      <body
        className="antialiased"
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
