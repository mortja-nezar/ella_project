<template>
  <div class="home" style="margin-top: 30px">
    <UpperBanner />
    <TheFeature />
    <TopOffers />
    <!-- Flash Deals -->
    <FlashDeals
      v-if="productsStore.FlashDeals.length"
      :products="productsStore.FlashDeals"
    />
    <TopCats />
    <!-- منتجات جديدة -->
    <NewProdect :products="productsStore.newProducts" />
    <!-- قسم الجودة -->
    <QalityElaviton />
    <!-- موبايلات -->
    <FlashDeals v-if="productsStore.mob.length" :products="productsStore.mob" />
    <div
      class="imagian"
      style="margin-top: 20px; height: auto; height: 100%; margin-bottom: 20px"
    >
      <v-container fluid>
        <v-row>
          <v-col cols="6" class="pr-4">
            <img
              style="
                height: 100%;
                width: 100%;
                object-fit: cover;
                border-radius: 10px;
              "
              src="../assets/cat/Ellamart - Home_files/band-left-cover.0f5e42a0.webp"
              alt=""
            />
          </v-col>
          <v-col cols="6" class="pl-4">
            <img
              style="
                height: 100%;
                width: 100%;
                object-fit: cover;
                border-radius: 10px;
              "
              src="../assets/cat/Ellamart - Home_files/band-right-cover.eb471e34.webp"
              alt=""
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <FlashDeals
      v-if="productsStore.beauty.length"
      :products="productsStore.beauty"
    />
    <img
      src="../assets/cat/Ellamart - Home_files/tv-banner.fd369ad6.webp"
      class="w-100 h-auto pt-14"
      alt=""
    />
    <WhyShoping />
  </div>
</template>

<script setup>
import UpperBanner from "@/components/home_page/UpperBanner.vue";
import TheFeature from "@/components/home_page/TheFeature.vue";
import TopOffers from "@/components/home_page/TopOffers.vue";
import FlashDeals from "@/components/home_page/FlashDeals.vue";
import TopCats from "@/components/home_page/TopCatagortes.vue";
import NewProdect from "@/components/home_page/NewProdect.vue";
import QalityElaviton from "@/components/home_page/QalityElaviton.vue";
import WhyShoping from "@/components/home_page/WhyShoping.vue";

import { useProductsStore } from "@/stores/ProductModel.js";
import { onMounted } from "vue";

const productsStore = useProductsStore();

onMounted(() => {
  document.documentElement.scrollTop = 0;
  productsStore.getProducts();
});
</script>
