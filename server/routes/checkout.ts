import { Router } from "express";
import { z } from "zod";

const router = Router();

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        slug: z.string().min(1),
        quantity: z.number().int().min(1).max(20)
      })
    )
    .min(1)
});

router.post("/checkout", async (request, response) => {
  const payload = checkoutSchema.parse(request.body);
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  // Keep local development safe: return a clear setup message until real Stripe credentials exist.
  if (!secretKey || !priceId) {
    return response.status(501).json({
      message: "Stripe ainda nao esta configurado.",
      nextStep: "Define STRIPE_SECRET_KEY e STRIPE_PRICE_ID em producao.",
      receivedItems: payload.items
    });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(secretKey);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: payload.items.map((item) => ({
      price: priceId,
      quantity: item.quantity
    })),
    success_url: `${process.env.CLIENT_ORIGIN ?? "http://localhost:3000"}/carrinho?checkout=success`,
    cancel_url: `${process.env.CLIENT_ORIGIN ?? "http://localhost:3000"}/carrinho?checkout=cancelled`
  });

  return response.json({ url: session.url });
});

export default router;
