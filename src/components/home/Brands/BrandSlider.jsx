"use client";

import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import { getBrands } from "@/services/productService";

import BrandCard from "./BrandCard";
import Container from "@/components/common/Container";

export default function BrandSlider() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const data = await getBrands();

        setBrands(data.brands || []);
      } catch (error) {
        console.error("خطا در دریافت برندها:", error);
      }
    }

    fetchBrands();
  }, []);

  if (!brands.length) {
    return null;
  }

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
            <SwiperSlide key={brand}>
              <BrandCard brand={brand} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
