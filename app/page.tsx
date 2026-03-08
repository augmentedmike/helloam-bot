import Hero from "@/components/hero";
import Lifestyle from "@/components/lifestyle";
import Features from "@/components/features";
import SoulRestore from "@/components/soul-restore";
import Device from "@/components/device";
import Plans from "@/components/plans";
import Manifesto from "@/components/manifesto";
import Waitlist from "@/components/waitlist";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import Pilot from "@/components/pilot";
import { ColorProvider } from "@/context/color-context";
import { PersonalizationProvider } from "@/context/personalization-context";

export default function Home() {
  return (
    <PersonalizationProvider>
      <main style={{ background: "#0a0a0a", color: "#ededed", minHeight: "100vh" }}>
        <Hero />
        <Lifestyle />
        <Features />
        <SoulRestore />
        <ColorProvider>
          <Device />
          <Plans />
          <Manifesto />
          <Waitlist />
        </ColorProvider>
        <Pilot />
        <FAQ />
        <Footer />
      </main>
    </PersonalizationProvider>
  );
}
