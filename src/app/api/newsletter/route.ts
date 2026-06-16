import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email().max(160)
});

export async function POST(request: Request) {
  const payload = newsletterSchema.safeParse(await request.json().catch(() => null));

  if (!payload.success) {
    return NextResponse.json({ message: "Escreve um email valido." }, { status: 400 });
  }

  return NextResponse.json(
    {
      ok: true,
      message: "Subscricao recebida.",
      data: {
        email: payload.data.email.toLowerCase()
      }
    },
    { status: 202 }
  );
}

