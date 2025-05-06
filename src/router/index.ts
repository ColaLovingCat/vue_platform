import { createRouter, createWebHistory } from "vue-router";

const routes = [
  // 添加重定向
  {
    path: "/",
    redirect: "/home",
  },

  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/view.vue"),
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

  {
    path: '/f1',
    name: 'f1',
    component: () => import('@/views/func/f1/view.vue')
  },

  {
    path: '/books',
    name: 'books',
    component: () => import('@/views/func/books/view.vue')
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/func/icons/view.vue')
  },

  // 业务页面
  {
    path: "/",
    name: "/",
    component: () => import("@/components/layouts/contents.vue"),
    children: [

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

  // 组件测试页面
  {
    path: "/forms",
    name: "forms",
    component: () => import("@/components/forms/using.vue"),
  },
  {
    path: "/echarts",
    name: "echarts",
    component: () => import("@/components/echarts/using.vue"),
  },
  {
    path: "/chats",
    name: "chats",
    component: () => import("@/components/chats/using.vue"),
  },
  {
    path: "/editors",
    name: "editors",
    component: () => import("@/components/editors/using.vue"),
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
