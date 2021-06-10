<template>
  <div>
    <div class="aui-take-head">
      <div class="aui-flex aui-flex-one">
        <div class="aui-take-user">
          <img src="https://img01.yzcdn.cn/vant/logo.png" alt />
        </div>
        <div class="aui-flex-box">
          <h2>{{userInfo.name||userInfo.phone}}</h2>
          <span v-if="userInfo.email">{{userInfo.email}}</span>
        </div>
      </div>
      <img src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png" alt />
    </div>

    <van-cell is-link title="我的简历" @click="gomyInfo" />
    <van-cell is-link title="我的发布" @click="gomyPublish" />
    <van-button round color="#7232dd" @click="goLogin" size='large' style="margin-top:60px">退出登录</van-button>
  </div>
</template>
<script>
import { getStore, removeStore } from "@/utils/storage";
export default {
  data() {
    return {
      show: false,
      userInfo: getStore("userInfo")
    };
  },
  created() {},
  methods: {
    gomyPublish() {
      this.$router.push({
        path: "/myPublish"
      });
    },
    goLogin() {
      removeStore("userInfo");
      this.$router.push({
        path: "/login"
      });
    },
    gomyInfo() {
      this.$router.push({
        path: "/userInfo"
      });
    }
  }
};
</script>
<style scoped>
.aui-take-head {
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
}
.aui-flex {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 15px;
  position: relative;
}
.aui-flex-one {
  position: absolute;
  left: 0;
  top: 20px;
  width: 100%;
}
.aui-take-user {
  width: 55px;
  height: 55px;
  margin-right: 0.5rem;
  border-radius: 100%;
  overflow: hidden;
}
img {
  width: 100%;
  height: auto;
  display: block;
  border: 0;
}
.aui-flex-box {
  position: relative;
}
.aui-flex-box {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  min-width: 0;
  font-size: 14px;
  color: #333;
}
.aui-flex-box h2 {
  color: #000;
  font-weight: normal;
  font-size: 1.3rem;
}
.icon {
  width: 20px;
  height: 20px;
  display: block;
  border: none;
  float: left;
  background-size: 20px;
  background-repeat: no-repeat;
}
.icon-phone {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAACIklEQVRoQ+1a0U0CQRScOQoQO6ADsQItwQ6kA7UCtQOsQKjAFrQC7UDoQAuAMU8PQsCE9zbIgbxN+GJ2b2feu7k9GOLABg+ML5Lwf694VjhSYUltACeRORvCjkmOStYqrrCkjoBXAEZ664PADcl+9MLFhCfSHYHbwAVfHNgugCMHziAfFXnsxM5hWyNM4Hzd5gRcA7hYh5t9X5Hh/YcnzC5WUGEvDzduFwiPARSZiYPl2TKmScKf1rIk3xwbL4LYE2EK9AlcNt7SAh5apN1/fzrqJ8P7LhC+b5F3f8q2XnwqKQkHlN6ISwvICgdED0GzpUNyofx9ePHgkS0dVD0Cz5aOqIVsab9ceQ/nScvfLRFkmlZErTStgFppWmlagXYJQNO0AmIZNN+HvYKlaaVpeXslhkvTiumVpuXWK00rTcvdLCFgmlZIrjxp+eVK0zow0xq2yJ6/P8qQkrp1cuh7gSYTAHaC6ZEcllFZP6v+M/wJgCV9mie8fsubRzRa4QAdy4NYPMLyIG0BlhxYCax41tsLwgROl8MvU8nIhyOM+0D4pSJXAmqSegIePVVdxOw8YQG/urmkCwFmSKGx84QttFa39Mcis4k0WMxfeVnvA2EIGFQ/Sdhv0pKuBIRTsQA+KzKc5C3+1bJ+LprZeNOvy4V7BtCpP96iznFbjw/X1TGF5weB8K7LJ4y2HhAv32uzM4tbutltl189CZdrtx8zD67CX6Bfz0ycnMExAAAAAElFTkSuQmCC");
}

.icon-pic {
  background-size: 14px;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAgCAIAAACDyf9SAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RkNGMUY4Nzg3QTlGMTFFOUFDRDlBOUJBRjcxMjU5MEEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RkNGMUY4Nzk3QTlGMTFFOUFDRDlBOUJBRjcxMjU5MEEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGQ0YxRjg3NjdBOUYxMUU5QUNEOUE5QkFGNzEyNTkwQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGQ0YxRjg3NzdBOUYxMUU5QUNEOUE5QkFGNzEyNTkwQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pg75yYYAAAbZSURBVHjaNFZNjBxHFX5V1d3TM7O7nv2Z2VnvxgE50cb5cSxtEhEhosiRFeAA4QIXTpCECCnhBEouiRQJkDhwilA4wQEuiRCS8SGICEGk4MiOvLbxyolR7Gy8xN6dmezMzm93V9XjezWmZ3anp7req/fzfd8btf6Lk0TE5LSKyPnFqnqwWdqox1+ec43ZqJm6ckQV7dm5zHHfmtvDojUoPu2pS23ebPt2bhTMvTKKHcNFuCqR+faxue/cEz/UiDQ7z1qTI87IJ+St7DCkVV7VRTNhnie16skXpPSHe/bMdvSXG3TAZaNycfet9crLX1tciBQpTwzjRHNBlHtsZ5ZF8aiVilnhhT0wcvLU8yNL7pGF4sUH/K823Z9uls0rL5947YnlkmHWrAiW2JkTgiOCrZcYFS5mq8jhQCQWHiilNWN3iKGi+dThsUPO7b0fLqRynHJ4mnuNzaycc4jHF0qeFCwROdmAqMMXjeCoIO+kDowlnOT3x6T/fr3PJpIUsBAlYo+diEXyoqm93Dico+Qtx2ikTh4PIriSRoqNefdWZK4ebVQNHW+mrKz2VkkqzptYOyeVwjecDCdKgpAFWCNO1gr+0Q1CeXHrfvdx8vOtWVM7efS9neyda5NSpNfm4jSS2EKOuKwjb4wmL8lKrcgiYbw0PPoczegX6vSn+qfnK2d2Uo+cfvCHb579bOQFPDpW/NhqZaMZP9zQqzN814w2oXCIS1pjx4g181HrIL8+5Itt/e9dfr8Vwwv8k1dfbU6UGz5//ubwjQ++OPf5iFSsyFo4Zp3AnNR8RZc1V2PtvRt7Hhe6N7GOcYzx2vrQdKTy6GL+4rHxY/Vc+YMXlLaA0e1B/o/rk79+NrpyazQqlEURlSFVBEgD8wUMfaggYZ3oUGwfmlcnV+2pw1kjwW4kASQMfuSlzVYBqvhzUt29Qf5Jz9/oZoMJDQs3BKLJlyNdiblecofL/t6ar8eoMWiDQ4AwdsaZvIhaY1svSeYeNJI2gRyuMRMtlfnxFcGC7HZW2CKwZWFmYA9KShyxRkNwljPsWujW6/9s5V7QIRfAIZcKfYSpCZRyAdkoH06Fexwt0JNPUMMZnKeMKVi/tjljuiea728P1+vJShlxwQrhONSKghOSUKZoQ+xWoO5RSgkuRBDESPPljnrpg+r5vQguzNau/d7buxuH42/cM3NqLVmejQpvYxEl0BjcAlvv2CFlPU0UGHa0n9G7O+bP2/HlVtlSboDtM5vf//XZzn+7mdDWsze8Uo2OLybNObdYiudLbj7lxRTV4e7YH2S+m7lOQXt9vdkpdoYlgAWQBivWquYn9w0UHzwHKp/e6r19bXTp1oil3OABPh3g4CCLyO//+GIRFSP/VSAOqkfxRmP8zBH3zN2jGBzl/rNSIG/R292eO/f54MJtd7WTd8d5O1PDXAuahLJGBE652ZhqJY2o76/p4wv28Xq2gthVwd4rqefgBTRUKi86kwt0AT3oMECAsFzRmvj9CWvv4OJQySWiiQEqLvNIs5iy28nbc3R+Z/joquyR2iF2l4n42EgEThpNy1VaLlPIQKJkSRS+HGmjsSUCqdEuIEpd7Crz0b3NE6vpSlUHpZiKK/x6C96K1IkyUcCkeAkkkC0iGVj3fAfU9FGfXvrXrCk9sXb66mB36NaX0rnYiSvgFuBigSdypKCP09pP1W4ql+F0bHK74+SNq+mrF6q9PFJP/+bp7f0JstRan2gmT95d2WiY+xeppOFIBwUPUXjhl6QqsbqJp4/b+YW9+G+3+MqeyYWi6kiFVd579q2tgzfPdfbGHOgjQyImfajCSyUC6OZTUxNSu37OX4yoNaFe4doZhh1AqkxoXzOlH68Pv/ulXBQFWIfsvnfj4J1PsrM7w87IFVpHznm4DcNFMg1kMFInLaMn5F0vu6/U+etH7JP1sZERZwXGADVqpKxMMrD1Zq+41s5aI9ebuN7IdnJqTwBKXigL3BYTXytFtbR4YM6uppBpK7rgQzWoiPpWzUZhACACg0fF2qy+q5KEaZ0TJw48FYgG2ssUQaMwodB2IUFkOXSagJrhJNa/vbBLPJ00Anua/swQX7CUeyNtUoLAsB5GKDotvygES5hoiqcoe/M/idk+tnJ74DealXICIlt1B2LgFvTSQahF2UNzZfgLecSbDzovC7bAXb/g1y9V/ng9NctPHb3SHr+1tY9i1VLTmIl1+C2kg6BphW4UGMFCFRYo3hEqYYiMgctd/ftrpZ99mF7sYGxF6r5fPiUKgVJqEY+lVD+4XH54yazN0lxKS0kBmaqVpFC9SQGgdDLujYubQ3Ol7S91eXdooNsqHIKo/yfAADSldK+TnykNAAAAAElFTkSuQmCC");
}
.aui-flex-box span {
  color: #000;
  line-height: 22px;
}
</style>