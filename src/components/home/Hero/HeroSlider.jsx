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
        className="h-96 rounded-2xl"
      >
        {heroData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link
              href={slide.link}
              className="group relative block h-full w-full"
            >
              <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-linear-to-br from-gray-100 to-gray-200">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  priority={slide.id === 1}
                  className="object-contain p-8 md:p-12"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-6 px-6 md:bottom-8 md:px-10">
                  <Badge variant="sale">{slide.badge}</Badge>

                  <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
                    {slide.title}
                  </h2>

                  <p className="mt-2 max-w-md text-sm text-white/90 md:text-base">
                    {slide.subtitle}
                  </p>

                  <span className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition group-hover:bg-indigo-700">
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
        className="hero-prev absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur transition hover:bg-black/60"
      >
        <ChevronRight size={20} />
      </button>

      <button
        type="button"
        aria-label="اسلاید بعدی"
        className="hero-next absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur transition hover:bg-black/60"
      >
        <ChevronLeft size={20} />
      </button>
    </div>
  );
}
