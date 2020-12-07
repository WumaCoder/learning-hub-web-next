import "./registerServiceWorker";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import primeUi from "./prime-ui";

createApp(App)
  .use(store)
  .use(router)
  .use(primeUi)
  .mount("#app");
