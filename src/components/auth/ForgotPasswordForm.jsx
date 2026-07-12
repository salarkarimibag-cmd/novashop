"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
const forgotPasswordSchema = Yup.object({
  phone: Yup.string()
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست")
    .required("شماره موبایل الزامی است"),
});
export default function ForgotPasswordForm({ onSubmit }) {
  const formik = useFormik({
    initialValues: { phone: "" },
    validationSchema: forgotPasswordSchema,
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
      <Button type="submit" className="w-full">
        {" "}
        ارسال کد بازیابی{" "}
      </Button>{" "}
    </form>
  );
}
