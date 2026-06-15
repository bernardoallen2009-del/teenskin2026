export type Locale = "pt" | "en";

export const defaultLocale: Locale = "pt";
export const locales: Locale[] = ["pt", "en"];

export const dictionary = {
  pt: {
    navProducts: "Produtos",
    navAbout: "Sobre",
    navDiscover: "Descobrir",
    navQuiz: "Quiz",
    navCart: "Carrinho",
    campaign: "Portes grátis em encomendas acima de 35 EUR"
  },
  en: {
    navProducts: "Products",
    navAbout: "About",
    navDiscover: "Discover",
    navQuiz: "Quiz",
    navCart: "Cart",
    campaign: "Free shipping on orders over EUR 35"
  }
} satisfies Record<Locale, Record<string, string>>;
