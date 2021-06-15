<!--
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-15 19:02:42
 * @LastEditTime: 2021-06-15 19:07:44
 * @LastEditors: yfye
-->
<template>
  <div class="SearchBar">
    <div class="read-new">
      <div class="news-box">
        <div class="news-title">
          <span>天眼服务</span>
        </div>
        <div class="service-box">
          <div class="top">
            <div class="left">
              <a>
                <span class="title">注册商标</span>
                <p class="text">专业把控 高注册通过率</p>
                <img
                  class="btn"
                  src="https://cdn.tianyancha.com/wap-require-js/public/images/proxyPeers/xsdj.png"
                />
                <img
                  class="bg"
                  src="https://cdn.tianyancha.com/wap-require-js/public/images/proxyPeers/Obj.png"
                />
                <img
                  class="icon"
                  src="https://cdn.tianyancha.com/wap-require-js/public/images/proxyPeers/zcsb.png"
                />
              </a>
            </div>
            <div class="right">
              <a
               
              >
                <span class="title">咨询律师</span>
                <p class="text">在线解决纠纷</p>
                <img
                  class="icon"
                  src="https://cdn.tianyancha.com/wap-require-js/public/images/proxyPeers/zxls.png"
                />
                <img
                  class="bg"
                  src="https://cdn.tianyancha.com/wap-require-js/public/images/proxyPeers/obj2.png"
                />
              </a>
              <a
              
              >
                <span class="title">公司注销</span>
                <p class="text">高效无忧</p>
                <img
                  class="icon"
                  src="https://cdn.tianyancha.com/wap-require-js/public/images/proxyPeers/gszx2.png"
                />
                <img
                  class="bg"
                  src="https://cdn.tianyancha.com/wap-require-js/public/images/proxyPeers/obj2.png"
                />
              </a>
              <a
              
              >
                <span class="title">保护版权</span>
                <p class="text">快速拿证</p>
                <img
                  class="icon"
                  src="https://cdn.tianyancha.com/wap-require-js/public/images/proxyPeers/bhbq2.png"
                />
                <img
                  class="bg"
                  src="https://cdn.tianyancha.com/wap-require-js/public/images/proxyPeers/obj2.png"
                />
              </a>
              <a
              >
                <span class="title">公司注册</span>
                <p class="text">专家代办</p>
                <img
                  class="icon"
                  src="https://cdn.tianyancha.com/wap-require-js/public/images/proxyPeers/zcgsicon.png"
                />
                <img
                  class="bg"
                  src="https://cdn.tianyancha.com/wap-require-js/public/images/proxyPeers/obj2.png"
                />
              </a>
            </div>
          </div>
          <div class="bottom">
            <a
             href="/Menu"
            >
              <img
                class="bg"
                src="https://cdn.tianyancha.com/wap-require-js/public/images/proxyPeers/bottombg.png"
              />
              <span>工商注册</span>
            </a>
            <a  href="/Menu">
              <img
                class="bg"
                src="https://cdn.tianyancha.com/wap-require-js/public/images/proxyPeers/bottombg.png"
              />
              <span>知识产权</span>
            </a>
            <a
             href="/Menu">
              <img
                class="bg"
                src="https://cdn.tianyancha.com/wap-require-js/public/images/proxyPeers/bottombg.png"
              />
              <span>法律服务</span>
            </a>
          </div>
        </div>
      </div>
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
.read-new {
  background-color: #fff;
}

.read-new .news-title {
  padding: 0 14px;
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #333333;
  text-align: justify;
  position: relative;
}

.read-new .news-title a {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #0084ff;
  height: 50px;
  float: right;
  text-align: right;
}

.read-new .news-title a .tic-arrow-pn-right {
  font-size: 12px;
}

.read-new .item-container {
  padding: 0 14px;
}

.read-new .news-item {
  position: relative;
  display: block;
  height: 105px;
  padding: 14px 0 14px;
  font-size: 0;
}

.read-new .news-item:last-child {
  border-bottom: 0px;
}

.read-new .news-item:after {
  position: absolute;
  content: "";
  height: 1px;
  border-bottom: 1px solid #e0e0e0;
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
  left: 0;
  top: 100px;
  width: 100%;
}

.read-new .news-item:last-child:after {
  content: "";
  border: none !important;
  height: 0 !important;
}

.read-new .news-item .right {
  width: 30.4%;
  height: 100%;
  display: block;
  float: right;
  display: inline-block;
  border-radius: 2px;
  overflow: hidden;
}

.read-new .news-item .right img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}

.read-new .news-item .left {
  display: inline-block;
  position: relative;
  height: 100%;
  width: 58%;
  font-size: 15px;
  vertical-align: top;
  margin-right: 16px;
}

.read-new .news-item .left .title {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  width: 100%;
  height: 48px;
  line-height: 24px;
  word-wrap: break-word;
  color: #454545;
  /* Box model */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.read-new .news-item .left .btm-box {
  position: absolute;
  bottom: 0;
}

.read-new .news-item .left .btm-box .tag {
  display: inline-block;
  padding: 2px 4px;
  font-size: 12px;
  background-color: #ebf8fb;
  font-weight: normal;
  line-height: 16px;
  border-radius: 2px;
  color: #0084ff;
  -webkit-margin-before: 0;
  margin-block-start: 0;
  -webkit-margin-after: 0;
  margin-block-end: 0;
}
.service-box {
  /*天眼服务*/
  padding: 14px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 16px;
}

.service-box .top {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.service-box .top .left {
  width: 131px;
  height: 124px;
  padding: 0;
  margin-right: 4px;
}

.service-box .top .left a {
  width: 100%;
  height: 100%;
  display: block;
  background: rgba(0, 132, 255, 0.06);
  border-radius: 4px;
  position: relative;
}

.service-box .top .left a .title {
  font-size: 16px;
  height: 22px;
  display: inline-block;
  font-family: PingFangSC-Medium;
  margin: 8px 0 0 8px;
  position: relative;
  z-index: 3;
}

.service-box .top .left a .icon {
  width: 54px;
  height: 40px;
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.service-box .top .left a .bg {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
  width: 104px;
  height: 58px;
}

.service-box .top .left a .btn {
  display: block;
  width: 54px;
  height: 15px;
  margin: 4px 0 0 8px;
}

.service-box .top .left a .text {
  font-size: 10px;
  margin: 0;
  position: relative;
  z-index: 3;
  font-family: PingFangSC-Regular;
  font-size: 10px;
  color: #666666;
  letter-spacing: 0;
  text-align: left;
  -webkit-transform: scale(0.8);
  -webkit-transform: translateX(8px);
}

.service-box .top .right {
  width: 212px;
}

.service-box .top .right a {
  float: left;
  width: 104px;
  height: 60px;
  margin: 0 4px 4px 0;
  position: relative;
  background: rgba(0, 132, 255, 0.06);
  border-radius: 4px;
}

.service-box .top .right a .title {
  font-size: 16px;
  height: 22px;
  display: inline-block;
  font-family: PingFangSC-Medium;
  margin: 8px 0 0 8px;
  position: relative;
  z-index: 3;
}

.service-box .top .right a .icon {
  width: 27px;
  height: 28px;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
}

.service-box .top .right a .bg {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
  width: 74px;
}

.service-box .top .right a .text {
  font-size: 10px;
  display: block;
  margin: 0;
  position: relative;
  z-index: 3;
  font-family: PingFangSC-Regular;
  font-size: 10px;
  color: #666666;
  letter-spacing: 0;
  -webkit-transform: scale(0.8);
  -webkit-transform: translateX(8px);
}

.service-box .top .right a .text span {
  display: block;
  -webkit-transform: scale(0.8);
  -webkit-transform: translateX(8px);
}

.service-box .top .right a:nth-child(2n) {
  margin-right: 0;
}

.service-box .top .right a:nth-child(3) {
  margin-bottom: 0 !important;
}

.service-box .top .right a:nth-child(4) {
  margin-bottom: 0 !important;
}

.service-box .bottom {
  margin: 14px 0 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-bottom: 14px;
}

.service-box .bottom a {
  width: calc(33% - 9px);
  height: 11.2vw;
  text-align: center;
  line-height: 11.2vw;
  margin-right: 14px;
  font-family: PingFangSC-Medium;
  -webkit-box-shadow: 0px 2px 10px rgba(72, 106, 195, 0.04);
  box-shadow: 0px 2px 10px rgba(72, 106, 195, 0.04);
  border-radius: 4px;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
}

.service-box .bottom a::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 1px solid #daedff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: 0% 0% 0;
  transform-origin: 0% 0% 0;
  border-radius: 4px;
}

.service-box .bottom a .bg {
  width: 28px;
  height: 20px;
  position: absolute;
  top: -0.5px;
  right: -0.5px;
}

.service-box .bottom a:last-child {
  margin-right: 0;
}
.read-new .news-item .left .btm-box .time {
  display: inline-block;
  font-weight: normal;
  color: #9e9e9e;
  font-size: 13px;
  margin-left: 16px;
  -webkit-margin-before: 0;
  margin-block-start: 0;
  -webkit-margin-after: 0;
  margin-block-end: 0;
}
</style>