<template>
  <div>
    <div>
      <Return title="博客搜索" />
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        @input="getNewvalue"
      />
    </div>
    <div>
      <van-card
        v-for="(item, index) in articleList"
        :key="index"
        :title="item.name"
        :thumb="item.imageUrl"
        :id="item.id"
        @click="goClick(item.id)"
      >
        <template #title>
          <div class="listhead">{{ item.name }}</div>
        </template>
        <template #tags>
          {{ item.descc }}
        </template>
        <template #footer>
          {{ item.time }}
        </template>
      </van-card>
    </div>
  </div>
</template>
<script>
import Return from "../../components/Return.vue";
import { blogList } from "@/utils/getData";
export default {
  components: { Return },
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
    getNewvalue(e) {
      const that = this;
      blogList({ value: e.target.value }).then((res) => {
        if (res.status == 1) {
          that.articleList = res.data;
        } else {
          that.$toast(res.msg);
        }
      });
    },
  },
};
</script>
<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.swiper {
  width: 100%;
  height: 200px;
  margin: auto;
}

.van-swipe,
.swiper .photo {
  width: 100%;
  height: 100%;
}
.listhead {
  font-size: 18px;
  margin-bottom: 30px;
  margin-top: 10px;
}
</style>
