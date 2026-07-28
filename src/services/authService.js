const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authService = {
  async login(credentials) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "ورود ناموفق بود");
    }

    return data;
  },

  async register(userData) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "ثبت‌نام ناموفق بود");
    }

    return data;
  },

  async me(token) {
    const res = await fetch(`${API_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  },

  async logout() {
    return true;
  },
};

export default authService;
