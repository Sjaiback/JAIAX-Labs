import { DetailPage } from '@/components/home/DetailPages';
import { pageMetadata } from '@/lib/seo';
import { experience } from '@/i18n/experience';
export const metadata = pageMetadata(experience.es.systemsTitle, experience.es.intro, '/sistemas/');
export default function Page() { return <DetailPage section="sistemas"/>; }
