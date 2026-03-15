<template>
  <div class="category_page pt-15 h-50">
    <h1 style="text-align: center">Category: {{ route.params.category }}</h1>

    <v-container>
      <!-- Skeleton loading -->
      <v-row v-if="loading">
        <v-col cols="3" v-for="n in 4" :key="n">
          <v-skeleton-loader type="image, article, button"></v-skeleton-loader>
        </v-col>
      </v-row>

      <!-- Products grid -->
      <v-row v-else>
        <v-col cols="3" v-for="p in products" :key="p.id">
          <v-card class="pa-2" :loading="loading">
            <!-- Hover effect -->
            <v-hover v-slot="{ isHovering, props: hoverProps }">
              <div
                class="parent"
                v-bind="hoverProps"
                style="overflow: hidden; position: relative"
              >
                <img
                  :src="showenitem[p.id] ?? p.images[0]"
                  alt="Product Image"
                  :style="{
                    width: '100%',
                    height: 'auto',
                    transform: isHovering ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.5s ease-in-out',
                  }"
                />

                <!-- Quick View Button -->
                <v-btn
                  density="compact"
                  width="100"
                  height="40"
                  variant="outlined"
                  class="bg-white quick-view-btn"
                  style="
                    text-transform: none;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    border-radius: 30px;
                    font-size: 13px;
                    transition: all 0.2s ease-in-out;
                    opacity: 0;
                  "
                  @click="openQuickView(p)"
                >
                  Quick View
                </v-btn>
              </div>
            </v-hover>

            <!-- Title + Description -->
            <v-card-text class="pl-0">
              ({{ p.title }}) {{ shortDescription(p.description) }}
            </v-card-text>

            <!-- Rating -->
            <v-rating
              v-model="p.rating"
              half-increments
              color="yellow-darken-2"
              readonly
              density="compact"
              size="small"
              class="mb-2 pt-1"
            />

            <!-- Price -->
            <v-card-text class="font-weight-bold pl-0 pt-0">
              <del>${{ p.price }}</del>
              <span class="text-red font-weight-bold">
                ${{ discountedPrice(p.price, p.discountPercentage) }}
              </span>
            </v-card-text>

            <!-- Image Selector -->
            <v-btn-toggle v-model="showenitem[p.id]">
              <v-btn v-for="(pic, i) in p.images ?? []" :value="pic" :key="i">
                <img width="30" height="30" :src="pic" alt="" />
              </v-btn>
            </v-btn-toggle>

            <!-- Action Button -->
            <v-card-actions>
              <v-btn
                outlined
                rounded
                width="170px"
                height="40px"
                style="border: 1px solid #ccc"
                @click="
                  $router.push({
                    name: 'product_details',
                    params: { id: p.id },
                  })
                "
              >
                CHOOSE OPTIONS
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useProductsStore } from "@/stores/ProductModel";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { inject } from "vue";
import { shortDescription } from "@/tools/functions.js";

const emitter = inject("emitter");
const openQuickView = (product) => {
  emitter.emit("openQuickView", product);
};

const productsStore = useProductsStore();
const route = useRoute();
const loading = ref(false);
const products = ref([]);
const showenitem = ref({});

// Fetch products by category
const loadProducts = async () => {
  document.documentElement.scroll(0, 0);
  loading.value = true;
  products.value = await productsStore.getCategoryProducts(
    route.params.category
  );
  loading.value = false;
};

// Initial load
onMounted(loadProducts);

// Reload on category change
watch(
  () => route.params.category,
  () => loadProducts()
);
 
const discountedPrice = (price, discount) =>
  (price - price * (discount / 100)).toFixed(2);
</script>
<style lang="scss">
.parent:hover .quick-view-btn {
  opacity: 0.5 !important;
  transform: translate(-50%, -50%);
}
</style>
