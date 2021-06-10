<template>
  <div style="margin-top: 100px">
    <van-form @submit="onSubmit">
      <div class="login">
        <h1>欢迎注册</h1>
        <img src="https://img01.yzcdn.cn/vant/logo.png" />
      </div>
      <van-field
        v-model="phone"
        name="phone"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="pwd"
        type="password"
        name="pwd"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <router-link to="/register" style="margin-left: 20px"
      >已注册？去登陆</router-link
    >
  </div>
</template>
<script>
import { register } from "@/utils/getData";
export default {
  data() {
    return {
      phone: "",
      pwd: "",
    };
  },
  methods: {
    onSubmit(values) {
       const that=this;
      register({ ...values }).then((res) => {
        if (res.status == 1) {
          that.$toast("注册成功");
          // setStore('userInfo',res.userInfo)
          that.$router.push({ path: "/login"});
        } else {
          that.$toast(res.msg);
        }
      });
    },
  },
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