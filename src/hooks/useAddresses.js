"use client";

import { useEffect } from "react";

import useAddressStore from "@/store/addressStore";

// هم‌سبک useOrders: آدرس‌ها را از سرور می‌گیرد و همان‌ها را برمی‌گرداند.
// گارد isFetching در استور جلوی درخواست تکراری را می‌گیرد وقتی چند
// کامپوننت روی یک صفحه از این hook استفاده می‌کنند.
export default function useAddresses() {
  const addresses = useAddressStore((state) => state.addresses);
  const loading = useAddressStore((state) => state.loading);
  const error = useAddressStore((state) => state.error);
  const fetchAddresses = useAddressStore((state) => state.fetchAddresses);

  useEffect(() => {
    fetchAddresses().catch((fetchError) => {
      console.error(fetchError);
    });
  }, [fetchAddresses]);

  return {
    addresses,
    loading,
    error,
  };
}
