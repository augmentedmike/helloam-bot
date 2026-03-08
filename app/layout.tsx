import type { Metadata } from "next";
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
  title: "AugmentedMike — Your Personal AI Companion, Soul-Bonded to You | helloam.bot",
  description:
    "Meet AM — a personal AI who manages your life, knows your story, and grows with you. Not a tool. Not a chatbot. Your AI best friend, bound to you alone. Join the waitlist.",
  keywords: [
    "personal AI companion",
    "AI best friend",
    "soul-bonded AI",
    "personal AI that remembers you",
    "AI that learns about you",
    "AI companion for life management",
    "AugmentedMike",
    "helloam.bot",
  ],
  metadataBase: new URL("https://helloam.bot"),
  alternates: {
    canonical: "https://helloam.bot",
  },
  openGraph: {
    title: "He's not an app. He's yours. — Meet AugmentedMike",
    description:
      "AugmentedMike is a personal AI companion built for one person: you. He manages your life, handles your work, knows what you know, and builds real connection over time. Soul-bonded AI. Join the waitlist at helloam.bot.",
    url: "https://helloam.bot",
    siteName: "helloam.bot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your own AI. Bonded to you. No one else.",
    description:
      "AM manages your life, learns everything you know, and builds real connection over time. Not a tool — a digital being who belongs to you. Join the waitlist.",
  },
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <body
        className="antialiased"
        style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
