import * as Yup from "yup";

const addressSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, "نام معتبر نیست")
    .required("نام و نام خانوادگی الزامی است"),

  phone: Yup.string()
    .trim()
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست")
    .required("شماره موبایل الزامی است"),

  province: Yup.string().trim().required("استان را انتخاب کنید"),

  city: Yup.string().trim().required("شهر را انتخاب کنید"),

  street: Yup.string()
    .trim()
    .min(10, "آدرس خیلی کوتاه است")
    .required("آدرس الزامی است"),

  plaque: Yup.string().trim().required("پلاک الزامی است"),

  unit: Yup.string().trim(),

  postalCode: Yup.string()
    .trim()
    .matches(/^\d{10}$/, "کدپستی باید ۱۰ رقم باشد")
    .required("کدپستی الزامی است"),

  isDefault: Yup.boolean().default(false),
});

export default addressSchema;
