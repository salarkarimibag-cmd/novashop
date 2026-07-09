"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import heroData from "./heroData";

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation
      className="h-full rounded-2xl"
    >
      {heroData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <Link href={slide.link} className="block h-full">
            <div className="relative h-96 w-full overflow-hidden rounded-2xl">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 100vw, 75vw"
                priority={slide.id === 1}
                className="object-cover"
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
