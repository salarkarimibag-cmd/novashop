"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function AccountLayout({ children }) {
  return (
    <main
      className="
      min-h-screen
      bg-gray-50
      px-4
      py-10
    "
    >
      <div
        className="
        mx-auto
        grid
        max-w-7xl
        gap-6
        lg:grid-cols-4
      "
      >
        <aside>
          <DashboardSidebar />
        </aside>

        <section
          className="
          rounded-2xl
          bg-white
          p-6
          shadow-sm
          lg:col-span-3
        "
        >
          {children}
        </section>
      </div>
    </main>
  );
}
