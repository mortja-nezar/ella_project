/** @format */

// src/stores/UserInformation.js
import { defineStore } from "pinia";

export const useUserInfoStore = defineStore("userinfo", {
  state: () => ({
    userinfo: [], // قائمة المستخدمين
    currentUserId: null, // ID المستخدم الحالي
  }),

  getters: {
    currentUser: (state) => {
      return state.userinfo.find((u) => u.id === state.currentUserId) || null;
    },
  },

  actions: {
    loadUserInfo() {
      const stored = localStorage.getItem("userinfo");
      if (stored) this.userinfo = JSON.parse(stored);

      const current = localStorage.getItem("currentUserId");
      if (current) this.currentUserId = parseInt(current);
    },

    addUser(user) {
      this.userinfo.push({
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
        cart: {
          cartnum: user.cartnum || 0,
          cvv: user.cvv || 0,
          ExpireDate: user.ExpireDate || "",
          items: [], // سلة خاصة بكل مستخدم
        },
      });
      this.saveToLocalStorage();
    },

    setCurrentUser(id) {
      this.currentUserId = id;
      localStorage.setItem("currentUserId", id);
    },

    updateCart(id, { cartnum, cvv, ExpireDate, items }) {
      const user = this.userinfo.find((u) => u.id === id);
      if (user) {
        if (cartnum !== undefined) user.cart.cartnum = cartnum;
        if (cvv !== undefined) user.cart.cvv = cvv;
        if (ExpireDate !== undefined) user.cart.ExpireDate = ExpireDate;
        if (items !== undefined) user.cart.items = items;
        this.saveToLocalStorage();
      }
    },

    saveToLocalStorage() {
      localStorage.setItem("userinfo", JSON.stringify(this.userinfo));
    },
  },
});
