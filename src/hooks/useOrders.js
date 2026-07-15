"use client";

import useOrderStore from "@/store/orderStore";

export default function useOrders() {
  const orders = useOrderStore((state) => state.orders);

  const getOrderById = useOrderStore((state) => state.getOrderById);

  return {
    orders,
    getOrderById,
  };
}
