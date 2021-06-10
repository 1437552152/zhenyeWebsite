<template>
  <div>
    <div>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        background="#4fc08d"
        @focus="goNewsList"
      />
    </div>
    <div class="swiper">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in imgList" :key="index"
          ><img :src="item.url" class="photo"
        /></van-swipe-item>
      </van-swipe>
    </div>
    <div style="margin-bottom:60px">
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
import { blogList } from "@/utils/getData";
export default {
  data() {
    return {
      value: "",
      imgList: [
        { id: 1, url: "https://img-bss.csdn.net/1623208817356.png" },
        { id: 2, url: "https://img-bss.csdn.net/1623150783664.jpg" },
        { id: 3, url: "https://img-bss.csdn.net/1623139932849.jpg" },
        { id: 4, url: "https://img-bss.csdn.net/1622013960791.png" },
      ],

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
