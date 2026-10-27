import Image from "@/components/ui/site-image";
import type { Example } from "@/data/examples";

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
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <Image
        src={mobile ? example.mobileImage : example.image}
        alt=""
        fill
        sizes={mobile ? "(max-width:767px) 182px, 245px" : "(max-width:767px) 90vw, 760px"}
        style={{ objectFit: "cover", objectPosition: "top" }}
      />
    </div>
  );
}
