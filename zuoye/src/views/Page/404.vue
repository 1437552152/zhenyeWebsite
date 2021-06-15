<template>
  <div class="nodata">
    <h1>404</h1>
    <img src="../../assets/404.jpg" style="width: 100%" />
    <div>
    <router-link to="/"
      ><van-button type="primary" size="large"
        >返回首页</van-button
      ></router-link
    >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
.nodata {
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
}
</style>