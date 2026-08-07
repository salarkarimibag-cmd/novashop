import { create } from "zustand";
import { persist } from "zustand/middleware";

import addressService from "@/services/addressService";

const useAddressStore = create(
  persist(
    (set) => ({
      addresses: [],

      selectedAddress: null,

      selectAddress: (address) =>
        set({
          selectedAddress: address,
        }),

      loading: false,

      fetchAddresses: async () => {
        set({
          loading: true,
        });

        try {
          const response = await addressService.getAll();
          const addresses = response.data;
          console.log("ADDRESS RESPONSE:", response);
          console.log("ADDRESS DATA:", response.data);

          set({
            addresses,
            selectedAddress:
              addresses.find((address) => address.isDefault) ||
              addresses[0] ||
              null,
            loading: false,
          });
        } catch (error) {
          set({
            loading: false,
          });

          throw error;
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
    },
  ),
);

export default useAddressStore;
