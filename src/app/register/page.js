"use client";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import authService from "@/services/authService";
export default function RegisterPage() {
  const router = useRouter();
  const handleRegister = async (values) => {
    try {
      await authService.register(values);
      alert("ثبت‌نام با موفقیت انجام شد.");
      router.push("/login");
    } catch (error) {
      alert(error.message || "ثبت‌نام ناموفق بود");
    }
  };
  return (
    <AuthLayout
      title="ایجاد حساب کاربری"
      footerText="قبلاً ثبت‌نام کرده‌اید؟"
      footerLink="/login"
      footerLinkText="ورود"
    >
      {" "}
      <RegisterForm onSubmit={handleRegister} />{" "}
    </AuthLayout>
  );
}
