import type { Metadata } from "next";
import { LogoShowcase } from "@/components/brand/LogoShowcase";

export const metadata: Metadata = {
  title: "JAIAX Labs — Identidad en movimiento",
  robots: { index: false, follow: false },
};
export default function LogoPage() {
  return (
    <main id="main" className="inner-main container">
      <LogoShowcase />
    </main>
  );
}
