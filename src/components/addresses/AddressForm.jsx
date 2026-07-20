"use client";

import { useFormik } from "formik";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import iranCities from "@/data/iranCities";
import checkoutSchema from "@/validations/checkoutSchema";
import useAddressStore from "@/store/addressStore";

export default function AddressForm() {
  const { addAddress } = useAddressStore();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      province: "",
      city: "",
      address: "",
      postalCode: "",
    },

    validationSchema: checkoutSchema,

    onSubmit: (values, { resetForm }) => {
      addAddress(values);

      alert("آدرس با موفقیت ذخیره شد.");

      resetForm();
    },
  });

  const cities = iranCities[formik.values.province] || [];
  console.log({
    Button,
    Input,
    Select,
    Textarea,
  });
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">افزودن آدرس جدید</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <Input
          label="نام گیرنده"
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
            formik.handleChange(e);
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

        <Textarea
          label="آدرس"
          rows={4}
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && formik.errors.address}
        />

        <Input
          label="کد پستی"
          name="postalCode"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.postalCode && formik.errors.postalCode}
        />

        <Button type="submit" className="w-full">
          ذخیره آدرس
        </Button>
      </form>
    </div>
  );
}
