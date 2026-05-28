import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import ClientsMarquee from "@/components/sections/clients";
import Services from "@/components/sections/services";
import CTA from "@/components/sections/cta";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <ClientsMarquee />
      <Services />
      <CTA />
    </main>
  );
}