import { Hero } from "@/components/home/hero";
import { pageMetadata } from "@/lib/seo";
import { LatestJournal } from "@/components/journal/LatestJournal";
import { ExampleShowcase } from "@/components/examples/ExampleShowcase";
export const metadata = { ...pageMetadata(
  "Desarrollo web en Perú para negocios",
  "Páginas web, tiendas online y automatización para atraer clientes y facilitar ventas. Desarrollo web en Perú desde US$ 70. Cotiza por WhatsApp con JAIAX Labs.",
  "/",
), robots: { index: false, follow: true } };
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
