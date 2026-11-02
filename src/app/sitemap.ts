import { MetadataRoute } from "next";
import {
  PRIMARY_DOMAIN,
  ORBIT_DOMAINS,
  DEVELOPER_DOMAINS,
  REGIONAL_DOMAINS,
} from "@/data/landingData";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString().split("T")[0];

  const primaryEntry: MetadataRoute.Sitemap[number] = {
    url: `${PRIMARY_DOMAIN}/`,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 1.0,
  };

  const orbitEntries: MetadataRoute.Sitemap = ORBIT_DOMAINS.filter(
    (domain) => `https://${domain}` !== PRIMARY_DOMAIN
  ).map((domain) => ({
    url: `https://${domain}/`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const developerEntries: MetadataRoute.Sitemap = DEVELOPER_DOMAINS.map(
    (domain) => ({
      url: `https://${domain}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    })
  );

  const regionalEntries: MetadataRoute.Sitemap = REGIONAL_DOMAINS.map(
    (domain) => ({
      url: `https://${domain}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  return [primaryEntry, ...orbitEntries, ...developerEntries, ...regionalEntries];
}
