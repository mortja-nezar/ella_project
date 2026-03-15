/** @format */

// src/stores/CartStory.js
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cart")) || [],
  }),
  actions: {
    addItem(itemToFind) { 
      const existing = this.items.find((item) => item.id === itemToFind.id);
      if (existing) {
        existing.quantity += itemToFind.quantity;
      } else {
        this.items.push({...itemToFind});
      }
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
    removeItem(index) {
      this.items.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
    increaseQuantity(index) {
      if (this.items[index]) this.items[index].quantity++;
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
    decreaseQuantity(index) {
      if (this.items[index] && this.items[index].quantity > 1)
        this.items[index].quantity--;
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
  },
});
