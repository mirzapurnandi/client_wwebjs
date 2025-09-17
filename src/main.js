/* import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

createApp(App).use(bootstrap).mount("#purnand"); */

//import "./bootstrap";

import { createApp } from "vue";
import router from "./routes/router.js";
import store from "./stores/store.js";
import App from "./components/App.vue";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App).use(router).use(store).use(VueSweetalert2);
app.mount("#purnand");
