<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-15 19:42:42
 * @LastEditTime: 2021-06-15 19:48:02
 * @LastEditors: yfye
-->
<template>
  <div class="tyc-footer">
    <div class="tyc-footer-link">
      <a class="footer-link" href="/store" rel="nofollow">关于天眼查</a>
      <span class="footer-dian"></span>
      <a class="footer-link" href="/store" rel="nofollow">说明</a>
      <span class="footer-dian"></span>
      <a class="footer-link" href="/store" rel="nofollow">版权</a>
      <span class="footer-dian"></span>
      <a class="footer-link" href="/store" rel="nofollow">反馈</a>
    </div>
    <div class="footer-bottom">
      <p>&nbsp;京ICP备14061319&nbsp;</p>
      <p>&nbsp;增值电信业务经营许可证：京B2-20181511&nbsp;</p>
      <p>©2018 TIANYANCHA</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.tyc-footer {
  margin-top: 8px;
  padding-top: 14px;
  padding-bottom: 80px;
  text-align: center;
  background-color: #fff;
  height: 99px;
}

.tyc-footer .tyc-footer-link {
  font-size: 0;
}

.tyc-footer .footer-link {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #666666;
  letter-spacing: 0;
  text-align: center;
}

.tyc-footer .footer-dian {
  display: inline-block;
  height: 16px;
  width: 1px;
  background: #e0e0e0;
  vertical-align: top;
  margin: 0 16px;
}

.tyc-footer .footer-bottom {
  font-family: PingFangSC-Regular;
  font-size: 12px !important;
  color: #999999;
  letter-spacing: 0;
  text-align: center;
  -webkit-transform: scale(0.83) !important;
  transform: scale(0.83) !important;
  line-height: 14px;
  margin-top: 5px;
}

.tyc-footer .footer-bottom p {
  margin: 0;
  line-height: 18px;
  font-size: 12px !important;
}
</style>