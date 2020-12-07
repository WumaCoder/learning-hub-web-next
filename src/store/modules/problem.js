import { getProblems } from "api/problem";
import { createQuery } from "tools/page";
import BProblemFilter from "component/BProblemFilter.vue";
import BProblemList from "component/BProblemList.vue";

export const components = { BProblemFilter, BProblemList };

export default {
  namespaced: true,
  state: () => ({
    list: [],
    page: {
      num: 1,
      size: 5,
      count: 10,
    },
    filter: {
      isUse: false,
      field: "id",
      value: "",
      model: "default",
    },
    order: {
      isUse: false,
      field: "id",
      value: "ASC",
      model: "default",
    },
    isLoading: false,
  }),
  mutations: {
    setList(state, list) {
      state.list = list;
    },
    setPage(state, page) {
      Object.assign(state.page, page);
    },
    setOrder(state, order) {
      Object.assign(state.order, order);
    },
    setFilter(state, filter) {
      Object.assign(state.filter, filter);
    },
    setLoading(state, is) {
      state.isLoading = is;
    },
  },
  actions: {
    async request({ commit, state }, pageQuery) {
      commit("setLoading", true);

      const res = await getProblems(
        Object.assign(
          {
            pageNum: state.page.num,
            pageSize: state.page.size,
            filter: createQuery(state.filter),
            order: createQuery(state.order),
          },
          pageQuery
        )
      );
      commit("setOrder", { isUse: false });
      commit("setFilter", { isUse: false });
      commit("setLoading", false);
      commit("setList", res.data);
      commit("setPage", res.page);
    },
  },
};
