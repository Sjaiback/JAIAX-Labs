import type { ComponentProps } from "react";
import { whatsappContactHref, contactLocale } from "@/lib/whatsapp";
import { assetPath } from "@/lib/paths";

/** Pages serves HTML directly: avoid client-router segment requests that need Next's routing server. */
export default function SiteLink({ href, ...props }: Omit<ComponentProps<"a">, "href"> & { href: string }) {
  if (/^\/contacto(?:[/?#]|$)/.test(href)) {
    const title = { es: "Abrir conversación por WhatsApp", en: "Open a WhatsApp conversation", de: "WhatsApp-Unterhaltung öffnen", it: "Apri una conversazione WhatsApp" }[contactLocale(href)];
    return <a {...props} href={whatsappContactHref(href)} target="_blank" rel="noopener noreferrer" title={props.title || title} />;
  }
  return <a {...props} href={assetPath(href)} />;
}
