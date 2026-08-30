import BrandSlider from "./BrandSlider";
import { getBrands } from "@/services/brandService";

export default async function Brands() {
  let brands = [];

  try {
    brands = await getBrands();
  } catch (error) {
    // خطاهای کنترلی خود Next (رندر داینامیک، redirect، notFound) با digest
    // مشخص می‌شوند؛ بلعیدن آن‌ها جریان داخلی Next را می‌شکند
    if (error?.digest) {
      throw error;
    }

    console.error(error);

    // خطای این بخش نباید کل صفحه‌ی اصلی را از کار بیندازد
    return null;
  }

  return <BrandSlider brands={brands} />;
}
