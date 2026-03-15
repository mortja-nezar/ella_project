<template>
  <div class="product-details pt-15" v-if="project">
    <h1>Product Details</h1>
    <v-container fluid>
      <v-row>
        <!-- الصور -->
        <v-col cols="7">
          <img
            :src="tab || project.thumbnail"
            class="w-100"
            style="height: 600px"
            alt="product image"
          />
          <v-tabs center-active height="220" v-model="tab">
            <v-tab
              v-for="(image, index) in project.images"
              :key="index"
              :value="image"
              class="mx-10"
            >
              <img :src="image" style="width: 100px; height: 150px" alt="" />
            </v-tab>
          </v-tabs>
        </v-col>

        <!-- تفاصيل المنتج -->
        <v-col cols="5">
          <v-card elevation="0">
            <v-card-title
              class="px-0"
              style="font-size: 19px; font-weight: bold"
            >
              {{ project.title }} ({{ project.category }})
            </v-card-title>

            <div class="rating_parent d-flex align-center" style="gap: 10px">
              <v-rating
                v-model="project.rating"
                half-increments
                color="yellow-darken-2"
                readonly
                density="compact"
                size="small"
                class="mb-2 pt-1"
              />
              <span class="mt-1" style="font-size: 13px; color: #606060">
                Stock: {{ project.stock }}
              </span>
            </div>

            <v-card-text style="font-size: 13px; color: #606060">
              {{ project.description }}
            </v-card-text>

            <v-card-text
              v-if="project.brand"
              style="font-size: 13px; color: #606060"
            >
              Brand: {{ project.brand }}
            </v-card-text>

            <v-card-text
              v-if="project.sku"
              style="font-size: 13px; color: #606060"
            >
              SKU: {{ project.sku }}
            </v-card-text>

            <v-card-text
              v-if="project.availabilityStatus"
              style="font-size: 13px; color: #606060"
            >
              Availability: {{ project.availabilityStatus }}
            </v-card-text>

            <!-- السعر -->
            <v-card-text style="font-size: 13px; color: #606060">
              Price: <del>${{ project.price }}</del>
              <span class="text-red font-weight-bold">
                ${{
                  discountedPrice(project.price, project.discountPercentage)
                }}
              </span>
            </v-card-text>

            <!-- العداد -->
            <v-card-text>
              <div
                class="counter"
                style="
                  border: 1px solid black;
                  border-radius: 40px;
                  display: flex;
                  align-items: center;
                  padding: 5px 10px;
                  width: fit-content;
                "
              >
                <v-icon @click="quantity > 1 ? quantity-- : null"
                  >mdi-minus</v-icon
                >
                <input
                  type="number"
                  min="1"
                  v-model="quantity"
                  style="
                    border: none;
                    outline: none;
                    width: 60px;
                    text-align: center;
                  "
                />
                <v-icon @click="quantity++">mdi-plus</v-icon>
              </div>
            </v-card-text>

            <!-- السعر الكلي -->
            <v-card-text>
              Total price:
              <span class="font-weight-bold">
                ${{
                  (
                    quantity *
                    discountedPrice(project.price, project.discountPercentage)
                  ).toFixed(2)
                }}
              </span>
            </v-card-text>

            <!-- زر إضافة للسلة -->
            <v-card-actions class="px-0 mt-7 w-100">
              <v-btn
                class="w-75 text-white"
                variant="outlined"
                style="
                  text-transform: none;
                  border-radius: 30px;
                  background-color: black;
                "
                @click="addToCart"
                density="compact"
                height="50"
              >
                Add to Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <div v-else class="text-center py-10">Loading product details...</div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/ProductModel";
import { useCartStore } from "@/stores/CartStory";

const route = useRoute();
const project = ref({});
const tab = ref(null);
const quantity = ref(1);
const loading = ref(false);

const productsStore = useProductsStore();
const cart = useCartStore();

// دالة حساب الخصم
const discountedPrice = (price, discount) => {
  if (!price) return 0;
  return +(price - (price * discount) / 100).toFixed(2);
};

// إضافة المنتج للسلة
const addToCart = () => {
  cart.addItem({ ...project.value, quantity: quantity.value });
};

// جلب المنتج
const fetchProduct = async (id) => {
  try {
    loading.value = true;
    await productsStore.getProductById(id);
    project.value = productsStore.product;
  } finally {
    loading.value = false;
  }
};

// أول تحميل
onMounted(() => {
  fetchProduct(route.params.id);
});

// كلما تغير id المنتج
watch(
  () => route.params.id,
  (newId) => {
    if (newId) fetchProduct(newId);
  }
);
</script>
