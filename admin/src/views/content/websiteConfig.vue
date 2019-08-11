<template>
    <div>  
      <div class="formHead">
        <Form :model="formItem" :label-width="200">                                
            <FormItem label="请填写网站名称">
               <Input v-model="formItem.webname" placeholder="请填写网站名称..."/>
            </FormItem>
            <FormItem label="请输入网站域名">
                <Input v-model="formItem.website" placeholder="请输入网站域名..."/>
            </FormItem> 
            <FormItem label="请填写公司地址">
               <Input v-model="formItem.address" placeholder="请输入公司地址..."/>
            </FormItem>
            <FormItem label="请填写公司邮箱">
               <Input v-model="formItem.email" placeholder="请填写公司邮箱..."/>
            </FormItem>
            <FormItem label="请填写联系电话">
               <Input v-model="formItem.mobile" placeholder="请填写联系电话..."/>
            </FormItem>
             <FormItem label="请填写QQ号码">
               <Input v-model="formItem.qqCode" placeholder="请填写QQ号码..."/>
            </FormItem>
           <FormItem label="请填写公司经度">
               <Input v-model="formItem.longitude" placeholder="请填写公司经度..."/>
            </FormItem>
            <FormItem label="请填写公司纬度">
                <Input v-model="formItem.latitude" placeholder="请填写公司纬度..."/>
            </FormItem>

          <Row>
        <Col span="12">  
             <FormItem label="上传logo" prop="logoPic">
                <div class="acc_sc">
                    <img  id="aliImg" style="width: 200px;height:170px;" :src="logoPic">
                    <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccesslogoPic"  :action="uploadUrl" enctype="multipart/form-data" :headers="myHeaders">
                    <Button type="success"   icon="ios-cloud-upload-outline" style="    opacity: 0;width: 200px;
          height: 170px;margin-top: -200px;">上传logo</Button>
                  </Upload>
                </div>
            </FormItem>
         </Col>
          <Col span="12">
            <FormItem label="上传微信二维码" prop="weChatPic">
                <div class="acc_sc">
                    <img  id="aliImg" style="width: 200px;height:170px;" :src="weChatPic">
                    <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccessweChatPic"  :action="uploadUrl" enctype="multipart/form-data" :headers="myHeaders">
                    <Button type="success"   icon="ios-cloud-upload-outline" style="    opacity: 0;width: 200px;
          height: 170px;margin-top: -200px;">上传微信二维码</Button>
                  </Upload>
                </div>
            </FormItem>
 </Col>
 </Row>
   <Row>
        <Col span="12">  
          <FormItem label="上传QQ二维码" prop="qqeweimaPic">
                <div class="acc_sc">
                    <img  id="aliImg" style="width: 200px;height:170px;" :src="qqeweimaPic">
                    <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccessqqeweimaPic"  :action="uploadUrl" enctype="multipart/form-data" :headers="myHeaders">
                    <Button type="success"   icon="ios-cloud-upload-outline" style="    opacity: 0;width: 200px;
          height: 170px;margin-top: -200px;">上传QQ二维码</Button>
                  </Upload>
                </div>
            </FormItem>
 </Col>
  <Col span="12">
            <FormItem label="上传微博二维码" prop="weiboPic">
                <div class="acc_sc">
                    <img  id="aliImg" style="width: 200px;height:170px;" :src="weiboPic">
                    <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccessweiboPic"  :action="uploadUrl" enctype="multipart/form-data" :headers="myHeaders">
                    <Button type="success"   icon="ios-cloud-upload-outline" style="    opacity: 0;width: 200px;
          height: 170px;margin-top: -200px;">上传微博二维码</Button>
                  </Upload>
                </div>
            </FormItem>
 </Col>
  </Row>
           <FormItem label="上传公众号二维码" prop="publicPic">
                <div class="acc_sc">
                    <img  id="aliImg" style="width: 200px;height:170px;" :src="publicPic">
                    <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccesspublicPic"  :action="uploadUrl" enctype="multipart/form-data" :headers="myHeaders">
                    <Button type="success"   icon="ios-cloud-upload-outline" style="    opacity: 0;width: 200px;
          height: 170px;margin-top: -200px;">上传公众号二维码</Button>
                  </Upload>
                </div>
            </FormItem>
             <div id="Test">
      <!-- <quill-editor ref="myTextEditor"
                v-model="content" :options="quillOption"  style="height:600px;margin:0 auto;width:1100px"   @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
      </quill-editor> -->
    </div>


<vue-ueditor-wrap v-model="content" :config="myConfig"></vue-ueditor-wrap>
      <!-- {{ content }} -->

             <div  style="margin-top:50px;width:200px;margin-left:auto;margin-right:auto;display: flex;justify-content: center;margin-bottom:150px;">
                <Button type="primary" long @click="sure">保存</Button>
              </div>
        </Form>
      </div>
  </div>
</template>
<script>
import { BASICURL, baseConfig, baseConfigUpdate } from "@/service/getData";
import { quillEditor } from "vue-quill-editor";
import quillConfig from "../../libs/quill-config.js";
const token = localStorage.getItem("token");
 import VueUeditorWrap from 'vue-ueditor-wrap';
export default {
  name: "Ueditor",
  components: {
    quillEditor,VueUeditorWrap
  },
  data() {
    return {
      uploadUrl: BASICURL + "admin/upload",
      logoPic: require("../../images/talkingdata.png"),
      weChatPic: require("../../images/talkingdata.png"),
      qqeweimaPic: require("../../images/talkingdata.png"),
      weiboPic: require("../../images/talkingdata.png"),
      publicPic: require("../../images/talkingdata.png"),
      myHeaders: { token: token },
      formItem: {
        webname: "",
        website: "",
        address: "",
        email: "",
        mobile: "",
        qqCode: "",
        longitude: "",
        latitude: ""
      },
       myConfig: {
          // 如果需要上传功能,找后端小伙伴要服务器接口地址
          // serverUrl: this.$config.baseUrl + 'ueditor/ueditorConfig',
          serverUrl:"http://47.107.180.202:8082/admin/upload",
          // 你的UEditor资源存放的路径,相对于打包后的index.html
          UEDITOR_HOME_URL: '/static/Ueditor/',
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 工具栏是否可以浮动
          autoFloatEnabled: false,
          // 初始容器高度
          initialFrameHeight: 520,
          // 初始容器宽度
          initialFrameWidth: '100%',
          // 关闭自动保存
          enableAutoSave: true
        },
      content: "",
      quillOption: quillConfig
    };
  },
  methods: {
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange(value) {
      //内容改变事件
      this.content = value.html;
    },
    getData(params) {
      baseConfig().then(res => {
        this.formItem.longitude = res.data.longitude;
        this.formItem.latitude = res.data.latitude;
        this.formItem.webname = res.data.webname;
        this.formItem.website = res.data.website;
        this.formItem.address = res.data.address;
        this.formItem.email = res.data.email;
        this.formItem.mobile = res.data.mobile;
        this.formItem.longitude = res.data.longitude;
        this.formItem.latitude = res.data.latitude;
        this.formItem.qqCode = res.data.qqCode;
        this.logoPic = res.data.logoPic;
        this.weChatPic = res.data.weChatPic;
        this.qqeweimaPic = res.data.qqeweimaPic;
        this.weiboPic = res.data.weiboPic;
        this.publicPic = res.data.publicPic;
        this.content = res.data.content;
      });
    },
    aliHandleSuccesslogoPic(res, file) {
      this.logoPic = BASICURL + res.ret_code;
    },
    aliHandleSuccessweChatPic(res, file) {
      this.weChatPic = BASICURL + res.ret_code;
    },
    aliHandleSuccessqqeweimaPic(res, file) {
      this.qqeweimaPic = BASICURL + res.ret_code;
    },
    aliHandleSuccessweiboPic(res, file) {
      this.weiboPic = BASICURL + res.ret_code;
    },
    aliHandleSuccesspublicPic(res, file) {
      this.publicPic = BASICURL + res.ret_code;
    },
    sure() {
      let params = {};
      params["longitude"] = this.longitude;
      params["latitude"] = this.latitude;
      params["logoPic"] = this.logoPic;
      params["weChatPic"] = this.weChatPic;
      params["qqeweimaPic"] = this.qqeweimaPic;
      params["weiboPic"] = this.weiboPic;
      params["content"] = this.content;
      params["publicPic"] = this.publicPic;
      params["webname"] = this.formItem.webname;
      params["website"] = this.formItem.website;
      params["address"] = this.formItem.address;
      params["email"] = this.formItem.email;
      params["mobile"] = this.formItem.mobile;
      params["qqCode"] = this.formItem.qqCode;
      params["longitude"] = this.formItem.longitude;
      params["latitude"] = this.formItem.latitude;
      baseConfigUpdate(params).then(res => {
        if (res.status == 200) {
          this.$Message.success("修改成功");
        } else {
          this.$Message.error("修改失败");
        }
      });
    }
  },
  created() {
    this.getData();
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
  width: 1000px;
  margin: 40px auto;
}
</style>
