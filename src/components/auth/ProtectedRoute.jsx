"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import PageLoader from "@/components/common/PageLoader";
import useAuthStore from "@/store/authStore";

function LoadingScreen({ text = "در حال بررسی حساب کاربری..." }) {
  return (
    <div className="flex min-h-75 flex-col items-center justify-center gap-4">
      <LoaderCircle className="h-10 w-10 animate-spin text-red-600" />

      <div className="space-y-1 text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          لطفاً کمی صبر کنید
        </h2>

        <p className="text-sm text-gray-500">{text}</p>
      </div>
    </div>
  );
}

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  console.log({
    loading,
    user,
  });

  if (loading) {
    console.log("PageLoader rendered");

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
