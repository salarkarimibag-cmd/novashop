"use client";

import useAuthStore from "@/store/authStore";

export default function ProfileInfo() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-3xl font-bold">
          {user.fullName?.charAt(0)}
        </div>

        <h2 className="mt-4 text-xl font-bold">{user.fullName}</h2>

        <p className="mt-2 text-gray-500">{user.phone}</p>
      </div>

      <hr className="my-6" />

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
