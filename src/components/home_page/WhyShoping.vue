<template>
  <div class="Wht_Shoping pt-14">
    <h2><span style="color: #10ffda">Why Shop</span> with us?</h2>
    <v-container fluid>
      <v-row>
        <v-col cols="3" v-for="(card, index) in cards" :key="index">
          <v-card elevation="0">
            <img :src="card.img" alt="" />
            <v-card-title>{{ card.title }}</v-card-title>
            <v-card-text>{{ card.doc }}</v-card-text>
            <v-card-action><a href="#">learn more ...</a></v-card-action>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
const cards = ref([
  {
    title: "Free Shipping on First order",
    doc: "Present suscipit mattis facilisis.",
    img: new URL("../../assets/cat/download.png", import.meta.url).href,
  },
  {
    title: "Weekly Flase Sale",
    doc: "Present suscipit mattis facilisis.",
    img: new URL("../../assets/cat/ddd.png", import.meta.url).href,
  },
  {
    title: "Anual Payment Discount",
    doc: "Present suscipit mattis facilisis.",
    img: new URL("../../assets/cat/dd.png", import.meta.url).href,
  },
  {
    title: "Cashback Reward Program",
    doc: "Present suscipit mattis facilisis.",
    img: new URL("../../assets/cat/d.png", import.meta.url).href,
  },
]);
</script>

<style scoped lang="scss">
.Wht_Shoping {
  background-color: rgb(72, 72, 228);
  padding: 20px;
  text-align: center;
  padding-top: 20px;
  h2 {
    text-align: center;
    color: aliceblue;
  }
}
</style>
