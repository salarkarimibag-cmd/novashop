"use client";

import { useEffect } from "react";
import useOrderStore from "@/store/orderStore";

export default function useOrders() {
  const orders = useOrderStore((state) => state.orders);
  const loading = useOrderStore((state) => state.loading);
  const fetchOrders = useOrderStore((state) => state.fetchOrders);

  useEffect(() => {
    fetchOrders().catch((error) => {
      console.error(error);
    });
  }, [fetchOrders]);

  return {
    orders,
    loading,
  };
}
