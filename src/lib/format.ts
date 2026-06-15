export function formatPrice(value: number, locale = "pt-PT", currency = "EUR") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  }).format(value);
}

export function clampRating(rating: number) {
  return Math.min(5, Math.max(0, rating));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
