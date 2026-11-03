import { MetadataRoute } from "next";
import { PRIMARY_DOMAIN } from "@/data/landingData";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString().split("T")[0];

  return [
    {
      url: `${PRIMARY_DOMAIN}/`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];
}
