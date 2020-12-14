import { createStore } from "vuex";
import problem from "./modules/problem";
import solution from "./modules/solution";

export const store = {
  state: {
    langs: ["c", "cpp", "java", "py2", "py3"],
    resultMap: {
      0: "OK",
      1: "JUDGEING",
      2: "FORMAT_ERR",
      3: "ANSWER_ERR",
      4: "TIME_OVER",
      5: "MEMORY_OVER",
      6: "RUN_ERR",
      7: "COMPILE_ERR",
      8: "SYS_ERR",
      9: "QUEUE",
      "-1": "JUDGE_ERR",
    },
    navList: [
      {
        name: "ProblemList",
        label: "Problem",
        icon: "pi pi-fw pi-paperclip",
      },
      {
        name: "Solution",
        label: "Solution",
        icon: "pi pi-fw pi-spinner",
      },
      {
        name: "Rank",
        label: "Rank",
        icon: "pi pi-fw pi-sort-amount-up",
      },
      {
        name: "Game",
        label: "Game",
        icon: "pi pi-fw pi-star-o",
      },
      {
        name: "About",
        label: "About",
        icon: "pi pi-fw pi-info-circle",
      },
      {
        name: "Login",
        label: "Login",
        icon: "pi pi-fw pi-user",
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {
    problem,
    solution,
  },
};

export default createStore(store);
