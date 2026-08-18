"use client";

import { LoaderCircle } from "lucide-react";

export default function PageLoader({
  title = "لطفاً کمی صبر کنید",
  message = "در حال بارگذاری اطلاعات...",
  fullScreen = false,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "min-h-screen" : "min-h-75"
      }`}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/40">
        <LoaderCircle className="h-8 w-8 animate-spin text-red-600 dark:text-red-500" />
      </div>

      <div className="space-y-1 text-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
}
