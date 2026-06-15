import { Router } from "express";
import { z } from "zod";
import { categories, getProductBySlug, products } from "../../src/data/catalog.js";
import type { ProductCategory, SkinType } from "../../src/types/product.js";
import { HttpError } from "../middleware/errors.js";

const router = Router();

const querySchema = z.object({
  skinType: z
    .enum(["oleosa", "mista", "seca", "sensivel", "normal"])
    .optional(),
  category: z
    .enum(["limpeza", "hidratacao", "protecao-solar", "acne", "corpo", "tratamento"])
    .optional(),
  ingredient: z.string().trim().min(1).optional(),
  q: z.string().trim().min(1).optional(),
  sort: z.enum(["popularidade", "preco-asc", "preco-desc", "novos", "rating"]).optional()
});

router.get("/categories", (_request, response) => {
  response.json({ data: categories });
});

router.get("/products", (request, response) => {
  const query = querySchema.parse(request.query);
  let result = [...products];

  if (query.skinType) {
    result = result.filter((product) => product.skinTypes.includes(query.skinType as SkinType));
  }

  if (query.category) {
    result = result.filter((product) => product.category === (query.category as ProductCategory));
  }

  if (query.ingredient) {
    const ingredient = query.ingredient.toLowerCase();
    result = result.filter((product) =>
      product.ingredients.some((item) => item.toLowerCase().includes(ingredient))
    );
  }

  if (query.q) {
    const search = query.q.toLowerCase();
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.concerns.some((concern) => concern.toLowerCase().includes(search))
    );
  }

  if (query.sort === "preco-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (query.sort === "preco-desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (query.sort === "novos") {
    result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
  } else if (query.sort === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else {
    result.sort((a, b) => b.popularity - a.popularity);
  }

  response.json({
    data: result,
    total: result.length
  });
});

router.get("/products/:slug", (request, response, next) => {
  const product = getProductBySlug(request.params.slug);

  if (!product) {
    return next(new HttpError(404, "Produto nao encontrado."));
  }

  return response.json({ data: product });
});

export default router;
