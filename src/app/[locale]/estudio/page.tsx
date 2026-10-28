import { notFound } from 'next/navigation';
import { DetailPage } from '@/components/home/DetailPages';
import { pageMetadata } from '@/lib/seo';
import { experience } from '@/i18n/experience';
import { isInternationalLocale, localePath } from '@/i18n/config';
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) { const {locale}=await params; if(!isInternationalLocale(locale)) notFound(); return pageMetadata(experience[locale].studioTitle, experience[locale].intro, localePath(locale,'/estudio/'), 'website', `/social/site-${locale}.png`, locale); }
export default async function Page({params}: {params: Promise<{locale: string}>}) { const {locale}=await params; if(!isInternationalLocale(locale)) notFound(); return <DetailPage section="estudio" locale={locale}/>; }
