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

  return (
    <div className="space-y-4">
      {/* تصویر اصلی */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        className="rounded-2xl border"
      >
        {product.images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-square">
              <Image
                src={image}
                alt={product.title}
                fill
                priority={index === 0}
                sizes="(max-width:768px) 100vw, 50vw"
                className="rounded-2xl object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* تصاویر کوچک */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        watchSlidesProgress
        spaceBetween={12}
        slidesPerView={4}
      >
        {product.images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-square cursor-pointer overflow-hidden rounded-xl border">
              <Image
                src={image}
                alt={`${product.title}-${index}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
