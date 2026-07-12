import * as Yup from "yup";
const registerSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "نام باید حداقل ۳ کاراکتر باشد")
    .required("نام و نام خانوادگی الزامی است"),
  phone: Yup.string()
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست")
    .required("شماره موبایل الزامی است"),
  password: Yup.string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
    .required("رمز عبور الزامی است"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "تکرار رمز عبور صحیح نیست")
    .required("تکرار رمز عبور الزامی است"),
});
export default registerSchema;
