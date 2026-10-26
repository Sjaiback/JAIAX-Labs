"use client";
import { ArrowUpRight } from "lucide-react";
import { trackConversion } from "@/lib/analytics";
import { basicPlan } from "@/data/pricing";
export function AdCTA() {
  return (
    <div className="mobile-fixed-cta">
      <span>
        Tu web por <strong>US$ {basicPlan.price}</strong>
      </span>
      <a
        className="button button-gold"
        href="#cotizar"
        onClick={() => trackConversion("starter_cta")}
      >
        Quiero mi web
        <ArrowUpRight size={15} />
      </a>
    </div>
  );
}
