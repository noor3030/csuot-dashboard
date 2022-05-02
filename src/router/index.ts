import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Users from "../views/UsersView.vue";
import Rooms from "../views/RoomsView.vue";
import Login from "../views/Login.vue";
import store from "../store";
import UserDetailsView from "../views/UserDetailsView.vue";
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
    path: "/user/:id",
    name: "UserDetailsView",
    component: UserDetailsView, // TODO
    meta: {
      requiresAuth: true,
      permissionGroup: "users",
      permissionType: "read",
    },
  },
  {
    path: "/users/create",
    name: "CreateUser",
    component: Users,
    meta: {
      requiresAuth: true,
      permissionGroup: "users",
      permissionType: "create",
    },
  },
  {
    path: "/rooms",
    name: "Rooms",
    component: Rooms,
    meta: {
      requiresAuth: true,
      permissionGroup: "users",
      permissionType: "create",
    },
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
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
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.permissionGroup != null)) {
//     if (
//       to.matched.some(
//         (record) =>
//           (store.state.permissions as any)?.[record.meta.permissionGroup][
//             record.meta.permissionType
//           ]
//       )
//     ) {
//       next();
//     } else {
//       next({ name: "Home" });
//     }
//   } else {
//     next();
//   }
// });
export default router;
