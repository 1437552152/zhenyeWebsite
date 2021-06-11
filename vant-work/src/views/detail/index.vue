<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-10 22:29:20
 * @LastEditTime: 2021-06-11 00:38:17
 * @LastEditors: yfye
-->
<template>
  <div class="tc-box article-box list_left">
    <Return title="详情" />
    <h1>{{ detail.name }}</h1>
    <div class="article-infobox">
      <span>发布时间： {{ detail.time }}</span>
    </div>
    <div id="article_content">
         {{ detail.content }}
     <div style="width:80%;margin:10px auto"> <img :src="detail.imageUrl" style="width:100%"/></div>
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
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const that = this;
      blogDetail({ id: this.$route.query.id }).then((res) => {
        if (res.status == 1) {
          that.detail = res.data;
        } else {
          that.$toast(res.msg);
        }
      });
    },
  },
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
}
</style>