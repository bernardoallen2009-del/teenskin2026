const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function postNewsletter(email: string) {
  const response = await fetch(`${API_URL}/api/newsletter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message ?? "Nao foi possivel subscrever.");
  }

  return response.json() as Promise<{ ok: true; message: string }>;
}

export async function loginProfile(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message ?? "Nao foi possivel iniciar sessao.");
  }

  return response.json() as Promise<{ token: string; user: { name: string; email: string } }>;
}

export async function registerProfile(name: string, email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message ?? "Nao foi possivel criar conta.");
  }

  return response.json() as Promise<{ token: string; user: { name: string; email: string } }>;
}

export async function requestCheckout(items: { slug: string; quantity: number }[]) {
  const response = await fetch(`${API_URL}/api/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ items })
  });

  const payload = (await response.json().catch(() => null)) as { url?: string; message?: string } | null;

  if (!response.ok) {
    throw new Error(payload?.message ?? "Checkout indisponivel.");
  }

  return payload;
}
