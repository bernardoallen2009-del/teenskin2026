import { Router } from "express";
import { z } from "zod";
import { products } from "../../src/data/catalog.js";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth.js";
import { HttpError } from "../middleware/errors.js";

const router = Router();

const cartItemSchema = z.object({
  slug: z.string().min(1),
  quantity: z.number().int().min(1).max(20)
});

const cartSchema = z.object({
  items: z.array(cartItemSchema).max(30),
  discountCode: z.string().trim().max(40).optional()
});

function calculateCart(payload: z.infer<typeof cartSchema>) {
  const lines = payload.items.map((item) => {
    const product = products.find((entry) => entry.slug === item.slug);

    if (!product) {
      throw new HttpError(404, `Produto desconhecido: ${item.slug}`);
    }

    return {
      product,
      quantity: item.quantity,
      subtotal: Number((product.price * item.quantity).toFixed(2))
    };
  });

  const subtotal = Number(lines.reduce((sum, line) => sum + line.subtotal, 0).toFixed(2));
  const discount = payload.discountCode?.toUpperCase() === "GLOW10" ? Number((subtotal * 0.1).toFixed(2)) : 0;
  const shipping = subtotal - discount >= 35 || subtotal === 0 ? 0 : 3.95;
  const total = Number((subtotal - discount + shipping).toFixed(2));

  return {
    lines,
    subtotal,
    discount,
    shipping,
    total
  };
}

router.post("/cart/summary", (request, response) => {
  const payload = cartSchema.parse(request.body);
  response.json({ data: calculateCart(payload) });
});

router.post("/orders", requireAuth, (request: AuthenticatedRequest, response) => {
  const payload = cartSchema.parse(request.body);
  const summary = calculateCart(payload);

  response.status(201).json({
    data: {
      id: crypto.randomUUID(),
      user: request.user?.email,
      status: "PENDING",
      summary,
      createdAt: new Date().toISOString()
    }
  });
});

export default router;
