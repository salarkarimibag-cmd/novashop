import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [
            {
              ...order,
              status: "pending",
            },
            ...state.orders,
          ],
        })),

      getOrders: () => {
        return get().orders;
      },

      getOrderById: (id) => get().orders.find((order) => order.id === id),

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

      removeOrder: (id) =>
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id),
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
