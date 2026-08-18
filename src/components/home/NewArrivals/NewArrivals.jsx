"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getNewestProducts } from "@/services/productService";
import NewArrivalCard from "./NewArrivalCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getNewestProducts();

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="mt-16">
        <div className="py-16 text-center">در حال دریافت محصولات...</div>
      </section>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">جدیدترین محصولات</h2>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            تازه‌ترین کالاهای اضافه شده به فروشگاه
          </p>
        </div>

        <div className="hidden gap-2 md:flex">
          <button className="new-arrival-prev flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:bg-black hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-white dark:hover:text-black">
            <ChevronRight size={20} />
          </button>

          <button className="new-arrival-next flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:bg-black hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-white dark:hover:text-black">
            <ChevronLeft size={20} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          // بدون این، اسلاید وسط کلیک جابه‌جا می‌شود و دکمه‌ی خرید
          // هرگز رویداد click نمی‌گیرد
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".new-arrival-next",
          prevEl: ".new-arrival-prev",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        className="pb-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <NewArrivalCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
