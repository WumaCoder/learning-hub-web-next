<template>
  <span
    v-for="(item, index) in tlist"
    :key="index"
    class="p-tag p-mr-1 p-mb-1"
    :class="item.classes"
    :style="item.style"
    >{{ item.label }}</span
  >
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    list: Array,
    labelKey: {
      type: String,
      default: "label",
    },
    colorMap: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const tlist = computed(() => {
      let ret = props.list.map((item) => {
        if (!(typeof item === "object")) {
          const colorMap = props.colorMap[item] || {};
          return {
            label: item,
            style: colorMap.style,
            classes: colorMap.classes,
          };
        } else {
          const colorMap = props.colorMap[item[props.labelKey]] || {};
          return {
            label: item[props.labelKey],
            style: colorMap.style,
            classes: colorMap.classes,
          };
        }
      });
      return ret;
    });
    return {
      tlist,
    };
  },
};
</script>

<style></style>
