"use client";

import useAuthStore from "@/store/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiClient(endpoint, options = {}) {
  const token = useAuthStore.getState().token;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // اگر Token منقضی شده
  if (response.status === 401) {
    useAuthStore.getState().clearAuth();

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }

    throw new Error("نشست شما منقضی شده است");
  }

  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch (error) {
    console.error("Invalid JSON Response:");
    console.error("URL:", url);
    console.error("STATUS:", response.status);
    console.error("BODY:", text);

    throw new Error("پاسخ سرور معتبر نیست. احتمالاً مسیر API اشتباه است");
  }

  if (!response.ok) {
    throw new Error(data.message || "خطایی رخ داده است");
  }

  return data;
}

export default apiClient;
