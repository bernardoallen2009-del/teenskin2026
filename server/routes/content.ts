import { Router } from "express";
import {
  articles,
  getArticleBySlug,
  ingredientHighlights,
  reviews,
  routines,
  skinQuizQuestions
} from "../../src/data/catalog.js";
import { HttpError } from "../middleware/errors.js";

const router = Router();

router.get("/content/articles", (_request, response) => {
  response.json({ data: articles });
});

router.get("/content/articles/:slug", (request, response, next) => {
  const article = getArticleBySlug(request.params.slug);

  if (!article) {
    return next(new HttpError(404, "Artigo nao encontrado."));
  }

  return response.json({ data: article });
});

router.get("/content/ingredients", (_request, response) => {
  response.json({ data: ingredientHighlights });
});

router.get("/content/reviews", (_request, response) => {
  response.json({ data: reviews });
});

router.get("/quiz/questions", (_request, response) => {
  response.json({ data: skinQuizQuestions });
});

router.get("/routines", (_request, response) => {
  response.json({ data: routines });
});

export default router;
