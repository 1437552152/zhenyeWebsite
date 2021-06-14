<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-10 22:29:20
 * @LastEditTime: 2021-06-14 13:42:37
 * @LastEditors: yfye
-->
<template>
  <div>
    <van-icon
      name="add-o"
      size="40"
      style="position: fixed; right: 20px; top: 50%;z-index:999"
      @click="goPublish"
    />
    <div style="margin-bottom: 60px">
      <van-grid :column-num="1" v-if="articleList.length">
        <van-grid-item
          v-for="(item, index) in articleList"
          :key="index"
          :id="item.id"
          @click="goClick(item.id)"
        >
          <van-image :src="item.imageUrl" />

          <div class="list-style">{{ item.name }}</div>
          <div class="list-style">
            丢失地点:{{ item.descc }}
            <span style="float:right">联系人:{{ item.userName }}</span>
          </div>
        </van-grid-item>
      </van-grid>
      <van-empty description="暂无数据" v-else />
    </div>
  </div>
</template>
<script>
import { blogList } from "@/utils/getData";
import { getStore } from "@/utils/storage";
import { Dialog } from "vant";
export default {
  data() {
    return {
      value: "",
      userInfo: getStore("userInfo") || "",
      articleList: []
    };
  },
  created() {
    this.getData();
  },
  watch: {
    $route: {
      handler() {
        this.getData();
      },
      immediate: true
    }
  },
  methods: {
    goPublish() {
      if (this.userInfo) {
        console.log(11111);
        this.$router.push("/publish");
      } else {
        Dialog.confirm({
          title: "提示",
          message: "请先登录"
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
      blogList({ status: this.$route.query.status == 2 ? 2 : 1 }).then(res => {
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
          id
        }
      });
    },
    goNewsList() {
      this.$router.push({
        path: "/NewsList"
      });
    }
  }
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
</style>
