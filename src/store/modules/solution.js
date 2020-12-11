import { getSolutions } from "api/solution";
import { createQuery } from "tools/page";
import { wrap } from "tools/promise";
import { alterPropName } from "tools/object";
import { store } from "store";
/**
 * Bind Components：
 *  BSolutionList
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
        format: (v) => `$${v}`,
      },
      type: {
        is: "span",
        header: "Type",
        sortable: true,
        headerStyle: "width:6em",
      },
      problem_id: {
        is: "span",
        header: "Problem ID",
        sortable: true,
        headerStyle: "width:6em",
      },
      user_id: {
        is: "span",
        header: "User ID",
        sortable: true,
        headerStyle: "width:6em",
      },
      result: {
        is: "span",
        header: "Result",
        sortable: true,
        headerStyle: "width:6em",
        format: (v) => store.state.resultMap[v],
      },
      created_at: {
        is: "span",
        header: "Created At",
        sortable: true,
        headerStyle: "width:6em",
      },
      updated_at: {
        is: "span",
        header: "Updated At",
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
        getSolutions({
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
