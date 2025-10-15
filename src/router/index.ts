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
    path: "/f1",
    name: "f1",
    component: () => import("@/views/func/f1/view.vue"),
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
    path: "/mhs2",
    name: "mhs2",
    component: () => import("@/views/func/mhs2/view.vue"),
  },
  {
    path: "/animals",
    name: "animals",
    component: () => import("@/views/func/animals/view.vue"),
  },
  {
    path: "/amiibo",
    name: "amiibo",
    component: () => import("@/views/func/amiibo/view.vue"),
  },

  //
  {
    path: "/cartoons",
    name: "cartoons",
    component: () => import("@/views/func/cartoons/view.vue"),
  },
  {
    path: "/dragon",
    name: "dragon",
    component: () => import("@/views/func/dragon/view.vue"),
  },

  //
  {
    path: "/books",
    name: "books",
    component: () => import("@/views/func/books/view.vue"),
  },

  //
  {
    path: "/matchs",
    name: "matchs",
    component: () => import("@/views/func/matchs/view.vue"),
    children: [
      {
        path: "/matchs/LOLS15",
        name: "matchs-LOLS15",
        component: () => import("@/views/func/matchs/lol-s15.vue"),
      },
    ],
  },
  {
    path: "/icons",
    name: "icons",
    component: () => import("@/views/func/icons/view.vue"),
  },

  //
  {
    path: "/sort",
    name: "sort",
    component: () => import("@/views/func/sort/view.vue"),
  },
  {
    path: "/articles",
    name: "articles",
    component: () => import("@/views/func/articles/view.vue"),
  },
  {
    path: "/wallpapers",
    name: "wallpapers",
    component: () => import("@/views/func/wallpapers/view.vue"),
  },

  {
    path: "/games-platform",
    name: "games-platform",
    component: () => import("@/views/games/view.vue"),
  },
  {
    path: "/games-puzzle",
    name: "games-puzzle",
    component: () => import("@/views/games/puzzle/view.vue"),
  },
  {
    path: "/games-mine",
    name: "games-mine",
    component: () => import("@/views/games/mine/view.vue"),
  },
  {
    path: "/games-snake",
    name: "games-snake",
    component: () => import("@/views/games/snake/view.vue"),
  },
  {
    path: "/games-blackjack",
    name: "games-blackjack",
    component: () => import("@/views/games/blackjack/view.vue"),
  },
  {
    path: "/games-tetris",
    name: "games-tetris",
    component: () => import("@/views/games/tetris/view.vue"),
  },
  {
    path: "/games-t-rex",
    name: "games-t-rex",
    component: () => import("@/views/games/t-rex/view.vue"),
  },
  {
    path: "/games-wuzi",
    name: "games-wuzi",
    component: () => import("@/views/games/wuzi/view.vue"),
  },
  {
    path: "/games-xiaoxiaole",
    name: "games-xiaoxiaole",
    component: () => import("@/views/games/xiaoxiaole/view.vue"),
  },

  {
    path: "/query",
    name: "query",
    component: () => import("@/views/func/query/view.vue"),
  },


  {
    path: "/study-list",
    name: "study-list",
    component: () => import("@/views/func/study/list.vue"),
    children: [
      {
        path: "/study-list/ruanjian",
        name: "study-ruanjian",
        component: () => import("@/views/func/study/models/ruanjian.vue"),
      },
    ],
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
