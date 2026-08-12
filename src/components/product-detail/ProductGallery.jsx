"use client";

import { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { PLACEHOLDER_IMAGE } from "@/constants/images";

export default function ProductGallery({ images = [], title = "Product" }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const galleryImages = images.length > 0 ? images : [PLACEHOLDER_IMAGE];

  return (
    <div className="space-y-4">
      {/* Main Gallery */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        spaceBetween={10}
        className="overflow-hidden rounded-2xl border bg-white"
      >
        {galleryImages.map((image, index) => (
          <SwiperSlide key={`${image}-${index}`}>
            <div className="relative aspect-square">
              <Image
                src={image}
                alt={title}
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
        {galleryImages.map((image, index) => (
          <SwiperSlide key={`thumb-${image}-${index}`}>
            <div className="relative aspect-square cursor-pointer overflow-hidden rounded-xl border bg-white hover:border-indigo-500">
              <Image
                src={image}
                alt={`${title}-${index + 1}`}
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
