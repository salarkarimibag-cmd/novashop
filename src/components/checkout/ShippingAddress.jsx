"use client";

import { MapPin } from "lucide-react";
import useCheckoutStore from "@/store/checkoutStore";

export default function ShippingAddress() {
  const { shippingAddress } = useCheckoutStore();

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <MapPin size={22} />
        <h2 className="text-xl font-bold">آدرس ارسال</h2>
      </div>

      <div className="space-y-2 text-sm">
        <p className="font-semibold">{shippingAddress.fullName}</p>

        <p>{shippingAddress.phone}</p>

        <p>
          {shippingAddress.province} - {shippingAddress.city}
        </p>

        <p>{shippingAddress.address}</p>

        <p>کد پستی: {shippingAddress.postalCode}</p>
      </div>
    </div>
  );
}
