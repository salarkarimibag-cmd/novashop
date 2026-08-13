"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Container from "@/components/common/Container";
import BrandCard from "./BrandCard";

export default function BrandSlider({ brands }) {
  return (
    <section className="py-16">
      <Container>
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
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
            <SwiperSlide key={brand}>
              <BrandCard brand={brand} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
