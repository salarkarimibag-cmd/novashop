"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ProductForm from "@/components/admin/ProductForm";
import adminProductService from "@/services/adminProductService";

export default function NewProductPage() {
  const router = useRouter();

  const handleCreate = async (payload) => {
    await adminProductService.create(payload);

    toast.success("محصول با موفقیت ایجاد شد");

    router.push("/admin/products");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h1 className="mb-6 text-2xl font-bold">افزودن محصول جدید</h1>

      <ProductForm onSubmit={handleCreate} submitLabel="ایجاد محصول" />
    </div>
  );
}
