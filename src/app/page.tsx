import { Hero } from "@/components/home/hero";
import { pageMetadata } from "@/lib/seo";
import { LatestJournal } from "@/components/journal/LatestJournal";
import { ExampleShowcase } from "@/components/examples/ExampleShowcase";
export const metadata = pageMetadata(
  "Desarrollo web, IA y automatización en Perú",
  "JAIAX Labs: desarrollo de páginas web, software a medida, automatización con n8n e integraciones de IA en Perú. Explora servicios y prepara tu cotización.",
  "/",
);
import {
  FeaturedProjects,
  Differentiators,
  Services,
  About,
  Process,
  Pricing,
  Testimonials,
  FinalCTA,
} from "@/components/home/sections";
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <FeaturedProjects />
      <ExampleShowcase />
      <Differentiators />
      <Services />
      <About />
      <Process />
      <Pricing />
      <Testimonials />
      <LatestJournal />
      <FinalCTA />
    </main>
  );
}
