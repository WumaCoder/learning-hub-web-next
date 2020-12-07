import { createStore } from "vuex";
import problem from "./modules/problem";

export default createStore({
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
  },
  mutations: {},
  actions: {},
  modules: {
    problem,
  },
});
