<template>
  <div>
    <img
      class="Return"
      src="../assets/svg/arrow-left-s-line.svg"
      @click="getBack"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    getBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
</style>