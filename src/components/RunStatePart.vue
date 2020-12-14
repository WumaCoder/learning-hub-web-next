<template>
  <div v-show="runState.show" class="p-grid">
    <div class="p-col-6">
      Result:
      <span
        class="p-tag"
        :class="[
          { OK: 'p-tag-success', QUEUE: 'p-tag-primary' }[runState.result] ||
            'p-tag-danger',
        ]"
        >{{ runState.result }}</span
      >
    </div>
    <div class="p-col-6">Judge Time: {{ runState.judgeTime }}</div>
    <div class="p-col-6">Run Time: {{ runState.runTime }}ms</div>
    <div class="p-col-6">Run Memory: {{ runState.runMemory }}B</div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  runState: Object,
});
</script>
