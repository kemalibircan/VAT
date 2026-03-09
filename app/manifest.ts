import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "calculatemyvat",
    short_name: "calculatemyvat",
    description:
      "Reverse VAT or GST, switch between net and gross, and understand the maths in plain English with calculatemyvat.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/brand-mark.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
