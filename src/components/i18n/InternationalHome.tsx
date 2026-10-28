import { FocusedHome } from "@/components/home/FocusedHome";
import type { InternationalLocale } from "@/i18n/config";
export function InternationalHome({locale}: {locale: InternationalLocale}) { return <FocusedHome locale={locale}/>; }
