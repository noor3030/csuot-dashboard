import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Users from "../views/UsersView.vue";
import Rooms from "../views/RoomsView.vue";
import Login from "../views/Login.vue";
import Branches from "../views/BranchesView.vue";
import store from "../store";
import UserDetailsView from "../views/UserDetailsView.vue";
import RoomDetailsView from "../views/RoomDetailsView.vue";

import Roles from "../views/Roles.vue";
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
    path: "/roles",
    name: "Roles",
    component: Roles,
    meta: {
      requiresAuth: true,
      permissionGroup: "roles",
      permissionType: "read",
    },
  },
  {
    path: "/user/:id",
    name: "UserDetailsView",
    component: UserDetailsView,
    meta: {
      requiresAuth: true,
      permissionGroup: "users",
      permissionType: "read",
    },
  },
  {
    path: "/room/:id",
    name: "RoomDetailsView",
    component: RoomDetailsView, 
    meta: {
      requiresAuth: true,
      permissionGroup: "rooms",
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
      permissionGroup: "rooms",
      permissionType: "read",
    },
  },
  {
    path: "/branches",
    name: "Branches",
    component: Branches,
    meta: {
      requiresAuth: true,
      permissionGroup: "branches",
      permissionType: "read",
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
