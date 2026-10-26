export type ConversionEvent =
  | "quote_started"
  | "quote_prepared"
  | "whatsapp_opened"
  | "starter_cta";
export function trackConversion(
  name: ConversionEvent,
  extra: Record<string, string> = {},
) {
  const params = new URLSearchParams(window.location.search);
  const utm = Object.fromEntries(
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].map(
      (key) => [key, params.get(key) || ""],
    ),
  );
  // Hook local; sin píxeles, cookies ni datos personales. Conectar un proveedor tras revisar consentimiento.
  window.dispatchEvent(
    new CustomEvent("jaiax:conversion", { detail: { name, ...utm, ...extra } }),
  );
}
