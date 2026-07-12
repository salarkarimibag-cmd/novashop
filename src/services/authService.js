const authService = {
  async login(data) {
    console.log("Login:", data);
    return {
      user: { id: 1, fullName: "Nova User", phone: data.phone },
      token: "fake-jwt-token",
    };
  },
  async register(data) {
    console.log("Register:", data);
    return { success: true };
  },
  async me() {
    return null;
  },
  async logout() {
    return true;
  },
};
export default authService;
