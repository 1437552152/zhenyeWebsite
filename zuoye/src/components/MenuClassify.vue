<template>
  <div class="home-page">
    <div class="part-new">
      <div class="head-box">
        <div class="head-tab">
          <div
            class="col-4 wap-main-tab -active"
            onclick="changeMobileTab(this,'company')"
          >
            <span class="wap-main-tab-title">查公司</span>
          </div>
          <div
            class="col-4 wap-main-tab"
            onclick="changeMobileTab(this,'human')"
          >
            <span class="wap-main-tab-title">查老板</span>
          </div>
          <div
            class="col-4 wap-main-tab"
            onclick="changeMobileTab(this,'relation')"
          >
            <span class="wap-main-tab-title">查关系</span>
          </div>
        </div>
        <div class="search-group">
          <form
            onsubmit="return header.mobileStopSubmit(event);"
            autocomplete="off"
          >
            <input
              type="search"
              class="input"
              id="live-search"
              maxlength="50"
              search-type="company"
              placeholder="输入公司名称、老板姓名、品牌名称等"
              style="padding-top: 5px"
            />
          </form>
          <div class="input-submit" onclick="header.mobileStopSubmit(event)">
            <!--<i class="tic tic-search"></i>--><img
              src="https://cdn.tianyancha.com/wap/images/icon-search.png"
            />
          </div>
        </div>
        <div class="hot-box">
          <img
            class="lazy-img hot-img -image"
            is-expand="false"
            data-src="https://cdn.tianyancha.com/wap/images/hotkey-icon-2.png"
            alt="热点"
            src="https://cdn.tianyancha.com/wap/images/hotkey-icon-2.png"
          />&nbsp;<span class="div-line"></span>&nbsp;<span
            class="hot-search hot-search-company"
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=爱玛电动车"
              href=""
              >爱玛电动车</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=华晨汽车"
              href=""
              >华晨汽车</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=和颂传媒"
              href=""
              >和颂传媒</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=椰树集团"
              href=""
              >椰树集团</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=王老吉"
              href=""
              >王老吉</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=贤合庄"
              href=""
              >贤合庄</a
            >
            </span
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
  methods: {},
};
</script>

<style  scoped>
.home-page .part-new {
  padding-top: 116px;
  background-color: #0084ff;
  background-image: url("https://cdn.tianyancha.com/wap-require-js/themes/18blue/images/mainbglogo-2.png");
  min-height: 140px;
background-position: top;
    background-size: 100%;
    background-repeat: no-repeat;
}

.home-page .head-box {
  padding: 0 14px;
}

.home-page .head-box .head-tab {
  padding: 0 22px;
  margin-bottom: 10px;
  text-align: center;
}

.home-page .head-box .head-tab::before,
.home-page .head-box .head-tab::after {
  display: table;
  content: " ";
}

.home-page .head-box .head-tab::after {
  clear: both;
}

.home-page .head-box .wap-main-tab {
  font-size: 16px;
}

.home-page .head-box .wap-main-tab.-active {
  font-family: PingFangSC-Medium;
}

.home-page .head-box .wap-main-tab.-active .wap-main-tab-title {
  position: relative;
  color: #fff;
}

.home-page .head-box .wap-main-tab.-active .wap-main-tab-title:after {
  content: "";
  position: absolute;
  height: 2px;
  width: 24px;
  background: #fff;
  top: 25px;
  left: calc(50% - 12px);
  border-radius: 2px;
}

.home-page .head-box .wap-main-tab-title {
  display: inline-block;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  color: rgba(255, 255, 255, 0.6);
  font-family: PingFangSC-Medium;
}

.home-page .head-box .search-group {
  position: relative;
}

.home-page .head-box .search-group .input {
  width: 100%;
  height: 42px;
  padding-left: 14px;
  padding-right: 44px;
  border: none;
  border-radius: 4px;
  color: #454545;
}

.home-page .head-box .search-group .input:focus {
  outline: none;
  border: none;
  -webkit-appearance: none;
}

.home-page .head-box .search-group .input-submit {
  position: absolute;
  top: 14px;
  right: 0;
  width: 46px;
  height: 42px;
  line-height: 42px;
  text-align: center;
}

.home-page .head-box .search-group .input-submit img {
  width: 20px;
  height: 20px;
}

.home-page .head-box .search-group .tic-search {
  display: inline-block;
  width: 44px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  font-size: 20px;
  color: #9e9e9e;
}

.home-page .hot-box {
  height: 34px;
  margin-top: 8px;
  font-size: 12px;
  overflow: hidden;
}

.home-page .hot-box .div-line {
  display: inline-block;
  width: 2px;
  height: 12px;
  background: #fff;
  opacity: 0.8;
  margin: 0 2px;
  margin-top: 3px;
}

.home-page .hot-box .hot-search a:first-child {
  padding-left: 0;
}

.home-page .hot-img {
  width: 25px;
  height: 12px !important;
  vertical-align: top;
  margin-top: 3px;
}

.home-page .hot-link {
  display: inline-block;
  padding-left: 7px;
  vertical-align: top;
  color: #fff;
}

.home-page .boot {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 13px 12px 10px;
  background: #fff;
}

.home-page .boot .item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 70px;
}

.home-page .boot .item .icon {
  width: 44px;
  height: 44px;
}

.home-page .boot .item .text {
  line-height: 12px;
  font-size: 12px;
  color: #333;
}

.home-page .boot-box {
  background: #fff;
  padding-bottom: 14px;
}

.home-page .boot-box .bar {
  width: 18px;
  margin: 0 auto 0;
  background: #fff;
  line-height: 0;
  font-size: 0;
}

.home-page .boot-box .bar .left {
  display: inline-block;
  width: 13px;
  height: 3px;
  background-color: #0084ff;
  border-top-left-radius: 1.5px;
  border-bottom-left-radius: 1.5px;
}

.home-page .boot-box .bar .right {
  background: #e0e0e0;
  display: inline-block;
  height: 3px;
  width: 5px;
  border-top-right-radius: 1.5px;
  border-bottom-right-radius: 1.5px;
}

.home-page .boot-box .barRight .left {
  width: 5px;
  background: #e0e0e0;
}

.home-page .boot-box .barRight .right {
  width: 13px;
  background-color: #0084ff;
}

.home-banner {
  width: 100%;
  height: 38.5vw;
  position: fixed;
  bottom: 0;
  left: 0;
  background: url("https://cdn.tianyancha.com/wap/images/home-banner.png")
    no-repeat;
  background-size: contain;
  z-index: 1001;
}

.home-banner .link-btn {
  position: absolute;
  right: 10vw;
  top: 12vw;
  bottom: 2vw;
  left: 5vw;
}

.home-banner .tyc_home_btn {
  position: absolute;
  width: 9vw;
  height: 9vw;
  right: 0;
  top: 9;
}


  /* 布局 */
            .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12 {
                float: left;
            }

            .col-1 {
                width: 8.33333333%;
            }

            .col-2 {
                width: 16.66666667%;
            }

            .col-3 {
                width: 25%;
            }

            .col-4 {
                width: 33.33333333%;
            }

            .col-5 {
                width: 41.66666667%;
            }

            .col-6 {
                width: 50%;
            }

            .col-7 {
                width: 58.33333333%;
            }

            .col-8 {
                width: 66.66666667%;
            }

            .col-9 {
                width: 75%;
            }

            .col-10 {
                width: 83.33333333%;
            }

            .col-11 {
                width: 91.66666667%;
            }

            .col-12 {
                width: 100%;
            }

</style>