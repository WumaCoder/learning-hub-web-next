<template>
  <table-list
    :data="state.list"
    :column="state.column"
    :is-loading="state.isLoading"
    :is-lazy="true"
    :page="state.page"
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
    const problem = useStoreHelpers("problem");

    problem.dispatch("request");

    const onPage = async (page) => {
      problem.commit("setPage", page);
      await problem.dispatch("request");
    };

    const onOrder = async (order) => {
      order.isUse = true;
      problem.commit("setOrder", order);
      await problem.dispatch("request");
    };

    const onFilter = async (filter) => {
      filter.isUse = true;
      problem.commit("setFilter", filter);
      await problem.dispatch("request");
    };

    const onRowClick = async (event) => {
      router.push(`/problem/${event.data.id}`);
    };

    return {
      state: problem.state,

      onPage,
      onOrder,
      onFilter,
      onRowClick,
    };
  },
};
</script>

<style lang="scss"></style>
