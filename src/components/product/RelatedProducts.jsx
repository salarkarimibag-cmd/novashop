"use client";

import products from "@/data/products";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import RelatedProductCard from "./RelatedProductCard";

export default function RelatedProducts({ currentProductId }) {
  const relatedProducts = products.filter(
    (item) => item.id !== currentProductId,
  );

  return (
    <section className="mt-20">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">محصولات مرتبط</h2>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        spaceBetween={24}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <RelatedProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
