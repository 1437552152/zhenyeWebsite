<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  props:{
    title:{
      typeof:String,
      default:'头部'
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
</style>