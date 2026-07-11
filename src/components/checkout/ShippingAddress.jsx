"use client";

import { MapPin } from "lucide-react";

export default function ShippingAddress({ address }) {
  if (!address) {
    return (
      <div className="rounded-2xl border bg-white p-6 text-gray-400">
        آدرسی ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <MapPin size={22} />

        <h2 className="text-xl font-bold">آدرس ارسال</h2>
      </div>

      <div className="space-y-2 text-sm">
        <p className="font-semibold">{address.fullName}</p>

        <p>{address.phone}</p>

        <p>
          {address.province} - {address.city}
        </p>

        <p>{address.address}</p>

        <p>کد پستی: {address.postalCode}</p>
      </div>
    </div>
  );
}
