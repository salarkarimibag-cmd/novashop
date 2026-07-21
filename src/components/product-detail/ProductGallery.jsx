"use client";

import { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductGallery({ product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const images = product.images?.length > 0 ? product.images : [product.image];

  return (
    <div className="space-y-4">
      {/* Main Gallery */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{
          swiper: thumbsSwiper,
        }}
        spaceBetween={10}
        className="overflow-hidden rounded-2xl border bg-white"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image + index}>
            <div className="relative aspect-square">
              <Image
                src={image}
                alt={product.title}
                fill
                priority={index === 0}
                sizes="(max-width:768px) 100vw, 50vw"
                className="rounded-2xl object-contain p-4"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        watchSlidesProgress
        spaceBetween={12}
        slidesPerView={4}
        breakpoints={{
          640: {
            slidesPerView: 5,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image + index}>
            <div className="relative aspect-square cursor-pointer overflow-hidden rounded-xl border bg-white hover:border-indigo-500">
              <Image
                src={image}
                alt={`${product.title}-${index}`}
                fill
                sizes="100px"
                className="object-contain p-1"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
