// Vue
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// FontAwesome
import { FontAwesomeIcon } from "./plugins/font-awesome.js";
// Vuetify
import { vuetify } from "./plugins/vuetify.js";

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
