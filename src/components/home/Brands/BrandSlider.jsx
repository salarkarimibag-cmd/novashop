"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import brands from "@/data/brands";
import BrandCard from "./BrandCard";
import Container from "@/components/common/Container";

export default function BrandSlider() {
  return (
    <section className="py-16">
      <Container>
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <BrandCard brand={brand} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
