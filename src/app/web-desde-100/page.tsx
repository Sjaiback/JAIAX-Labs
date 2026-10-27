import { StaticRedirect } from "@/components/ui/static-redirect";
export const metadata = { robots: { index: false, follow: true } };
export default function PreviousWebOffer() {
  return <StaticRedirect to="/web-desde-70/" />;
}
