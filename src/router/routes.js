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
        name: "Problem",
        component: () =>
          import(/* webpackChunkName: "problem" */ "view/Problem.vue"),
      },
      {
        path: "/problem-code",
        name: "ProblemCode",
        component: () =>
          import(/* webpackChunkName: "problem-code" */ "view/ProblemCode.vue"),
      },
      {
        path: "/problem-single",
        name: "ProblemSingle",
        component: () =>
          import(
            /* webpackChunkName: "problem-single" */ "view/ProblemSingle.vue"
          ),
      },
      {
        path: "/problem-multi",
        name: "ProblemMulti",
        component: () =>
          import(
            /* webpackChunkName: "problem-multi" */ "view/ProblemMulti.vue"
          ),
      },
      {
        path: "/problem-fill",
        name: "ProblemFill",
        component: () =>
          import(/* webpackChunkName: "problem-fill" */ "view/ProblemFill.vue"),
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
