"use client";

import Link from "next/link";
import { MapPin, Plus } from "lucide-react";

import useAddressStore from "@/store/addressStore";
import formatAddress from "@/lib/formatAddress";

// سفارش با شناسه‌ی یکی از آدرس‌های ذخیره‌شده ثبت می‌شود، پس انتخاب کاربر
// باید روی همان آدرس‌ها باشد. ساخت آدرس جدید کار صفحه‌ی «آدرس‌های من» است
// تا دو مسیر جدا برای یک کار وجود نداشته باشد.
export default function AddressPicker() {
  const addresses = useAddressStore((state) => state.addresses);

  const selectedAddress = useAddressStore((state) => state.selectedAddress);

  const selectAddress = useAddressStore((state) => state.selectAddress);

  if (!addresses.length) {
    return (
      <div>
        <h2 className="mb-6 text-xl font-bold">آدرس تحویل</h2>

        <div className="rounded-xl border border-dashed p-6 text-center">
          <MapPin size={28} className="mx-auto text-gray-400" />

          <p className="mt-3 font-semibold">هنوز آدرسی ثبت نکرده‌اید</p>

          <p className="mt-1 text-sm text-gray-500">
            برای ثبت سفارش، اول باید یک آدرس تحویل اضافه کنید.
          </p>

          <Link
            href="/account/addresses"
            className="
              mt-4 inline-flex items-center gap-2 rounded-xl bg-black
              px-5 py-2.5 text-sm font-semibold text-white transition
              hover:bg-gray-800
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
          className="text-sm font-medium text-gray-500 transition hover:text-black"
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
                ${active ? "border-black bg-gray-50" : "hover:border-gray-300"}
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
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      پیش‌فرض
                    </span>
                  )}
                </div>

                <p className="text-gray-500">{address.phone}</p>

                <p className="text-gray-600">
                  {address.province} - {address.city}
                </p>

                <p className="text-gray-700">{formatAddress(address)}</p>

                <p className="text-gray-500">کد پستی: {address.postalCode}</p>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
