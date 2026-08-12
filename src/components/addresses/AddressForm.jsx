"use client";

import { useFormik } from "formik";
import { toast } from "sonner";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

import iranCities from "@/data/iranCities";
import addressSchema from "@/validations/addressSchema";

import useAddressStore from "@/store/addressStore";

export default function AddressForm() {
  const addAddress = useAddressStore((state) => state.addAddress);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      province: "",
      city: "",
      street: "",
      plaque: "",
      unit: "",
      postalCode: "",
      isDefault: false,
    },

    validationSchema: addressSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        await addAddress(values);

        toast.success("آدرس با موفقیت ذخیره شد");

        resetForm();
      } catch (error) {
        toast.error(error.message || "ذخیره آدرس انجام نشد");
      }
    },
  });

  const cities = iranCities[formik.values.province] || [];

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
            formik.setFieldValue("province", e.target.value);
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
          label="خیابان و آدرس"
          rows={4}
          name="street"
          value={formik.values.street}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.street && formik.errors.street}
        />

        <Input
          label="پلاک"
          name="plaque"
          value={formik.values.plaque}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.plaque && formik.errors.plaque}
        />

        <Input
          label="واحد (اختیاری)"
          name="unit"
          value={formik.values.unit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.unit && formik.errors.unit}
        />

        <Input
          label="کد پستی"
          name="postalCode"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.postalCode && formik.errors.postalCode}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isDefault"
            checked={formik.values.isDefault}
            onChange={formik.handleChange}
          />
          آدرس پیش‌فرض
        </label>

        <Button type="submit" disabled={formik.isSubmitting} className="w-full">
          {formik.isSubmitting ? "در حال ذخیره..." : "ذخیره آدرس"}
        </Button>
      </form>
    </div>
  );
}
