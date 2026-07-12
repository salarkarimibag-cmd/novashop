import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import CartButton from "@/components/cart/CartButton";
import Link from "next/link";
import { Search, User } from "lucide-react";
import WishlistButton from "@/components/wishlist/WishlistButton";
export default function SearchBox() {
  return (
    <div className="border-b border-gray-200">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />

        <div className="flex-1">
          <div className="flex items-center rounded-xl bg-gray-100 px-4 transition focus-within:ring-2 focus-within:ring-blue-500">
            <Search className="text-gray-500" size={20} />

            <input
              type="search"
              placeholder="جستجوی کالا..."
              className="w-full bg-transparent px-3 py-3 text-sm outline-none"
            />
          </div>
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
