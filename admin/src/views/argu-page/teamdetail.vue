<template>
<div>
 <Form :model="formValidate" :label-width="80" ref="formValidate" :rules="ruleValidate">
    <div style="margin:0 auto;width:800px">
        <FormItem label="产品名称" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入产品名称..."/>
        </FormItem>

        <FormItem label="产品关键词" prop="keyword">
            <Input v-model="formValidate.keyword" placeholder="请输入产品关键词..."/>
        </FormItem>       
        <FormItem label="产品类型" prop="type">
            <Select v-model="formValidate.type" @on-change="typeChange" @on-clear="clearValue" :clearable="true">              
                <Option :value="item.id" v-for="item in tableData" :key="item.id">{{item.title}}</Option>
            </Select>
        </FormItem>
        <FormItem label="产品描述"  prop="des">
            <Input v-model="formValidate.des" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请描述该产品..."/>
        </FormItem>
        <FormItem label="上传图片" prop="pic">
          <div class="acc_sc">
              <img  id="aliImg" style="width: 200px;height:170px;" :src="pic">
              <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess"  :action="uploadUrl" enctype="multipart/form-data" :headers="myHeaders">
              <Button type="success"   icon="ios-cloud-upload-outline" style="    opacity: 0;width: 200px;
    height: 170px;margin-top: -200px;">上传焦点图片</Button>
            </Upload>
          </div>
        </FormItem>
        
       <div id="Test">
          <quill-editor ref="myTextEditor"
                    v-model="content" :options="quillOption"  style="height:600px;margin:0 auto;width:1100px"   @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
          </quill-editor>
        </div>
      <div  style="margin-top:50px;width:200px;margin-left:auto;margin-right:auto;display: flex;justify-content: center;margin-bottom:150px;">
        <Button type="primary" long @click="sure('formValidate')">保存</Button>
        <Button style="margin-left: 8px" long @click="handleReset('formValidate')">重置</Button>
      </div>
       </div>
      </Form>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import quillConfig from "../../libs/quill-config.js";
import {
  BASICURL,
  teamdetail,
  teamdeupdate,
  country,
  teamdeadd,
 productConfiglist
} from "@/service/getData";
 const token= localStorage.getItem('token');
export default {
  name: "teamdetail",
  components: {
    quillEditor
  },
  data() {
    return {
      content: "",
      quillOption: quillConfig,
      uploadUrl: BASICURL + "admin/upload",
      pic: require("../../images/talkingdata.png"),
      myHeaders: {token: token},
      countrydata: null,
      tableData:[],
      currentPageIdx: 1,
      formValidate: {
        title: "",
        keyword: "",     
        type: "",     
        des: "",
        typeTitle:'',
      },
        ruleValidate: {
        title: [
          {
            required: true,
            message: "产品标题不能为空",
            trigger: "blur"
          }
        ],
        des: [
          {
            required: true,
            message: "描述不能为空",
            trigger: "change"
          }
        ],
        keyword: [
          { required: true, message: "请输入关键词", trigger: "change" }
        ],
        // type: [
        //   {
        //     required: true,
        //     trigger: "change",
        //     message: "请选择产品类型"
        //   }
        // ]
      }
    };
  },
  watch:{
    $route(to,from){
      this.getTypeData({ pageNo: this.currentPageIdx, pageSize: 10 });
    }
},
  created() {
    this.getTypeData({ pageNo: this.currentPageIdx, pageSize: 10 });
    if (this.$route.query.id != -1) {
      this.getData({ id: this.$route.query.id });
    } else {
      this.getblank();
    }
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
      console.log("value===>",value)
    },
    aliHandleSuccess(res, file) {
       this.pic = BASICURL + res.ret_code;
    },
    clearValue(){
      this.formValidate.type="";
    },
    typeChange(value){
      this.formValidate.type=value;
      this.tableData.map((item,index)=>{
        if(item.id==value){
          this.formValidate.typeTitle=item.title;
        }
      })
    },
    getblank() {
      this.formValidate.title = "";
      this.formValidate.keyword = "";
      this.formValidate.type = "";
       this.formValidate.typeTitle = "";
      this.formValidate.des = "";
       this.content = "请输入内容...";
    },
    getData(params) {
      teamdetail(params).then(res => {
        this.formValidate.title = res.data[0].title;
        this.formValidate.keyword = res.data[0].keyword;
        this.formValidate.type = res.data[0].type;
         this.formValidate.typeTitle = res.data[0].typeTitle;
        
        this.formValidate.des = res.data[0].des;
        this.pic = res.data[0].pic;
        this.content = res.data[0].content;
      });
    },
    getTypeData(obj) {
     let that=this;
      productConfiglist(obj).then(res => {
        that.tableData = res.data;
      });
    },
     sure(name) {
      this.$refs[name].validate(valid => {
         if (valid) {
            let params = {};
            params["pic"] = this.pic;
            params["title"] = this.formValidate.title;
            params["keyword"] = this.formValidate.keyword;
            params["type"] = this.formValidate.type;
            params["typeTitle"] = this.formValidate.typeTitle;
            params["des"] = this.formValidate.des;
            params["content"] = this.content;
            params["Id"] = this.$route.query.id;
            if (this.$route.query.id != -1) {
              params["content"] = this.content;
              teamdeupdate(params).then(res => {
                if (res.status == 200) {
                  this.$Message.success(res.msg);
                } else {
                  this.$Message.error(res.msg);
                }
              });
            } else {
              params["content"] = this.content;
              teamdeadd(params).then(res => {
                if (res.status == 200) {
                  this.$Message.success(res.msg);
                } else {
                  this.$Message.error(res.msg);
                }
              });
            }
          } else {
              this.$Message.error("表单验证失败!");
          }
    })}
  }
}
</script>