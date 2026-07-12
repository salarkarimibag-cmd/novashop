"use client";

import AddressForm from "@/components/addresses/AddressForm";
import AddressList from "@/components/addresses/AddressList";

export default function AddressesPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">مدیریت آدرس‌ها</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <AddressForm />
        </div>

        <div className="lg:col-span-2">
          <AddressList />
        </div>
      </div>
    </main>
  );
}
