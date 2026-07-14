"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, User } from "lucide-react";

import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import CartButton from "@/components/cart/CartButton";
import WishlistButton from "@/components/wishlist/WishlistButton";
import SearchDropdown from "./SearchDropdown";

import products from "@/data/products";

export default function SearchBox() {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return [];

    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search),
    );
  }, [query]);

  return (
    <div className="border-b border-gray-200">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />

        <div className="relative flex-1">
          <div className="flex items-center rounded-xl bg-gray-100 px-4 transition focus-within:ring-2 focus-within:ring-indigo-500">
            <Search size={20} className="text-gray-500" />

            <input
              type="search"
              placeholder="جستجوی کالا..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent px-3 py-3 text-sm outline-none"
            />
          </div>

          <SearchDropdown
            products={filteredProducts}
            query={query}
            onSelect={() => setQuery("")}
          />
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="rounded-lg border border-gray-300 p-2 transition hover:bg-gray-100"
            aria-label="ورود"
          >
            <User size={20} />
          </Link>

          <WishlistButton />

          <CartButton />
        </div>
      </Container>
    </div>
  );
}
