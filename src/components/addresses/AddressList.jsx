"use client";

import Button from "@/components/ui/Button";
import useAddressStore from "@/store/addressStore";

export default function AddressList() {
  const { addresses, removeAddress, setDefaultAddress } = useAddressStore();

  if (addresses.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">هنوز آدرسی ثبت نشده است.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg">{address.fullName}</h3>

                {address.isDefault && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    پیش‌فرض
                  </span>
                )}
              </div>

              <p className="text-gray-600">{address.phone}</p>

              <p className="text-gray-600">
                {address.province} - {address.city}
              </p>

              <p className="text-gray-700">{address.address}</p>

              <p className="text-gray-500">کد پستی: {address.postalCode}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {!address.isDefault && (
                <Button
                  variant="outline"
                  onClick={() => setDefaultAddress(address.id)}
                >
                  انتخاب به عنوان پیش‌فرض
                </Button>
              )}

              <Button
                variant="danger"
                onClick={() => removeAddress(address.id)}
              >
                حذف
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
