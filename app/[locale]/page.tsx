import Hero from "@/components/sections/hero";
import ServicesStrip from "@/components/sections/services-strip";
import ClientsMarquee from "@/components/sections/clients";
import WhatWeDo from "@/components/sections/what-we-do";
import FeaturedServices from "@/components/sections/featured-services";
import Stats from "@/components/sections/stats";
import Process from "@/components/sections/process";
import Industries from "@/components/sections/industries";
import Testimonials from "@/components/sections/testimonials";
import CTA from "@/components/sections/cta";
import { WebSiteSchema } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <WebSiteSchema />
      <Hero />
      <ServicesStrip />
      <ClientsMarquee />
      <WhatWeDo />
      <FeaturedServices />
      <Stats />
      <Process />
      <Industries />
      <Testimonials />
      <CTA />
    </>
  );
}
