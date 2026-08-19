"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Badge from "@/components/ui/Badge/Badge";
import heroData from "./heroData";

export default function HeroSlider() {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".hero-next",
          prevEl: ".hero-prev",
        }}
        style={{ "--swiper-theme-color": "#4f46e5" }}
        className="h-56 rounded-2xl sm:h-72 md:h-96"
      >
        {heroData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link
              href={slide.link}
              className="group relative block h-full w-full"
            >
              <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 sm:h-72 md:h-96">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  priority={slide.id === 1}
                  className="object-contain p-4 sm:p-6 md:p-12"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-3 px-4 sm:bottom-6 sm:px-6 md:bottom-8 md:px-10">
                  <Badge variant="sale">{slide.badge}</Badge>

                  <h2 className="mt-2 text-lg font-bold text-white sm:mt-3 sm:text-2xl md:text-3xl">
                    {slide.title}
                  </h2>

                  <p className="mt-1 max-w-md text-xs text-white/90 sm:mt-2 sm:text-sm md:text-base">
                    {slide.subtitle}
                  </p>

                  <span className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-medium text-white transition group-hover:bg-indigo-700 sm:mt-5 sm:px-5 sm:py-3 sm:text-sm">
                    {slide.cta}
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        aria-label="اسلاید قبلی"
        className="hero-prev absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur transition hover:bg-black/60 sm:top-4 sm:right-4 sm:h-10 sm:w-10"
      >
        <ChevronRight size={18} />
      </button>

      <button
        type="button"
        aria-label="اسلاید بعدی"
        className="hero-next absolute top-3 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur transition hover:bg-black/60 sm:top-4 sm:left-4 sm:h-10 sm:w-10"
      >
        <ChevronLeft size={18} />
      </button>
    </div>
  );
}
