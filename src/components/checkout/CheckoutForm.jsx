"use client";

import { useFormik } from "formik";
import checkoutSchema from "@/validations/checkoutSchema";
import Select from "@/components/ui/Select";
import iranCities from "@/data/iranCities";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea/Textarea";
import useCheckoutStore from "@/store/checkoutStore";

export default function CheckoutForm() {
  const { shippingAddress, setShippingAddress } = useCheckoutStore();

  const formik = useFormik({
    initialValues: shippingAddress || {
      fullName: "",
      phone: "",
      province: "",
      city: "",
      address: "",
      postalCode: "",
    },

    enableReinitialize: true,

    validationSchema: checkoutSchema,

    onSubmit: (values) => {
      setShippingAddress(values);
      alert("اطلاعات گیرنده ذخیره شد");
    },
  });
  const cities = iranCities[formik.values.province] || [];

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="rounded-2xl border bg-white p-6 shadow-sm"
    >
      <h2 className="mb-6 text-xl font-bold">اطلاعات گیرنده</h2>

      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="نام و نام خانوادگی"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && formik.errors.fullName}
        />

        <Input
          label="شماره موبایل"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && formik.errors.phone}
        />

        <Select
          label="استان"
          name="province"
          value={formik.values.province}
          onChange={(e) => {
            const province = e.target.value;

            formik.setFieldValue("province", province);
            formik.setFieldValue("city", "");
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.province && formik.errors.province}
        >
          <option value="">انتخاب استان</option>

          {Object.keys(iranCities).map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </Select>

        <Select
          label="شهر"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && formik.errors.city}
        >
          <option value="">انتخاب شهر</option>

          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-5">
        <Textarea
          label="آدرس"
          rows={4}
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && formik.errors.address}
        />
      </div>

      <div className="mt-5">
        <Input
          label="کد پستی"
          name="postalCode"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.postalCode && formik.errors.postalCode}
        />
      </div>
      <Button type="submit" className="mt-6">
        ذخیره اطلاعات گیرنده
      </Button>
    </form>
  );
}
