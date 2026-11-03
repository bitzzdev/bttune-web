import { MetadataRoute } from "next";
import { PRIMARY_DOMAIN } from "@/data/landingData";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${PRIMARY_DOMAIN}/sitemap.xml`,
  };
}
