import { RootShell } from "@/components/layout/RootShell";
export { metadata, viewport } from "@/components/layout/RootShell";
export default function SpanishLayout({ children }: { children: React.ReactNode }) { return <RootShell locale="es">{children}</RootShell>; }
