import { create } from "zustand";

const useCheckoutStore = create((set) => ({
  shippingMethod: "normal",
  paymentMethod: "online",

  setShippingMethod: (method) =>
    set({
      shippingMethod: method,
    }),

  setPaymentMethod: (method) =>
    set({
      paymentMethod: method,
    }),
}));

export default useCheckoutStore;
