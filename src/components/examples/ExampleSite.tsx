import Image from "next/image";
import Link from "next/link";
import type { Example } from "@/data/examples";
import styles from "./examples.module.css";

/** The same composition powers the device previews and the navigable demo. */
export function ExampleSite({
  example,
  preview = false,
  mobile = false,
}: {
  example: Example;
  preview?: boolean;
  mobile?: boolean;
}) {
  const Heading = preview ? "div" : "h1";
  return (
    <div
      className={`${styles.site} ${styles[example.theme]} ${mobile ? styles.mobileSite : ""} ${preview ? styles.previewSite : ""}`}
    >
      <div className={styles.siteNav}>
        <strong>
          {example.name.toLowerCase()}
          <sup>®</sup>
        </strong>
        <span>DISEÑO CON INTENCIÓN</span>
        {preview ? <span>↗</span> : <a href="#coleccion">Explorar ↗</a>}
      </div>
      <div className={styles.siteHero}>
        <Image
          src={example.image}
          alt={
            preview ? "" : `Ilustración original del concepto ${example.name}`
          }
          fill
          sizes={preview ? "(max-width: 700px) 80vw, 55vw" : "100vw"}
          className={styles.siteArt}
        />
        <div className={styles.siteCopy}>
          <span className={styles.siteLabel}>{example.label}</span>
          <Heading className={styles.siteTitle}>{example.title}</Heading>
          <p>{example.description}</p>
          {preview ? (
            <span className={styles.siteButton}>{example.action} ↗</span>
          ) : (
            <a className={styles.siteButton} href="#coleccion">
              {example.action} ↗
            </a>
          )}
        </div>
        <span className={styles.siteEdition}>
          ESTUDIO INDEPENDIENTE / EDICIÓN 01
        </span>
      </div>
      {!preview && (
        <section className={styles.collection} id="coleccion">
          <span className={styles.siteLabel}>UNA SELECCIÓN CON PROPÓSITO</span>
          <h2>{example.action}.</h2>
          <div className={styles.collectionGrid}>
            {example.items.map((item, i) => (
              <article key={item}>
                <span>0{i + 1}</span>
                <h3>{item}</h3>
                <p>
                  Una exploración de {example.name} donde cada detalle tiene su
                  lugar.
                </p>
                <Link
                  href={`/contacto?tipo=${encodeURIComponent("Desarrollo de páginas web")}`}
                >
                  Quiero una web así ↗
                </Link>
              </article>
            ))}
          </div>
          <p className={styles.demoNote}>
            Concepto de demostración de JAIAX Labs. Esta página permite explorar
            el diseño; no procesa compras ni reservas.
          </p>
        </section>
      )}
    </div>
  );
}
