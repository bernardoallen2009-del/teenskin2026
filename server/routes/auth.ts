import bcrypt from "bcryptjs";
import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { z } from "zod";
import { requireAuth, signToken, type AuthenticatedRequest, type AuthUser } from "../middleware/auth.js";
import { HttpError } from "../middleware/errors.js";

type UserRecord = AuthUser & {
  passwordHash: string;
  skinProfile?: unknown;
};

const users = new Map<string, UserRecord>();
const router = Router();

const credentialsSchema = z.object({
  email: z.string().email().max(160),
  password: z.string().min(8).max(120)
});

const registerSchema = credentialsSchema.extend({
  name: z.string().trim().min(2).max(80)
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 12,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Demasiadas tentativas. Tenta novamente daqui a pouco." }
});

router.post("/auth/register", authLimiter, async (request, response, next) => {
  const payload = registerSchema.parse(request.body);
  const email = payload.email.toLowerCase();

  if (users.has(email)) {
    return next(new HttpError(409, "Ja existe uma conta com este email."));
  }

  const passwordHash = await bcrypt.hash(payload.password, 12);
  const user: UserRecord = {
    id: crypto.randomUUID(),
    name: payload.name,
    email,
    role: "CUSTOMER",
    passwordHash
  };

  users.set(email, user);

  const { passwordHash: _passwordHash, ...safeUser } = user;
  return response.status(201).json({
    token: signToken(safeUser),
    user: safeUser
  });
});

router.post("/auth/login", authLimiter, async (request, response, next) => {
  const payload = credentialsSchema.parse(request.body);
  const user = users.get(payload.email.toLowerCase());

  if (!user) {
    return next(new HttpError(401, "Credenciais invalidas."));
  }

  const isValid = await bcrypt.compare(payload.password, user.passwordHash);

  if (!isValid) {
    return next(new HttpError(401, "Credenciais invalidas."));
  }

  const { passwordHash: _passwordHash, ...safeUser } = user;
  return response.json({
    token: signToken(safeUser),
    user: safeUser
  });
});

router.get("/users/me", requireAuth, (request: AuthenticatedRequest, response) => {
  response.json({ data: request.user });
});

router.delete("/users/me", requireAuth, (request: AuthenticatedRequest, response) => {
  if (request.user?.email) {
    users.delete(request.user.email);
  }

  response.json({ ok: true, message: "Dados pessoais apagados da sessao local da API." });
});

router.put("/users/me/skin-profile", requireAuth, (request: AuthenticatedRequest, response, next) => {
  const profileSchema = z.object({
    skinType: z.enum(["oleosa", "mista", "seca", "sensivel", "normal"]),
    answers: z.record(z.string(), z.string()).optional()
  });
  const payload = profileSchema.parse(request.body);

  if (!request.user?.email) {
    return next(new HttpError(401, "Inicia sessao para guardar a recomendacao."));
  }

  const user = users.get(request.user.email);

  if (!user) {
    return next(new HttpError(404, "Utilizador nao encontrado."));
  }

  user.skinProfile = payload;
  users.set(user.email, user);

  return response.json({ ok: true, data: payload });
});

export default router;
