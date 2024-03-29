import { getProblems } from "api/problem";
import { createQuery } from "tools/page";
import { wrap } from "tools/promise";
import { alterPropName } from "tools/object";

/**
 * Bind Components：
 *  BProblemList
 *  BProblemFilter
 */
export default {
  namespaced: true,
  state: () => ({
    list: [],
    column: {
      id: {
        is: "span",
        header: "ID",
        sortable: true,
        headerStyle: "width:6em",
        format: (v) => `#${v}`,
      },
      type: {
        is: "span",
        header: "Type",
        sortable: true,
        headerStyle: "width:6em",
      },
      title: {
        is: "span",
        header: "Title",
        sortable: true,
        headerStyle: "width:6em",
      },
      tags: {
        is: "tp-tags",
        header: "Tag",
        sortable: true,
        headerStyle: "width:20em",
        valueKey: "list",
      },
      hard: {
        is: "span",
        header: "Hard",
        sortable: true,
        headerStyle: "width:6em",
      },
      submit_num: {
        is: "span",
        header: "Total",
        sortable: true,
        headerStyle: "width:6em",
      },
      ac_num: {
        is: "span",
        header: "AC",
        sortable: true,
        headerStyle: "width:6em",
      },
    },
    page: {
      pageNum: 1,
      pageSize: 30,
      count: 0,
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
    async request(
      { commit, state },
      {
        useFilter = false,
        useOrder = false,
        autoCloseFilter = false,
        autoCloseOrder = false,
      } = {}
    ) {
      commit("setLoading", true);
      if (!state.order.isUse) commit("setOrder", { isUse: useOrder });
      if (!state.filter.isUse) commit("setFilter", { isUse: useFilter });
      const [err, res] = await wrap(
        getProblems({
          pageNum: state.page.pageNum,
          pageSize: state.page.pageSize,
          filter: createQuery(state.filter),
          order: createQuery(state.order),
        })
      );
      if (err) {
        commit("setLoading", false);
        throw err;
      }

      if (autoCloseOrder) commit("setOrder", { isUse: false });
      if (autoCloseFilter) commit("setFilter", { isUse: false });
      const page = alterPropName(res.page, {
        pageNum: "num",
        pageSize: "size",
      });
      commit("setLoading", false);
      commit("setList", res.data);
      commit("setPage", page);
    },
  },
};
