<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-14 00:57:22
 * @LastEditTime: 2021-06-14 14:03:43
 * @LastEditors: yfye
-->
<template>
  <div class="tc-box article-box list_left">
    <Return title="使用须知" />
    <div id="article_content" v-html="detail.content">
    </div>
  </div>
</template>
<script>
import Return from "../../components/Return.vue";
import { platformIntroduction } from "@/utils/getData";
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
      platformIntroduction().then((res) => {
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
#article_content {
  line-height: 27px;
    margin-left: 20px;
    margin-right: 20px;
    word-break: break-all;
}
#article_content pre{
  word-wrap: break-word;
    word-break: normal;
    overflow: hidden;
    /* word-break: break-all; */
    overflow-wrap: normal;
}
</style>