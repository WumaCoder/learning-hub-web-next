<template>
  <p-menubar :model="items">
    <template #start>
      <div class="p-mr-2 p-d-flex p-ai-center">
        <img alt="logo" src="../assets/logo.png" height="40" />
        <span class="p-text-bold">Learning Hub</span>
      </div>
    </template>
    <template #end>
      <b-problem-filter></b-problem-filter>
    </template>
  </p-menubar>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import BProblemFilter from "./BProblemFilter.vue";

export default {
  components: { BProblemFilter },
  setup() {
    const router = useRouter();

    const onClickItem = ({ item }) => {
      router.push({ name: item.label });
    };

    const items = reactive([
      {
        label: "Problem",
        icon: "pi pi-fw pi-file",
        command: onClickItem,
      },
      {
        label: "About",
        icon: "pi pi-fw pi-file",
        command: onClickItem,
      },
    ]);
    return { items };
  },
};
</script>

<style></style>
