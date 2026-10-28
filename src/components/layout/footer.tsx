import Link from "@/components/ui/site-link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./header";
export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <Link href="/" aria-label="JAIAX Labs, inicio">
          <Logo />
        </Link>
        <p>
          Ideas ambiciosas.
          <br />
          Tecnología con propósito.
        </p>
        <Link href="/contacto">
          Construyamos algo juntos <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} JAIAX Labs.</span>
        <span>Desde Perú. Para el mundo.</span>
        <Link href="/blog">Ideas en órbita / Blog</Link>
        <Link href="/privacidad">Privacidad</Link>
      </div>
    </footer>
  );
}
