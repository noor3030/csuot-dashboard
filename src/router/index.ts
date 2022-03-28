import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Users from "../views/UsersView.vue";
import Login from "../views/Login.vue";
import store from "../store";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      requiresAuth: true,
      permissionGroup: "users",
      permissionType: "read",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// login
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});
// permissions
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.permissionGroup != null)) {
    to.matched.some((record) => console.log((store.state.permissions as any)?.[record.meta.permissionGroup][record.meta.permissionType]));
    to.matched.some((record) => console.log(store.state.permissions));
    if (to.matched.some((record) => (store.state.permissions as any)?.[record.meta.permissionGroup][record.meta.permissionType])) {
      next();
    } else {
      next({ name: "Home" });
    }
  } else {
    next();
  }
});
export default router;
