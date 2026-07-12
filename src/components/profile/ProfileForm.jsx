"use client";

import { useFormik } from "formik";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import useAuthStore from "@/store/authStore";

export default function ProfileForm() {
  const { user, updateUser } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      fullName: user?.fullName || "",
      phone: user?.phone || "",
    },

    enableReinitialize: true,

    onSubmit: (values) => {
      updateUser(values);

      alert("اطلاعات پروفایل با موفقیت بروزرسانی شد.");
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="rounded-2xl border bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-xl font-bold">ویرایش اطلاعات</h2>

      <div className="space-y-5">
        <Input
          label="نام و نام خانوادگی"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
        />

        <Input
          label="شماره موبایل"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />

        <Button type="submit">ذخیره تغییرات</Button>
      </div>
    </form>
  );
}
