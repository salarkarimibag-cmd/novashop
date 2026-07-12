"use client";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import useAuthStore from "@/store/authStore";
import authService from "@/services/authService";
export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const handleLogin = async (values) => {
    try {
      const data = await authService.login(values);
      login(data);
      router.push("/");
    } catch (error) {
      alert(error.message || "ورود ناموفق بود");
    }
  };
  return (
    <AuthLayout
      title="ورود به حساب کاربری"
      footerText="حساب کاربری ندارید؟"
      footerLink="/register"
      footerLinkText="ثبت‌نام"
    >
      {" "}
      <LoginForm onSubmit={handleLogin} />{" "}
    </AuthLayout>
  );
}
