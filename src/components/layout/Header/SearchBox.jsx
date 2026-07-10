
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import CartButton from "@/components/cart/CartButton";
import { Search, User } from "lucide-react";
export default function SearchBox() {
  return (
    <div className="border-b border-gray-200">
      <Container className="flex h-18 items-center justify-between gap-6">
        {/* Logo */}
        <Logo />

        {/* Search */}
        <div className="flex-1">
          <div className="flex items-center rounded-xl bg-gray-100 px-4">
            <Search className="text-gray-500" size={20} />

            <input
              type="text"
              placeholder="جستجوی کالا..."
              className="w-full bg-transparent px-3 py-3 outline-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            className="rounded-lg border border-gray-300 p-2 transition hover:bg-gray-100"
            aria-label="ورود"
          >
            <User size={20} />
          </button>

          <CartButton />
        </div>
      </Container>
    </div>
  );
}
