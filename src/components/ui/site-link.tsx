import Link from "next/link";
import type { ComponentProps } from "react";
import { whatsappContactHref, contactLocale } from "@/lib/whatsapp";

/** Commercial contact links go directly to WhatsApp; browsing links stay internal. */
export default function SiteLink(props: ComponentProps<typeof Link>) {
  if (typeof props.href === "string" && /^\/contacto(?:[/?#]|$)/.test(props.href)) {
    const title = { es: "Abrir conversación por WhatsApp", en: "Open a WhatsApp conversation", de: "WhatsApp-Unterhaltung öffnen", it: "Apri una conversazione WhatsApp" }[contactLocale(props.href)];
    return <Link {...props} href={whatsappContactHref(props.href)} target="_blank" rel="noopener noreferrer" prefetch={false} title={props.title || title} />;
  }
  return <Link {...props} />;
}
