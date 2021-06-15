<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-10 22:29:20
 * @LastEditTime: 2021-06-10 23:59:55
 * @LastEditors: yfye
-->
<template>
  <div>
    <!-- vant导航栏 -->
    <van-nav-bar style="background-color: #3090EC;">

      <template #title>
        <span style="color: white;">登录</span>
      </template>
    </van-nav-bar>

    <!-- vant表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="phone"
        label="账号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写账号' },{pattern:/^[1][3,5,6,7,8,9][0-9]{9}$/ , message: '请输入正确的11位手机号'}]"
      />
      <van-field
        v-model="pwd"
        :type="password"
        name="pwd"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' },{pattern: /^\w{6,}$/,message:'密码不少于6位'}]"
      >
        <template #right-icon>
          <span style="font-size: 20px;" class="iconfont icon-view"></span>
        </template>
      </van-field>

      <div style="margin: 16px;">
        <van-button round block type="danger" native-type="submit">登录</van-button>
      </div>
    </van-form>

    <div style="float: right;font-size:14px;">
      <router-link to="/register">没有账号？点击注册</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      pwd: ""
    };
  },
  methods: {
    onSubmit() {
      const that = this;
      that.$router.push({ path: "/" });
    }
  }
};
</script>
<style scoped>
.login {
  text-align: center;
}
.login h1 {
  font-size: 30px;
  font-weight: bold;
}
.login img {
  width: 100px;
  margin-top: 20px;
  margin-bottom: 50px;
}
</style>