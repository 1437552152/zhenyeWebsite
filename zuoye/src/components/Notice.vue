<template>
  <div class="Store_Info">
      <img src="../assets/svg/pdd.svg" />
      <div class="name">
        <div>徐诗媛的小店</div>
        <button>关注</button>
        <button>客服</button>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
  },
};
</script>

<style  scoped>
/* 店铺基本信息 */
.Store_Info {
  display: flex;
  align-items: center;
  padding: 50px 10px 10px 10px;
  margin-bottom: 10px;
  background-color: white;
}

.Store_Info > img {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 5px;
}

.Store_Info > .name {
  font-weight: bold;
}

.Store_Info > .name > div {
  margin-bottom: 5px;
}

.Store_Info > .name button {
  margin: 0;
  padding: 5px 15px;
  border-radius: 5px;
  border: 1px solid #e74c3c;
  color: #e74c3c;
  background-color: transparent;
}

.Store_Info > .name button:active {
  background-color: #e74d3c11;
}
</style>