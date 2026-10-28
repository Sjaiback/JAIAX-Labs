"use client";
import Link from "@/components/ui/site-link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { JaiaxBrand } from "@/components/brand/JaiaxBrand";
import { MobileMenu, menuWords } from "./MobileMenu";
import { LanguageSelector } from "@/components/i18n/LanguageSelector";
import { copy } from "@/i18n/copy";
import { localePath, type Locale } from "@/i18n/config";
export function Logo() {
  return (
    <span className="brand">
      <JaiaxBrand />
    </span>
  );
}
export function Header({ locale = "es" }: { locale?: Locale }) {
  const text = copy[locale];
  const navigation = [["servicios", text.nav[1]], ["proyectos", text.nav[2]], ["precios", text.nav[5]], ["blog", text.nav[6]]];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  const path = usePathname();
  const isHome = path === "/" || path.replace(/\/$/, "") === localePath(locale).replace(/\/$/, "");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [path]);
  useEffect(() => {
    const resize = () => { if (window.innerWidth > 1000) setOpen(false); };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  const menuLinks = navigation.map(([id, label]) => ({
    id, label,
    href: id === "blog" ? "/blog/" : id === "proyectos" ? "/proyectos/" : id === "precios" ? localePath(locale, "/planes/") : `${localePath(locale)}#servicios`,
    current: id === "blog" ? path.startsWith("/blog") : id === "proyectos" ? path.startsWith("/proyectos") : id === "precios" ? path.replace(/\/$/, "").endsWith("/planes") : (isHome && active === "servicios") || path.includes("/servicios/") || path.replace(/\/$/, "").endsWith("/sistemas"),
  }));
  return (
    <>
      <a href="#main" className="skip-link">
        {text.skip}
      </a>
      <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-wrap">
          <Link
            href={localePath(locale)}
            aria-label={text.home}
            onClick={() => setOpen(false)}
          >
            <Logo />
          </Link>
          <nav className="desktop-nav" aria-label={text.navigation}>
            {navigation.map(([id, label]) => (
              <Link
                key={id}
                href={id === "contacto" ? `/contacto?lang=${locale}` : id === "blog" ? "/blog" : id === "proyectos" ? "/proyectos/" : id === "precios" ? localePath(locale, "/planes/") : `${localePath(locale)}#${id}`}
                className={
                  (isHome && active === id) ||
                  (id === "blog" && path.startsWith("/blog"))
                    ? "active"
                    : ""
                }
                aria-current={
                  id === "blog" && path.startsWith("/blog")
                    ? "page"
                    : isHome && active === id
                      ? "location"
                      : undefined
                }
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link className="nav-cta" href={`/contacto?lang=${locale}`}>
            {text.talk}
            <ArrowUpRight size={15} />
          </Link>
          <LanguageSelector locale={locale} />
          <button
            id="menu-toggle"
            className="menu-trigger"
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? text.close : text.open}
            onClick={() => setOpen(!open)}
          >
            {menuWords[locale].open}<span className="menu-bars" aria-hidden="true"><i/><i/></span>
          </button>
        </div>
      </header>
      <MobileMenu open={open} locale={locale} links={menuLinks} onClose={() => setOpen(false)} />
    </>
  );
}
