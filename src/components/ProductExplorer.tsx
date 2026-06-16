"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/components/CartContext";
import styles from "@/styles/site.module.css";
import type { Product, ProductCategory, SkinType } from "@/types/product";

const categoryOptions: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "limpeza", label: "Limpeza" },
  { value: "hidratacao", label: "Hidratação" },
  { value: "protecao-solar", label: "Proteção solar" },
  { value: "acne", label: "Acne" },
  { value: "tratamento", label: "Tratamentos" },
  { value: "corpo", label: "Corpo" }
];

const skinOptions: { value: SkinType | "all"; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "oleosa", label: "Oleosa" },
  { value: "mista", label: "Mista" },
  { value: "seca", label: "Seca" },
  { value: "sensivel", label: "Sensível" },
  { value: "normal", label: "Normal" }
];

export function ProductExplorer({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const { favourites } = useCart();
  const initialCategory = (searchParams.get("categoria") ?? "all") as ProductCategory | "all";
  const onlyFavourites = searchParams.get("favoritos") === "1";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">(initialCategory);
  const [skinType, setSkinType] = useState<SkinType | "all">("all");
  const [ingredient, setIngredient] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("0");
  const [sort, setSort] = useState("popularidade");
  const [visibleCount, setVisibleCount] = useState(8);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const ingredients = useMemo(() => {
    return Array.from(new Set(products.flatMap((product) => product.ingredients))).sort();
  }, [products]);

  const filtered = useMemo(() => {
    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || Number.POSITIVE_INFINITY;
    const rating = Number(minRating);
    const search = query.trim().toLowerCase();

    return products
      .filter((product) => (onlyFavourites ? favourites.includes(product.slug) : true))
      .filter((product) => (category === "all" ? true : product.category === category))
      .filter((product) => (skinType === "all" ? true : product.skinTypes.includes(skinType)))
      .filter((product) => (ingredient === "all" ? true : product.ingredients.includes(ingredient)))
      .filter((product) => product.price >= min && product.price <= max)
      .filter((product) => product.rating >= rating)
      .filter((product) =>
        search
          ? product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search) ||
            product.concerns.some((concern) => concern.toLowerCase().includes(search))
          : true
      )
      .sort((a, b) => {
        if (sort === "preco-asc") return a.price - b.price;
        if (sort === "preco-desc") return b.price - a.price;
        if (sort === "novos") return Number(b.isNew) - Number(a.isNew);
        if (sort === "rating") return b.rating - a.rating;
        return b.popularity - a.popularity;
      });
  }, [category, favourites, ingredient, maxPrice, minPrice, minRating, onlyFavourites, products, query, skinType, sort]);

  const visibleProducts = filtered.slice(0, visibleCount);

  return (
    <div className={styles.filtersLayout}>
      <div className={styles.mobileFilterBar}>
        <button className={styles.secondaryButton} type="button" onClick={() => setFiltersOpen(true)}>
          <SlidersHorizontal size={18} aria-hidden="true" />
          Filtros
        </button>
        <span className={styles.muted}>
          {filtered.length} produto{filtered.length === 1 ? "" : "s"}
        </span>
      </div>
      <button
        className={`${styles.overlay} ${filtersOpen ? styles.overlayOpen : ""}`}
        type="button"
        aria-label="Fechar filtros"
        onClick={() => setFiltersOpen(false)}
      />
      <aside className={`${styles.filterPanel} ${filtersOpen ? styles.filterPanelOpen : ""}`} aria-label="Filtros de produto">
        <button className={`${styles.iconButton} ${styles.filterClose}`} type="button" aria-label="Fechar filtros" onClick={() => setFiltersOpen(false)}>
          <X size={18} aria-hidden="true" />
        </button>
        <div className={styles.authMeta}>
          <SlidersHorizontal size={18} aria-hidden="true" />
          <strong>Filtros</strong>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="product-search">Pesquisar</label>
          <input
            className={styles.input}
            id="product-search"
            type="search"
            value={query}
            placeholder="Nome, ingrediente ou preocupação"
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="category">Categoria</label>
          <select
            className={styles.select}
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value as ProductCategory | "all")}
          >
            {categoryOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="skin-type">Tipo de pele</label>
          <select
            className={styles.select}
            id="skin-type"
            value={skinType}
            onChange={(event) => setSkinType(event.target.value as SkinType | "all")}
          >
            {skinOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="ingredient">Ingrediente</label>
          <select className={styles.select} id="ingredient" value={ingredient} onChange={(event) => setIngredient(event.target.value)}>
            <option value="all">Todos</option>
            {ingredients.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label>Preço</label>
          <div className={styles.rangeGrid}>
            <input
              className={styles.input}
              inputMode="decimal"
              placeholder="Mín."
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              aria-label="Preço mínimo"
            />
            <input
              className={styles.input}
              inputMode="decimal"
              placeholder="Máx."
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              aria-label="Preço máximo"
            />
          </div>
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="rating">Classificação mínima</label>
          <select className={styles.select} id="rating" value={minRating} onChange={(event) => setMinRating(event.target.value)}>
            <option value="0">Todas</option>
            <option value="4">4+ estrelas</option>
            <option value="4.5">4.5+ estrelas</option>
          </select>
        </div>
      </aside>
      <div>
        <div className={styles.toolbar}>
          <p className={styles.muted}>
            {filtered.length} produto{filtered.length === 1 ? "" : "s"} encontrado{filtered.length === 1 ? "" : "s"}
          </p>
          <label className={styles.filterGroup}>
            <span>Ordenar</span>
            <select className={styles.select} value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="popularidade">Popularidade</option>
              <option value="preco-asc">Preço: baixo para alto</option>
              <option value="preco-desc">Preço: alto para baixo</option>
              <option value="novos">Novos</option>
              <option value="rating">Classificação</option>
            </select>
          </label>
        </div>
        {visibleProducts.length > 0 ? (
          <div className={styles.productGrid}>
            {visibleProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2>Nenhum produto encontrado</h2>
            <p className={styles.muted}>Experimenta limpar filtros ou fazer o quiz para descobrir uma rotina.</p>
          </div>
        )}
        {visibleCount < filtered.length ? (
          <div className={styles.buttonRow}>
            <button className={styles.secondaryButton} type="button" onClick={() => setVisibleCount((count) => count + 4)}>
              Carregar mais
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
