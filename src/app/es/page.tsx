import SpanishHome from "@/app/(spanish)/page";
import { pageMetadata } from "@/lib/seo";
import { basicPlan } from "@/data/pricing";
export const metadata = pageMetadata("Páginas web para negocios en Perú", `Creamos tu página web desde US$ ${basicPlan.price}, pago único de desarrollo. Compara planes, explora ejemplos y cotiza tu proyecto con JAIAX Labs.`, "/es/");
export default function ExplicitSpanishHome() { return <SpanishHome />; }
