import { DetailPage } from '@/components/home/DetailPages';
import { pageMetadata } from '@/lib/seo';
import { experience } from '@/i18n/experience';
export const metadata = pageMetadata(experience.es.studioTitle, experience.es.intro, '/estudio/');
export default function Page() { return <DetailPage section="estudio"/>; }
