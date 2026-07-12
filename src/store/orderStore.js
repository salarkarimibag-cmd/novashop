import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set) => ({
      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [
            ...state.orders,
            {
              ...order,
              status: "pending",
            },
          ],
        })),

      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  status,
                }
              : order,
          ),
        })),

      clearOrders: () =>
        set({
          orders: [],
        }),
    }),

    {
      name: "nova-orders",
       skipHydration: true,
    },
  ),
);

export default useOrderStore;
