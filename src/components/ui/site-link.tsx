import Link from "next/link";
import type { ComponentProps } from "react";
import { whatsappContactHref } from "@/lib/whatsapp";

/** Commercial contact links go directly to WhatsApp; browsing links stay internal. */
export default function SiteLink(props: ComponentProps<typeof Link>) {
  if (typeof props.href === "string" && /^\/contacto(?:[/?#]|$)/.test(props.href)) {
    return <Link {...props} href={whatsappContactHref(props.href)} target="_blank" rel="noopener noreferrer" prefetch={false} title={props.title || "Abrir conversación por WhatsApp"} />;
  }
  return <Link {...props} />;
}
