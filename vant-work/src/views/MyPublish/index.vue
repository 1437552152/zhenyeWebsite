<template>
  <div class="tc-box article-box list_left">
    <Return title="我的发布" />
    <div  v-if="articleList.length">
    <van-swipe-cell v-for="(item, index) in articleList" :key="index" >
      <van-card class="goods-card" :thumb="item.imageUrl">
        <template #title>
          <div class="listhead">{{ item.name }}</div>
        </template>
        <template #tags>  发布人:{{ item.userName }}  </template>
        <template #footer> {{ item.time }} </template>
      </van-card>
      <template #right>
        <!-- <van-button
          square
          text="编辑"
          type="primary"
          class="delete-button"
          @click="goEdit(1)"
        /> -->
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          @click="goDelete(item.id)"
        />
      </template>
    </van-swipe-cell></div>
    <van-empty description="暂无数据" v-else/>
  </div>
</template>
<script>
import Return from "../../components/Return.vue";
import { blogList, deleteBlog } from "@/utils/getData";
import { getStore } from "@/utils/storage";
export default {
  components: { Return },
  data() {
    return {
      userInfo: getStore("userInfo"),
      articleList: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const that = this;
      blogList({ id: this.userInfo.id }).then((res) => {
        if (res.status == 1) {
          console.log(res);
          that.articleList = res.data;
        } else {
          that.$toast(res.msg);
        }
      });
    },
    goDelete(id) {
      deleteBlog({ id }).then((res) => {
        if (res.status == 1) {
          this.$toast("删除成功");
          this.getData();
        } else {
          this.$toast(res.msg);
        }
      });
    },
    goEdit(id) {
      this.$router.push({
        path: `/publish?id=${id}`,
      });
    },
  },
};
</script>
<style scoped>
.goods-card {
  margin: 0;
  background-color: #fff;
}

.delete-button {
  height: 100%;
}
.listhead {
  font-size: 18px;
  margin-bottom: 30px;
  margin-top: 10px;
}
</style>