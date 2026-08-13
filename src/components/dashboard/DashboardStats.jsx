"use client";

import { ShoppingBag, Heart, MapPin, Wallet } from "lucide-react";

import useOrders from "@/hooks/useOrders";
import useAddresses from "@/hooks/useAddresses";
import useWishlistStore from "@/store/wishlistStore";
import formatPrice from "@/lib/formatPrice";

import StatCard from "./StatCard";

export default function DashboardStats() {
  // این آمار باید از سرور بیاید. پیش از این مستقیم از استور خوانده می‌شد و
  // چون داشبورد چیزی نمی‌گرفت، فقط باقی‌مانده‌ی localStorage را می‌شمرد.
  const { orders } = useOrders();
  const { addresses } = useAddresses();

  // علاقه‌مندی‌ها عمداً محلی است و به بک‌اند همگام نمی‌شود
  const wishlist = useWishlistStore((state) => state.items);

  // فیلد سرور totalPrice است؛ order.total وجود ندارد و جمع را همیشه صفر می‌کرد
  const totalSpent = orders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0,
  );

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard title="سفارش‌ها" value={orders.length} icon={ShoppingBag} />

      <StatCard title="علاقه‌مندی‌ها" value={wishlist.length} icon={Heart} />

      <StatCard title="آدرس‌ها" value={addresses.length} icon={MapPin} />

      <StatCard
        title="مجموع خرید"
        value={formatPrice(totalSpent)}
        icon={Wallet}
      />
    </section>
  );
}
