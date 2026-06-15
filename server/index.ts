import "dotenv/config";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cart.js";
import checkoutRoutes from "./routes/checkout.js";
import contentRoutes from "./routes/content.js";
import newsletterRoutes from "./routes/newsletter.js";
import productRoutes from "./routes/products.js";
import { errorHandler, notFound } from "./middleware/errors.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const clientOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:3000";

app.disable("x-powered-by");

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || origin === clientOrigin) {
        callback(null, true);
        return;
      }

      callback(new Error("Origem nao permitida por CORS."));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json({ limit: "24kb" }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 180,
    standardHeaders: "draft-8",
    legacyHeaders: false
  })
);

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    service: "teensskin-api",
    time: new Date().toISOString()
  });
});

app.use("/api", productRoutes);
app.use("/api", contentRoutes);
app.use("/api", authRoutes);
app.use("/api", cartRoutes);
app.use("/api", checkoutRoutes);
app.use("/api", newsletterRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`TeensSkin API pronta em http://localhost:${port}`);
});
