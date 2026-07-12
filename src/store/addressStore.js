import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAddressStore = create(
  persist(
    (set) => ({
      addresses: [],

      addAddress: (address) =>
        set((state) => ({
          addresses: [
            ...state.addresses,
            {
              id: Date.now(),
              ...address,
              isDefault: state.addresses.length === 0,
            },
          ],
        })),

      removeAddress: (id) =>
        set((state) => {
          const addresses = state.addresses.filter(
            (address) => address.id !== id,
          );

          if (
            addresses.length > 0 &&
            !addresses.some((address) => address.isDefault)
          ) {
            addresses[0].isDefault = true;
          }

          return { addresses };
        }),

      updateAddress: (id, data) =>
        set((state) => ({
          addresses: state.addresses.map((address) =>
            address.id === id ? { ...address, ...data } : address,
          ),
        })),

      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((address) => ({
            ...address,
            isDefault: address.id === id,
          })),
        })),
    }),
    {
      name: "nova-addresses",
      skipHydration: true,
    },
  ),
);

export default useAddressStore;
