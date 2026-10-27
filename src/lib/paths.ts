/** Public files need the project prefix on GitHub Pages; next/link adds it itself. */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return path.startsWith("/") && !path.startsWith("//") && !(base && path.startsWith(`${base}/`))
    ? `${base}${path}`
    : path;
}
