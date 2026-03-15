<template>
  <div class="flashdeals pt-9 w-100" style="height: auto">
    <Swiper
      v-if="products && products.length"
      :modules="[Navigation, Pagination, Autoplay]"
      :pagination="{ clickable: true }"
      :slides-per-view="products.length < 4 ? products.length : 4"
      :space-between="20"
      navigation
      :loop="products.length > 1"
      :breakpoints="{
        320: { slidesPerView: 1, spaceBetween: 10 },
        640: { slidesPerView: 2, spaceBetween: 15 },
        1024: { slidesPerView: 4, spaceBetween: 20 },
      }"
    >
      <SwiperSlide v-for="(item, index) in products" :key="item.id ?? index">
        <v-card elevation="0" class="pa-2">
          <!-- Hover Image -->
          <v-hover v-slot="{ isHovering, props: hoverProps }">
            <div
              class="parent_img position-relative"
              v-bind="hoverProps"
              style="overflow: hidden"
            >
              <img
                :src="showenitem[item.id] ?? item.images[0]"
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
                  transition: all 0.2s ease-in-out;
                  opacity: 0;
                "
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
          <v-btn-toggle v-model="showenitem[item.id]">
            <v-btn v-for="(pic, i) in item.images ?? []" :value="pic" :key="i">
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
                })"
            >
              CHOOSE OPTIONS
            </v-btn>
          </v-card-actions>
        </v-card>
      </SwiperSlide>
    </Swiper>

    <!-- رسالة عند عدم وجود منتجات -->
    <v-container v-else>
      <v-row>
        <v-col cols="12">
          <p>No flash deals available.</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { inject, reactive } from "vue"; 
const emitter = inject("emitter");
const openQuickView = (product) => {
  emitter.emit("openQuickView", product);
};
const props = defineProps({
  products: { type: Array, default: () => [] },
});

// reactive
const showenitem = reactive({});

// دالة لتقصير الوصف
const shortDescription = (desc) => {
  if (!desc) return "";
  const words = desc.split(" ");
  return words.length <= 10 ? desc : words.slice(0, 12).join(" ") + "...";
};

// دالة لحساب السعر بعد الخصم
const discountedPrice = (price, discount) => {
  return (price - price * (discount / 100)).toFixed(2);
};
</script>

<style scoped>
.flashdeals h2 {
  font-weight: bold;
  color: #161880;
}

.parent img {
  display: block;
  object-fit: cover;
  border-radius: 8px;
}
.parent_img:hover .quick-view-btn {
  opacity: 1 !important;
  transform: translate(-50%, -50%);
}
</style>
