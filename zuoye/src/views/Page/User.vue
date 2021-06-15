<template>
  <div>
    <!-- 导航栏 -->
    <div class="Navigation">
      <div class="item" data-page="index" @click="switchPage('/')">
        <img src="../../assets/svg/home-3-line.svg" />
        <div>首页</div>
      </div>
      <div class="item" data-page="menu" @click="switchPage('/Menu')">
        <img src="../../assets/svg/list-unordered.svg" />
        <div>分类</div>
      </div>
      <div class="item active" data-page="user" @click="switchPage('/User')">
        <img src="../../assets/svg/user-smile-line-active.svg" />
        <div>个人</div>
      </div>
    </div>
    <!-- 用户基本信息 -->
    <div class="User">
      <img src="../../assets/svg/user-3-fill.svg" />
      <button @click="switchPage('/login')">点击登陆</button>
    </div>

    <!-- 订单操作按钮 -->
    <div class="Container">
      <div class="title">
        我的订单
        <span>
          查看全部
          <img src="../../assets/svg/arrow-right-s-line.svg" />
        </span>
      </div>
      <div class="icon-btn-group">
        <div class="item">
          <img src="../../assets/svg/wallet-3-line.svg" />
          <div>待付款</div>
        </div>
        <div class="item">
          <img src="../../assets/svg/time-line.svg" />
          <div>待发货</div>
        </div>
        <div class="item">
          <img src="../../assets/svg/luggage-cart-line.svg" />
          <div>待收货</div>
        </div>
        <div class="item">
          <img src="../../assets/svg/star-smile-line.svg" />
          <div>待评价</div>
        </div>
      </div>
    </div>

    <!-- 其他按钮 -->
    <div class="icon-btn-group">
      <div class="item">
        <img src="../../assets/svg/coupon-3-fill.svg" />
        <div>优惠券</div>
      </div>
      <div class="item">
        <img src="../../assets/svg/heart-2-fill.svg" />
        <div>商品收藏</div>
      </div>
      <div class="item">
        <img src="../../assets/svg/footprint-fill.svg" />
        <div>历史浏览</div>
      </div>
      <div class="item">
        <img src="../../assets/svg/message-3-fill.svg" />
        <div>我的评价</div>
      </div>
      <div class="item" @click="goAddress">
        <img src="../../assets/svg/map-pin-line.svg" />
        <div>收货地址</div>
      </div>
      <div class="item">
        <img src="../../assets/svg/customer-service-line.svg" />
        <div>官方客服</div>
      </div>
      <div class="item">
        <img src="../../assets/svg/settings-4-line.svg" />
        <div>设置</div>
      </div>
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
    switchPage(url) {
      this.$router.push(url);
    },
    goAddress(){
       this.$router.push('/address');
    }
  },
};
</script>

<style  scoped>
/* 用户基本信息样式 */
.User {
  display: flex;
  align-items: center;
  padding: 15px 10px;
  background-color: white;
}

.User > img {
  width: 80px;
  height: 80px;
  padding: 15px;
  margin-right: 15px;
  border-radius: 50%;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.05);
}

.User > button {
  color: #e74c3c;
  height: 40px;
  padding: 0 25px;
  border-radius: 20px;
  border: 1px solid #e74c3c;
  font-size: 14px;
  background-color: transparent;
}

.User > button:active {
  background-color: #e74d3c11;
}
</style>