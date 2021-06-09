<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-09 22:03:07
 * @LastEditTime: 2021-06-10 00:47:03
 * @LastEditors: yfye
-->
<template>
  <transition name="slide">
    <div>
      <van-nav-bar title="地址编辑"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        :z-index="10"
        fixed />
        <van-address-edit
          show-postal
          show-delete
          show-set-default
          show-search-result
          :search-result="searchResult"
          @save="onSave"
          @delete="onDelete"
        />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import { Toast } from 'vant';
export default {
  data() {
    return {
       searchResult: [],
    };
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['editAddress'])
  },
  methods: {
     onSave() {
      Toast('保存');
    },
    onDelete() {
      Toast('删除');
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s

.slide-enter, .slide-leave-to
  opacity 0
  transform translate3d(100%, 0, 0)
</style>
