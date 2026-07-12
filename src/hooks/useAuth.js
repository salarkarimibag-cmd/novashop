"use client";
import useAuthStore from "@/store/authStore";
export default function useAuth() {
  const {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    setUser,
    setLoading,
  } = useAuthStore();
  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    setUser,
    setLoading,
  };
}
