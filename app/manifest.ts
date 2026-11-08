import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.nameAr} — ${BRAND.productAr}`,
    short_name: `${BRAND.nameAr}`,
    description: BRAND.tagline.ar,
    start_url: "/ar",
    display: "standalone",
    background_color: "#070b18",
    theme_color: "#d7ab62",
    lang: "ar",
    dir: "rtl",
    categories: ["media", "education", "reference"],
    icons: [
      {
        src: "/brand/basma-icon-circle.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/basma-icon-circle.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
