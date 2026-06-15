import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "./errors.js";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN";
};

export type AuthenticatedRequest = Request & {
  user?: AuthUser;
};

const secret = process.env.JWT_SECRET ?? "dev-only-secret";

export function signToken(user: AuthUser) {
  return jwt.sign(user, secret, {
    expiresIn: "7d",
    issuer: "teensskin-api"
  });
}

export function requireAuth(request: AuthenticatedRequest, _response: Response, next: NextFunction) {
  const header = request.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : undefined;

  if (!token) {
    return next(new HttpError(401, "Inicia sessao para continuar."));
  }

  try {
    request.user = jwt.verify(token, secret, { issuer: "teensskin-api" }) as AuthUser;
    return next();
  } catch {
    return next(new HttpError(401, "Sessao invalida ou expirada."));
  }
}
