import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCheckoutStore = create(
  persist(
    (set) => ({
      shippingAddress: {
        fullName: "",
        phone: "",
        province: "",
        city: "",
        address: "",
        postalCode: "",
      },

      shippingMethod: "normal",

      paymentMethod: null,

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

      clearCheckout: () =>
        set({
          shippingAddress: {
            fullName: "",
            phone: "",
            province: "",
            city: "",
            address: "",
            postalCode: "",
          },

          shippingMethod: "normal",

          paymentMethod: null,
        }),
    }),

    {
      name: "nova-checkout",
       skipHydration: true,
    },
  ),
);

export default useCheckoutStore;
