const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getProducts(filters = {}) {
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

  if (filters.minPrice !== undefined) {
    params.set("minPrice", filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
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

  const result = await response.json();

  return {
    products: result.products || result.data || [],
  };
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("محصول پیدا نشد");
  }

  const result = await response.json();

  return result.product || result.data;
}
