"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import ProductForm from "@/components/admin/ProductForm";
import adminProductService from "@/services/adminProductService";
import { getProductById } from "@/services/productService";
import Spinner from "@/components/ui/Spinner/Spinner";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // همان الگویِ inline-async-effect صفحه‌ی لیست (برای عبور از قانون
  // react-hooks/set-state-in-effect): خواندنِ محصول با productService
  // عمومی است، چون GET /api/products/:id نیازی به توکن ندارد — درست
  // مثل صفحه‌ی لیست که برای خواندن هم از سرویس عمومی استفاده می‌کند و
  // adminProductService را فقط برای نوشتن (اینجا: update) نگه می‌دارد.
  useEffect(() => {
    let ignore = false;

    async function loadProduct() {
      setLoading(true);

      try {
        const data = await getProductById(id);

        if (ignore) return;

        if (!data) {
          setNotFound(true);
        } else {
          setProduct(data);
        }
      } catch (error) {
        if (!ignore) {
          toast.error(error.message || "دریافت محصول انجام نشد");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleUpdate = async (payload) => {
    await adminProductService.update(id, payload);

    toast.success("محصول با موفقیت ویرایش شد");

    router.push("/admin/products");
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 py-16 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 py-16 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">محصول مورد نظر پیدا نشد.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h1 className="mb-6 text-2xl font-bold">ویرایش محصول</h1>

      {/*
        productSchema بک‌اند جایگزینی کامل است (نه patch)، پس اینجا
        باید مقادیرِ فعلیِ *همه‌ی* فیلدها را پر کنیم — نه فقط چیزی که
        کاربر می‌خواهد عوض کند. آرایه‌ها هم به رشته‌ی کاما‌دار تبدیل
        می‌شوند چون فرم با همان شکل کار می‌کند (parseCommaList عکسش را
        موقع submit انجام می‌دهد).
      */}
      <ProductForm
        initialValues={{
          title: product.title,
          description: product.description || "",
          price: product.price,
          discountPrice: product.discountPrice ?? "",
          stock: product.stock,
          brand: product.brand || "",
          category: product.category || "",
          images: (product.images || []).join(", "),
          colors: (product.colors || []).join(", "),
          sizes: (product.sizes || []).join(", "),
          isFeatured: product.isFeatured,
        }}
        onSubmit={handleUpdate}
        submitLabel="ذخیره تغییرات"
      />
    </div>
  );
}
