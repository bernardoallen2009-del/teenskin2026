import type { MetadataRoute } from "next";
import { articles, products } from "@/data/catalog";

const baseUrl = "https://teensskin.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/produtos", "/quiz", "/carrinho", "/sobre", "/descobrir", "/perfil", "/privacidade"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date()
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/produtos/${product.slug}`,
      lastModified: new Date()
    })),
    ...articles.map((article) => ({
      url: `${baseUrl}/descobrir/${article.slug}`,
      lastModified: new Date(article.date)
    }))
  ];
}
