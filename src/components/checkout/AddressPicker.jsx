"use client";

import Link from "next/link";
import { MapPin, Plus, AlertCircle, RotateCw } from "lucide-react";

import useAddressStore from "@/store/addressStore";
import Spinner from "@/components/ui/Spinner/Spinner";
import formatAddress from "@/lib/formatAddress";

// سفارش با شناسه‌ی یکی از آدرس‌های ذخیره‌شده ثبت می‌شود، پس انتخاب کاربر
// باید روی همان آدرس‌ها باشد. ساخت آدرس جدید کار صفحه‌ی «آدرس‌های من» است
// تا دو مسیر جدا برای یک کار وجود نداشته باشد.
export default function AddressPicker() {
  const addresses = useAddressStore((state) => state.addresses);

  const selectedAddress = useAddressStore((state) => state.selectedAddress);

  const selectAddress = useAddressStore((state) => state.selectAddress);

  const loading = useAddressStore((state) => state.loading);

  const error = useAddressStore((state) => state.error);

  const fetchAddresses = useAddressStore((state) => state.fetchAddresses);

  if (loading) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold">آدرس تحویل</h2>

        <Spinner className="py-10" />
      </div>
    );
  }

  // خطا باید پیش از حالت خالی بررسی شود: وقتی دریافت شکست خورده،
  // فهرست هم خالی است و پیام «آدرسی ندارید» گمراه‌کننده می‌شود.
  if (error) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold">آدرس تحویل</h2>

        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/30">
          <AlertCircle size={28} className="mx-auto text-red-500" />

          <p className="mt-3 font-semibold">آدرس‌های شما بارگذاری نشد</p>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{error}</p>

          <button
            type="button"
            onClick={() => fetchAddresses().catch(() => {})}
            className="
              mt-4 inline-flex items-center gap-2 rounded-xl border
              border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold
              transition hover:border-gray-400
              dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-500
            "
          >
            <RotateCw size={18} />
            تلاش دوباره
          </button>
        </div>
      </div>
    );
  }

  if (!addresses.length) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold">آدرس تحویل</h2>

        <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
          <MapPin size={28} className="mx-auto text-gray-400 dark:text-gray-500" />

          <p className="mt-3 font-semibold">هنوز آدرسی ثبت نکرده‌اید</p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            برای ثبت سفارش، اول باید یک آدرس تحویل اضافه کنید.
          </p>

          <Link
            href="/account/addresses"
            className="
              mt-4 inline-flex items-center gap-2 rounded-xl bg-black
              px-5 py-2.5 text-sm font-semibold text-white transition
              hover:bg-gray-800
              dark:bg-white dark:text-black dark:hover:bg-gray-200
            "
          >
            <Plus size={18} />
            افزودن آدرس
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold">آدرس تحویل</h2>

        <Link
          href="/account/addresses"
          className="text-sm font-medium text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          مدیریت آدرس‌ها
        </Link>
      </div>

      <div className="space-y-4">
        {addresses.map((address) => {
          const active = selectedAddress?._id === address._id;

          return (
            <label
              key={address._id}
              htmlFor={`address-${address._id}`}
              className={`
                flex cursor-pointer gap-4 rounded-xl border p-4 transition
                ${
                  active
                    ? "border-black bg-gray-50 dark:border-white dark:bg-gray-800"
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-500"
                }
              `}
            >
              <input
                id={`address-${address._id}`}
                type="radio"
                name="address"
                value={address._id}
                checked={active}
                onChange={() => selectAddress(address)}
                className="mt-1 h-4 w-4 shrink-0 accent-black"
              />

              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-3">
                  <p className="font-semibold">{address.fullName}</p>

                  {address.isDefault && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                      پیش‌فرض
                    </span>
                  )}
                </div>

                <p className="text-gray-500 dark:text-gray-400">{address.phone}</p>

                <p className="text-gray-600 dark:text-gray-400">
                  {address.province} - {address.city}
                </p>

                <p className="text-gray-700 dark:text-gray-300">{formatAddress(address)}</p>

                <p className="text-gray-500 dark:text-gray-400">کد پستی: {address.postalCode}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
