# Guia de componentes e funções

## Componentes principais

- `Header`: top bar promocional, navegação desktop, menu móvel acessível, pesquisa, conta, favoritos e carrinho.
- `Footer`: navegação secundária, nota educativa e links de privacidade.
- `HeroSlider`: slider de hero com Framer Motion, indicadores e CTA.
- `CategoryGrid`: grelha de categorias com cards clicáveis e cores pastel.
- `ProductCard`: card de produto com imagem, tags, rating, favorito e adicionar ao carrinho.
- `ProductCarousel`: rail horizontal para destaques e novidades.
- `ProductHighlight`: secção de produto em duas colunas com setas, bullets e compra rápida.
- `IngredientSection`: blocos educativos para vitamina C, niacinamida e ceramidas.
- `Storytelling`: scrollytelling com imagem sticky e textos animados.
- `NewsletterBanner`: formulário validado no cliente e enviado para a API.
- `ReviewSlider`: testemunhos com estrelas.
- `ProductExplorer`: filtros, ordenação, favoritos e paginação incremental.
- `ProductDetailClient`: galeria 360, thumbnails, variante, CTA, reviews e relacionados.
- `SkinQuiz`: fluxo de perguntas, progresso, resultado e recomendações.
- `CartView`: linhas de carrinho, stepper, desconto, portes e checkout.
- `AuthPanel`: login/registo JWT e gestão de dados locais.
- `CookieConsent`: banner RGPD para consentimento e armazenamento local.
- `Breadcrumbs`: navegação contextual nas páginas internas.

## Funções partilhadas

- `formatPrice`: formata valores monetários em EUR por locale.
- `clampRating`: garante rating entre 0 e 5.
- `slugify`: cria slugs amigáveis.
- `postNewsletter`: envia subscrição para `/api/newsletter`.
- `loginProfile` e `registerProfile`: chamam endpoints de auth e devolvem token/user.
- `requestCheckout`: chama `/api/checkout` e devolve URL Stripe quando configurado.
- `getProductBySlug`, `getArticleBySlug` e `getRelatedProducts`: helpers de catálogo.

## Rotas da API

- `GET /api/health`: estado da API.
- `GET /api/categories`: categorias.
- `GET /api/products`: lista filtrável por query.
- `GET /api/products/:slug`: detalhe de produto.
- `GET /api/content/articles` e `GET /api/content/articles/:slug`: conteúdo editorial.
- `GET /api/content/ingredients`, `/api/content/reviews`, `/api/quiz/questions`, `/api/routines`: conteúdo de apoio.
- `POST /api/auth/register` e `/api/auth/login`: autenticação JWT.
- `GET /api/users/me`, `DELETE /api/users/me`, `PUT /api/users/me/skin-profile`: perfil e RGPD.
- `POST /api/cart/summary`: resumo de carrinho calculado no servidor.
- `POST /api/orders`: criação mock de encomenda autenticada.
- `POST /api/newsletter` e `/api/contact`: formulários.
- `POST /api/checkout`: Stripe Checkout quando as variáveis estão configuradas.

## Notas de implementação

- O estado de carrinho/favoritos é hidratado antes de escrever no `localStorage`, evitando apagar dados em reloads diretos.
- A API começa com dados estáticos para acelerar prototipagem, mas o schema Prisma já reflete a migração para PostgreSQL.
- As imagens são locais para garantir performance previsível e não depender de chamadas externas.
