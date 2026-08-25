"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AlertCircle, RotateCw } from "lucide-react";

import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner/Spinner";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import useAddressStore from "@/store/addressStore";
import formatAddress from "@/lib/formatAddress";

export default function AddressList() {
  const {
    addresses,
    loading,
    error,
    fetchAddresses,
    removeAddress,
    setDefaultAddress,
  } = useAddressStore();

  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const id = pendingDeleteId;

    try {
      setDeleting(true);

      await removeAddress(id);

      toast.success("آدرس حذف شد");

      setPendingDeleteId(null);
    } catch (error) {
      toast.error(error.message || "حذف آدرس انجام نشد");
    } finally {
      setDeleting(false);
    }
  };

  const handleDefault = async (id) => {
    try {
      await setDefaultAddress(id);

      toast.success("آدرس پیش‌فرض انتخاب شد");
    } catch (error) {
      toast.error(error.message || "تغییر آدرس پیش‌فرض انجام نشد");
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  // خطا پیش از حالت خالی: یک دریافت ناموفق هم فهرست را خالی می‌گذارد،
  // و «آدرسی ثبت نشده» به کسی که آدرس دارد پیام غلطی است.
  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center shadow-sm dark:border-red-900/50 dark:bg-red-950/30">
        <AlertCircle size={28} className="mx-auto text-red-500" />

        <p className="mt-3 font-semibold">آدرس‌های شما بارگذاری نشد</p>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{error}</p>

        <Button
          variant="outline"
          className="mt-4"
          onClick={() => fetchAddresses().catch(() => {})}
        >
          <RotateCw size={18} />
          تلاش دوباره
        </Button>
      </div>
    );
  }

  if (addresses.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">هنوز آدرسی ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {addresses.map((address) => (
        <div
          key={address._id}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold">{address.fullName}</h3>

                {address.isDefault && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                    پیش‌فرض
                  </span>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-400">{address.phone}</p>

              <p className="text-gray-600 dark:text-gray-400">
                {address.province} - {address.city}
              </p>

              <p className="text-gray-700 dark:text-gray-300">{formatAddress(address)}</p>

              <p className="text-gray-500 dark:text-gray-400">کد پستی: {address.postalCode}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {!address.isDefault && (
                <Button
                  variant="outline"
                  onClick={() => handleDefault(address._id)}
                >
                  انتخاب به عنوان پیش‌فرض
                </Button>
              )}

              <Button
                variant="danger"
                onClick={() => setPendingDeleteId(address._id)}
              >
                حذف
              </Button>
            </div>
          </div>
        </div>
      ))}

      <ConfirmDialog
        open={Boolean(pendingDeleteId)}
        title="حذف آدرس"
        description="این آدرس برای همیشه حذف می‌شود. این عمل قابل بازگشت نیست."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}
