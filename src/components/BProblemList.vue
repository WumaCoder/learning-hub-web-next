<template>
  <problem-list
    :list="state.list"
    :isLoading="state.isLoading"
    :page="state.page"
    @on-change="onChange"
    @on-row-click="onRowClick"
  ></problem-list>
  <div></div>
</template>

<script>
import ProblemList from "./ProblemList.vue";
import { useStoreHelpers } from "tools/use/useStoreHelpers";
import { useRoute, useRouter } from "vue-router";

export default {
  components: { ProblemList },
  setup() {
    const router = useRouter();
    const problem = useStoreHelpers("problem");

    problem.dispatch("request");

    const onChange = async (pageQuery, order) => {
      problem.commit("setPage", {
        num: pageQuery.pageNum,
        size: pageQuery.pageSize,
      });
      problem.commit("setOrder", { isUse: true, ...order });
      await problem.dispatch("request");
    };

    const onRowClick = async (event) => {
      router.push("/problem-code?problemId=" + event.data.id);
    };

    return {
      state: problem.state,
      onChange,
      onRowClick,
    };
  },
};
</script>

<style lang="scss"></style>
