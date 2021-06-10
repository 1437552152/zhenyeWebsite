<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-10 22:29:20
 * @LastEditTime: 2021-06-10 23:46:51
 * @LastEditors: yfye
-->
<template>
  <div>
    <div>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        @focus="goNewsList"
      />
    </div>
<div>
 <van-notice-bar left-icon="volume-o" :scrollable="false">
  <van-swipe
    vertical
    class="notice-swipe"
    :autoplay="3000"
    :show-indicators="false"
  >
    <van-swipe-item v-for="(item, index) in articleList" :key="index" :id="item.id" @click="goClick(item.id)">{{item.name}}</van-swipe-item>
  </van-swipe>
</van-notice-bar>
</div>
    <div style="margin-bottom:60px">
     <van-grid :column-num="2">
  <van-grid-item v-for="(item, index) in articleList" :key="index" :id="item.id" @click="goClick(item.id)">
     <van-image :src="item.imageUrl" />
     
     <div class="list-style">{{item.name}}</div>
     <div class="list-style">{{item.descc}}</div>
  </van-grid-item>
</van-grid>
    </div>
  </div>
</template>
<script>
import { blogList } from "@/utils/getData";
export default {
  data() {
    return {
      value: "",

      articleList: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const that = this;
      blogList().then((res) => {
        if (res.status == 1) {
          that.articleList = res.data;
        } else {
          that.$toast(res.msg);
        }
      });
    },
    goClick(id) {
      this.$router.push({
        path: "/detail",
        query: {
          id,
        },
      });
    },
    goNewsList() {
      this.$router.push({
        path: "/NewsList",
      });
    },
  },
};
</script>
<style>
.notice-swipe {
    height: 40px !important;
    line-height: 40px;
  }
.list-style{
    font-size: 14px;
    margin-top: 10px;
}

.van-grid-item__content--center{
  align-items:flex-start
}
.listhead {
  font-size: 18px;
  margin-bottom: 30px;
  margin-top: 10px;
}
.van-icon__image{
   width:100%;
   height:100%;
}
</style>
