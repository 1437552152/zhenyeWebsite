<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-10 22:29:20
 * @LastEditTime: 2021-06-14 14:05:35
 * @LastEditors: yfye
-->
<template>
  <div>
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item name="home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item name="part" icon="smile-o">旧机估价</van-tabbar-item>
      <van-tabbar-item name="userInfo" icon="manager-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Dialog } from "vant";
import { getStore } from "@/utils/storage";
export default {
  data() {
    return {
      active: "home",
      userInfo: getStore("userInfo") || ""
    };
  },
  created() {
    console.log(this.$route.path);
    if (this.$route.path == "/user") {
      this.active = "userInfo";
    }
  },
  methods: {
    onChange(index) {
      if (index == "part") {
        this.$router.push("/publish");
      }
      if (index == "home") {
        this.$router.push("/");
      }
      if (index == "userInfo") {
        if (this.userInfo) {
          this.$router.push("/user");
        } else {
          Dialog.confirm({
            title: "提示",
            message: "请先登录"
          })
            .then(() => {
              this.$router.push("/login");
            })
            .catch(() => {
              // on cancel
            });
        }
      }
      this.active = index;
    }
  }
};
</script>
