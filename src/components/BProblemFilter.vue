<template>
  <span :class="{ 'p-input-icon-left': showIcon }">
    <i v-if="showIcon" class="pi pi-search" />
    <component
      :is="is"
      v-model="value"
      :style="[$attrs.inputStyle]"
      :placeholder="placeholder"
    />
  </span>
</template>

<script>
import { watch } from "vue";
import { useStoreHelpers } from "tools/use/useStoreHelpers";
import { useDebouncedRef } from "tools/use/useDebouncedRef";

export default {
  props: {
    showIcon: Boolean,
    placeholder: String,
    queryModels: {
      default: () => [],
      type: Array,
    },
    /**
     * queryModel[*](field, value)=>{field, model, value}|null
     */
    is: { default: "p-input-text", type: String } /** 组件 */,
    options: Array,
    field: String,
    model: String,
  },
  setup(props) {
    const value = useDebouncedRef("", 500);
    const { commit, dispatch } = useStoreHelpers("problem");
    watch(value, async (v) => {
      if (!v) {
        commit("setFilter", {
          isUse: false,
        });
        await dispatch("request");
        return;
      }
      let filterModel = null;
      for (let i = 0; i < props.queryModels.length; i++) {
        const fun = props.queryModels[i];
        filterModel = fun(props.field, v);
        if (filterModel) break;
      }

      if (filterModel) {
        commit("setFilter", {
          isUse: true,
          model: filterModel.model,
          field: filterModel.field,
          value: filterModel.value,
        });
      } else {
        commit("setFilter", {
          isUse: true,
          model: props.model,
          field: props.field,
          value: v,
        });
      }

      await dispatch("request", 1, 2);
    });
    return {
      value,
    };
  },
};
</script>

<style></style>
