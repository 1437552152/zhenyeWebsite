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
              href="https://m.tianyancha.com/company/2312004391"
              >爱玛电动车</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=华晨汽车"
              href="https://m.tianyancha.com/company/25306633"
              >华晨汽车</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=和颂传媒"
              href="https://m.tianyancha.com/company/3272827846"
              >和颂传媒</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=椰树集团"
              href="https://m.tianyancha.com/company/264682673"
              >椰树集团</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=王老吉"
              href="https://m.tianyancha.com/company/31751847"
              >王老吉</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=贤合庄"
              href="https://m.tianyancha.com/company/2345902291"
              >贤合庄</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=苏宁电器"
              href="https://m.tianyancha.com/company/28784434"
              >苏宁电器</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=每日优鲜"
              href="https://m.tianyancha.com/company/24894644"
              >每日优鲜</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=叮咚买菜"
              href="https://m.tianyancha.com/company/1185619715"
              >叮咚买菜</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=作业帮"
              href="https://m.tianyancha.com/company/2310297330"
              >作业帮</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=小猿搜题"
              href="https://m.tianyancha.com/company/3345738356"
              >小猿搜题</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=华峰测控"
              href="https://m.tianyancha.com/company/3135349256"
              >华峰测控</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=科益虹源"
              href="https://m.tianyancha.com/company/2412341033"
              >科益虹源</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=华为"
              href="https://m.tianyancha.com/company/17066311"
              >华为</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=字节跳动"
              href="https://m.tianyancha.com/company/2352987806"
              >字节跳动</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=腾讯"
              href="https://m.tianyancha.com/company/9519792"
              >腾讯</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=湖北襄大"
              href="https://m.tianyancha.com/company/3386894501"
              >湖北襄大</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=中国邮政"
              href="https://m.tianyancha.com/company/2954613365"
              >中国邮政</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=佛山康盈包装"
              href="https://m.tianyancha.com/company/3472000787"
              >佛山康盈包装</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=特斯拉"
              href="https://m.tianyancha.com/company/3192219802"
              >特斯拉</a
            ></span
          ><span class="hot-search hot-search-human hidden"
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=罗永浩"
              href="https://m.tianyancha.com/human/2113622145-c3063736203"
              >罗永浩</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=王传福"
              href="https://m.tianyancha.com/human/2065542091-c11807631"
              >王传福</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=陈东升"
              href="https://m.tianyancha.com/human/2247162421-c15169839"
              >陈东升</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=陈赫"
              href="https://m.tianyancha.com/human/2258641677-c2809981451"
              >陈赫</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=陆正耀"
              href="https://m.tianyancha.com/human/2245992585-c2345037337"
              >陆正耀</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=唐彬森"
              href="https://m.tianyancha.com/human/1861480178-c3273883250"
              >唐彬森</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=李子柒"
              href="https://m.tianyancha.com/human/1979404769-c3073002761"
              >李子柒</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=汪小菲"
              href="https://m.tianyancha.com/human/2041100172-c26072083"
              >汪小菲</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=龚宇"
              href="https://m.tianyancha.com/human/2308038872-c26016300"
              >龚宇</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=许家印"
              href="https://m.tianyancha.com/human/2170530604-c7219966"
              >许家印</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=孙忠怀"
              href="https://m.tianyancha.com/human/1879925820-c1211000195"
              >孙忠怀</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=樊路远"
              href="https://m.tianyancha.com/human/2025288567-c719102845"
              >樊路远</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=薇娅"
              href="https://m.tianyancha.com/human/2301770704-c4007551076"
              >薇娅</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=沈海寅"
              href="https://m.tianyancha.com/human/2044896360-c2944567079"
              >沈海寅</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=施永青"
              href="https://m.tianyancha.com/human/1957498108-c173377286"
              >施永青</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=张伟平"
              href="https://m.tianyancha.com/human/1920921835-c3712372"
              >张伟平</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=张艺谋"
              href="https://m.tianyancha.com/human/1931726260-c24581216"
              >张艺谋</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=曾毓群"
              href="https://m.tianyancha.com/human/1969350112-c2343820668"
              >曾毓群</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=俞敏洪"
              href="https://m.tianyancha.com/human/1790522593-c528307108"
              >俞敏洪</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=李斌"
              href="https://m.tianyancha.com/human/1985174169-c2314879089"
              >李斌</a
            ></span
          ><span class="hot-search hot-search-relation hidden"
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=饿了么-阿里"
              href="https://m.tianyancha.com/relationship"
              >饿了么-阿里</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=美团-摩拜"
              href="https://m.tianyancha.com/relationship"
              >美团-摩拜</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=小米-腾讯"
              href="https://m.tianyancha.com/relationship"
              >小米-腾讯</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=李彦宏-马云"
              href="https://m.tianyancha.com/relationship"
              >李彦宏-马云</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=金堤-少林寺"
              href="https://m.tianyancha.com/relationship"
              >金堤-少林寺</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=金堤-企名片"
              href="https://m.tianyancha.com/relationship"
              >金堤-企名片</a
            ><a
              class="hot-link"
              tracker-event-click=""
              tracker-event-ch="zhb_tyc_page_pop_clk?bizType=zhb_tyc&amp;title=链家-链家"
              href="https://m.tianyancha.com/relationship"
              >链家-链家</a
            ></span
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
  top: 0;
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