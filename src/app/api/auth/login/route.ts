import { NextResponse } from "next/server";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email().max(160),
  password: z.string().min(8).max(120)
});

export async function POST(request: Request) {
  const payload = credentialsSchema.safeParse(await request.json().catch(() => null));

  if (!payload.success) {
    return NextResponse.json({ message: "Confirma o email e a password." }, { status: 400 });
  }

  const email = payload.data.email.toLowerCase();
  const name = email
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return NextResponse.json({
    token: `demo-${crypto.randomUUID()}`,
    user: {
      name: name || "TeensSkin",
      email
    }
  });
}

