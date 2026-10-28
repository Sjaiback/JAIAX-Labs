"use client";

import { useEffect, useRef } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import Link from '@/components/ui/site-link';
import { JaiaxBrand } from '@/components/brand/JaiaxBrand';
import { LanguageSelector } from '@/components/i18n/LanguageSelector';
import { copy } from '@/i18n/copy';
import { experience } from '@/i18n/experience';
import { localePath, type Locale } from '@/i18n/config';
import './mobile-menu.css';

export const menuWords = {
  es: { open: 'Menú', close: 'Cerrar' }, en: { open: 'Menu', close: 'Close' },
  de: { open: 'Menü', close: 'Schließen' }, it: { open: 'Menu', close: 'Chiudi' },
};

type MenuLink = { id: string; label: string; href: string; current: boolean };
export function MobileMenu({ open, onClose, locale, links }: {
  open: boolean; onClose: () => void; locale: Locale; links: MenuLink[];
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element || !open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    element.querySelector<HTMLAnchorElement>('nav a')?.focus({ preventScroll: true });
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  const text = copy[locale];
  return <dialog ref={dialog} id="mobile-nav" className="mobile-menu-dialog" aria-label={text.mobile}
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClose={event => { if (!event.currentTarget.open) onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="mobile-menu-top">
      <Link href={localePath(locale)} aria-label={text.home} onClick={onClose}><JaiaxBrand /></Link>
      <button type="button" className="menu-trigger is-open" aria-label={text.close} onClick={onClose}>
        {menuWords[locale].close}<span className="menu-bars" aria-hidden="true"><i/><i/></span>
      </button>
    </div>
    <div className="mobile-menu-card">
      <nav aria-label={text.mobile}>
        {links.map(link => <Link key={link.id} href={link.href} onClick={onClose} aria-current={link.current ? 'page' : undefined}>
          {link.label}<span className="menu-current-dot" aria-hidden="true"/>
        </Link>)}
      </nav>
      <div className="mobile-menu-footer">
        <Link className="menu-contact" href={`/contacto?lang=${locale}`} onClick={onClose}>
          <MessageCircle size={17}/>{experience[locale].talk}<ArrowUpRight size={15}/>
        </Link>
        <LanguageSelector locale={locale}/>
      </div>
    </div>
  </dialog>;
}
