export type SkinType = "oleosa" | "mista" | "seca" | "sensivel" | "normal";

export type ProductCategory =
  | "limpeza"
  | "hidratacao"
  | "protecao-solar"
  | "acne"
  | "corpo"
  | "tratamento";

export type ProductBadge = "Novo" | "Mais vendido" | "Vegan" | "Cruelty-free" | "Sem perfume";

export type StockStatus = "Disponível" | "Poucas unidades" | "Em breve";

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  category: ProductCategory;
  skinTypes: SkinType[];
  concerns: string[];
  ingredients: string[];
  badges: ProductBadge[];
  price: number;
  rating: number;
  reviews: number;
  popularity: number;
  image: string;
  gallery: string[];
  sizes: string[];
  texture?: string;
  whenToUse?: string;
  pairsWith?: string[];
  avoidWith?: string[];
  fullIngredients?: string[];
  benefits?: string[];
  duration?: string;
  pricePerMl?: string;
  stockStatus?: StockStatus;
  isNew: boolean;
  featured: boolean;
  usage: string;
  safetyNote: string;
};

export type Category = {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
  accent: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  topics: string[];
  body: string[];
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  quote: string;
  product: string;
};
