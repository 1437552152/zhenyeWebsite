<template>
  <div>
    <!-- 返回按钮 -->
    <Return />
    <!-- 店家信息 -->
    <Notice />

    <!-- 商品列表 -->
     <ProductList />
  </div>
</template>

<script>
import Return from "../../components/Return.vue";
import ProductList from "../../components/ProductList.vue";
import Notice from "../../components/Notice.vue";
export default {
  components: { Return,ProductList,Notice },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
