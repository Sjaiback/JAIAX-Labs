import { permanentRedirect } from "next/navigation";

/** Preserve existing campaign URLs and every UTM parameter. */
export default async function PreviousWebOffer({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const values = await searchParams;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (Array.isArray(value)) value.forEach((item) => query.append(key, item));
    else if (typeof value === "string") query.append(key, value);
  }
  permanentRedirect(`/web-desde-70${query.size ? `?${query.toString()}` : ""}`);
}
