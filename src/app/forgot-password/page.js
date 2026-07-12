"use client";

import { useRouter } from "next/navigation";

import AuthLayout from "@/components/auth/AuthLayout";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleSubmit = async (values) => {
    console.log(values);

    alert("کد بازیابی با موفقیت ارسال شد.");

    router.push("/login");
  };

  return (
    <AuthLayout
      title="بازیابی رمز عبور"
      description="شماره موبایل خود را وارد کنید تا کد بازیابی برای شما ارسال شود."
    >
      <ForgotPasswordForm onSubmit={handleSubmit} />
    </AuthLayout>
  );
}
