import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // 添加重定向
  {
    path: "/",
    redirect: "/home",
  },

  // 业务页面
  {
    path: "/",
    name: "/",
    component: () => import("@/components/layouts/contents.vue"),
    children: [
      {
        path: "/configs-users",
        name: "configs-users",
        component: () => import("@/views/func/manages/users/users.vue"),
      },
    ],
  },

  // 登录页面
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/view.vue"),
  },
  {
    path: "/sso-auth",
    name: "ssoAuth",
    component: () => import("@/views/login/sso-auth.vue"),
  },

  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/view.vue"),
  },

  //
  {
    path: '/f1',
    name: 'f1',
    component: () => import('@/views/func/f1/view.vue')
  },

  // Games
  {
    path: "/games",
    name: "games",
    component: () => import("@/views/func/games/view.vue"),
  },
  {
    path: "/pokes",
    name: "pokes",
    component: () => import("@/views/func/pokes/view.vue"),
  },
  {
    path: '/mhs2',
    name: 'mhs2',
    component: () => import('@/views/func/mhs2/view.vue')
  },
  {
    path: '/animals',
    name: 'animals',
    component: () => import('@/views/func/animals/view.vue')
  },

  //
  {
    path: '/books',
    name: 'books',
    component: () => import('@/views/func/books/view.vue')
  },

  //
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/func/icons/view.vue')
  },


];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(),
  routes,
});

router.beforeEach((to: any, from: any, next: any) => {
  next();
});

export default router;
