import { pageMetadata } from "@/lib/seo";
export const metadata = { ...pageMetadata(
  "Desarrollo web en Perú para negocios",
  "Páginas web, tiendas online y automatización para atraer clientes y facilitar ventas. Desarrollo web en Perú desde US$ 70. Cotiza por WhatsApp con JAIAX Labs.",
  "/",
), robots: { index: false, follow: true } };
import { FocusedHome } from "@/components/home/FocusedHome";
export default function Home() { return <FocusedHome />; }
