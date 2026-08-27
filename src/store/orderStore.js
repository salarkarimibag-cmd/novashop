import { create } from "zustand";
import { persist } from "zustand/middleware";

import orderService from "@/services/orderService";

const useOrderStore = create(
  persist(
    (set, get) => ({
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

          const order = response.data;

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
      // چند کامپوننت روی یک صفحه ممکن است سفارش‌ها را بخواهند؛ بدون این
      // گارد هرکدام یک درخواست جدا می‌فرستد. همان الگوی cartStore.
      isFetching: false,

      // دریافت سفارش‌های کاربر
      fetchOrders: async () => {
        if (get().isFetching) return;

        set({
          loading: true,
          isFetching: true,
        });

        try {
          const response = await orderService.getOrders();

          set({
            orders: (response.data || []).filter(Boolean),
          });
        } finally {
          set({
            loading: false,
            isFetching: false,
          });
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

      // currentOrder عمداً persist نمی‌شود: مخصوص صفحه‌ی جزئیات/order-success
      // است و اگر بماند، بعد از رفرش یا در یک session جدید، سفارشِ یک
      // کاربر یا بازدید قبلی برای یک لحظه (تا رسیدن پاسخ fetch جدید) روی
      // صفحه‌ی اشتباه نشان داده می‌شود
      partialize: (state) => ({
        orders: state.orders,
      }),

      // partialize فقط جلوی *نوشتنِ* فیلدهای موقت (و currentOrder) را
      // می‌گیرد؛ localStorageِ ذخیره‌شده از قبل از این تغییر ممکن است این
      // فیلدها را داشته باشد که بدون merge دستی، همان مقدار قدیمی
      // rehydrate می‌شود
      merge: (persistedState, currentState) => ({
        ...currentState,
        orders: persistedState?.orders ?? currentState.orders,
      }),
    },
  ),
);

export default useOrderStore;
