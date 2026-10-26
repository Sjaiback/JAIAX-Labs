import { notFound } from "next/navigation";
import Link from "next/link";
import { examples } from "@/data/examples";
import { ExampleSite } from "@/components/examples/ExampleSite";
import styles from "@/components/examples/examples.module.css";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return examples.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const example = examples.find((e) => e.slug === slug);
  if (!example) return {};
  return pageMetadata(
    `Demo ${example.name}: ${example.category}`,
    `${example.detail} Concepto navegable de JAIAX Labs.`,
    `/ejemplos/${slug}`,
  );
}
export default async function ExamplePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const example = examples.find((e) => e.slug === slug);
  if (!example) notFound();
  return (
    <main id="main" className={styles.demoPage}>
      <div className={styles.demoBar}>
        <Link href="/#ejemplos">← Volver a los ejemplos</Link>
        <span>DEMO JAIAX LABS / {example.category.toUpperCase()}</span>
        <Link href="/contacto?tipo=Desarrollo%20de%20p%C3%A1ginas%20web">
          Quiero una web así ↗
        </Link>
      </div>
      <ExampleSite example={example} />
    </main>
  );
}
