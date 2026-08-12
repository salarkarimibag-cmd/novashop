"use client";

import Image from "next/image";
import formatPrice from "@/lib/formatPrice";
import { getProductImage } from "@/constants/images";

export default function OrderItems({ items = [] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const product = item.product;

        return (
          <div
            key={item._id || item.product?._id}
            className="flex items-center gap-4 rounded-xl border p-4"
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-lg">
              <Image
                src={getProductImage(product)}
                alt={product?.title || "محصول"}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="font-semibold">{product?.title}</h3>

              <p>تعداد: {item.quantity}</p>

              <p className="font-bold">{formatPrice(item.price)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
