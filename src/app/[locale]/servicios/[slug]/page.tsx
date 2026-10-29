import { notFound } from "next/navigation";
import Link from "@/components/ui/site-link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { servicePages } from "@/data/service-pages";
import { international } from "@/i18n/international";
import { isInternationalLocale, localePath } from "@/i18n/config";
import { JournalArt } from "@/components/journal/JournalArt";
import { SectionTitle } from "@/components/ui";
import { pageMetadata, JsonLd, breadcrumbs } from "@/lib/seo";
import { copy } from "@/i18n/copy";
import { site } from "@/data/site";
export const dynamicParams = false;
export function generateStaticParams() { return servicePages.map(({ slug }) => ({ slug })); }
async function content(params: Promise<{ locale: string; slug: string }>) {
  const { locale, slug } = await params;
  const index = servicePages.findIndex(service => service.slug === slug);
  if (!isInternationalLocale(locale) || index < 0) notFound();
  return { locale, slug, service: international[locale].serviceData[index], text: international[locale].serviceUi, art: servicePages[index].art };
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) { const { locale, slug, service } = await content(params); return pageMetadata(service.title, service.intro.split('. ')[0] + '.', localePath(locale, `/servicios/${slug}/`), "website", `/social/site-${locale}.png`, locale); }
export default async function LocalizedService({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug, service, text, art } = await content(params);
  const path = localePath(locale, `/servicios/${slug}/`);
  const contact = `/contacto?lang=${locale}&tipo=${encodeURIComponent(service.title)}`;
  return <main id="main" className="inner-main container service-page international-service">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.intro, url: `${site.url}${path}`, provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "Country", name: "Peru" } }} />
    <JsonLd data={breadcrumbs([{ name: "JAIAX Labs", path: localePath(locale) }, { name: service.title, path }])} />
    <Link href={`${localePath(locale)}#servicios`} className="text-link"><ArrowLeft size={14} />{text[0]}</Link>
    <div className="service-page-hero"><div><h1>{service.headline}</h1><p>{service.intro}</p><Link href={contact} className="button button-gold">{text[1]} <ArrowUpRight size={16} /></Link>{slug === "desarrollo-web-peru" && <Link className="text-link service-plans-link" href={localePath(locale,"/planes/")}>{copy[locale].nav[5]} · US$ 70 <ArrowUpRight size={16}/></Link>}</div><JournalArt variant={art} /></div>
    <section className="section service-deliverables"><SectionTitle eyebrow={text[2]} title={text[3]} /><ul>{service.items.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p><Check size={16} /></li>)}</ul></section>
    <div className="notice">{service.note}</div>
    <section className="section faq-layout"><SectionTitle eyebrow={text[4]} title={text[5]} /><div className="service-questions">{[6,8].map(index => <details key={index}><summary>{text[index]}<span aria-hidden>+</span></summary><p>{text[index + 1]}</p></details>)}</div></section>
    <section className="service-final"><h2>{text[10]}</h2><Link href={contact} className="button button-gold">{text[11]} <ArrowUpRight size={16} /></Link></section>
  </main>;
}
