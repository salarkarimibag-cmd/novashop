import * as Yup from "yup";

const checkoutSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "نام معتبر نیست")
    .required("نام و نام خانوادگی الزامی است"),

  phone: Yup.string()
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست")
    .required("شماره موبایل الزامی است"),

  province: Yup.string().required("استان را انتخاب کنید"),

  city: Yup.string().required("شهر را وارد کنید"),

  address: Yup.string()
    .min(10, "آدرس خیلی کوتاه است")
    .required("آدرس الزامی است"),

  postalCode: Yup.string()
    .matches(/^\d{10}$/, "کدپستی باید ۱۰ رقم باشد")
    .required("کدپستی الزامی است"),
});

export default checkoutSchema;
