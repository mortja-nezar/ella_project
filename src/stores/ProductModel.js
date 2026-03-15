import { defineStore } from "pinia";
import axios from "axios";

export const useProductsStore = defineStore("productsModule", {
  state: () => ({
    FlashDeals: [],
    product: [],
    mob: [],
    newProducts: [],
    beauty: [],
    categoryProducts: [],
    categories: [
      { title: "beauty", route: "beauty" },
      { title: "fragrances", route: "fragrances" },
      { title: "groceries", route: "groceries" },
    ],
  }),

  actions: {
    async getProducts() {
      try {
        const response = await axios.get("https://dummyjson.com/products");

        this.FlashDeals = response.data.products;
        this.mob = response.data.products.filter(
          (el) => el.category === "beauty"
        );
        this.newProducts = response.data.products.filter(
          (el) => el.category === "groceries"
        );
        this.beauty = response.data.products.filter(
          (el) => el.category === "fragrances"
        );
      } catch (error) {
        console.error("Error fetching flash deals:", error);
      }
    },

    async getCategoryProducts(category) {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/category/${category}`
        );
        this.categoryProducts = response.data.products;
        return this.categoryProducts;
      } catch (error) {
        console.error("Error fetching category products:", error);
        return [];
      }
    },
    async getProductById(id) {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        this.product = response.data;
      } catch (error) {
        console.error("Error fetching product by ID:", error);
        this.product = null;
      }
    },
  },
});
