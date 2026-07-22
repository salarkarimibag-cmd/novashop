const API_URL = process.env.NEXT_PUBLIC_API_URL;

function normalizeProduct(product) {
  return {
    ...product,
    id: product._id,
  };
}

export async function getProducts() {
  const res = await fetch(`${API_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return {
    products: data.products.map(normalizeProduct),
  };
}

export async function getProductById(id) {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Product not found");
  }

  const data = await res.json();

  return {
    product: normalizeProduct(data.product),
  };
}
