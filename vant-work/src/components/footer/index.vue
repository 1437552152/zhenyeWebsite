<template>
  <div>
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item name="home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item name="part" icon="add-o">发布</van-tabbar-item>
      <van-tabbar-item name="userInfo" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { Dialog } from "vant";
let userInfo = JSON.parse(localStorage.getItem("userInfo"));
export default {
  data() {
    return {
      active: "home",
    };
  },
  created(){
    console.log(this.$route.path)
     if(this.$route.path=='/user'){
       this.active= "userInfo"
     }
  },
  methods: {
    onChange(index) {
      if (index == "part") {
        if (userInfo) {
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
        if (userInfo) {
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

       console.log(index)        
      if (index == "home") {
        this.$router.push("/");
      }

      this.active = index;
    },
  },
};
</script>
