"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/site";
import { JaiaxBrand } from "@/components/brand/JaiaxBrand";
export function Logo() {
  return (
    <span className="brand">
      <JaiaxBrand />
    </span>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  const path = usePathname();
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
    if (!open) return;
    const old = document.body.style.overflow;
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    const toggle = document.getElementById("menu-toggle");
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("#mobile-nav a"),
    );
    links[0]?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle?.focus();
      }
      if (e.key === "Tab") {
        const last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === toggle) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          toggle?.focus();
        }
      }
    };
    const resize = () => {
      if (window.innerWidth > 1000) setOpen(false);
    };
    document.addEventListener("keydown", key);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = old;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.removeEventListener("keydown", key);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <>
      <a href="#main" className="skip-link">
        Ir al contenido
      </a>
      <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-wrap">
          <Link
            href="/"
            aria-label="JAIAX Labs, inicio"
            onClick={() => setOpen(false)}
          >
            <Logo />
          </Link>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navigation.map(([id, label]) => (
              <Link
                key={id}
                href={id === "blog" ? "/blog" : `/#${id}`}
                className={
                  (path === "/" && active === id) ||
                  (id === "blog" && path.startsWith("/blog"))
                    ? "active"
                    : ""
                }
                aria-current={
                  id === "blog" && path.startsWith("/blog")
                    ? "page"
                    : path === "/" && active === id
                      ? "location"
                      : undefined
                }
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link className="nav-cta" href="/contacto">
            Hablemos de tu proyecto
            <ArrowUpRight size={15} />
          </Link>
          <button
            id="menu-toggle"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Navegación móvil"
        >
          {navigation.map(([id, label], i) => (
            <Link
              key={id}
              href={id === "blog" ? "/blog" : `/#${id}`}
              onClick={() => setOpen(false)}
            >
              <span>0{i + 1}</span>
              {label}
              <ArrowUpRight size={22} />
            </Link>
          ))}
          <Link
            className="button button-gold"
            href="/contacto"
            onClick={() => setOpen(false)}
          >
            Hablemos de tu proyecto
            <ArrowUpRight size={18} />
          </Link>
        </nav>
      )}
    </>
  );
}
