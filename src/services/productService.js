const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(filters = {}) {
  // فقط برای تست Skeleton
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.brand?.length) {
    params.set("brand", filters.brand.join(","));
  }

  if (filters.category?.length) {
    params.set("category", filters.category.join(","));
  }

  if (filters.minPrice != null) {
    params.set("minPrice", filters.minPrice);
  }

  if (filters.maxPrice != null) {
    params.set("maxPrice", filters.maxPrice);
  }

  if (filters.sort) {
    params.set("sort", filters.sort);
  }

  const response = await fetch(`${API_URL}/api/products?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت محصولات");
  }

  return response.json();
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("محصول پیدا نشد");
  }

  const data = await response.json();

  return data.product;
}
