import { Router } from "express";
import { z } from "zod";

const router = Router();

const newsletterSchema = z.object({
  email: z.string().email().max(160),
  consent: z.boolean().optional()
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().email().max(160),
  message: z.string().trim().min(10).max(1200)
});

router.post("/newsletter", (request, response) => {
  const payload = newsletterSchema.parse(request.body);

  response.status(202).json({
    ok: true,
    message: "Subscricao recebida. Em producao, liga este endpoint ao Mailchimp ou similar.",
    data: {
      email: payload.email.toLowerCase()
    }
  });
});

router.post("/contact", (request, response) => {
  const payload = contactSchema.parse(request.body);

  response.status(202).json({
    ok: true,
    message: "Mensagem recebida.",
    data: {
      name: payload.name,
      email: payload.email.toLowerCase()
    }
  });
});

export default router;
