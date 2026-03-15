<template>
  <div class="Finish_Page">
    <v-container>
      <v-row>
        <v-col cols="3">
          <ul style="list-style: none; gap: 25px; padding: 0; margin: 0">
            <li><h2>CATEGORIES</h2></li>
            <li
              v-for="category in productsStore.categories"
              :key="category.title"
            >
              <router-link
                :to="{
                  name: 'product_category',
                  params: { category: category.route, title: category.title },
                }"
                style="color: black; text-decoration: none"
              >
                {{ category.title }}
              </router-link>
            </li>
          </ul>
        </v-col>
        <v-col cols="3">
          <h2>FURTHER INFO.</h2>
          <h5>About us</h5>
          <h5>Gift Certificates</h5>
          <h5>Theme Styles</h5>
          <h5>Contact us</h5>
          <h5>Blog</h5>
          <h5>Brands</h5>
          <h5>Sitemap</h5>
        </v-col>
        <v-col cols="3">
          <h2>CUSTOMER SERVICE</h2>
          <h5>Help & FAQs</h5>
          <h5>Terms of Conditions</h5>
          <h5>Privacy Policy</h5>
          <h5>Online Returns Policy</h5>
          <h5>Rewards Program</h5>
          <h5>Rebate Center</h5>
          <h5>Partners</h5>
        </v-col>
        <v-col cols="3">
          <img src="../../assets/d.webp" class="w-100 h-auto" alt="" />
          <br />
          <span>
            <v-icon>mdi-location</v-icon>
            678 Market Street <br />Elzawya Stores, Egypt
          </span>
          <br />
          <span><v-icon>mdi-phone</v-icon> Call us at (+20) 1100800030</span>
          <br />
          <span><v-icon>mdi-email</v-icon> info@elzawyastores.com</span>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useProductsStore } from "@/stores/ProductModel";
const productsStore = useProductsStore();
</script>
