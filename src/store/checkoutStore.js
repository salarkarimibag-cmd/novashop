import { create } from "zustand";

const useCheckoutStore = create((set) => ({
  shippingMethod: "normal",

  setShippingMethod: (method) =>
    set({
      shippingMethod: method,
    }),
}));

export default useCheckoutStore;
