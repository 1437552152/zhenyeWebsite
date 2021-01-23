<!--
 * @describeecription:
 * @version: 
 * @Company: 烽火通信
 * @Author: yeyifu
 * @Date: 2019-08-31 10:48:30
 * @LastEditors: yfye
 * @LastEditTime: 2021-01-24 00:19:57
 -->
<template>
  <div>
    <Form :model="formValidate" :label-width="100" ref="formValidate" :rules="ruleValidate">
      <div style="margin:0 auto;width:1200px">
        <FormItem label="名称" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入名称..." />
        </FormItem>

          <FormItem label="作者" prop="author">
          <Input v-model="formValidate.author" placeholder="请输入作者..." />
        </FormItem>

        <FormItem label="博客大分类" prop="classify">
          <Select v-model="formValidate.classify" @on-clear="clearcategoryValue" :clearable="true">
            <Option :value="item.key" v-for="(item,index) in classify" :key="index">{{item.label}}</Option>
          </Select>
        </FormItem>

        <FormItem label="博客小类" prop="type">
          <Select
            v-model="formValidate.type"
            @on-clear="clearValue"
            :clearable="true"
          >
            <Option :value="item.key" v-for="(item,index) in BlogType" :key="index">{{item.label}}</Option>
          </Select>
        </FormItem>

        <FormItem label="描述" prop="describee">
          <Input
            v-model="formValidate.describee"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请描述该博客..."
          />
        </FormItem>

        <FormItem label="上传图片" prop="thumbnail">
          <div class="acc_sc">
            <img id="aliImg" style="width: 200px;height:170px;" :src="BASICURL+thumbnail" />
            <div style="color:red">注:建议上传图片大小270*198(可按此比例上传),大小在2兆以内</div>
            <Upload
              ref="upload"
              name="picUrl"
              :show-upload-list="false"
              :on-success="aliHandleSuccess"
              :action="uploadUrl"
              enctype="multipart/form-data"
              :headers="myHeaders"
            >
              <Button
                type="success"
                icon="ios-cloud-upload-outline"
                style="    opacity: 0;width: 200px;
    height: 170px;margin-top: -200px;"
              >上传焦点图片</Button>
            </Upload>
          </div>
        </FormItem>

        <div id="Test" v-if="hackReset">
          <UEditor :config="config" :defaultMsg="content" ref="ueditor"></UEditor>
        </div>
        <div
          style="margin-top:50px;width:200px;margin-left:auto;margin-right:auto;display: flex;justify-content: center;margin-bottom:150px;"
        >
          <Button type="primary" long @click="sure('formValidate')">保存</Button>
          <Button style="margin-left: 8px" long @click="handleReset('formValidate')">重置</Button>
        </div>
      </div>
    </Form>
  </div>
</template>
<script>
import {
  BASICURL,
  BlogNewsdetail,
  BlogNewsUpdate,
  country,
  BlogNewsadd
} from "@/service/getData";
import { api } from "@/service/http";
import { classify, BlogType } from "@/utils/BlogType";
const token = localStorage.getItem("token");
import UEditor from "@/components/ueditor/ueditor.vue";
export default {
  components: {
    UEditor
  },
  data() {
    return {
      content: "",
      classify,
      BlogType,
      uploadUrl: BASICURL + "admin/upload",
      BASICURL,
      thumbnail: require("../../images/talkingdata.png"),
      myHeaders: { token: token },
      countrydata: null,
      tableData: [],
      currentPageIdx: 1,
      hackReset: false,
      formValidate: {
        title: "",
        type: "",
        describee: "",
        classify: "",
        author:'pyj'
      },
      config: {
        autoHeightEnabled: false,
        autoFloatEnabled: true,
        initialContent: "请输入内容...", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
        initialFrameWidth: null,
        initialFrameHeight: 600,
        BaseUrl: "",
        UEDITOR_HOME_URL: "static/ueditor/"
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur"
          }
        ],
         author: [
          {
            required: true,
            message: "作者不能为空",
            trigger: "blur"
          }
        ],
        type: [
          { required: true, message: "请选择博客小分类", trigger: "change",type:'number' }
        ],
        classify: [
          { required: true, message: "请选择博客大分类", trigger: "change",type:'number' }
        ],
        describee: [
          {
            required: true,
            message: "描述不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    if (this.$route.query.id != -1) {
      this.getData({ id: this.$route.query.id }); //修改
    }else{
      this.content="请输入内容..."
    }
  },
  methods: {
    aliHandleSuccess(res, file) {
      this.thumbnail =res.ret_code;
    },
    clearValue() {
      this.formValidate.type = "";
    },
    clearcategoryValue() {
      this.formValidate.classify = 0;
    },
    getData(params) {
      const that = this;
      BlogNewsdetail(params).then(res => {
        this.formValidate.title = res.data[0].title;
        this.formValidate.author = res.data[0].author;
        this.formValidate.type = res.data[0].type;
        this.formValidate.classify = res.data[0].classify;
        this.formValidate.describee = res.data[0].describee;
        this.thumbnail = res.data[0].thumbnail;
        this.content = res.data[0].content;
        this.hackReset = false;
        this.$nextTick(() => {
          that.hackReset = true;
        });
      });
    },
    sure(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let params = {};
          params["thumbnail"] = this.thumbnail;
          params["author"] = this.formValidate.author;
             params["title"] = this.formValidate.title;
          params["type"] = this.formValidate.type;
          params["classify"] = this.formValidate.classify;
          params["describee"] = this.formValidate.describee;
          params["content"] = '';
          if (this.$route.query.id != -1) {
            params["id"] = this.$route.query.id;
          }
          if (this.thumbnail === require("../../images/talkingdata.png")) {
            this.$Message.error("请上传图片");
            return false;
          }
          if (this.$route.query.id != -1) {
            BlogNewsUpdate(params).then(res => {
              if (res.status == 200) {
                this.$Message.success(res.msg);
              } else {
                this.$Message.error(res.msg);
              }
            });
          } else {
            BlogNewsadd(params)
              .then(res => {
                console.log(res);
                if (res.status == 200) {
                  this.$Message.success(res.msg);
                } else {
                  this.$Message.error(res.msg);
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    }
  }
};
</script>

