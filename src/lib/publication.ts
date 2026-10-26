/** Enable only after the owner confirms and publishes the final domain. */
export function isIndexableSite(url: string, enabled: boolean): boolean {
  if (!enabled) return false;
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      !["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname) &&
      !parsed.hostname.endsWith(".localhost")
    );
  } catch {
    return false;
  }
}
