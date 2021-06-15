<template>
   <!-- 评价内容 -->
    <div class="Container">
      <div class="title">
        商品评价
        <span>
          查看全部
          <img src="../assets/svg/arrow-right-s-line.svg" />
        </span>
      </div>
      <div class="content tips">暂无评价</div>
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
<style scoped>
#image {
  width: 100vw;
  height: 80vw;
  object-fit: cover;
}

/* 商品基本信息 */
.info {
  padding: 10px;
  margin-top: -5px;
  font-weight: bold;
  background-color: white;
  border-top: 1px solid #f0f0f0;
}

/* 商品价格 */
.price_text {
  font-size: 14px;
  color: #e74c3c;
}

.price_text > span {
  font-size: 20px;
  margin-left: 3px;
}

.other {
  padding: 10px;
  margin-bottom: 10px;
  font-size: 13px;
  color: #666;
  background-color: white;
  border-top: 1px solid #f0f0f0;
}

/* 店铺基本信息 */
.store_info {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: white;
}

.store_info > img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
}

.store_info > .name {
  flex: 1;
  font-weight: bold;
}

.store_info button {
  margin: 0;
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #e74c3c;
  color: #e74c3c;
  background-color: transparent;
}

.store_info button:active {
  background-color: #e74d3c11;
}

/* 底部按钮组 */
.BottomBar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.BottomBar > button {
  margin: 0;
  padding: 5px 10px;
  font-size: 10px;
  border: none;
  color: #666;
  background-color: white;
}

.BottomBar > button:active {
  background-color: rgba(0, 0, 0, 0.01);
}

.btn-buy {
  flex: 1;
  font-size: 14px !important;
  color: white !important;
}

.btn-buy.a {
  background-color: #ffcdd2;
}

.btn-buy.a:active {
  background-color: #ef9a9a;
}

.btn-buy.b {
  background-color: #f44336;
}

.btn-buy.b:active {
  background-color: #e53935;
}
</style>