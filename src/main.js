/** @format */

import { createApp } from "vue";
import App from "./App.vue";

// Router
import router from "./router";

// State management
import { createPinia } from "pinia";

// Vuetify
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css"; // Ensure css-loader is installed

// Other libs
import mitt from "mitt";
import "swiper/css";

// Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
});

// Vue app instance
const app = createApp(App);

// Plugins
app.use(vuetify);
app.use(router);
app.use(createPinia());

// Event bus
const emitter = mitt();
app.provide("emitter", emitter);

// Mount app
app.mount("#app");
