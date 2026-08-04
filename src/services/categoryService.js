const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories() {
  const response = await fetch(`${API_URL}/api/products/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت دسته‌بندی‌ها");
  }

  const data = await response.json();

  return data.categories || data.data || [];
}
