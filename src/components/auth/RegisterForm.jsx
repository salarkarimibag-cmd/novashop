"use client";
import { useFormik } from "formik";
import registerSchema from "@/validations/registerSchema";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
export default function RegisterForm({ onSubmit }) {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      {" "}
      <Input
        label="نام و نام خانوادگی"
        name="fullName"
        value={formik.values.fullName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.fullName && formik.errors.fullName}
      />{" "}
      <Input
        label="شماره موبایل"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.phone && formik.errors.phone}
      />{" "}
      <Input
        type="password"
        label="رمز عبور"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && formik.errors.password}
      />{" "}
      <Input
        type="password"
        label="تکرار رمز عبور"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
      />{" "}
      <Button type="submit" className="w-full">
        {" "}
        ثبت نام{" "}
      </Button>{" "}
    </form>
  );
}
