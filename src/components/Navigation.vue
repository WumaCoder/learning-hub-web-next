<template>
  <p-menubar :model="navMap">
    <template #start>
      <div
        class="p-mr-2 p-d-flex p-ai-center cur-pointer"
        @click="$router.push({ name: 'Home' })"
      >
        <img alt="logo" src="../assets/logo.png" height="40" />
        <span class="p-text-bold">Learning Hub</span>
      </div>
    </template>
    <template #end>
      <b-problem-filter
        :showIcon="true"
        :queryModels="queryModels"
        placeholder="Global Search"
        :field="'title'"
        :model="'like'"
      ></b-problem-filter>
    </template>
  </p-menubar>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import BProblemFilter from "./BProblemFilter.vue";
import { useStore } from "vuex";

export default {
  components: { BProblemFilter },
  setup() {
    const queryModels = [
      (field, v) => {
        let query = null;
        if (v[0] === "#") {
          // ID 查询
          field = "id";
          let model = "default";
          v = v.substr(1);
          query = { field, model, value: v };
        }
        return query;
      },
    ];

    const router = useRouter();
    const store = useStore();

    const onClickItem = ({ item }) => {
      router.push({ name: item.label });
    };

    const navMap = reactive([]);
    store.state.navList.forEach((nav) => {
      navMap.push(
        Object.assign(
          {
            command: onClickItem,
          },
          nav
        )
      );
    });
    return { navMap, queryModels };
  },
};
</script>

<style></style>
