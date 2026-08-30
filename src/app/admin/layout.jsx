"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import AdminRoute from "@/components/auth/AdminRoute";

const NAV_ITEMS = [
  { href: "/admin/products", label: "محصولات" },
  { href: "/admin/users", label: "کاربران" },
];

// فعال بودن یک تب با startsWith چک می‌شود، نه تساوی دقیق، چون
// زیرمسیرهایی مثل /admin/products/new و /admin/products/:id/edit هم
// باید تب «محصولات» را فعال نگه دارند
function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-6 flex gap-2 border-b border-gray-200 dark:border-gray-800">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`border-b-2 px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

// همه‌چیز زیر /admin از اینجا رد می‌شود، پس گارد نقش فقط یک‌بار و
// همین‌جا نوشته می‌شود، نه در تک‌تک صفحه‌های /admin/products،
// /admin/products/new و... . این ناحیه کاملاً جدا از /account است؛
// AccountLayout (که فقط ProtectedRoute دارد، بدون چک نقش) دست‌نخورده
// می‌ماند.
export default function AdminLayout({ children }) {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
        <div className="mx-auto max-w-6xl">
          <AdminNav />

          {children}
        </div>
      </div>
    </AdminRoute>
  );
}
