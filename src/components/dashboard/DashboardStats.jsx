"use client";

import { ShoppingBag, Heart, MapPin, Wallet } from "lucide-react";

import useOrderStore from "@/store/orderStore";
import useWishlistStore from "@/store/wishlistStore";
import useAddressStore from "@/store/addressStore";

import StatCard from "./StatCard";

export default function DashboardStats() {
  const orders = useOrderStore((state) => state.orders);
  const wishlist = useWishlistStore((state) => state.items);
  const addresses = useAddressStore((state) => state.addresses);

  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard title="سفارش‌ها" value={orders.length} icon={ShoppingBag} />

      <StatCard title="علاقه‌مندی‌ها" value={wishlist.length} icon={Heart} />

      <StatCard title="آدرس‌ها" value={addresses.length} icon={MapPin} />

      <StatCard
        title="مجموع خرید"
        value={`${totalSpent.toLocaleString("fa-IR")} تومان`}
        icon={Wallet}
      />
    </section>
  );
}
