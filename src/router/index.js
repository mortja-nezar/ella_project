import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/CartPage.vue"),
  },
  {
    path: "/product/:category/:title",
    name: "product_category",
    component: () => import("@/views/ProductsCategory.vue"),
  },
  {
    path: "/product/details/:id",
    name: "product_details",
    component: () => import("@/views/ProductDetails.vue"),
  },
  {
    path: "/sign_in",
    name: "sign_in",
    component: () => import("@/views/SignUp.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
