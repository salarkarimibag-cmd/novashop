"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import AddressForm from "@/components/addresses/AddressForm";
import AddressList from "@/components/addresses/AddressList";
import useAddressStore from "@/store/addressStore";

export default function AddressesPage() {
  const fetchAddresses = useAddressStore((state) => state.fetchAddresses);

  // این صفحه داخل ProtectedRoute است، پس توکن تا اینجا حتماً آماده است.
  // بدون این درخواست، فهرست فقط چیزی را نشان می‌داد که در localStorage
  // مانده بود — یعنی آدرس‌های ثبت‌شده از دستگاه دیگر اصلاً دیده نمی‌شدند.
  useEffect(() => {
    fetchAddresses().catch((error) => {
      console.error("FETCH ADDRESSES ERROR:", error);

      toast.error(error?.message || "دریافت آدرس‌ها انجام نشد");
    });
  }, [fetchAddresses]);

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">مدیریت آدرس‌ها</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <AddressForm />
        </div>

        <div className="lg:col-span-2">
          <AddressList />
        </div>
      </div>
    </main>
  );
}
