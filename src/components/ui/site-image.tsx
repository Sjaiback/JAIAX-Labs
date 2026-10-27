import Image, { type ImageProps } from "next/image";
import { assetPath } from "@/lib/paths";
export default function SiteImage({ src, ...props }: ImageProps) {
  return <Image {...props} src={typeof src === "string" ? assetPath(src) : src} />;
}
