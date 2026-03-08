import Hero from "@/components/hero";
import Lifestyle from "@/components/lifestyle";
import Features from "@/components/features";
import Manifesto from "@/components/manifesto";
import Waitlist from "@/components/waitlist";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main
      style={{ background: "#0a0a0a", color: "#ededed", minHeight: "100vh" }}
    >
      <Hero />
      <Lifestyle />
      <Features />
      <Manifesto />
      <Waitlist />
      <FAQ />
      <Footer />
    </main>
  );
}
