"use client";
import { useId } from "react";
import { Check, MessageCircle } from "lucide-react";
import Link from "@/components/ui/site-link";
import { plans } from "@/data/pricing";
import { Reveal } from "@/components/ui";
import { copy } from "@/i18n/copy";
import type { Locale } from "@/i18n/config";

export function PricingCards({ locale = "es" }: { locale?: Locale }) {
  const id = useId();
  const text = copy[locale];
  return (
    <div className="pricing-grid">
      {plans.map((plan, index) => (
        <Reveal key={plan.id} delay={index * 0.05}>
          <article
            className={`price-card ${plan.featured ? "price-featured" : ""}`}
            aria-labelledby={`${id}-${plan.id}`}
            data-plan={plan.id}
          >
            {plan.featured && (
              <span className="price-recommended">{text.planUi[0]}</span>
            )}
            <div className="price-plan-heading">
              <h3 id={`${id}-${plan.id}`}>{text.plans[index][0]}</h3>
              <span>0{index + 1}</span>
            </div>
            <p>{text.plans[index][1]}</p>
            <div className="price">
              {plan.id !== "avanzada" ? (
                <>
                  <span>US$</span>
                  <strong>{plan.price}</strong>
                </>
              ) : (
                <strong className="custom-price">{text.planUi[3]}</strong>
              )}
            </div>
            <span className="plan-billing">{text.planUi[plan.id === "avanzada" ? 2 : 1]}</span>
            <div className="price-divider" />
            <ul>
              {text.plans[index].slice(2).map((feature) => (
                <li key={feature}>
                  <Check size={15} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={`/contacto?plan=${plan.id}&lang=${locale}`}
              className={`button ${plan.featured ? "button-gold" : "button-outline"}`}
            >
              {plan.id === "avanzada"
                ? text.planUi[5]
                : `${text.planUi[4]} ${text.plans[index][0]}`}
              <MessageCircle size={15} aria-hidden="true" />
            </Link>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
