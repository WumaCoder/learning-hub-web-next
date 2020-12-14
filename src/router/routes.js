import MainLayout from "layout/MainLayout.vue";
import Home from "view/Home.vue";

export const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/about",
        name: "About",
        component: () =>
          import(/* webpackChunkName: "about" */ "view/About.vue"),
      },
      {
        path: "/problem",
        name: "ProblemList",
        component: () =>
          import(/* webpackChunkName: "problem-list" */ "view/ProblemList.vue"),
      },
      {
        path: "/problem/:problemId",
        name: "Problem",
        component: () =>
          import(/* webpackChunkName: "problem" */ "view/Problem.vue"),
      },
      {
        path: "/solution",
        name: "Solution",
        component: () =>
          import(/* webpackChunkName: "solution" */ "view/Solution.vue"),
      },
      {
        path: "/rank",
        name: "Rank",
        component: () => import(/* webpackChunkName: "rank" */ "view/Rank.vue"),
      },
      {
        path: "/game",
        name: "Game",
        component: () => import(/* webpackChunkName: "game" */ "view/Game.vue"),
      },
      {
        path: "/message",
        name: "Message",
        component: () =>
          import(/* webpackChunkName: "message" */ "view/Message.vue"),
      },
      {
        path: "/login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "login" */ "view/Login.vue"),
      },
    ],
  },
];
