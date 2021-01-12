<!--
 * @Description: 
 * @version: 
 * @Company: 烽火通信
 * @Author: yeyifu
 * @Date: 2019-08-31 10:48:30
 * @LastEditors: yfye
 * @LastEditTime: 2021-01-12 19:46:24
 -->
<template>
  <div>

 <Form :model="formValidate" :label-width="100" ref="formValidate" :rules="ruleValidate">
     <div style="margin:0 auto;width:1200px">
        <FormItem label="证书标题" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入证书标题..."/>
        </FormItem>
        <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入姓名..."/>
        </FormItem>
        
        <FormItem label="性别" prop="sex">
            <RadioGroup v-model="formValidate.sex">
                <Radio label="1">男</Radio>
                <Radio label="0">女</Radio>
            </RadioGroup>
        </FormItem>

         <FormItem prop="brithday" label="出生年月">
              <DatePicker type="date" placeholder="请选择出生年月" v-model="formValidate.brithday"></DatePicker>
          </FormItem>

        <FormItem label="资格名称" prop="qualificationsName">
            <Input v-model="formValidate.qualificationsName" placeholder="请输入资格名称..."/>
        </FormItem>

           <FormItem label="资格等级" prop="QualificationLevel">
            <Input v-model="formValidate.QualificationLevel" placeholder="请输入资格等级..."/>
        </FormItem>
        <FormItem label="专业名称" prop="major">
            <Input v-model="formValidate.major" placeholder="请输入专业名称..."/>
        </FormItem>
       
          <FormItem prop="ApprovedDate" label="批准日期">
              <DatePicker type="date" placeholder="请选择批准日期" v-model="formValidate.ApprovedDate"></DatePicker>
          </FormItem>

       <FormItem label="发证单位" prop="unit">
            <Input v-model="formValidate.unit" placeholder="请输入发证单位..."/>
        </FormItem>


        <FormItem label="身份证号" prop="IDCard">
            <Input v-model="formValidate.IDCard" placeholder="请输入身份证号..."/>
        </FormItem>


        <FormItem label="证书编号" prop="CertificateNo">
            <Input v-model="formValidate.CertificateNo" placeholder="请输入证书编号..."/>
        </FormItem>
        
          <FormItem label="公布文号" prop="PublicationNumber">
            <Input v-model="formValidate.PublicationNumber" placeholder="请输入公布文号..."/>
        </FormItem>

          <FormItem label="查询网址" prop="websiteUrl">
            <Input v-model="formValidate.websiteUrl" placeholder="请输入查询网址..."/>
        </FormItem>

        <FormItem label="在线验证码" prop="OnVerCode">
            <Input v-model="formValidate.OnVerCode" placeholder="请输入在线验证码..."/>
        </FormItem>

         <FormItem prop="DateOfIssue" label="发证日期">
              <DatePicker type="date" placeholder="请选择发证日期" v-model="formValidate.DateOfIssue"></DatePicker>
          </FormItem>

        <FormItem label="上传头像" prop="focusPic">
        <div class="acc_sc">
             <img  id="aliImg" style="width:100px;height:100px;" :src="focusPic">  
            <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess"  :action="uploadUrl" enctype="multipart/form-data" :headers="myHeaders">
              <Button type="success"   icon="ios-cloud-upload-outline" style="opacity: 0;width:100px;height:100px;margin-top: -160px;">上传焦点图片</Button>
            </Upload>
            <div class="clearfix"></div>
        </div>
         <div class="clearfix"></div>
         </FormItem>

       <FormItem label="印章上传" prop="CertPic">
          <div class="acc_sc">
              <img  id="aliImg" style="width:100px;height:100px;" :src="CertPic">  
              <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess1"  :action="uploadUrl" enctype="multipart/form-data" :headers="myHeaders">
                <Button type="success"   icon="ios-cloud-upload-outline" style="opacity: 0;width:100px;height:100px;margin-top: -160px;">上传证书图片</Button>
              </Upload>
              <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </FormItem>


        
        <FormItem label="备注" prop="des">
            <Input v-model="formValidate.des"  type="textarea"  placeholder="请输入备注..."/>
        </FormItem>


       <div  style="margin-top:50px;width:200px;margin-left:auto;margin-right:auto;display: flex;justify-content: center;margin-bottom:150px;">
          <Button type="primary" long  @click="sure('formValidate')">保存</Button>
          <Button style="margin-left: 8px" long @click="handleReset('formValidate')">清空</Button>
        </div>
           </div>
    </Form>
 
  </div>
</template>
<script>
import {
  BASICURL,
  newsdetail,
  newsUpdate,
  newsadd,
  country
} from "@/service/getData";
import moment from 'moment';
const token = localStorage.getItem("token");
export default {
  name: "articledetail",
  data() {
    return {
      uploadUrl: BASICURL + "admin/upload",
      focusPic: "",
      CertPic:'',
      hackReset: false,
      myHeaders: { token: token },
      countrydata: null,
      formValidate: {
        title: "",
        name: "",
        sex: "1",
        brithday: "",
        qualificationsName: "",
        major: "",
        ApprovedDate: "",
        unit: "",
        IDCard: "",
        CertificateNo: "",
        PublicationNumber: "",
        websiteUrl: "",
        OnVerCode: "",
        DateOfIssue: "",
        QualificationLevel:'',
        des: "",
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "证书标题不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          }
        ],
     brithday: [
          {
            required: true,
            message: "出生年月不能为空",
            trigger: "change",
            type:'date'
          }
        ],
    qualificationsName: [
          {
            required: true,
            message: "资格名称不能为空",
            trigger: "blur"
          }
        ],
 major: [
          {
            required: true,
            message: "专业名称不能为空",
            trigger: "blur"
          }
        ],
 ApprovedDate: [
          {
            required: true,
            message: "批准日期不能为空",
            trigger: "change",
             type:'date'
          }
        ],
 unit: [
          {
            required: true,
            message: "发证单位不能为空",
            trigger: "blur"
          }
        ],
 IDCard: [
          {
            required: true,
            message: "身份证号不能为空",
            trigger: "blur"
          }
        ],

 CertificateNo: [
          {
            required: true,
            message: "证书编号不能为空",
            trigger: "blur"
          }
        ],

 PublicationNumber: [
          {
            required: true,
            message: "公布文号不能为空",
            trigger: "blur"
          }
        ],

 websiteUrl: [
          {
            required: true,
            message: "查询网址不能为空",
            trigger: "blur"
          }
        ],
     QualificationLevel: [
          {
            required: true,
            message: "资格等级不能为空",
            trigger: "blur"
          }
        ],
       OnVerCode: [
          {
            required: true,
            message: "在线验证码不能为空",
            trigger: "blur"
          }
        ],
      DateOfIssue: [
          {
            required: true,
            message: "发证日期不能为空",
            trigger: "change",
             type:'date'
          }
        ],
      }
    };
  },
  created() {},
  mounted() {
    if (this.$route.query.id&&this.$route.query.id != -1) {
      this.getData({ id: this.$route.query.id }); //修改
    }
  },
  methods: {
    aliHandleSuccess(res, file) {
      this.focusPic = BASICURL + res.ret_code;
    },
    aliHandleSuccess1(res, file) {
      this.CertPic = BASICURL + res.ret_code;
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    getData(params) {
        const that=this;
      newsdetail(params).then(res => {
        this.formValidate.title = res.data[0].title;
        this.focusPic = res.data[0].focusPic;
        this.CertPic = res.data[0].CertPic;
        this.formValidate.des = res.data[0].des;
        this.formValidate.name = res.data[0].name;
        this.formValidate.sex = res.data[0].sex;
        this.formValidate.brithday = moment(res.data[0].brithday).format("YYYY-MM-DD");
        this.formValidate.qualificationsName = res.data[0].qualificationsName;
        this.formValidate.major = res.data[0].major;
       this.formValidate.ApprovedDate = moment(res.data[0].ApprovedDate).format("YYYY-MM-DD");
        this.formValidate.unit = res.data[0].unit;
        this.formValidate.IDCard = res.data[0].IDCard;
        this.formValidate.CertificateNo = res.data[0].CertificateNo;
        this.formValidate.PublicationNumber = res.data[0].PublicationNumber;
        this.formValidate.websiteUrl = res.data[0].websiteUrl;
        this.formValidate.OnVerCode = res.data[0].OnVerCode;
        this.formValidate.DateOfIssue = moment(res.data[0].DateOfIssue).format("YYYY-MM-DD");
        this.formValidate.QualificationLevel =res.data[0].QualificationLevel; 
      });
    },
    handleChange(html, text) {
    },
    sure(name) {
      const that=this;
      this.$refs[name].validate(valid => {
        if (valid) {
          let params ={};
          params["focusPic"] = that.focusPic;
           params["CertPic"] = that.CertPic;
          
          params["title"] = that.formValidate.title;
          params["des"] = that.formValidate.des;
          params["name"] = that.formValidate.name;
          params["sex"] = that.formValidate.sex;
          params["brithday"] = moment(that.formValidate.brithday).format("YYYY-MM-DD");
          params["qualificationsName"] = that.formValidate.qualificationsName;
          params["major"] = that.formValidate.major;
          params["ApprovedDate"] = moment(that.formValidate.ApprovedDate).format("YYYY-MM-DD");
          params["unit"] = that.formValidate.unit;
          params["IDCard"] = that.formValidate.IDCard;
          params["CertificateNo"] = that.formValidate.CertificateNo;
          params["PublicationNumber"] = that.formValidate.PublicationNumber;
          params["websiteUrl"] = that.formValidate.websiteUrl;
          params["OnVerCode"] = that.formValidate.OnVerCode;
          params["DateOfIssue"] = moment(that.formValidate.DateOfIssue).format("YYYY-MM-DD");
          params["QualificationLevel"] = that.formValidate.QualificationLevel;
          if (that.$route.query.id&&that.$route.query.id != -1) {
            params["Id"] = that.$route.query.id;
          }
          if (!that.focusPic) {
            that.$Message.error("请上传头像");
            return false;
          }
         if (!that.CertPic) {
            that.$Message.error("请上传印章");
            return false;
          }
          if (that.$route.query.id&&that.$route.query.id != -1) {
            newsUpdate(params).then(res => {
              if (res.status == 200) {
                that.$Message.success("修改成功");
              } else {
                that.$Message.error("修改失败");
              }
            });
          } else {
            newsadd(params).then(res => {
              console.log(res);
              if (res.status == 200) {
                that.$Message.success("增加成功");
              } else {
                that.$Message.error("增加失败");
              }
            });
          }
        } else {
          that.$Message.error("表单验证失败!");
        }
      });
    }
  }
};
</script>

<style>
</style>
