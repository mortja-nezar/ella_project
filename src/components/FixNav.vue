<template>
  <v-app-bar color="#161880" dark app fixed elevation="2">
    <v-container fluid>
      <v-row align="center">
        <!-- شعار الموقع -->
        <v-col cols="2">
          <img
            src="@/assets/logo.png"
            alt="Logo"
            style="width: 60%; cursor: pointer"
            @click="$router.push({ name: 'home' })"
          />
        </v-col>

        <!-- قائمة الأقسام -->
        <v-col cols="7">
          <v-row class="d-flex justify-start">
            <v-col>
              <ul
                class="d-flex text-white"
                style="list-style: none; gap: 25px; padding: 0; margin: 0"
              >
                <li
                  v-for="category in productsStore.categories"
                  :key="category.title"
                >
                  <router-link
                    :to="{
                      name: 'product_category',
                      params: {
                        category: category.route,
                        title: category.title,
                      },
                    }"
                    style="color: white; text-decoration: none"
                  >
                    {{ category.title }}
                  </router-link>
                </li>
              </ul>
            </v-col>
          </v-row>
        </v-col>

        <!-- أيقونات السلة والبحث -->
        <v-col cols="3" class="d-flex justify-end gap-4">
          <!-- السلة -->
          <v-btn
            text
            class="d-flex flex-column align-center"
            @click="toggleDrawer"
          >
            <v-badge
              v-if="cart.items.length > 0"
              color="blue"
              :content="cart.items.length"
              offset-x="-10"
              offset-y="0"
              overlap
            >
              <v-icon size="28">mdi-cart-outline</v-icon>
            </v-badge>
            <v-icon v-else size="28">mdi-cart-outline</v-icon>
          </v-btn>

          <!-- البحث -->
          <v-btn text class="d-flex flex-column align-center">
            <v-icon size="28">mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { inject } from "vue";
import { useProductsStore } from "@/stores/ProductModel";
import { useCartStore } from "@/stores/CartStory"; // استيراد الكارت ستور

const productsStore = useProductsStore();
const cart = useCartStore();
const emitter = inject("emitter");

const toggleDrawer = () => {
  emitter.emit("toggle-drawer");
};
</script>

<style scoped>
.v-app-bar {
  padding: 0 16px;
  z-index: 10; /* لضمان أن الشريط فوق المحتوى */
}

.v-btn {
  min-width: 48px;
}
</style>
