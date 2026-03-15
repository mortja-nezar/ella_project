<template>
  <div class="new_product my-5 pt-15">
    <div class="title">
      <h1>New Product</h1>
    </div>
    <v-container>
      <v-row>
        <v-col cols="7">
          <Swiper
            v-if="products && products.length"
            :modules="[Navigation, Pagination, Autoplay]"
            :pagination="{ clickable: true }"
            :autoplay="{ delay: 3000, pauseOnMouseEnter: true }"
            :slides-per-view="3"
            :space-between="20"
            navigation
            loop
          >
            <SwiperSlide
              v-for="(item, index) in products"
              :key="item.id ?? index"
            >
              <v-card elevation="0" class="pa-2">
                <!-- Hover Image -->
                <v-hover v-slot="{ isHovering, props: hoverProps }">
                  <div
                    class="parent"
                    v-bind="hoverProps"
                    style="overflow: hidden; position: relative"
                  >
                    <img
                      :src="shownItem[item.title] ?? item.images[0]"
                      alt="Product Image"
                      :style="{
                        width: '100%',
                        height: 'auto',
                        transform: isHovering ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.5s ease-in-out',
                      }"
                    />
                    <v-btn
                      density="compact"
                      width="80"
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
                        transition: all 0.3s ease-in-out;
                        opacity: 0;
                      "
                      :style="{ opacity: isHovering ? 1 : 0 }"
                      @click="openQuickView(item)"
                    >
                      quick view
                    </v-btn>
                  </div>
                </v-hover>

                <!-- Description -->
                <v-card-text class="pl-0">
                  ({{ item.title }}) {{ shortDescription(item.description) }}
                </v-card-text>

                <!-- Rating -->
                <v-rating
                  v-model="item.rating"
                  half-increments
                  color="yellow-darken-2"
                  readonly
                  density="compact"
                  size="small"
                  class="mb-2 pt-1"
                />

                <!-- Price -->
                <v-card-text class="font-weight-bold pl-0 pt-0">
                  <del>${{ item.price }}</del>
                  <span class="text-red font-weight-bold">
                    ${{ discountedPrice(item.price, item.discountPercentage) }}
                  </span>
                </v-card-text>

                <!-- Image Selector -->
                <v-btn-toggle v-model="shownItem[item.title]">
                  <v-btn
                    v-for="(pic, i) in item.images ?? []"
                    :value="pic"
                    :key="i"
                  >
                    <img width="30" height="30" :src="pic" alt="" />
                  </v-btn>
                </v-btn-toggle>

                <!-- Action Button -->
                <v-card-actions>
                  <v-btn
                    outlined
                    rounded
                    class="w-100"
                    style="border: 1px solid #ccc"
                    @click="
                      $router.push({
                        name: 'product_details',
                        params: { id: item.id },
                      })
                    "
                  >
                    CHOOSE OPTIONS
                  </v-btn>
                </v-card-actions>
              </v-card>
            </SwiperSlide>
          </Swiper>
        </v-col>
        <v-col cols="5">
          <img
            src="@/assets/cat/vr-banner.9042bf27.webp"
            class="w-100"
            style="height: 70%; margin-top: 20px; object-fit: cover"
            alt=""
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { defineProps, reactive, inject } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const emitter = inject("emitter");
const openQuickView = (product) => {
  emitter.emit("openQuickView", product); // ✅ consistent event name
};

// Props
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  products: { type: Array, default: () => [] },
});

const shownItem = reactive({});

// Short description function
const shortDescription = (desc) => {
  if (!desc) return "";
  const words = desc.split(" ");
  return words.length <= 10 ? desc : words.slice(0, 12).join(" ") + "...";
};

// Discounted price
const discountedPrice = (price, discount) => {
  return (price - price * (discount / 100)).toFixed(2);
};
</script>
