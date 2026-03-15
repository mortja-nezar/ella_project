<template>
  <nav>
    <router-link to="/">Home</router-link> |
  </nav>
  <AppLayout>
    <router-view />
    <QuickView />
  </AppLayout>
  <FinishPage />
</template>

<script>
import AppLayout from "@/components/AppLayout.vue";
import FinishPage from "@/components/home_page/FinishPage.vue";
import QuickView from "@/components/home_page/QuickView.vue";

export default {
  components: {
    AppLayout,
    FinishPage,
    QuickView,
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
