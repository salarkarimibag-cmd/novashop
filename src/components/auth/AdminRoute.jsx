"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import ProtectedRoute from "./ProtectedRoute";
import PageLoader from "@/components/common/PageLoader";
import useAuthStore from "@/store/authStore";

// چک نقش را از ProtectedRoute جدا نگه می‌داریم به‌جای اضافه‌کردنِ یک
// prop مثل requireAdmin به خودش: ProtectedRoute همه‌جای برنامه برای
// «فقط لاگین لازم است» استفاده می‌شود، و دست‌کاری‌اش برای یک نیازِ
// خاص ریسک رگرسیون در همه‌ی آن صفحات را دارد. ترکیب دو گارد کوچک،
// دقیقاً همان ایده‌ی authMiddleware + adminMiddleware در بک‌اند است:
// اول «کیست؟»، بعد «اجازه دارد؟» — دو تصمیم جدا، دو جای جدا.
function AdminGate({ children }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "admin";

  // ProtectedRoute تا اینجا رسیدن یعنی already کاربر لاگین است، پس
  // user اینجا هرگز null نیست — فقط role اش باید چک شود
  useEffect(() => {
    if (!isAdmin) {
      router.replace("/");
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return (
      <PageLoader
        title="عدم دسترسی"
        message="شما اجازه‌ی دسترسی به این بخش را ندارید. در حال انتقال..."
      />
    );
  }

  return children;
}

export default function AdminRoute({ children }) {
  return (
    <ProtectedRoute>
      <AdminGate>{children}</AdminGate>
    </ProtectedRoute>
  );
}
