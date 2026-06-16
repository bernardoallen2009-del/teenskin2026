import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().email().max(160),
  password: z.string().min(8).max(120)
});

export async function POST(request: Request) {
  const payload = registerSchema.safeParse(await request.json().catch(() => null));

  if (!payload.success) {
    return NextResponse.json({ message: "Preenche nome, email e password com pelo menos 8 caracteres." }, { status: 400 });
  }

  return NextResponse.json(
    {
      token: `demo-${crypto.randomUUID()}`,
      user: {
        name: payload.data.name,
        email: payload.data.email.toLowerCase()
      }
    },
    { status: 201 }
  );
}

