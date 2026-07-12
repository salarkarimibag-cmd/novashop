"use client";
import { useFormik } from "formik";
import loginSchema from "@/validations/loginSchema";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
export default function LoginForm({ onSubmit }) {
  const formik = useFormik({
    initialValues: { phone: "", password: "" },
    validationSchema: loginSchema,
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      {" "}
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
      <Button type="submit" className="w-full">
        {" "}
        ورود{" "}
      </Button>{" "}
    </form>
  );
}
