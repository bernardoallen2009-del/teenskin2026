import { NextResponse } from "next/server";
import { z } from "zod";

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

export async function POST(request: Request) {
  const payload = checkoutSchema.safeParse(await request.json().catch(() => null));

  if (!payload.success) {
    return NextResponse.json({ message: "Carrinho invalido." }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message: "Checkout preparado. Configura Stripe para aceitar pagamentos reais.",
    receivedItems: payload.data.items
  });
}

