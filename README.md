# TeensSkin

Website profissional de cuidados de pele para adolescentes, implementado a partir do PDF de especificações. O projeto combina Next.js, React, TypeScript, API Node/Express, Prisma preparado para PostgreSQL, dados estáticos iniciais, autenticação JWT, carrinho local e checkout Stripe preparado para produção.

## Funcionalidades

- Home com hero slider, grelha de categorias, carrosséis de produtos, destaque em duas colunas, ingredientes, storytelling, reviews e newsletter.
- Produtos com filtros por pesquisa, categoria, tipo de pele, ingrediente, preço, rating e ordenação.
- Detalhe de produto com galeria 360 por slider, thumbnails, variantes, avaliações locais e produtos relacionados.
- Quiz de pele com barra de progresso, resultado e recomendações guardáveis no perfil local.
- Carrinho com quantidades, subtotal, portes dinâmicos, código `GLOW10` e checkout preparado.
- Páginas Sobre, Descobrir/blog, artigo, Perfil e Privacidade/RGPD.
- API REST com Helmet, CORS controlado, rate limiting, validação Zod, auth JWT, carrinho, encomendas, newsletter e Stripe.
- SEO com metadata, OpenGraph, `sitemap.xml`, `robots.txt`, HTML semântico e breadcrumbs.

## Stack

- Front-end: Next.js 16, React 19, TypeScript, CSS Modules, Framer Motion, Lucide Icons.
- Back-end: Node.js, Express 5, TypeScript, Zod, Helmet, express-rate-limit, JWT, bcryptjs.
- Dados: catálogo estático em TypeScript, JSONs iniciais em `server/data`, schema Prisma em `server/prisma/schema.prisma`.
- Pagamentos: Stripe preparado, inativo até configurar variáveis reais.

## Instalação

```bash
npm install
cp .env.example .env
npm run dev
```

O site fica em `http://localhost:3000` e a API em `http://localhost:4000`.

Se o `next dev` mostrar `EMFILE: too many open files` no macOS, aumenta o limite de ficheiros abertos no terminal ou usa a versão compilada local:

```bash
npm run build
npm run start:api
npm run start:web
```

## Scripts

- `npm run dev`: inicia API e web em simultâneo.
- `npm run dev:web`: inicia apenas Next.js.
- `npm run dev:api`: inicia apenas Express com watch.
- `npm run build`: compila web e API.
- `npm run start:web`: serve a build do Next.js.
- `npm run start:api`: serve a API compilada.
- `npm run typecheck`: valida TypeScript front-end e back-end.
- `npm run lint`: valida ESLint.

## Variáveis

Ver `.env.example`.

- `PORT`: porta da API.
- `CLIENT_ORIGIN`: origem permitida por CORS.
- `NEXT_PUBLIC_API_URL`: URL pública da API usada pelo browser.
- `JWT_SECRET`: segredo para assinar tokens.
- `DATABASE_URL`: URL PostgreSQL para Prisma.
- `STRIPE_SECRET_KEY` e `STRIPE_PRICE_ID`: ativam checkout real.

## Arquitetura

- `src/app`: rotas App Router, metadata e páginas.
- `src/components`: componentes visuais e interativos.
- `src/data/catalog.ts`: produtos, categorias, artigos, reviews, ingredientes e quiz.
- `src/lib`: chamadas API, formatação e i18n base.
- `src/styles/site.module.css`: CSS Module principal.
- `server`: API Express, middleware, rotas, Prisma e dados JSON.
- `public/images`: assets bitmap locais gerados para o layout.
- `docs/COMPONENTS.md`: guia dos componentes e funções principais.

## Segurança e RGPD

- Next remove `poweredByHeader` e define headers de segurança.
- Express usa Helmet, limite de JSON, CORS por origem, rate limits globais e rate limit específico para auth.
- Inputs são validados com Zod antes de processar.
- Passwords são hashed com bcryptjs.
- Tokens JWT expiram em 7 dias.
- O banner de cookies explica armazenamento local de carrinho, favoritos, sessão e quiz.
- A página Privacidade explica dados locais e apagamento.
- Para produção, usa HTTPS no domínio final, roda `JWT_SECRET`, liga logs seguros e guarda dados pessoais numa base de dados com políticas de retenção.

## Trocar JSON/dados estáticos por base de dados

1. Configura `DATABASE_URL`.
2. Ajusta `server/prisma/schema.prisma` se precisares de novos campos.
3. Corre `npx prisma migrate dev`.
4. Substitui imports de `src/data/catalog.ts` nas rotas por consultas Prisma.
5. Move carrinhos, encomendas e reviews locais para tabelas persistentes.

## Ativar Stripe

1. Cria produtos/preços no Stripe.
2. Define `STRIPE_SECRET_KEY` e `STRIPE_PRICE_ID`.
3. Atualiza `server/routes/checkout.ts` para mapear cada produto para o preço Stripe correto.
4. Configura webhooks para marcar encomendas como pagas.
5. Usa apenas HTTPS em produção.

## Testes recomendados

- Unitários: Jest ou Vitest para `formatPrice`, filtros de produtos, cálculo de carrinho e resultado do quiz.
- Componentes: React Testing Library para ProductCard, ProductExplorer, SkinQuiz e CartView.
- E2E: Cypress ou Playwright para fluxo produto → carrinho → checkout, quiz → recomendação e auth → perfil.
- Acessibilidade: axe-core em páginas principais e navegação por teclado.

## Deploy

Front-end: Vercel é a opção natural para Next.js. Define `NEXT_PUBLIC_API_URL` para a URL pública da API.

Back-end: Render, Fly.io, Railway ou VPS Node. Define `CLIENT_ORIGIN`, `JWT_SECRET`, `DATABASE_URL` e Stripe. Coloca a API atrás de HTTPS.

Para uma arquitetura unificada, podes expor a API Express como serviço separado e manter o front-end estático/SSR na Vercel.
