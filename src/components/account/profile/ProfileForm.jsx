"use client";

import { useFormik } from "formik";
import { toast } from "sonner";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import useAuthStore from "@/store/authStore";
import profileService from "@/services/profileService";

export default function ProfileForm() {
  const user = useAuthStore((state) => state.user);

  const updateUser = useAuthStore((state) => state.updateUser);

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      phone: user?.phone || "",
    },

    enableReinitialize: true,

    onSubmit: async (values) => {
      try {
        const updatedUser = await profileService.updateProfile(values);

        // منبع حقیقت، پاسخ سرور است نه چیزی که فرستادیم
        updateUser(updatedUser);

        toast.success("اطلاعات پروفایل با موفقیت بروزرسانی شد");
      } catch (error) {
        toast.error(error.message || "بروزرسانی اطلاعات انجام نشد");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <h2 className="mb-6 text-xl font-bold">ویرایش اطلاعات</h2>

      <div className="space-y-5">
        <Input
          label="نام و نام خانوادگی"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <Input
          label="شماره موبایل"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />

        <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>
      </div>
    </form>
  );
}
