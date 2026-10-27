import Image from "next/image";
import type { Example } from "@/data/examples";
import styles from "./examples.module.css";

/** Actual captures of the interactive demos, fitted to each device. */
export function ExampleSite({
  example,
  mobile = false,
}: {
  example: Example;
  preview?: boolean;
  mobile?: boolean;
}) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Image
        src={mobile ? example.mobileImage : example.image}
        alt=""
        fill
        sizes={mobile ? "20vw" : "(max-width:700px) 80vw, 65vw"}
        style={{ objectFit: "cover", objectPosition: "top" }}
      />
      <span
        className={`${styles.previewBrand} ${mobile ? styles.previewBrandMobile : ""}`}
      >
        {example.name}
      </span>
    </div>
  );
}
