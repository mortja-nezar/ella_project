<template>
  <div class="cart_page pt-15">
    <p
      v-if="cart.items.length === 0"
      style="text-align: center; color: red; font-size: 2rem"
    >
      Your cart is empty
    </p>

    <v-container v-else>
      <!-- Headers -->
      <v-row class="align-center">
        <v-col cols="4"><strong>PRODUCT</strong></v-col>
        <v-col cols="2"><strong>PRICE</strong></v-col>
        <v-col cols="3"><strong>QUANTITY</strong></v-col>
        <v-col cols="3"><strong>TOTAL</strong></v-col>
      </v-row>

      <!-- Items -->
      <v-row
        v-for="(item, index) in cart.items"
        :key="item.id"
        class="my-4 align-center"
      >
        <v-col cols="4" class="d-flex align-center gap-3">
          <img
            :src="item.thumbnail"
            alt=""
            style="width: 80px; height: auto; border-radius: 4px"
          />
          <div>
            <h3 style="margin: 0; font-size: 14px">{{ item.title }}</h3>
            <p style="font-size: 12px; color: #555; margin: 0">
              {{ item.description }}
            </p>
          </div>
        </v-col>
        <v-col cols="2">${{ item.price.toFixed(2) }}</v-col>
        <v-col cols="3" class="d-flex align-center gap-2">
          <v-btn
            style="width: 25px; height: 25px"
            @click="decreaseQuantity(index)"
            >-</v-btn
          >
          <span>{{ item.quantity }}</span>
          <v-btn
            style="width: 25px; height: 25px"
            @click="increaseQuantity(index)"
            >+</v-btn
          >
        </v-col>
        <v-col cols="3" class="d-flex justify-space-between align-center">
          <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          <v-icon @click="removeItem(index)" color="red">mdi-delete</v-icon>
        </v-col>
      </v-row>

      <!-- Grand Total -->
      <v-row class="mt-6">
        <v-col cols="12" class="text-right">
          <h3>
            Grand Total:
            <span style="color: green">${{ grandTotal.toFixed(2) }}</span>
          </h3>
        </v-col>
      </v-row>

      <!-- Credit Card Section -->
      <v-card v-if="cart.items.length > 0" class="mt-4">
        <v-card-title class="text-h6">{{
          hasCard && !editCard ? "Your Card" : "Add / Edit Credit Card"
        }}</v-card-title>
        <v-card-text>
          <div v-if="hasCard && !editCard">
            <p>
              <strong>Card Number:</strong>
              {{ userStore.currentUser.cart.cartnum }}
            </p>
            <p>
              <strong>Expire Date:</strong>
              {{ userStore.currentUser.cart.ExpireDate }}
            </p>
            <p><strong>CVV:</strong> {{ userStore.currentUser.cart.cvv }}</p>
            <v-btn color="primary" @click="editCard = true">Edit Card</v-btn>
            <v-btn color="green" class="mt-2" @click="submitExistingCard"
              >Submit Cart</v-btn
            >
          </div>

          <div v-else>
            <v-text-field v-model="cartnum" label="Card Number" type="text" />
            <v-text-field
              v-model="ExpireDate"
              label="Expire Date"
              placeholder="MM/YY"
              type="text"
            />
            <v-text-field v-model="cvv" label="CVV" type="text" />
          </div>
        </v-card-text>

        <v-card-actions v-if="editCard || !hasCard">
          <v-btn
            color="primary"
            @click="submitUserCard"
            :disabled="!isCardValid"
            >Submit Cart</v-btn
          >
          <v-btn text @click="cancelEdit">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "@/stores/CartStory";
import { useUserInfoStore } from "@/stores/UserInformation";

const cartStore = useCartStore();
const userStore = useUserInfoStore();

const editCard = ref(false);
const cartnum = ref("");
const ExpireDate = ref("");
const cvv = ref("");

// مزامنة السلة عند تحميل الصفحة
onMounted(() => {
  // 1. جلب من LocalStorage إذا موجود
  const saved = localStorage.getItem("cart");
  if (saved) {
    cartStore.items = JSON.parse(saved);
  } else if (userStore.currentUser?.cart?.items?.length) {
    // 2. أو من UserStore
    cartStore.items = [...userStore.currentUser.cart.items];
  }
});

// السلة المؤقتة
const cart = computed({
  get() {
    return { items: cartStore.items };
  },
  set(value) {
    cartStore.items = value.items;
  },
});

// Grand total
const grandTotal = computed(() =>
  cart.value.items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  )
);

// العمليات على السلة
const increaseQuantity = (index) => cartStore.increaseQuantity(index);
const decreaseQuantity = (index) => cartStore.decreaseQuantity(index);
const removeItem = (index) => cartStore.removeItem(index);

// هل لدى المستخدم بطاقة مسبقة
const hasCard = computed(() => !!userStore.currentUser?.cart?.cartnum);

// صلاحية بيانات البطاقة
const isCardValid = computed(
  () =>
    cartnum.value.trim() !== "" &&
    ExpireDate.value.trim() !== "" &&
    cvv.value.trim() !== "" &&
    userStore.currentUser
);

// حفظ بطاقة جديدة أو تعديل البطاقة **مع السلة دون مسح CartStore**
const submitUserCard = () => {
  if (!userStore.currentUser) return;
  const newCart = {
    cartnum: cartnum.value,
    cvv: cvv.value,
    ExpireDate: ExpireDate.value,
    items: [...cartStore.items],
  };
  userStore.updateCart(userStore.currentUser.id, newCart);
  alert("Cart and card linked to user successfully!");
  editCard.value = false;
  cartnum.value = "";
  cvv.value = "";
  ExpireDate.value = "";
};

// رفع السلة عند وجود بطاقة مسبقة **دون تفريغ CartStore**
const submitExistingCard = () => {
  if (!userStore.currentUser || !userStore.currentUser.cart) return;
  const updatedCart = {
    ...userStore.currentUser.cart,
    items: [...cartStore.items],
  };
  userStore.updateCart(userStore.currentUser.id, updatedCart);
  alert("Cart linked to existing card successfully!");
};

// إلغاء تعديل البطاقة
const cancelEdit = () => {
  editCard.value = false;
  if (userStore.currentUser?.cart) {
    cartnum.value = userStore.currentUser.cart.cartnum || "";
    ExpireDate.value = userStore.currentUser.cart.ExpireDate || "";
    cvv.value = userStore.currentUser.cart.cvv || "";
  }
};
</script>
