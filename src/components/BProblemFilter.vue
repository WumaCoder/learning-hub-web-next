<template>
  <span class="p-input-icon-left">
    <i class="pi pi-search" />
    <p-input-text v-model="value" placeholder="Global Search" />
  </span>
</template>

<script>
import { watch } from "vue";
import { useStoreHelpers } from "tools/use/useStoreHelpers";
import { useDebouncedRef } from "tools/use/useDebouncedRef";
import { isNumber } from "tools/type";
export default {
  setup() {
    const value = useDebouncedRef("", 500);
    const { commit, dispatch } = useStoreHelpers("problem");
    watch(value, async (v) => {
      let field = "title";
      let model = "like";
      if (isNumber(v)) {
        field = "id";
        model = "default";
      }
      commit("setFilter", {
        isUse: true,
        model,
        field,
        value: v,
      });
      await dispatch("request");
    });
    return {
      value,
    };
  },
};
</script>

<style></style>
