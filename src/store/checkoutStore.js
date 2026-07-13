import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialAddress = {
  fullName: "",
  phone: "",
  province: "",
  city: "",
  address: "",
  postalCode: "",
};

const useCheckoutStore = create(
  persist(
    (set) => ({
      shippingAddress: initialAddress,

      shippingMethod: "normal",

      paymentMethod: "online",

      setShippingAddress: (data) =>
        set({
          shippingAddress: data,
        }),

      setShippingMethod: (method) =>
        set({
          shippingMethod: method,
        }),

      setPaymentMethod: (method) =>
        set({
          paymentMethod: method,
        }),

      clearAddress: () =>
        set({
          shippingAddress: initialAddress,
        }),

      clearCheckout: () =>
        set({
          shippingAddress: initialAddress,

          shippingMethod: "normal",

          paymentMethod: "online",
        }),
    }),

    {
      name: "nova-checkout",
      skipHydration: true,
    },
  ),
);

export default useCheckoutStore;
