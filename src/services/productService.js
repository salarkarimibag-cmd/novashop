const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts() {
  const res = await fetch(`${API_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
}
