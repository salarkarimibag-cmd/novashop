import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";

export default function SearchBox() {
  return (
    <div className="border-b border-gray-200">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-red-600">NovaShop</h1>

        {/* Search */}
        <div className="flex-1">
          <div className="flex items-center rounded-xl bg-gray-100 px-4">
            <FiSearch className="text-gray-500" size={20} />

            <input
              placeholder="جستجوی کالا..."
              type="text"
              className="w-full bg-transparent px-3 py-3 outline-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
            <FiUser />
          </button>

          <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}
