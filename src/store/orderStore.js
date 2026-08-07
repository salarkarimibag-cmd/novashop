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

          console.log("ORDER RESPONSE:", response);

          const order = response.data;

          console.log("CREATED ORDER:", order);

          if (!order?._id) {
            throw new Error("اطلاعات سفارش معتبر نیست");
          }

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
          console.log(
            "GET ORDERS RESPONSE JSON:",
            JSON.stringify(response, null, 2),
          );
          set({
            orders: (response.data || []).filter(Boolean),
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

          const order = response.data;

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
