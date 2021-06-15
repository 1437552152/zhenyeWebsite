<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-10 22:29:20
 * @LastEditTime: 2021-06-14 13:50:10
 * @LastEditors: yfye
-->
<template>
  <div class="tc-box article-box list_left">
    <Return title="详情" />
    <h1>{{ detail.name }}</h1>
    <div class="article-infobox">
      <span>发布时间： {{ detail.time }}</span> <span style="color:red">￥{{ detail.phone }}</span>
    </div>
    <div id="article_content">
      <div style="width:80%">
        <img :src="detail.imageUrl" style="width:100%" @click="show=true"/>
      </div>
       {{ detail.content }}
    </div>
  </div>
</template>
<script>
import Return from "../../components/Return.vue";
import { blogDetail } from "@/utils/getData";
export default {
  components: { Return },
  data() {
    return {
      detail: {},
      show: false,
      images: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const that = this;
      blogDetail({ id: this.$route.query.id }).then(res => {
        if (res.status == 1) {
          that.detail = res.data;
          that.images=[res.data.imageUrl]
        } else {
          that.$toast(res.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
.article_content {
  padding-left: 10px;
  padding-right: 10px;
}
.article-box h1 {
  font-size: 22px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 24px;
}
.article-infobox {
  text-align: center;
  margin-bottom: 10px;
}
#article_content {
  line-height: 27px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 16px;
  margin-top: 34px;
  text-indent: 2em;
}
.address{
  font-size: 16px;
    color: red;
    padding-left: 20px;
    margin-bottom: 50px;
    line-height: 26px;
}
</style>