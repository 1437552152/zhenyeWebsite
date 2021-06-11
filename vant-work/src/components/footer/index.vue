<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-10 22:29:20
 * @LastEditTime: 2021-06-11 00:20:08
 * @LastEditors: yfye
-->
<template>
  <div>
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item name="home" icon="wap-home-o">首页</van-tabbar-item>
      <!-- <van-tabbar-item name="part" icon="add-o">新建</van-tabbar-item> -->
      <van-tabbar-item name="userInfo" icon="manager-o"
        >个人中心</van-tabbar-item
      >
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
      userInfo: getStore("userInfo") || "",
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
      console.log(this.userInfo);
      if (index == "part") {
        if (this.userInfo) {
          this.$router.push("/publish");
        } else {
          Dialog.confirm({
            title: "提示",
            message: "请先登录",
          })
            .then(() => {
              this.$router.push("/login");
            })
            .catch(() => {
              // on cancel
            });
        }
      }

      if (index == "userInfo") {
        if (this.userInfo) {
          this.$router.push("/user");
        } else {
          Dialog.confirm({
            title: "提示",
            message: "请先登录",
          })
            .then(() => {
              this.$router.push("/login");
            })
            .catch(() => {
              // on cancel
            });
        }
      }

      console.log(index);
      if (index == "home") {
        this.$router.push("/");
      }

      this.active = index;
    },
  },
};
</script>
