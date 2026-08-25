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
import AddressNavItem from "./AddressNavItem";
import SearchDropdown from "./SearchDropdown";
import useSearchProducts from "@/hooks/useSearchProducts";
import { useHydration } from "@/components/providers/HydrationProvider";
import useAuthStore from "@/store/authStore";

export default function SearchBox() {
  const router = useRouter();

  const hydrated = useHydration();

  const user = useAuthStore((state) => state.user);

  const searchRef = useRef(null);

  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const { results: searchResults, loading: searching } =
    useSearchProducts(debouncedQuery);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);

      setOpen(false);
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
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
              dark:bg-gray-800
            "
            >
              <Search size={20} className="text-gray-500 dark:text-gray-400" />

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
                  text-gray-900
                  outline-none
                  dark:text-gray-100
                "
              />
            </div>
          </form>

          {open && (
            <SearchDropdown
              products={searchResults}
              loading={searching}
              query={query}
              onSelect={() => {
                setQuery("");

                setOpen(false);
              }}
            />
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <AddressNavItem />
          </div>

          {hydrated && (
            <Link
              href={user ? "/account" : "/login"}
              className="
              rounded-lg
              border
              border-gray-300
              p-2
              text-gray-700
              transition
              hover:bg-gray-100
              dark:border-gray-700
              dark:text-gray-200
              dark:hover:bg-gray-800
              "
            >
              <User size={20} />
            </Link>
          )}

          <WishlistButton />

          <CartButton />
        </div>
      </Container>
    </div>
  );
}
