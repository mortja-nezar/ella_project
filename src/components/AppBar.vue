<template>
  <v-app-bar color="#161880" class="pt-0" height="fit-content" absolute >
  
    <v-container fluid>
      <!-- First row: Logo, Search, Icons -->
      <v-row align="center">
        <!-- Logo -->
        <v-col cols="3">
          <img
            src="~@/assets/logo.png"
            alt="Logo"
            style="width: 60%; cursor: pointer"
            @click="router.push({ name: 'home' })"
          />
        </v-col>

        <!-- Search bar -->
        <v-col cols="5">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search for product"
            variant="outlined"
            hide-details
            class="rounded-pill bg-white"
          />
        </v-col>

        <!-- Icons: Availability, Wishlist, Account, Cart -->
        <v-col cols="4">
          <div class="d-flex justify-space-between align-center text-white">
            <!-- Availability info -->
            <div class="availability">
              <span>Available 24/7</span><br />
              <span>(+99) 123-456-789</span>
            </div>

            <!-- Wishlist -->
            <v-btn text class="d-flex flex-column align-center">
              <v-icon>mdi-heart-outline</v-icon>
              <span>Wishlist</span>
            </v-btn>

            <!-- Sign In -->
            <v-btn
              text
              class="d-flex flex-column align-center"
              @click="router.push({ name: 'sign_in' })"
            >
              <v-icon>mdi-account-outline</v-icon>
              <span>Sign In</span>
            </v-btn>

            <!-- Cart -->
            <div
              class="d-flex flex-column align-center"
              style="cursor: pointer"
              @click="toggleDrawer"
            >
              <v-badge
                v-if="cart.items.length > 0"
                location="top right"
                color="blue"
                :content="cart.items.length"
                offset-x="-15"
              ></v-badge>
              <v-icon>mdi-cart-outline</v-icon>
              <span>Cart</span>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Second row: Categories links + Help + Language -->
      <v-row align="center" class="mt-1">
        <!-- Categories -->
        <v-col cols="7">
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
                  params: { category: category.route, title: category.title },
                }"
                style="color: white; text-decoration: none"
              >
                {{ category.title }}
              </router-link>
            </li>
          </ul>
        </v-col>

        <!-- Help & Language -->
        <v-col
          cols="5"
          class="d-flex justify-end align-center"
          style="gap: 35px"
        >
          <!-- Help button -->
          <div class="d-flex align-center text-white" style="gap: 5px">
            <v-icon color="#0a6cdc">mdi-account-voice</v-icon>
            <span>Help</span>
          </div>

          <!-- Language & Currency Dropdown -->
          <v-menu>
            <template #activator="{ props }">
              <div
                class="d-flex align-center text-white"
                v-bind="props"
                style="gap: 5px; cursor: pointer"
              >
                <v-icon>mdi-translate</v-icon>
                <span>{{ selectedLang }}</span>
                <v-icon>mdi-chevron-down</v-icon>
              </div>
            </template>

            <v-list>
              <v-list-item
                v-for="(lang, index) in languages"
                :key="index"
                @click="selectLang(lang)"
              >
                <v-list-item-title>{{ lang }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="js">
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { useProductsStore } from "@/stores/ProductModel";
import { useCartStore } from "@/stores/CartStory";

// Router
const router = useRouter();

// Cart store
const cart = useCartStore();

// Products store
const productsStore = useProductsStore();

// Drawer toggle (via emitter)
const emitter = inject("emitter");
const toggleDrawer = () => {
  emitter?.emit("toggle-drawer");
};

// Search input
const search = ref("");

// Language selector
const languages = ["EN / USD", "DE / EUR"];
const selectedLang = ref(languages[0]);
const selectLang = (lang) => {
  selectedLang.value = lang;
};
</script>

<style scoped>
ul li {
  cursor: pointer;
}

.availability {
  text-align: right;
  font-size: 0.9rem;
}
</style>
