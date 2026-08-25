"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";

import useAddressStore from "@/store/addressStore";
import useAuthStore from "@/store/authStore";
import { useHydration } from "@/components/providers/HydrationProvider";

// آدرس به حساب کاربری وصل است، پس برای مهمان فقط به صفحه‌ی ورود می‌فرستد؛
// درخواست fetchAddresses فقط برای کاربر واردشده زده می‌شود تا خطای ۴۰۱
// بی‌مورد در کنسول هر صفحه برای بازدیدکننده‌های مهمان چاپ نشود.
export default function AddressNavItem() {
  const hydrated = useHydration();

  const user = useAuthStore((state) => state.user);

  const selectedAddress = useAddressStore((state) => state.selectedAddress);

  const fetchAddresses = useAddressStore((state) => state.fetchAddresses);

  useEffect(() => {
    if (hydrated && user) {
      fetchAddresses().catch(() => {});
    }
  }, [hydrated, user, fetchAddresses]);

  const label = selectedAddress
    ? `${selectedAddress.province} - ${selectedAddress.city}`
    : "انتخاب آدرس";

  return (
    <Link
      href={user ? "/account/addresses" : "/login"}
      className="flex items-center gap-1.5 text-sm text-orange-600 transition hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400"
    >
      <MapPin size={16} />

      <span className="border-b border-dashed border-orange-300 dark:border-orange-700">
        {label}
      </span>
    </Link>
  );
}
