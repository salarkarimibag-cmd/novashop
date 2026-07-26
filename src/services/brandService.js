const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBrands() {
  const response = await fetch(`${API_URL}/api/products/brands`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت برندها");
  }

  return response.json();
}
