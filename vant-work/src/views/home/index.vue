<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-10 22:29:20
 * @LastEditTime: 2021-06-14 13:42:37
 * @LastEditors: yfye
-->
<template>
  <div>
    <van-search
      v-model="value"
      show-action
      label="北京市"
      placeholder="苹果iphone11"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <img
      src="https://sr.aihuishou.com/c2b/dubai/home/top_a_full_202106041710.jpg"
      style="width: 100%"
    />
    <img
      src="https://sr.aihuishou.com/c2b/dubai/home/top_b_202106041710.jpg"
      style="width: 100%; display: block"
    />

    <van-grid :column-num="5">
      <van-grid-item
        v-for="(item, index) in typeList1"
        :key="index"
        @click="goDetail(item.id,item.name)"
      >
        <van-image :src="item.imgUrl" />
        <p class="C5vsXG">{{ item.name }}</p>
      </van-grid-item>
    </van-grid>

    <div style="margin-bottom: 60px">
      <van-grid
        direction="horizontal"
        :column-num="1"
        v-if="articleList.length"
        style="text-aglign"
      >
        <van-grid-item
          v-for="(item, index) in articleList"
          :key="index"
          style="height: 130px; text-align: left"
          @click="goClick(item.id)"
        >
          <img
            :src="item.imageUrl"
            style="height: 100px; width: 100px; position: absolute; left: 0"
          />
          <div style="margin-left: 110px">
            <h1 class="title">{{ item.name }}</h1>
            <p style="color: #333; margin-bottom: 11px; font-size: 15px">
              {{ item.descc }}
            </p>
            <p>
              官方指导价:<span style="color: red">￥{{ item.phone }}</span>
              发布者:<span>￥{{ item.userName }}</span>
            </p>
            <p></p>
          </div>
        </van-grid-item>
      </van-grid>
      <van-empty description="暂无数据" v-else />
    </div>
  </div>
</template>
<script>
import { blogList, typeList } from "@/utils/getData";
import { getStore } from "@/utils/storage";
import { Dialog } from "vant";
export default {
  data() {
    return {
      value: "",
      userInfo: getStore("userInfo") || "",
      articleList: [],
      typeList1: [],
    };
  },
  created() {
    this.getData();
    this.list();
  },
  watch: {
    $route: {
      handler() {
        this.getData();
      },
      immediate: true,
    },
  },
  methods: {
    list() {
      typeList().then((res) => {
        if (res.status == 1) {
          this.typeList1 = res.data;
        } else {
          this.$toast(res.msg);
        }
      });
    },
    onSearch() {
      if (this.value) {
        this.$toast(`搜索值是${this.value}`);
      }
    },
    goDetail(id,name) {
      this.$router.push({
        path: "/newsList",
        query: {
          id,name
        },
      });
    },
    goPublish() {
      if (this.userInfo) {
        console.log(11111);
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
    },
    getData() {
      const that = this;
      console.log(this.$route.query.status);
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
.list-style {
  font-size: 14px;
  margin-top: 10px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 100%;
}

.van-grid-item__content--center {
  align-items: flex-start;
}
.listhead {
  font-size: 18px;
  margin-bottom: 30px;
  margin-top: 10px;
}
.van-icon__image {
  width: 100%;
  height: 100%;
}
.C5vsXG {
  width: 100%;
  text-align: center;
}
.title {
  margin-bottom: 9px;
  font-size: 19px;
  color: #000;
  font-weight: bold;
}
</style>
