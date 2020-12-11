<template>
  <navigation></navigation>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "component/Navigation.vue";
export default {
  components: { Navigation },
};
</script>

<style></style>
