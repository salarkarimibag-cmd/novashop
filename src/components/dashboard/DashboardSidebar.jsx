"use client";

import Link from "next/link";
import { User, Package, MapPin, Heart } from "lucide-react";

export default function DashboardSidebar() {
  const menu = [
    {
      title: "پروفایل",
      href: "/account/profile",
      icon: User,
    },

    {
      title: "سفارش‌ها",
      href: "/account/orders",
      icon: Package,
    },

    {
      title: "آدرس‌ها",
      href: "/account/addresses",
      icon: MapPin,
    },

    {
      title: "علاقه‌مندی‌ها",
      href: "/account/wishlist",
      icon: Heart,
    },
  ];

  return (
    <div
      className="
rounded-2xl
bg-white
p-5
shadow-sm
"
    >
      <h2 className="mb-6 text-xl font-bold">حساب کاربری</h2>

      <nav className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="
flex
items-center
gap-3
rounded-xl
p-3
transition
hover:bg-gray-100
"
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
