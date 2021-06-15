<template>
  <div>
    <!-- 搜索栏 -->
    <SearchData />
    <!-- 分类菜单 -->
    <div class="Menu">
      <!-- 分类名称 -->
      <div class="Left">
        <div
          :class="{'active':index==active?true:false}"
          v-for="(item,index) in list"
          :key="index"
          @click="goChange(index)"
        >{{item.name}}</div>
      </div>
      <!-- 分类内容 -->
      <div class="Right">
        <div class="Content service-content">
          <a
            data-v-2eb6484c
            data-v-efcb7fae
            href="/introduce/fst_6AJHyhxj/sec_qyJXhMyJ"
            class="recommend-item total-service"
            
          >
            <div data-v-2eb6484c class="banner-img van-image">
              <img
                src="https://cdn.tianyancha.com/ip-require-js/public/images/service_banner/3e812d82c4b711eaac5500163e0c1e8b.jpg"
                class="van-image__img"
              />
            </div>
            <div data-v-2eb6484c class="info-part">
              <div data-v-2eb6484c class="title">
                代理记账
                <!---->
              </div>
              <div data-v-2eb6484c class="desc">提供专业记账服务，节省雇佣会计成本</div>
              <div data-v-b2729e1c data-v-2eb6484c class="tag">
                <!---->
                <!---->
              </div>
              <div data-v-2eb6484c class="bottom">
                <div data-v-2eb6484c class="price">
                  <i data-v-2eb6484c class="symbol">¥</i> 1700
                  <i data-v-2eb6484c class="text">起</i>
                </div>
                <div data-v-2eb6484c class="order-num">已售1.7万</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchData from "../../components/Search.vue";
export default {
  data() {
    return {
      list: [
        {
          name: "推荐",
          list: [
            { name: "皮衣", image: require("../../assets/img/polo衫.jpg") },
            { name: "西装", image: require("../../assets/img/西装.jpg") },
            { name: "西装", image: require("../../assets/img/西装.jpg") }
          ]
        },
        {
          name: "创业套餐",
          list: [
            { name: "polo衫", image: require("../../assets/img/polo衫.jpg") },
            { name: "皮衣", image: require("../../assets/img/皮衣.jpg") }
          ]
        },
        {
          name: "工商注册",
          list: [{ name: "皮衣", image: require("../../assets/img/皮衣.jpg") }]
        },
        {
          name: "财税代办",
          list: [{ name: "皮裤", image: require("../../assets/img/西装.jpg") }]
        },
        {
          name: "资质许可",
          list: [
            { name: "西装", image: require("../../assets/img/工装裤.jpg") }
          ]
        },
        {
          name: "商标服务",
          list: [
            { name: "牛仔裤", image: require("../../assets/img/西装.jpg") }
          ]
        },
        {
          name: "版权服务",
          list: [{ name: "皮裤", image: require("../../assets/img/西装.jpg") }]
        },
        {
          name: "法律服务",
          list: [
            { name: "工装裤", image: require("../../assets/img/西装.jpg") }
          ]
        }
      ],
      active: 0
    };
  },
  components: { SearchData },
  mounted() {},
  methods: {
    switchPage(url) {
      this.$router.push(url);
    },
    goChange(index) {
      this.active = index;
    },
    goDetail() {
      this.$router.push({
        path: "/product",
        query: {
          id: 1
        }
      });
    }
  }
};
</script>

<style  scoped>
.Menu {
  flex: 1;
  display: flex;
}

/* 左侧菜单栏 */
.Menu > .Left {
  min-width: 80px;
  background-color: rgba(0, 0, 0, 0.02);
  min-height: 600px;
}

.Menu > .Left > div {
  padding: 10px 0;
  text-align: center;
  border-left: 3px solid transparent;
  user-select: none;
  background-color: #f2f3f4;
  color: #666666;
  font-size: 14px;
}

.Menu > .Left > div.active {
  border-color: #e74c3c;
  background-color: white;
}

/* 右侧内容栏 */
.Menu > .Right {
  flex: 1;
}

.Menu > .Right > .Content {
  display: grid;
  gap: 5px;
  padding: 10px;
  grid-template-columns: repeat(3, auto);
}

.Menu > .Right .grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  padding: 5px;
  margin: auto;
  border-radius: 5px;
}

.Menu > .Right .grid:active {
  background-color: rgba(0, 0, 0, 0.05);
}

.Menu > .Right .grid > img {
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
  border-radius: 5px;
  object-fit: cover;
}
.total-service{
    margin-bottom: 0;
    box-shadow: none;
    padding: 0;
    padding-top: 0.426667rem;
}
.recommend-item {
    width: 100%;
    margin-bottom: 0.213333rem;
    background: #FFFFFF;
    box-shadow: 0 0.053333rem 0.32rem 0 rgb(197 202 213 / 30%);
    border-radius: 0.053333rem;
    padding: 0.426667rem 0.32rem;
    position: relative;
    display: flex;
    justify-content: space-between;
}
.recommend-item .banner-img {
   width: 4.213333rem;
    height: 3.653333rem;
    border-radius: 0.053333rem;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    overflow: hidden;
    margin-right: 0.32rem;
}
van-image__error, .van-image__img, .van-image__loading {
    display: block;
    width: 100%;
    height: 100%;
}
.total-service .info-part {
    width: calc(100% - 2.533333rem);
}

.recommend-item .info-part {
    flex-grow: 1;
}
.recommend-item .info-part .title {
    font-size: 0.4rem;
    color: #333333;
    line-height: 1.506667rem;
    font-weight: bold;
    margin-bottom: 0.133333rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.total-service .info-part .desc {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 0.266667rem;
}
.recommend-item .info-part .desc {
    font-size: 0.293333rem;
    color: #999999;
    line-height: 0.773333rem;
    margin-bottom: 0.16rem;
    white-space: normal;
    text-align: justify;
}
.recommend-item .info-part .tag{
    margin-bottom: 0.053333rem;
    padding-top: 0;
}
.recommend-item .info-part .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.recommend-item .info-part .price{
    font-size: 0.426667rem;
    color: #FF6D30;
    line-height: 0.426667rem;
    font-weight: bold;
}
.recommend-item .info-part .price i.symbol {
    font-size: 0.32rem;
}
.recommend-item .info-part .price i{
    font-style: normal;
}
.recommend-item .info-part .price i.text {
    color: #FF6D30;
    font-size: 0.266667rem;
    font-style: normal;
    padding-left: 0.053333rem;
}
.recommend-item .info-part .order-num{
    font-size: 0.266667rem;
    color: #BFBFBF;
    text-align: right;
    line-height: 0.266667rem;
}
</style>