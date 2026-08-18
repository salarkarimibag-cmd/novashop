"use client";

import AdminRoute from "@/components/auth/AdminRoute";

// همه‌چیز زیر /admin از اینجا رد می‌شود، پس گارد نقش فقط یک‌بار و
// همین‌جا نوشته می‌شود، نه در تک‌تک صفحه‌های /admin/products،
// /admin/products/new و... . این ناحیه کاملاً جدا از /account است؛
// AccountLayout (که فقط ProtectedRoute دارد، بدون چک نقش) دست‌نخورده
// می‌ماند.
export default function AdminLayout({ children }) {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>
    </AdminRoute>
  );
}
