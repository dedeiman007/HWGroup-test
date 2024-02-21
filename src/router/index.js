import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "../views/MainPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainPage",
    meta: {
      layout: "default",
      requiresAuth: false,
    },
    component: MainPage,
  },
  {
    path: "/:pathMatch(.*)*",
    meta: {
      layout: "default",
      requiresAuth: false,
    },
    component: () => import("../components/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const onError = (e) => {
  if (e.name !== "NavigationDuplicated") throw e;
};

const _push = router.__proto__.push;
router.__proto__.push = function push(...args) {
  try {
    const op = _push.call(this, ...args);
    if (op instanceof Promise) op.catch(onError);
    return op;
  } catch (e) {
    onError(e);
  }
};
(function () {})();
export default router;
