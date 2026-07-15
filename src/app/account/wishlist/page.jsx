"use client";

import useWishlistStore from "@/store/wishlistStore";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">علاقه‌مندی‌ها</h1>

      {items.length === 0 ? (
        <p>لیست علاقه‌مندی خالی است</p>
      ) : (
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className="
border-b
py-4
"
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
