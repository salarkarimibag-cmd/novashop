import { create } from "zustand";
import { persist } from "zustand/middleware";

import orderService from "@/services/orderService";

const useOrderStore = create(
  persist(
    (set) => ({
      orders: [],

      currentOrder: null,

      loading: false,

      // ایجاد سفارش
      createOrder: async (data) => {
        set({
          loading: true,
        });

        try {
          const response = await orderService.createOrder(data);

          const order = response.data.data;

          set((state) => ({
            orders: [order, ...state.orders],

            currentOrder: order,

            loading: false,
          }));

          return order;
        } catch (error) {
          set({
            loading: false,
          });

          throw error;
        }
      },

      // دریافت سفارش‌های کاربر
      fetchOrders: async () => {
        set({
          loading: true,
        });

        try {
          const response = await orderService.getOrders();

          set({
            orders: response.data || [],
            loading: false,
          });
        } catch (error) {
          set({
            loading: false,
          });

          throw error;
        }
      },

      // دریافت یک سفارش
      fetchOrderById: async (id) => {
        set({
          loading: true,
        });

        try {
          const response = await orderService.getOrderById(id);

          const order = response.data.data;

          set({
            currentOrder: order,

            loading: false,
          });

          return order;
        } catch (error) {
          set({
            loading: false,
          });

          throw error;
        }
      },

      clearCurrentOrder: () => {
        set({
          currentOrder: null,
        });
      },

      clearOrders: () => {
        set({
          orders: [],
        });
      },
    }),

    {
      name: "nova-orders",

      skipHydration: true,
    },
  ),
);

export default useOrderStore;
