<template>
  <div class="categories">
    <!-- Cyber Banner -->
    <div class="cyber-banner" style="width: 100%; height: 250px">
      <img
        src="@/assets/cyber-banner.webp"
        style="width: 100%; height: 100%"
        alt="Cyber Banner"
      />
    </div>
    <h1 style="margin-top: 10px">Shop By Categories</h1>
    <!-- Categories -->
    <div class="categories mt-6">
      <v-container fluid>
        <v-row class="pl-6">
          <v-col cols="2" v-for="category in categories" :key="category.title">
            <v-card class="text-center" elevation="0">
              <v-hover v-slot="{ isHovering, props: hoverProps }">
                <div v-bind="hoverProps">
                  <img
                    :src="category.img"
                    alt=""
                    style="width: 100px; height: 100px; cursor: pointer"
                    :style="{
                      transform: isHovering ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.5s ease-in-out',
                    }"
                  />
                </div>
              </v-hover>
              <p>{{ category.title }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// الصور لازم تتعرف هكذا
const categories = ref([
  {
    title: "mobile phones",
    img: new URL("@/assets/cat/mobile-phones.avif", import.meta.url).href,
  },
  {
    title: "Laptops & Tablets",
    img: new URL("@/assets/cat/laptops-tablets.avif", import.meta.url).href,
  },
  {
    title: "Televisions",
    img: new URL("@/assets/cat/televisions.avif", import.meta.url).href,
  },
  {
    title: "PC's & Accessories",
    img: new URL("@/assets/cat/pcs-accessories.avif", import.meta.url).href,
  },
  {
    title: "Audio & Video",
    img: new URL("@/assets/cat/audio-video.avif", import.meta.url).href,
  },
  {
    title: "Gaming",
    img: new URL("@/assets/cat/gaming-accessories.avif", import.meta.url).href,
  },
  {
    title: "Home Appliances",
    img: new URL("@/assets/cat/home-appliances.avif", import.meta.url).href,
  },
  {
    title: "Kitchen Appliances",
    img: new URL("@/assets/cat/kitchen-appliances.avif", import.meta.url).href,
  },
  {
    title: "Cameras",
    img: new URL("@/assets/cat/cameras.avif", import.meta.url).href,
  },
  {
    title: "Consumables",
    img: new URL("@/assets/cat/consumables.avif", import.meta.url).href,
  },
  {
    title: "Smart Homes",
    img: new URL("@/assets/cat/smart-homes.avif", import.meta.url).href,
  },
  {
    title: "Accessories",
    img: new URL("@/assets/cat/accessories.avif", import.meta.url).href,
  },
]);
</script>
