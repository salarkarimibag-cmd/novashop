import BrandSlider from "./BrandSlider";
import { getBrands } from "@/services/brandService";

export default async function Brands() {
  const brands = await getBrands();

  return <BrandSlider brands={brands} />;
}
