<template>
  <table-list
    :data="state.list"
    :column="state.column"
    :is-loading="state.isLoading"
    :is-lazy="true"
    :page="state.page"
    :is-filter="true"
    @on-page="onPage"
    @on-order="onOrder"
    @on-filter="onFilter"
    @on-row-click="onRowClick"
  ></table-list>
</template>

<script>
import TableList from "./TableList";
import { useStoreHelpers } from "tools/use/useStoreHelpers";
import { useRouter } from "vue-router";

export default {
  components: { TableList },
  setup() {
    const router = useRouter();
    const solution = useStoreHelpers("solution");

    solution.dispatch("request");

    const onPage = async (page) => {
      solution.commit("setPage", page);
      await solution.dispatch("request");
    };

    const onOrder = async (order) => {
      order.isUse = true;
      solution.commit("setOrder", order);
      await solution.dispatch("request");
    };

    const onFilter = async (filter) => {
      filter.isUse = true;
      solution.commit("setFilter", filter);
      await solution.dispatch("request");
    };

    const onRowClick = async (event) => {
      router.push(`/problem/${event.data.problem_id}`);
    };

    return {
      state: solution.state,

      onPage,
      onOrder,
      onFilter,
      onRowClick,
    };
  },
};
</script>

<style lang="scss"></style>
