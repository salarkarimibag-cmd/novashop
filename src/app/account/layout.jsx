"use client";

import { RouteGuard } from "@/components/auth";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function AccountLayout({ children }) {
  return (
    <RouteGuard>
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-4">
          <aside>
            <DashboardSidebar />
          </aside>

          <main className="lg:col-span-3">{children}</main>
        </div>
      </div>
    </RouteGuard>
  );
}
