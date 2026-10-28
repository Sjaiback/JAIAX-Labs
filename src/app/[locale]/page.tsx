import { notFound } from "next/navigation";
import { InternationalHome } from "@/components/i18n/InternationalHome";
import { isInternationalLocale } from "@/i18n/config";
import { international } from "@/i18n/international";
import { pageMetadata } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isInternationalLocale(locale)) notFound();
  return pageMetadata(international[locale].title, international[locale].description, `/${locale}/`, "website", `/social/site-${locale}.png`, locale);
}
export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isInternationalLocale(locale)) notFound(); return <InternationalHome locale={locale} />; }
