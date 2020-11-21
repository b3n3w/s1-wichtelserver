import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/",
    name: "index",
    component: () => import("../views/index.vue")
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/profile.vue")
  },
  {
    path: "/selectGroup",
    name: "selectGroup",
    meta: {
      requiresAuth: true
    },
    component: () => import("../components/selectGroup.vue")
  },
  {
    path: "/createGroup",
    name: "createGroup",
    meta: {
      requiresAuth: true
    },
    component: () => import("../components/createGroup.vue")
  }, {
    path: "/group",
    name: "group",
    meta: {
      requiresAuth: true
    },
    props: true,
    component: () => import("../views/group.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;