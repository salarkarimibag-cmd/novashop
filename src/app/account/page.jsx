"use client";

import Link from "next/link";

import useOrderStore from "@/store/orderStore";
import useWishlistStore from "@/store/wishlistStore";

export default function AccountPage() {
  const orders = useOrderStore((state) => state.orders);

  const wishlist = useWishlistStore((state) => state.items);

  return (
    <div>
      <h1
        className="
text-3xl
font-bold
mb-8
"
      >
        داشبورد من
      </h1>

      <div
        className="
grid
gap-5
md:grid-cols-3
"
      >
        <div className="rounded-2xl bg-gray-50 p-5">
          <p className="text-gray-500">تعداد سفارش‌ها</p>

          <strong className="text-3xl">{orders.length}</strong>
        </div>

        <div className="rounded-2xl bg-gray-50 p-5">
          <p className="text-gray-500">علاقه‌مندی‌ها</p>

          <strong className="text-3xl">{wishlist.length}</strong>
        </div>

        <div className="rounded-2xl bg-gray-50 p-5">
          <p className="text-gray-500">وضعیت حساب</p>

          <strong>فعال</strong>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/account/orders"
          className="
rounded-xl
bg-black
px-5
py-3
text-white
"
        >
          مشاهده سفارش‌ها
        </Link>
      </div>
    </div>
  );
}
