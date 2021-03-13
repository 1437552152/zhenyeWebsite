<!--
 * @Description: 
 * @version: 
 * @Date: 2019-08-31 20:27:40
 * @LastEditors: yfye
 * @LastEditTime: 2021-03-13 23:44:34
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 -->
<template>
  <div>
    <div class="formHead">
      <Form :model="formItem" :label-width="200">
        <FormItem label="请填写网站名称">
          <Input v-model="formItem.webname" placeholder="请填写网站名称..." />
        </FormItem>
        <FormItem label="请输入网站域名">
          <Input v-model="formItem.website" placeholder="请输入网站域名..." />
        </FormItem>
        <FormItem label="请填写公司地址">
          <Input v-model="formItem.address" placeholder="请输入公司地址..." />
        </FormItem>
        <FormItem label="请填写公司邮箱">
          <Input v-model="formItem.email" placeholder="请填写公司邮箱..." />
        </FormItem>
        <FormItem label="请填写联系电话">
          <Input v-model="formItem.mobile" placeholder="请填写联系电话..." />
        </FormItem>
        <FormItem label="请填写QQ号码">
          <Input v-model="formItem.qqCode" placeholder="请填写QQ号码..." />
        </FormItem>
        <FormItem label="请填写公司经度">
          <Input v-model="formItem.longitude" placeholder="请填写公司经度..." />
        </FormItem>
        <FormItem label="请填写公司纬度">
          <Input v-model="formItem.latitude" placeholder="请填写公司纬度..." />
        </FormItem>

         <FormItem label="请填写公司简介">
          <Input  type="textarea" v-model="formItem.content" :rows="10" placeholder="请填写公司简介..." />
        </FormItem>

        <div
          style="margin-top:50px;width:200px;margin-left:auto;margin-right:auto;display: flex;justify-content: center;margin-bottom:150px;"
        >
          <Button type="primary" long @click="sure">保存</Button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import {
  BASICURL,
  lookWebsiteConfig,
  langConfiglist,
  addWebsiteConfig,
  baseConfigUpdate
} from "@/service/getData";
const token = localStorage.getItem("token");
export default {
  name: "websiteConfig",
  data() {
    return {
      uploadUrl: BASICURL + "admin/upload",
      myHeaders: { token: token },
      hackReset: false,
      langData: [],
      formItem: {
        webname: "",
        website: "",
        address: "",
        email: "",
        mobile: "",
        qqCode: "",
          content: "",
        longitude: "",
        latitude: "",
        lang: 4
      }
    };
  },
  methods: {
    getblank: function() {
       const that=this;
      this.formItem.longitude = "";
      this.formItem.latitude = "";
      this.formItem.webname = "";
      this.formItem.website = "";
      this.formItem.address = "";
      this.formItem.email = "";
      this.formItem.lang = this.langData[0].id;
      this.formItem.mobile = "";
      this.formItem.longitude = "";
      this.formItem.latitude = "";
      this.formItem.qqCode = "";
        (this.formItem.content = "");
         this.hackReset = false
        this.$nextTick(() => {
          that.hackReset = true
        })
    },
    getData(params) {
      const that=this;
      lookWebsiteConfig(params).then(res => {
        this.formItem.longitude = res.data.longitude;
        this.formItem.latitude = res.data.latitude;
        this.formItem.webname = res.data.webname;
        this.formItem.website = res.data.website;
        this.formItem.address = res.data.address;
        this.formItem.email = res.data.email;
        this.formItem.lang = Number(res.data.lang);
        this.formItem.mobile = res.data.mobile;
        this.formItem.longitude = res.data.longitude;
        this.formItem.latitude = res.data.latitude;
        this.formItem.qqCode = res.data.qqCode;
        this.logoPic = res.data.logoPic;
        this.weChatPic = res.data.weChatPic;
        this.qqeweimaPic = res.data.qqeweimaPic;
        this.weiboPic = res.data.weiboPic;
        this.publicPic = res.data.publicPic;
        this.formItem.content = res.data.content;
         this.hackReset = false
        this.$nextTick(() => {
          that.hackReset = true
        })
      });
    },
    clearValue() {
      this.formItem.lang = this.langData[0].id;
    },
    aliHandleSuccesslogoPic(res, file) {
      this.logoPic =  res.ret_code;
    },
    aliHandleSuccessweChatPic(res, file) {
      this.weChatPic = res.ret_code;
    },
    aliHandleSuccessqqeweimaPic(res, file) {
      this.qqeweimaPic =  res.ret_code;
    },
    aliHandleSuccessweiboPic(res, file) {
      this.weiboPic = res.ret_code;
    },
    aliHandleSuccesspublicPic(res, file) {
      this.publicPic = res.ret_code;
    },
    getLangData() {
      langConfiglist({
        pageNo: 1,
        pageSize: 10
      }).then(res => {
        this.langData = res.data;
        this.lang = this.langData[0].id;
      });
    },
    sure() {
      let params = {};
      params["id"] = this.$route.query.id;
      params["longitude"] = this.longitude;
      params["latitude"] = this.latitude;
      params["logoPic"] = this.logoPic;
      params["weChatPic"] = this.weChatPic;
      params["qqeweimaPic"] = this.qqeweimaPic;
      params["weiboPic"] = this.weiboPic;
      params["content"] = this.formItem.content;
      params["publicPic"] = this.publicPic;
      params["webname"] = this.formItem.webname;
      params["website"] = this.formItem.website;
      params["address"] = this.formItem.address;
      params["lang"] = this.formItem.lang;
      params["email"] = this.formItem.email;
      params["mobile"] = this.formItem.mobile;
      params["qqCode"] = this.formItem.qqCode;
      params["longitude"] = this.formItem.longitude;
      params["latitude"] = this.formItem.latitude;


      if (this.$route.query.id != -1) {
        baseConfigUpdate(params).then(res => {
          if (res.status == 200) {
            this.$Message.success("修改成功");
             this.$route.push({path: '/config/baseConfiglist'})
          } else {
            this.$Message.error("修改失败");
          }
        });
      } else {
        addWebsiteConfig(params)
          .then(res => {
            console.log(res);
            if (res.status == 200) {
              this.$Message.success(res.msg);
              this.$route.push({path: '/config/baseConfiglist'})
            } else {
              this.$Message.error(res.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  },
  mounted() {
    if (this.$route.query.id != -1) {
      this.getData({ id: this.$route.query.id }); //修改
    }
  }
};
</script>

<style lang="less" scoped>
.clearfix {
  clear: both;
}
#aliImg {
  width: 80px;
  height: 30px;
}
.formHead {
  width: 1300px;
  margin: 40px auto;
}
</style>
