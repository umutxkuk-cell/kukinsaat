import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kukinsaat.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/kurumsal", "/hizmetler", "/projeler", "/iletisim", "/gizlilik"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })
  );
  const serviceRoutes = services.map((s) => ({
    url: `${base}/hizmetler/${s.slug}`,
    lastModified: new Date(),
  }));
  const projectRoutes = projects.map((p) => ({
    url: `${base}/projeler/${p.slug}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}