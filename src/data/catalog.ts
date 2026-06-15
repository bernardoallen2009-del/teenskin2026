import type { Article, Category, Product, Review } from "../types/product.js";

export const categories: Category[] = [
  {
    id: "limpeza",
    name: "Limpeza de rosto",
    description: "Geles e espumas suaves para limpar sem repuxar.",
    image: "/images/category-cleanser.png",
    accent: "#F7F0F5"
  },
  {
    id: "hidratacao",
    name: "Hidratação",
    description: "Texturas leves para manter a barreira confortável.",
    image: "/images/category-hydration.png",
    accent: "#E8EBF7"
  },
  {
    id: "protecao-solar",
    name: "Proteção solar",
    description: "SPF diário com acabamento invisível e toque fresco.",
    image: "/images/category-spf.png",
    accent: "#FFF1D7"
  },
  {
    id: "acne",
    name: "Acne e borbulhas",
    description: "Cuidados pontuais e equilibrantes para dias difíceis.",
    image: "/images/category-acne.png",
    accent: "#E8F5F1"
  },
  {
    id: "tratamento",
    name: "Tratamentos",
    description: "Séruns simples para brilho, textura e manchas.",
    image: "/images/category-treatment.png",
    accent: "#FDE7EC"
  },
  {
    id: "corpo",
    name: "Corpo",
    description: "Cuidado diário para pele seca, áspera ou sensível.",
    image: "/images/category-body.png",
    accent: "#ECECEC"
  }
];

export const products: Product[] = [
  {
    id: "p-001",
    slug: "cloud-gel-cleanser",
    name: "Cloud Gel Cleanser",
    shortName: "Cloud Gel",
    description:
      "Gel de limpeza de pH equilibrado que remove protetor solar e oleosidade sem deixar a pele repuxada.",
    category: "limpeza",
    skinTypes: ["oleosa", "mista", "normal", "sensivel"],
    concerns: ["oleosidade", "poros", "sensibilidade"],
    ingredients: ["Aloe vera", "Glicerina", "Pantenol"],
    badges: ["Mais vendido", "Sem perfume"],
    price: 14.9,
    rating: 4.7,
    reviews: 126,
    popularity: 98,
    image: "/images/cloud-gel-cleanser.png",
    gallery: ["/images/cloud-gel-cleanser.png", "/images/gallery-cleanser.png"],
    sizes: ["150 ml", "50 ml"],
    isNew: false,
    featured: true,
    usage: "Massaja durante 45 segundos na pele húmida e enxagua com água morna.",
    safetyNote: "Evita a zona dos olhos. Se arder de forma persistente, suspende o uso."
  },
  {
    id: "p-002",
    slug: "balance-mist-toner",
    name: "Balance Mist Toner",
    shortName: "Balance Mist",
    description:
      "Bruma fresca com niacinamida que ajuda a equilibrar brilho e vermelhidão ao longo do dia.",
    category: "tratamento",
    skinTypes: ["oleosa", "mista", "sensivel"],
    concerns: ["brilho", "vermelhidao", "poros"],
    ingredients: ["Niacinamida 4%", "Água de arroz", "Betaína"],
    badges: ["Novo", "Vegan"],
    price: 16.5,
    rating: 4.6,
    reviews: 82,
    popularity: 88,
    image: "/images/balance-mist.png",
    gallery: ["/images/balance-mist.png", "/images/gallery-mist.png"],
    sizes: ["100 ml"],
    isNew: true,
    featured: true,
    usage: "Pulveriza a 20 cm do rosto depois da limpeza ou antes do hidratante.",
    safetyNote: "Usa no máximo duas vezes por dia para manter a rotina simples."
  },
  {
    id: "p-003",
    slug: "barrier-cream",
    name: "Barrier Cream",
    shortName: "Barrier Cream",
    description:
      "Creme hidratante leve com ceramidas para fortalecer a barreira cutânea sem sensação pesada.",
    category: "hidratacao",
    skinTypes: ["seca", "mista", "normal", "sensivel"],
    concerns: ["secura", "barreira", "sensibilidade"],
    ingredients: ["Ceramidas", "Esqualano", "Aveia coloidal"],
    badges: ["Cruelty-free", "Sem perfume"],
    price: 18.9,
    rating: 4.8,
    reviews: 201,
    popularity: 96,
    image: "/images/barrier-cream.png",
    gallery: ["/images/barrier-cream.png", "/images/gallery-cream.png"],
    sizes: ["75 ml", "30 ml"],
    isNew: false,
    featured: true,
    usage: "Aplica uma camada fina depois do sérum, de manhã e à noite.",
    safetyNote: "Fórmula suave, mas faz teste numa pequena área se tens pele reativa."
  },
  {
    id: "p-004",
    slug: "sunny-spf-50",
    name: "Sunny SPF 50",
    shortName: "Sunny SPF",
    description:
      "Protetor solar facial de acabamento invisível, pensado para escola, treino e dias longos.",
    category: "protecao-solar",
    skinTypes: ["oleosa", "mista", "seca", "normal", "sensivel"],
    concerns: ["protecao", "manchas", "brilho"],
    ingredients: ["Filtros UV modernos", "Vitamina E", "Ácido hialurónico"],
    badges: ["Mais vendido", "Vegan"],
    price: 19.9,
    rating: 4.9,
    reviews: 312,
    popularity: 100,
    image: "/images/sunny-spf.png",
    gallery: ["/images/sunny-spf.png", "/images/gallery-spf.png"],
    sizes: ["50 ml"],
    isNew: false,
    featured: true,
    usage: "Usa dois dedos de produto como último passo da manhã. Reaplica ao longo do dia.",
    safetyNote: "Protetor solar não substitui sombra, chapéu e pausas ao sol."
  },
  {
    id: "p-005",
    slug: "spot-dots",
    name: "Spot Dots",
    shortName: "Spot Dots",
    description:
      "Patches hidrocoloides transparentes para proteger borbulhas e reduzir a vontade de mexer.",
    category: "acne",
    skinTypes: ["oleosa", "mista", "normal"],
    concerns: ["borbulhas", "marcas", "textura"],
    ingredients: ["Hidrocoloide", "Centella asiática"],
    badges: ["Novo", "Cruelty-free"],
    price: 9.9,
    rating: 4.5,
    reviews: 64,
    popularity: 80,
    image: "/images/spot-dots.png",
    gallery: ["/images/spot-dots.png", "/images/gallery-dots.png"],
    sizes: ["36 unidades"],
    isNew: true,
    featured: false,
    usage: "Aplica sobre pele limpa e seca. Remove quando o patch ficar opaco.",
    safetyNote: "Não uses sobre feridas abertas ou pele muito irritada."
  },
  {
    id: "p-006",
    slug: "glow-drop-serum",
    name: "Glow Drop Serum",
    shortName: "Glow Drops",
    description:
      "Sérum de vitamina C suave para dar luminosidade sem complicar a rotina.",
    category: "tratamento",
    skinTypes: ["normal", "seca", "mista"],
    concerns: ["luminosidade", "manchas", "opacidade"],
    ingredients: ["Vitamina C derivada", "Ácido ferúlico", "Glicerina"],
    badges: ["Vegan", "Cruelty-free"],
    price: 21.5,
    rating: 4.4,
    reviews: 91,
    popularity: 76,
    image: "/images/glow-serum.png",
    gallery: ["/images/glow-serum.png", "/images/gallery-serum.png"],
    sizes: ["30 ml"],
    isNew: false,
    featured: false,
    usage: "Aplica 2 gotas de manhã, antes do hidratante e do SPF.",
    safetyNote: "Introduz devagar: dia sim, dia não, durante a primeira semana."
  },
  {
    id: "p-007",
    slug: "body-cloud-milk",
    name: "Body Cloud Milk",
    shortName: "Body Milk",
    description:
      "Leite corporal com textura rápida para hidratar braços, pernas e zonas ásperas.",
    category: "corpo",
    skinTypes: ["seca", "normal", "sensivel"],
    concerns: ["secura", "textura", "barreira"],
    ingredients: ["Manteiga de karité", "Ceramidas", "Ureia 5%"],
    badges: ["Sem perfume", "Cruelty-free"],
    price: 17.9,
    rating: 4.6,
    reviews: 73,
    popularity: 74,
    image: "/images/body-milk.png",
    gallery: ["/images/body-milk.png", "/images/gallery-body.png"],
    sizes: ["250 ml"],
    isNew: false,
    featured: false,
    usage: "Aplica depois do banho, quando a pele ainda está ligeiramente húmida.",
    safetyNote: "Não uses em pele com cortes ou irritação intensa."
  },
  {
    id: "p-008",
    slug: "night-reset-balm",
    name: "Night Reset Balm",
    shortName: "Night Balm",
    description:
      "Bálsamo de noite para reparar pele sensibilizada por vento, sol ou excesso de ativos.",
    category: "hidratacao",
    skinTypes: ["seca", "sensivel", "normal"],
    concerns: ["barreira", "vermelhidao", "secura"],
    ingredients: ["Pantenol", "Madecassoside", "Óleo de jojoba"],
    badges: ["Novo", "Sem perfume"],
    price: 20.9,
    rating: 4.7,
    reviews: 58,
    popularity: 70,
    image: "/images/night-balm.png",
    gallery: ["/images/night-balm.png", "/images/gallery-balm.png"],
    sizes: ["50 ml"],
    isNew: true,
    featured: false,
    usage: "Usa como último passo à noite, apenas quando a pele pede conforto extra.",
    safetyNote: "Evita combinar na mesma noite com esfoliantes fortes."
  }
];

export const articles: Article[] = [
  {
    slug: "rotina-simples-para-aulas",
    title: "Rotina simples para manhãs de aulas",
    excerpt: "Três passos que cabem em cinco minutos: limpar, hidratar e proteger.",
    date: "2026-06-08",
    readTime: "4 min",
    image: "/images/article-school-routine.png",
    topics: ["Rotina", "SPF", "Hidratação"],
    body: [
      "Uma rotina adolescente deve ser consistente antes de ser extensa. Começa por uma limpeza suave, segue com hidratante e termina com protetor solar.",
      "Se tens borbulhas, acrescenta um cuidado pontual apenas onde precisas. Evita misturar muitos ativos ao mesmo tempo.",
      "O melhor produto é aquele que consegues usar sem stress todos os dias."
    ]
  },
  {
    slug: "niacinamida-sem-confusao",
    title: "Niacinamida sem confusão",
    excerpt: "O que faz, quando usar e como evitar uma rotina demasiado carregada.",
    date: "2026-05-29",
    readTime: "5 min",
    image: "/images/article-niacinamide.png",
    topics: ["Ingredientes", "Oleosidade"],
    body: [
      "A niacinamida ajuda a equilibrar brilho, vermelhidão e aparência dos poros. Em peles jovens, concentrações moderadas costumam ser mais confortáveis.",
      "Usa uma vez por dia no início e observa a pele durante uma semana.",
      "Se houver ardor persistente, pausa e simplifica a rotina."
    ]
  },
  {
    slug: "barreira-cutanea",
    title: "Como perceber se a barreira da pele está cansada",
    excerpt: "Repuxar, ardor e vermelhidão podem ser sinais de excesso de passos.",
    date: "2026-05-16",
    readTime: "6 min",
    image: "/images/article-barrier.png",
    topics: ["Barreira", "Pele sensível"],
    body: [
      "A barreira cutânea protege a pele. Quando fica fragilizada, a pele pode arder com produtos que antes tolerava bem.",
      "Durante alguns dias, volta ao básico: limpeza suave, hidratante e SPF de manhã.",
      "Se a irritação for intensa, fala com um adulto e procura aconselhamento profissional."
    ]
  }
];

export const reviews: Review[] = [
  {
    id: "r-1",
    name: "Marta, 16",
    rating: 5,
    quote: "O SPF não deixa a minha pele brilhante e já não salto esse passo antes da escola.",
    product: "Sunny SPF 50"
  },
  {
    id: "r-2",
    name: "Dinis, 15",
    rating: 5,
    quote: "O gel limpa sem aquela sensação de pele a esticar. Fiquei fã.",
    product: "Cloud Gel Cleanser"
  },
  {
    id: "r-3",
    name: "Lia, 17",
    rating: 4,
    quote: "A minha pele ficou mais calma quando parei de usar dez coisas e segui a rotina recomendada.",
    product: "Barrier Cream"
  }
];

export const ingredientHighlights = [
  {
    name: "Vitamina C",
    benefit: "Ilumina",
    description: "Ajuda a uniformizar o aspeto da pele e dá um glow subtil.",
    icon: "sun"
  },
  {
    name: "Niacinamida",
    benefit: "Equilibra",
    description: "Apoia a barreira e ajuda a controlar brilho sem secar.",
    icon: "droplet"
  },
  {
    name: "Ceramidas",
    benefit: "Reforçam",
    description: "Mantêm a pele confortável, especialmente quando está sensibilizada.",
    icon: "shield"
  }
];

export const skinQuizQuestions = [
  {
    id: "oil",
    question: "Ao fim do dia, a tua pele costuma estar...",
    options: [
      { label: "Muito brilhante", value: "oleosa" },
      { label: "Brilhante só na zona T", value: "mista" },
      { label: "Confortável", value: "normal" },
      { label: "A repuxar", value: "seca" }
    ]
  },
  {
    id: "sensitivity",
    question: "Quando experimentas produtos novos, a tua pele...",
    options: [
      { label: "Arde facilmente", value: "sensivel" },
      { label: "Às vezes fica vermelha", value: "mista" },
      { label: "Tolera bem", value: "normal" }
    ]
  },
  {
    id: "acne",
    question: "As borbulhas aparecem...",
    options: [
      { label: "Com frequência", value: "oleosa" },
      { label: "Em fases de stress", value: "mista" },
      { label: "Raramente", value: "normal" }
    ]
  },
  {
    id: "afterWash",
    question: "Depois de lavar o rosto, sentes...",
    options: [
      { label: "Repuxar", value: "seca" },
      { label: "Conforto", value: "normal" },
      { label: "Vermelhidão", value: "sensivel" }
    ]
  },
  {
    id: "tone",
    question: "A tua pele parece mais...",
    options: [
      { label: "Opaca", value: "seca" },
      { label: "Brilhante", value: "oleosa" },
      { label: "Irregular", value: "mista" },
      { label: "Reativa", value: "sensivel" }
    ]
  }
];

export const routines = {
  morning: [
    "Limpeza suave",
    "Hidratante leve",
    "Protetor solar SPF 50",
    "Reaplicar SPF quando houver sol direto"
  ],
  evening: [
    "Limpeza para remover SPF",
    "Tratamento pontual se necessário",
    "Creme reparador",
    "Pausa de ativos se a pele estiver irritada"
  ]
};

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedProducts(product: Product) {
  return products
    .filter((item) => item.slug !== product.slug)
    .filter(
      (item) =>
        item.category === product.category ||
        item.skinTypes.some((skinType) => product.skinTypes.includes(skinType))
    )
    .slice(0, 4);
}
