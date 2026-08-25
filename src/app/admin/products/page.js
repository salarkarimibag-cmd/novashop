"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { AlertCircle, Pencil, Plus, RotateCw, Trash2 } from "lucide-react";

import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge/Badge";
import Spinner from "@/components/ui/Spinner/Spinner";
import EmptyState from "@/components/ui/EmptyState/EmptyState";
import Pagination from "@/components/ui/Pagination/Pagination";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

import { getProducts } from "@/services/productService";
import adminProductService from "@/services/adminProductService";
import formatPrice from "@/lib/formatPrice";
import { getProductImage } from "@/constants/images";

const PAGE_SIZE = 20;

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // دکمه‌ی «تلاش دوباره» چیزی جز افزایش این عدد نمی‌کند تا effect
  // پایین دوباره اجرا شود — چون تابعِ واکشی عمداً *داخل* effect تعریف
  // شده (نه با useCallback بیرونش)، چیزی بیرون از effect برای صدا زدنِ
  // دستی وجود ندارد. این شکل را قانون react-hooks/set-state-in-effect
  // پروژه می‌خواهد: صدا زدنِ setState از تابعی که هم بیرون effect
  // تعریف شده هم داخل آرایه‌ی وابستگی‌هاست، به‌عنوان ریسکِ رندرهای
  // زنجیره‌ای رد می‌شود؛ تابعِ کاملاً محلی این ریسک را ندارد.
  const [retryToken, setRetryToken] = useState(0);

  const [pendingDelete, setPendingDelete] = useState(null);

  const [deleting, setDeleting] = useState(false);

  // لیست خواندنی است، پس عمداً از productService عمومی استفاده می‌کند
  // (fetch خام، بدون توکن) نه adminProductService — همان endpointی که
  // خودِ فروشگاه هم برای نمایش محصولات استفاده می‌کند.
  useEffect(() => {
    // اگر کاربر بین لود شدنِ دو صفحه سریع کلیک کند، پاسخِ کندترِ صفحه‌ی
    // قبلی نباید بعد از پاسخِ سریع‌ترِ صفحه‌ی جدید بنشیند و آن را
    // بازنویسی کند
    let ignore = false;

    async function loadProducts() {
      setLoading(true);
      setError(null);

      try {
        const result = await getProducts({ page, limit: PAGE_SIZE });

        if (ignore) return;

        setProducts(result.products);
        setPages(result.pages || 1);
      } catch (err) {
        if (!ignore) {
          setError(err.message || "دریافت محصولات انجام نشد");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      ignore = true;
    };
  }, [page, retryToken]);

  const handleDelete = async () => {
    const product = pendingDelete;

    try {
      setDeleting(true);

      await adminProductService.remove(product._id);

      toast.success("محصول حذف شد");

      setProducts((current) =>
        current.filter((item) => item._id !== product._id),
      );

      setPendingDelete(null);
    } catch (err) {
      toast.error(err.message || "حذف محصول انجام نشد");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">مدیریت محصولات</h1>

        <Link href="/admin/products/new">
          <Button>
            <Plus size={18} />
            افزودن محصول جدید
          </Button>
        </Link>
      </div>

      {loading && (
        <div className="py-16">
          <Spinner />
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/30">
          <AlertCircle size={28} className="mx-auto text-red-500" />

          <p className="mt-3 font-semibold">محصولات بارگذاری نشد</p>

          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{error}</p>

          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setRetryToken((token) => token + 1)}
          >
            <RotateCw size={18} />
            تلاش دوباره
          </Button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <EmptyState
          icon="📦"
          title="هنوز محصولی ثبت نشده"
          description="با دکمه‌ی «افزودن محصول جدید» اولین محصول را بسازید."
        />
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max text-right">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
                  <th className="py-3 font-medium">محصول</th>
                  <th className="py-3 font-medium">قیمت</th>
                  <th className="py-3 font-medium">موجودی</th>
                  <th className="py-3 font-medium">وضعیت</th>
                  <th className="py-3 font-medium"></th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-gray-200 last:border-0 dark:border-gray-800">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={getProductImage(product)}
                            alt={product.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>

                        <div>
                          <p className="line-clamp-1 font-medium">
                            {product.title}
                          </p>

                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {product.brand}
                            {product.brand && product.category && " · "}
                            {product.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3">
                      {product.discountPrice ? (
                        <div>
                          <p className="font-semibold">
                            {formatPrice(product.discountPrice)}
                          </p>

                          <p className="text-xs text-gray-400 line-through dark:text-gray-500">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      ) : (
                        <p className="font-semibold">
                          {formatPrice(product.price)}
                        </p>
                      )}
                    </td>

                    <td className="py-3">
                      <span
                        className={
                          product.stock > 0
                            ? ""
                            : "font-medium text-red-500 dark:text-red-400"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>

                    <td className="py-3">
                      {product.isFeatured && (
                        <Badge variant="primary">ویژه</Badge>
                      )}
                    </td>

                    <td className="py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/products/${product._id}/edit`}>
                          <Button
                            variant="outline"
                            className="!px-3 !py-2"
                            aria-label="ویرایش محصول"
                          >
                            <Pencil size={16} />
                          </Button>
                        </Link>

                        <Button
                          variant="danger"
                          className="!px-3 !py-2"
                          aria-label="حذف محصول"
                          onClick={() => setPendingDelete(product)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={page} totalPages={pages} onPageChange={setPage} />
        </>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="حذف محصول"
        description={
          pendingDelete
            ? `«${pendingDelete.title}» برای همیشه حذف می‌شود. این عمل قابل بازگشت نیست.`
            : ""
        }
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
