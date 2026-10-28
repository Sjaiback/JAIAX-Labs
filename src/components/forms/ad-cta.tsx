"use client";
import { ArrowUpRight } from "lucide-react";
import { trackConversion } from "@/lib/analytics";
import { basicPlan } from "@/data/pricing";
import Link from "@/components/ui/site-link";
export function AdCTA() {
  return (
    <div className="mobile-fixed-cta">
      <span>
        Tu web por <strong>US$ {basicPlan.price}</strong>
      </span>
      <Link
        className="button button-gold"
        href="/contacto?plan=basica"
        onClick={() => trackConversion("starter_cta")}
      >
        Quiero mi web
        <ArrowUpRight size={15} />
      </Link>
    </div>
  );
}
