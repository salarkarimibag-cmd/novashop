"use client";

import useAuthStore from "@/store/authStore";

export default function ProfileInfo() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-3xl font-bold dark:bg-gray-800">
          {user.name?.charAt(0)}
        </div>

        <h2 className="mt-4 text-xl font-bold">{user.name}</h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">{user.phone}</p>
      </div>

      <hr className="my-6 border-gray-200 dark:border-gray-800" />

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>تعداد سفارش</span>

          <span>0</span>
        </div>

        <div className="flex justify-between">
          <span>آدرس‌های ذخیره شده</span>

          <span>0</span>
        </div>
      </div>
    </div>
  );
}
