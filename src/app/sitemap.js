import { SITE_URL } from "@/constants/site";
import { getProducts } from "@/services/productService";

const STATIC_ROUTES = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/products", changeFrequency: "daily", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
];

export default async function sitemap() {
  const staticEntries = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));

  // فهرست محصولات فرعی است؛ خطای دریافتش نباید کل sitemap را از کار بیندازد
  const { products } = await getProducts({ limit: 1000 }).catch(() => ({
    products: [],
  }));

  const productEntries = products.map((product) => ({
    url: `${SITE_URL}/products/${product._id}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries];
}
