export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-red-600">
          NovaShop
        </h1>

        {/* Search */}
        <div className="hidden w-full max-w-xl md:block">
          <input
            type="text"
            placeholder="جستجوی محصول..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-red-500"
          />
        </div>

        {/* User */}
        <button className="rounded-lg border px-4 py-2 hover:bg-gray-100">
          ورود
        </button>
      </div>
    </header>
  );
}