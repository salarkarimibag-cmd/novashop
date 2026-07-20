"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import useAuthStore from "@/store/authStore";
import { ProfileInfo, ProfileForm } from "@/components/account/profile";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
   router.replace("/login");
  };


  return (
  
      <main className="container mx-auto px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold">پروفایل کاربری</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <ProfileInfo />

          <div className="space-y-6 lg:col-span-2">
            <ProfileForm />

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <Button onClick={handleLogout} className="w-full">
                خروج از حساب
              </Button>
            </div>
          </div>
        </div>
      </main>
   
  );
}
