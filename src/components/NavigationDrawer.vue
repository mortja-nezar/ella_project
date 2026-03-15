<template>
  <!-- Cart Drawer -->
  <v-navigation-drawer v-model="drawer" temporary location="right" width="400">
    <v-card flat>
      <v-card-title class="text-h6"
        >🛒 My Cart
        <v-btn icon @click="drawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <!-- إذا كانت السلة فارغة -->
        <div v-if="cart.items.length === 0" class="text-center text-gray-500">
          Cart is empty.
        </div>

        <!-- إذا تحتوي منتجات -->
        <v-list v-else>
          <v-list-item v-for="(item, index) in cart.items" :key="item.id">
            <v-container>
              <v-row>
                <v-col cols="4">
                  <img :src="item.thumbnail" alt="" style="width: 100%" />
                </v-col>
                <v-col cols="8">
                  <h6>{{ item.title }}</h6>
                  <p style="font-size: 13px; color: #555">
                    Brand: {{ item.brand }} <br />
                    Price: ${{
                      discountedPrice(item.price, item.discountPercentage)
                    }}
                    <br />
                    Stock: {{ item.stock }} <br />
                    Quantity:
                  </p>

                  <!-- تعديل الكمية -->
                  <v-btn @click="decreaseQuantity(index)" small>-</v-btn>
                  <span>{{ item.quantity }}</span>
                  <v-btn @click="increaseQuantity(index)" small>+</v-btn>

                  <!-- السعر الكلي لكل منتج -->
                  <p
                    style="font-size: 14px; font-weight: bold; margin-top: 5px"
                  >
                    Subtotal: ${{
                      (
                        item.quantity *
                        discountedPrice(item.price, item.discountPercentage)
                      ).toFixed(2)
                    }}
                  </p>

                  <!-- حذف المنتج -->
                  <v-btn icon color="red" @click="removeItem(index)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <!-- إجمالي السعر -->
      <v-card-actions class="justify-between">
        <span class="font-bold">Total: ${{ totalPrice.toFixed(2) }}</span>
        <v-btn color="red" variant="tonal" @click="cart.clearCart"
          >clear cart</v-btn
        >
        <v-btn
          color="green"
          variant="tonal"
          @click="() => router.push({ name: 'cart' })"
          >open cart</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from "vue";
import { useCartStore } from "@/stores/CartStory";
import { useRouter } from "vue-router";

const drawer = ref(false);
const emitter = inject("emitter");
const cart = useCartStore();
const router = useRouter();

// تحميل البيانات من localStorage عند بدء التطبيق
onMounted(() => {
  const saved = localStorage.getItem("cart");
  if (saved) cart.items = JSON.parse(saved);

  emitter?.on("toggle-drawer", toggleDrawer);
});

onUnmounted(() => {
  emitter?.off("toggle-drawer", toggleDrawer);
});

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

// حذف منتج
const removeItem = (index) => {
  cart.removeItem(index);
};

// تعديل الكمية
const increaseQuantity = (index) => {
  cart.increaseQuantity(index);
};

const decreaseQuantity = (index) => {
  cart.decreaseQuantity(index);
};

// حساب السعر بعد الخصم
const discountedPrice = (price, discount) => {
  return +(price - (price * discount) / 100).toFixed(2);
};

// إجمالي السعر
const totalPrice = computed(() =>
  cart.items.reduce(
    (sum, item) =>
      sum +
      discountedPrice(item.price, item.discountPercentage) * item.quantity,
    0
  )
);
</script>
