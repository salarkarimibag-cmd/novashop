"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

import "swiper/css";
import "swiper/css/navigation";

import products from "@/data/products";
import ProductCard from "@/components/home/Products/ProductCard";

export default function BestSellers() {
  const bestSellers = useMemo(
    () => products.filter((product) => product.bestSeller),
    [],
  );

  if (!bestSellers.length) return null;

  return (
    <section className="my-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">پرفروش‌ترین محصولات</h2>

          <p className="mt-2 text-sm text-gray-500">
            محبوب‌ترین محصولات فروشگاه
          </p>
        </div>

        <div className="flex gap-2">
          <button className="best-prev flex h-10 w-10 items-center justify-center rounded-full border">
            <ChevronRight size={20} />
          </button>

          <button className="best-next flex h-10 w-10 items-center justify-center rounded-full border">
            <ChevronLeft size={20} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: ".best-prev",
          nextEl: ".best-next",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {bestSellers.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
