<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-09 10:14:37
 * @LastEditTime: 2021-06-15 19:39:53
 * @LastEditors: yfye
-->
<template>
  <div>
    <Header />
    <Return style="top: 49px;z-index: 999;position: absolute;left: -14px;" />
    <van-search
      v-model="value"
      background="#0084ff"
      show-action
      placeholder="输入公司名称、老板姓名、品牌名称等"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>

    <div class="box">
      <h3 style="margin-bottom:10px;color:rgb(51, 51, 51)">{{detail.title}}</h3>
      <div class="hotnews_from">
        <p class="header_subtitle">
         {{detail.date}}来源：&nbsp;
          <a
            rel="nofollow"
            href=""
            target="_blank"
            :textvalue="detail.source"
          > {{detail.source}}</a>
        </p>
      </div>
      <p v-html="detail.content"></p>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import Return from "../../components/Return.vue";
import { goodsData } from "../../utils/data";
export default {
  components: { Header, Return },
  data() {
    return {
      detail: {},
      value: ""
    };
  },
  mounted() {
    goodsData.map(item => {
      if (item.id == this.$route.query.id) {
        this.detail = item;
      }
    });
  },
  methods: {
    onSearch() {}
  }
};
</script>

<style  scoped>
.hotnews_from{
  box-sizing: border-box;
    margin-bottom: 24px;
    padding-bottom: 0;
    border-bottom: 0;
}
.header_subtitle{
    margin-bottom: 16.5px;
} 
.header_subtitle a {
    color: #0084ff;
}
.box{
  margin-left: 10px;
    margin-right: 10px;
}
</style>