"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
};

const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,

      login: ({ user, token }) =>
        set({
          user,
          token,
          isAuthenticated: !!token,
        }),

      logout: () =>
        set({
          ...initialState,
        }),

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      updateUser: (data) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                ...data,
              }
            : null,
        })),

      setToken: (token) =>
        set({
          token,
          isAuthenticated: !!token,
        }),

      setLoading: (loading) =>
        set({
          loading,
        }),

     
    }),

    {
      name: "nova-auth",
    },
  ),
);

export default useAuthStore;
