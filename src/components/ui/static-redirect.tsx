"use client";
import { useEffect } from "react";
import Link from "@/components/ui/site-link";
import { assetPath } from "@/lib/paths";
export function StaticRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(`${assetPath(to)}${window.location.search}${window.location.hash}`);
  }, [to]);
  return <main id="main" className="inner-main container"><h1>Esta página se ha trasladado.</h1><Link href={to}>Continuar a la página actual →</Link></main>;
}
