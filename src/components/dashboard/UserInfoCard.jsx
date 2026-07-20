"use client";

import { User, Phone } from "lucide-react";
import useAuthStore from "@/store/authStore";

export default function UserInfoCard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-full bg-gray-100 p-3">
          <User />
        </div>

        <div>
          <h2 className="font-bold text-lg">اطلاعات کاربر</h2>

          <p className="text-sm text-gray-500">حساب کاربری شما</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">نام</p>

          <p className="font-semibold">{user?.name || "-"}</p>
        </div>

        <div className="flex items-center gap-2">
          <Phone size={18} />

          <span>{user?.phone || "-"}</span>
        </div>
      </div>
    </div>
  );
}
