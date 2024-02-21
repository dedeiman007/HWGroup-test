import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/scss/app.scss";
import DefaultLayout from "./layouts/DefaultLayout.vue";

Vue.config.productionTip = false;
Vue.component("default-layout", DefaultLayout);

new Vue({
  router,
  data: {
    rating: 1,
  },
  render: (h) => h(App),
}).$mount("#app");
