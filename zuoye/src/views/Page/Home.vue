<template>
  <div>
    <Header />
    <!-- 滚动菜单栏 -->
    <MenuClassify @clickChange="clickChange" />
    <!-- 网格菜单栏 -->
    <Filter />
    <!-- 天眼服务 -->
     <Service />
    <ProductList />

    <Bottom />
  </div>

</template>

<script>
import MenuClassify from "../../components/MenuClassify.vue";
import Service from "../../components/Service.vue";
import Filter from "../../components/Filter.vue";
import Header from "../../components/Header.vue";
import ProductList from "../../components/ProductList.vue";
import Bottom from "../../components/Bottom.vue";
export default {
  data() {
    return {};
  },
  components: { MenuClassify, Service,Filter,Header, ProductList,Bottom  },
  mounted() {},
  methods: {
    switchPage(url) {
      this.$router.push(url);
    },
    clickChange() {
    },
  },
};
</script>

<style  scoped>
body {
  padding-bottom: 70px !important; /*底部内边距*/
  background-color: #f0f0f0; /*背景颜色*/
}

.ScrollMenu,
.Filter,/*图文菜单*/
.Product-List {
  background-color: white;
  margin-bottom: 10px;
}

/* 滚动菜单栏 */
.ScrollMenu {
  display: flex;
  overflow-x: scroll;
}

.ScrollMenu > div {
  text-align: center;
  min-width: 30px;
  padding: 6px;
  margin: 0 6px;
  font-size: 14px;
  border-bottom: 3px solid transparent;
  user-select: none;
}

.ScrollMenu > div.active {
  border-color: #e74c3c;
}

/* 网格菜单栏 */

.Filter {
  display: grid;
  grid-template-columns: repeat(5, auto);
}

.Filter > .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin: 5px auto;
  min-width: 50px;
  border-radius: 5px;
  font-size: 13px;
  color: #555;
  user-select: none;
}

.Filter > .item:active {
  background-color: rgba(0, 0, 0, 0.05);
}

.Filter > .item > img {
  width: 32px;
  height: 32px;
}

/* 商品列表 */
.Product-List {
  padding: 5px 0;
  padding-bottom: 40px;
}

.Product-List > .item {
  display: flex;
  padding: 5px 10px;
  margin-bottom: 10px;
  user-select: none;
}

.Product-List > .item > * {
  pointer-events: none;
}

.Product-List > .item:active {
  background-color: rgba(0, 0, 0, 0.08);
}

.Product-List > .item > img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 5px;
  object-fit: cover;
}

.Product-List > .item > .info {
  display: flex;
  flex-direction: column;
}

/* 商品名称样式 */
.Product-List > .item > .info > div:first-child {
  flex: 1;
  font-size: 18px;
}

/* 商品价格样式 */
.Product-List > .item > .info > div:last-child {
  font-size: 14px;
  font-weight: bold;
  color: #e74c3c;
}

.Product-List > .item > .info > div:last-child > span {
  font-size: 20px;
  margin-left: 3px;
}

</style>