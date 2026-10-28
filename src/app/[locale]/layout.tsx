import { notFound } from "next/navigation";
import { RootShell, rootMetadata } from "@/components/layout/RootShell";
import { internationalLocales, isInternationalLocale } from "@/i18n/config";
export { viewport } from "@/components/layout/RootShell";
export const dynamicParams = false;
export function generateStaticParams() { return internationalLocales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isInternationalLocale(locale)) notFound(); return rootMetadata(locale); }
export default async function LocalizedLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isInternationalLocale(locale)) notFound(); return <RootShell locale={locale}>{children}</RootShell>; }
