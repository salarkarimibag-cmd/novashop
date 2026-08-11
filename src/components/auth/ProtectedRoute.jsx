"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import PageLoader from "@/components/common/PageLoader";
import useAuthStore from "@/store/authStore";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <PageLoader
        title="در حال بررسی حساب کاربری"
        message="لطفاً چند لحظه صبر کنید..."
      />
    );
  }

  if (!user) {
    return (
      <PageLoader
        title="در حال انتقال"
        message="در حال انتقال به صفحه ورود..."
      />
    );
  }

  return children;
}
