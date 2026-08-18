"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function AccountLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-4">
          <aside>
            <DashboardSidebar />
          </aside>

          <main className="lg:col-span-3">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
