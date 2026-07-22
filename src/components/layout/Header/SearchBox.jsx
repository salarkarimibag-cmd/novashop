"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, User } from "lucide-react";
import { useRouter } from "next/navigation";

import useDebounce from "@/hooks/useDebounce";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import CartButton from "@/components/cart/CartButton";
import WishlistButton from "@/components/wishlist/WishlistButton";
import SearchDropdown from "./SearchDropdown";
import useFilterStore from "@/store/filterStore";
import useSearchProducts from "@/hooks/useSearchProducts";

export default function SearchBox() {
  const router = useRouter();

  const searchRef = useRef(null);

  const searchQuery = useFilterStore((state) => state.searchQuery);

  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);

  const [query, setQuery] = useState(searchQuery);

  const [open, setOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const filteredProducts = useSearchProducts(debouncedQuery);

  // Sync with FilterStore

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  // Close dropdown outside

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (value) => {
    setQuery(value);

    setOpen(Boolean(value.trim()));

    if (!value.trim()) {
      setSearchQuery("");

      router.push("/products");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);

      setOpen(false);
    }
  };

  return (
    <div className="border-b border-gray-200">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />

        <div ref={searchRef} className="relative flex-1">
          <form onSubmit={handleSubmit}>
            <div
              className="
              flex
              items-center
              rounded-xl
              bg-gray-100
              px-4
              transition
              focus-within:ring-2
              focus-within:ring-indigo-500
            "
            >
              <Search size={20} className="text-gray-500" />

              <input
                type="search"
                placeholder="جستجوی کالا..."
                value={query}
                onFocus={() => {
                  if (query.trim()) {
                    setOpen(true);
                  }
                }}
                onChange={(e) => handleSearch(e.target.value)}
                className="
                  w-full
                  bg-transparent
                  px-3
                  py-3
                  text-sm
                  outline-none
                "
              />
            </div>
          </form>

          {open && (
            <SearchDropdown
              products={filteredProducts}
              query={query}
              onSelect={() => {
                setQuery("");

                setSearchQuery("");

                setOpen(false);
              }}
            />
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="
            rounded-lg
            border
            border-gray-300
            p-2
            transition
            hover:bg-gray-100
            "
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
