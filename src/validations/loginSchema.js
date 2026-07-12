import * as Yup from "yup";

const loginSchema = Yup.object({
  phone: Yup.string()
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست")
    .required("شماره موبایل الزامی است"),

  password: Yup.string()
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
    .required("رمز عبور الزامی است"),
});

export default loginSchema;
