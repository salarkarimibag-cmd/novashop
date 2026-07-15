import { create } from "zustand";
import { persist } from "zustand/middleware";

const createInitialAddress = () => ({
  fullName: "",
  phone: "",
  province: "",
  city: "",
  address: "",
  postalCode: "",
});

const useCheckoutStore = create(
  persist(
    (set) => ({
      shippingAddress: createInitialAddress(),

      shippingMethod: "normal",

      paymentMethod: "online",

      discountCode: "",

      note: "",

      setShippingAddress: (data) =>
        set((state) => ({
          shippingAddress: {
            ...state.shippingAddress,
            ...data,
          },
        })),

      setShippingMethod: (method) =>
        set({
          shippingMethod: method,
        }),

      setPaymentMethod: (method) =>
        set({
          paymentMethod: method,
        }),

      setDiscountCode: (code) =>
        set({
          discountCode: code,
        }),

      setNote: (note) =>
        set({
          note,
        }),

      clearAddress: () =>
        set({
          shippingAddress: createInitialAddress(),
        }),

      clearCheckout: () =>
        set({
          shippingAddress: createInitialAddress(),

          shippingMethod: "normal",

          paymentMethod: "online",

          discountCode: "",

          note: "",
        }),
    }),

    {
      name: "nova-checkout",
      skipHydration: true,
    },
  ),
);

export default useCheckoutStore;
