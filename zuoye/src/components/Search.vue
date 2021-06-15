<template>
  <div class="SearchBar">
    <img src="../assets/svg/search-line.svg" alt="" />
    <input type="text" placeholder="普通注销" @click="goSearch" />
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    goSearch() {
      Toast("您点击了搜索");
    },
  },
};
</script>
<style scoped>
</style>