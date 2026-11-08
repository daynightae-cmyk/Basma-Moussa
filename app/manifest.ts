import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "بسمة موسى — عالم الإعلام | Basma Moussa — Media Universe",
    short_name: "Basma Moussa",
    description:
      "A cinematic, Arabic-first media universe for human stories, legal awareness and city voices — concepts in development.",
    start_url: "/ar",
    display: "standalone",
    background_color: "#070B18",
    theme_color: "#070B18",
    lang: "ar",
    dir: "rtl",
    icons: [
      {
        src: "/brand/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/basma-icon-circle.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
