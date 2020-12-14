<template>
  <div class="p-grid">
    <div class="p-col-4">ID</div>
    <div class="p-col-8">#{{ problem.id }}</div>
  </div>
  <div class="p-grid">
    <div class="p-col-4">Type</div>
    <div class="p-col-8" v-text="problem.type"></div>
  </div>
  <div class="p-grid" v-if="problem.data.memory_limit">
    <div class="p-col-4">Time Limit</div>
    <div class="p-col-8" v-text="problem.data.memory_limit"></div>
  </div>
  <div class="p-grid" v-if="problem.data.time_limit">
    <div class="p-col-4">Memory Limit</div>
    <div class="p-col-8" v-text="problem.data.time_limit"></div>
  </div>
  <div class="p-grid" v-if="problem.hard">
    <div class="p-col-4">Hard</div>
    <div class="p-col-8" v-text="problem.hard"></div>
  </div>
  <div class="p-grid" v-if="problem.source">
    <div class="p-col-4">Source</div>
    <div class="p-col-8" v-text="problem.source"></div>
  </div>
  <div class="p-grid">
    <div class="p-col-4">Created By</div>
    <div class="p-col-8" v-text="problem.create_user_id || 'Supper'"></div>
  </div>
  <div class="p-grid" v-if="problem.tags.length">
    <div class="p-col-4">Tags</div>
    <div class="p-col-8">
      <tags :list="problem.tags"></tags>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

import Tags from "component/Tags.vue";

defineProps({
  problem: {
    type: Object,
  },
});
</script>

<style></style>
