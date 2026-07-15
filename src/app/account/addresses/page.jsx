"use client";

import useAddressStore from "@/store/addressStore";

export default function AddressesPage() {
  const addresses = useAddressStore((state) => state.addresses);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">آدرس‌های من</h1>

      {addresses.map((address) => (
        <div
          key={address.id}
          className="
rounded-xl
border
p-4
mb-4
"
        >
          <p>{address.fullName}</p>

          <p>{address.address}</p>
        </div>
      ))}
    </div>
  );
}
