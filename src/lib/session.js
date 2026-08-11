"use client";

import useAuthStore from "@/store/authStore";
import useCartStore from "@/store/cartStore";
import useWishlistStore from "@/store/wishlistStore";
import useCheckoutStore from "@/store/checkoutStore";
import useOrderStore from "@/store/orderStore";
import useAddressStore from "@/store/addressStore";

/**
 * پایان دادن به نشست کاربر.
 *
 * تنها راه درست خروج از حساب؛ علاوه بر پاک کردن توکن، تمام داده‌های شخصی
 * ذخیره‌شده در localStorage را هم پاک می‌کند تا برای کاربر بعدیِ همان
 * مرورگر باقی نماند.
 */
export default function clearSession() {
  useAuthStore.getState().logout();

  useCartStore.getState().resetCart();

  useWishlistStore.getState().clearWishlist();

  useCheckoutStore.getState().clearCheckout();

  useOrderStore.getState().clearOrders();

  useOrderStore.getState().clearCurrentOrder();

  useAddressStore.getState().clearAddresses();
}
