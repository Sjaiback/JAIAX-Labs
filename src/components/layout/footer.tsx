import Link from "@/components/ui/site-link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./header";
import { copy } from "@/i18n/copy";
import { localePath, type Locale } from "@/i18n/config";
export function Footer({ locale = "es" }: { locale?: Locale }) {
  const text = copy[locale];
  return (
    <footer className="footer container">
      <div className="footer-top">
        <Link href={localePath(locale)} aria-label={text.home}>
          <Logo />
        </Link>
        <p>
          {text.footer[0]}
          <br />
          {text.footer[1]}
        </p>
        <Link href={`/contacto?lang=${locale}`}>
          {text.footer[2]} <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} JAIAX Labs.</span>
        <span>{text.footer[3]}</span>
        <Link href="/blog">{text.footer[4]}</Link>
        <Link href="/privacidad">{text.footer[5]}</Link>
      </div>
    </footer>
  );
}
