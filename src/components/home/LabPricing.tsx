import { ArrowUpRight, Check } from 'lucide-react';
import Link from '@/components/ui/site-link';
import { plans } from '@/data/pricing';
import { copy } from '@/i18n/copy';
import type { Locale } from '@/i18n/config';

/** Compact home comparison; the full scopes remain available on demand and on /planes. */
export function LabPricing({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const included = {es:'Ver todo lo incluido',en:'See everything included',de:'Alle Leistungen ansehen',it:'Vedi tutto ciò che è incluso'}[locale];
  return <div className="lab-plan-grid">{plans.map((plan,index)=><article className={`lab-plan ${plan.featured?'lab-plan-featured':''}`} key={plan.id} data-plan={plan.id}>
    <h3>{t.plans[index][0]}</h3>
    <div className="lab-plan-price">{plan.id==='avanzada'?<strong>{t.planUi[3]}</strong>:<><span>US$</span><strong>{plan.price}</strong></>}</div>
    <p className="lab-plan-billing">{t.planUi[plan.id==='avanzada'?2:1]}</p>
    <ul>{t.plans[index].slice(2,5).map(feature=><li key={feature}><Check size={15} aria-hidden="true"/>{feature}</li>)}</ul>
    <details><summary>{included}</summary><ul>{t.plans[index].slice(5).map(feature=><li key={feature}><Check size={15} aria-hidden="true"/>{feature}</li>)}</ul></details>
    <Link href={`/contacto?plan=${plan.id}&lang=${locale}`} className={`lab-button ${plan.featured?'lab-primary':''}`}>{plan.id==='avanzada'?t.planUi[5]:`${t.planUi[4]} ${t.plans[index][0]}`}<ArrowUpRight size={17}/></Link>
  </article>)}</div>;
}
