import { create } from "zustand";
import { persist } from "zustand/middleware";

import addressService from "@/services/addressService";

const useAddressStore = create(
  persist(
    (set, get) => ({
      addresses: [],

      selectedAddress: null,

      selectAddress: (address) =>
        set({
          selectedAddress: address,
        }),

      loading: false,

      // بدون این، یک دریافت ناموفق از یک لیست واقعاً خالی قابل تشخیص نیست
      // و رابط کاربری به کاربر می‌گوید «آدرسی ندارید» در حالی که دارد.
      error: null,

      // چند کامپوننت روی یک صفحه ممکن است آدرس‌ها را بخواهند؛ بدون این
      // گارد هرکدام یک درخواست جدا می‌فرستد. همان الگوی cartStore.
      isFetching: false,

      fetchAddresses: async () => {
        if (get().isFetching) return;

        set({
          loading: true,
          isFetching: true,
          error: null,
        });

        try {
          const response = await addressService.getAll();

          const addresses = response.data;

          set({
            addresses,
            selectedAddress:
              addresses.find((address) => address.isDefault) ||
              addresses[0] ||
              null,
          });
        } catch (error) {
          set({
            error: error.message || "دریافت آدرس‌ها انجام نشد",
          });

          throw error;
        } finally {
          // در هر دو مسیر باید صفر شود، وگرنه یک شکست، گارد را قفل
          // نگه می‌دارد و درخواست بعدی هرگز فرستاده نمی‌شود
          set({
            loading: false,
            isFetching: false,
          });
        }
      },

      addAddress: async (data) => {
        const response = await addressService.create(data);

        set((state) => ({
          addresses: [response.data, ...state.addresses],
        }));

        return response.data;
      },

      updateAddress: async (id, data) => {
        const response = await addressService.update(id, data);

        set((state) => ({
          addresses: state.addresses.map((address) =>
            address._id === id ? response.data : address,
          ),
        }));
      },

      // بک‌اند مسیر جداگانه‌ای برای «پیش‌فرض کردن» ندارد؛ همان PUT آدرس را
      // با isDefault: true می‌گیرد و خودش پیش‌فرضِ قبلی را برمی‌دارد.
      // اسکیمای اعتبارسنجی آنجا همه‌ی فیلدها را الزامی می‌کند، پس باید کل
      // آدرس فرستاده شود، نه فقط همین یک فیلد.
      setDefaultAddress: async (id) => {
        const address = get().addresses.find((item) => item._id === id);

        if (!address) {
          throw new Error("آدرس مورد نظر پیدا نشد");
        }

        const response = await addressService.update(id, {
          ...address,
          isDefault: true,
        });

        const updated = response.data;

        set((state) => ({
          // پیش‌فرضِ قبلی روی سرور برداشته شده، ولی پاسخ فقط همین آدرس را
          // برمی‌گرداند؛ پس بقیه را اینجا هم باید پایین آورد.
          addresses: state.addresses.map((item) =>
            item._id === id ? updated : { ...item, isDefault: false },
          ),
          selectedAddress: updated,
        }));

        return updated;
      },

      removeAddress: async (id) => {
        await addressService.remove(id);

        set((state) => ({
          addresses: state.addresses.filter((address) => address._id !== id),
        }));
      },

      clearAddresses: () => {
        set({
          addresses: [],
          selectedAddress: null,
        });
      },
    }),

    {
      name: "nova-addresses",
      skipHydration: true,

      // فقط داده‌ی واقعی آدرس‌ها ذخیره می‌شود، نه وضعیت موقتِ درخواست‌ها
      partialize: (state) => ({
        addresses: state.addresses,
        selectedAddress: state.selectedAddress,
      }),

      // partialize فقط جلوی *نوشتنِ* فیلدهای موقت را می‌گیرد؛ localStorageِ
      // ذخیره‌شده از قبل از این تغییر ممکن است isFetching/loading قدیمی
      // داشته باشد که بدون merge دستی، همان مقدار خراب rehydrate می‌شود
      merge: (persistedState, currentState) => ({
        ...currentState,
        addresses: persistedState?.addresses ?? currentState.addresses,
        selectedAddress:
          persistedState?.selectedAddress ?? currentState.selectedAddress,
      }),
    },
  ),
);

export default useAddressStore;
