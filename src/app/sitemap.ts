import type { MetadataRoute } from "next";
import { articles, products } from "@/data/catalog";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/produtos", "/quiz", "/carrinho", "/sobre", "/descobrir", "/perfil", "/privacidade"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date()
    })),
    ...products.map((product) => ({
      url: `${siteUrl}/produtos/${product.slug}`,
      lastModified: new Date()
    })),
    ...articles.map((article) => ({
      url: `${siteUrl}/descobrir/${article.slug}`,
      lastModified: new Date(article.date)
    }))
  ];
}
