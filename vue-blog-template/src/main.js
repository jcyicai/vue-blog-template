import Vue from "vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import axios from "axios";
import ba from "vue-ba"; //引入百度统计
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/styles/normalize.scss";
import "@/assets/styles/index.scss";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.use(ba, "c5d78"); //百度统计账户ID码，自行注册后更改
Vue.use(ba, { siteId: "c5d78" });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
