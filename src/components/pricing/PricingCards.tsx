"use client";
import { useId } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { plans } from "@/data/pricing";
import { Reveal } from "@/components/ui";

export function PricingCards() {
  const id = useId();
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
              <span className="price-recommended">EL EQUILIBRIO IDEAL</span>
            )}
            <div className="price-plan-heading">
              <h3 id={`${id}-${plan.id}`}>{plan.name}</h3>
              <span>0{index + 1}</span>
            </div>
            <p>{plan.description}</p>
            <div className="price">
              {plan.id !== "avanzada" ? (
                <>
                  <span>US$</span>
                  <strong>{plan.price}</strong>
                </>
              ) : (
                <strong className="custom-price">{plan.price}</strong>
              )}
            </div>
            <span className="plan-billing">{plan.billing}</span>
            <div className="price-divider" />
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={15} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={`/contacto?plan=${plan.id}`}
              className={`button ${plan.featured ? "button-gold" : "button-outline"}`}
            >
              {plan.id === "avanzada"
                ? "Definir mi proyecto"
                : `Elegir ${plan.name.toLowerCase()}`}
              <ArrowUpRight size={15} />
            </Link>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
