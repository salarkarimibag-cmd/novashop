"use client";

import useAuthStore from "@/store/authStore";
import clearSession from "@/lib/session";

export default function useAuth() {
  const { user, token, loading, login, setUser, setLoading } = useAuthStore();

  // مقدار محاسبه‌شده است، نه یک state جدا — پس هیچ‌وقت با user/token ناهماهنگ نمی‌شود
  const isAuthenticated = Boolean(token && user);

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    // خروج کامل، نه فقط پاک کردن توکن
    logout: clearSession,
    setUser,
    setLoading,
  };
}
