<template>
  <div style="margin-top: 100px">
    <van-form @submit="onSubmit">
      <div class="login">
        <h1>欢迎登陆</h1>
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
      >未注册？去注册</router-link
    >
  </div>
</template>
<script>
import { Login } from "@/utils/getData";
import { setStore } from "@/utils/storage";
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
      Login({ ...values }).then((res) => {
        if (res.status == 1) {
          that.$toast("登陆成功");
          setStore('userInfo',res.userInfo)
          that.$router.push({ path: "/home"});
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