import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "teensskin-web",
    deploy: "vercel-ready"
  });
}

