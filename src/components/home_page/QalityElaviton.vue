<template>
  <div class="quality-section py-13 bg-grey-lighten-3">
    <v-container fluid>
      <v-row justify="center" align="center" class="text-center">
        <v-col
          v-for="(card, index) in cards"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="2"
        >
          <v-hover v-slot="{ isHovering, props }"
            ><v-card
              v-bind="props"
              class="d-flex flex-column align-center justify-center pa-4"
              height="300"
              :elevation="isHovering ? 12 : 0"
              :color="isHovering ? 'blue' : 'white'"
              style="cursor: pointer"
            >
              <img
                :src="card.img"
                class="mb-3"
                style="width: 75px; height: 75px"
                contain
              />
              <v-card-title class="text-h6" style="font-size: 16px">{{
                card.title
              }}</v-card-title>
              <v-card-text class="text-body-2">{{ card.dec }}</v-card-text>
            </v-card></v-hover
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from "vue";

const cards = ref([
  {
    title: "Quality And Saving",
    dec: "Comprehensive quality control and affordable prices",
    img: new URL("../../assets/cat/star.png", import.meta.url).href,
  },
  {
    title: "Global Warehouse",
    dec: "37 Overseas Warehouses",
    img: new URL("../../assets/cat/warehouse.png", import.meta.url).href,
  },
  {
    title: "Fast Shipping",
    dec: "Fast and convenient door to door deliver",
    img: new URL("../../assets/cat/fast-delivery.png", import.meta.url).href,
  },
  {
    title: "Payment Security",
    dec: "More than 10 different secure payment methods",
    img: new URL("../../assets/cat/shield.png", import.meta.url).href,
  },
  {
    title: "Have Questions?",
    dec: "24/7 Customer Service - We're here and happy to help!",
    img: new URL("../../assets/cat/help.png", import.meta.url).href,
  },
]);
</script>

<style scoped>
.quality-section {
  background-color: #f5f5f5;
}
</style>
