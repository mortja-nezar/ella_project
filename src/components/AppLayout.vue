<template>
  <v-layout class="app-layout">
    <NavigationDrawer />
    <v-main>
      <slot></slot>
    </v-main>
    <AppBar />
    <FixNav />
    <!-- <FooterApp /> -->
  </v-layout>
</template>

<script setup>
import AppBar from "@/components/AppBar.vue";
import FixNav from "@/components/FixNav.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
// import FooterApp from "@/components/FooterApp.vue";
</script>

<style scoped>
.app-layout {
  min-height: 100vh; /* يخلي الطول كامل الشاشة */
}
v-main {
  flex: 1; /* يخلي المين يتمدد ويا حجم الشاشة */
}
</style>
