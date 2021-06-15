<template>
   <div id="banner_mobile_new" bd-hide-block="">
      <div class="bottom-banner" bd-hide-block="" style="height: 48px">
        <div class="bannerHeader banner" bd-hide-block="">
          <a class="banner-logo" href=""
            >
            <img src="../assets/cha.png"></a>
          <div class="banner-group">
            <div
              id="bannerDownload"
              class="banner-open"
              tyc-event-click=""
              tyc-event-ch="top.openApp"
            >
              <img
                style="width: 100%; vertical-align: top; margin-top: -1px"
                src="https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/open-button.png"
              />
            </div>
            <a class="banner-own" href="/login"
              >登录/注册</a
            >
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
  methods: {
  },
};
</script>

<style  scoped>
.banner,
.banner-bottom {
  left: 0;
  right: 0;
  width: 100%;
  height: 48px;
  line-height: 48px;
  padding: 0 14px;
  background-color: #fff;
  z-index: 1001;
}

.banner:after,
.banner-bottom:after {
  content: "";
  position: absolute;
  width: 100%;
  border-bottom: 1px solid #e0e0e0;
  left: 0;
  bottom: 0;
  -webkit-transform: scaleY(0.33);
  transform: scaleY(0.33);
}

.banner .banner-logo,
.banner-bottom .banner-logo {
  display: inline-block;
  height: auto;
}

.banner .banner-logo .tic-tyc-logo,
.banner-bottom .banner-logo .tic-tyc-logo {
  display: inline-block;
  height: 48px;
  line-height: 46px;
  vertical-align: middle;
  font-size: 28px;
  color: #0084ff;
}

.banner .banner-logo .tic-tyc-logo-txt,
.banner-bottom .banner-logo .tic-tyc-logo-txt {
  display: inline-block;
  margin-left: 2px;
  font-size: 27px;
  vertical-align: middle;
  color: #454545;
}

.banner .banner-group,
.banner-bottom .banner-group {
  float: right;
  text-align: right;
  margin-right: 26px;
}

.banner .banner-open,
.banner-bottom .banner-open {
  display: inline-block;
  width: 72px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  font-size: 14px;
  vertical-align: middle;
  color: #fff;
  font-weight: 600;
  font-family: PingFangSC-Regular;
}

.banner .banner-open .banner-open-img,
.banner-bottom .banner-open .banner-open-img {
  width: 100%;
  vertical-align: top;
  margin-top: -1px;
}

.banner .banner-own,
.banner-bottom .banner-own {
  display: inline-block;
  vertical-align: top;
  margin-left: 14px;
  font-size: 16px;
  color: #0084ff;
}
#banner_mobile_new{
  overflow: hidden;
}
</style>