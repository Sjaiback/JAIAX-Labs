import SpanishHome from "@/app/(spanish)/page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";
export const metadata = pageMetadata("Desarrollo web en Perú para negocios", site.description, "/es/");
export default function ExplicitSpanishHome() { return <SpanishHome />; }
