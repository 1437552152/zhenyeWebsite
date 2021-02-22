<!--
 * @Description: 
 * @version: 
 * @Company: 烽火通信
 * @Author: yeyifu
 * @Date: 2019-08-31 10:48:30
 * @LastEditors: yfye
 * @LastEditTime: 2021-02-04 21:06:59
 -->
<template>
  <div>
    <Form :model="formValidate" :label-width="100" ref="formValidate" :rules="ruleValidate">
      <div style="margin:0 auto;width:1200px">
        <!--  <FormItem label="证书标题" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入证书标题..."/>
        </FormItem>-->
        <FormItem label="姓名" prop="name">
          <Input v-model="formValidate.name" placeholder="请输入姓名..." />
        </FormItem>

        <FormItem label="性别" prop="sex">
          <RadioGroup v-model="formValidate.sex">
            <Radio label="男">男</Radio>
            <Radio label="女">女</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="上传头像" prop="image">
          <div class="acc_sc">
            <img id="aliImg" style="width:100px;height:100px;" :src="BASICURL+image" />
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
                style="opacity: 0;width:100px;height:100px;margin-top: -160px;"
              >上传焦点图片</Button>
            </Upload>
            <div class="clearfix"></div>
          </div>
          <div class="clearfix"></div>
        </FormItem>

        <FormItem prop="birthday" label="出生日期">
          <DatePicker type="date" placeholder="请选择出生日期" v-model="formValidate.birthday"></DatePicker>
        </FormItem>

        <FormItem label="籍贯" prop="education">
          <Input v-model="formValidate.education" placeholder="请输入籍贯..." />
        </FormItem>

        <FormItem label="专业名称" prop="major">
          <Input v-model="formValidate.major" placeholder="请输入专业名称..." />
        </FormItem>

        <FormItem label="资格级别" prop="level">
          <Input v-model="formValidate.level" placeholder="请输入资格等级..." />
        </FormItem>

        <FormItem label="身份证号" prop="idnumber">
          <Input v-model="formValidate.idnumber" placeholder="请输入身份证号..." />
        </FormItem>

        <FormItem label="证书编号" prop="cert">
          <Input v-model="formValidate.cert" placeholder="请输入证书编号..." />
        </FormItem>

        <FormItem label="发证机关" prop="issued">
          <Input v-model="formValidate.issued" placeholder="请输入发证机关..." />
        </FormItem>

        <FormItem prop="addtime" label="发证日期">
          <DatePicker type="date" placeholder="请选择发证日期" v-model="formValidate.addtime"></DatePicker>
        </FormItem>

        <div
          style="margin-top:50px;width:200px;margin-left:auto;margin-right:auto;display: flex;justify-content: center;margin-bottom:150px;"
        >
          <Button type="primary" long @click="sure('formValidate')">保存</Button>
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
import moment from "moment";
const token = localStorage.getItem("token");
export default {
  name: "articledetail",
  data() {
    return {
      uploadUrl: BASICURL + "admin/upload",
      image: "",
      hackReset: false,
      myHeaders: { token: token },
      countrydata: null,
      BASICURL,
      formValidate: {
        name: "",
        sex: "男",
        birthday: "",
        education: "",
        major: "",
        issued: "",
        idnumber: "",
        addtime: "",
        level: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          }
        ],
        birthday: [
          {
            required: true,
            message: "出生年月不能为空",
            trigger: "change",
            type: "date"
          }
        ],
        education: [
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
        issued: [
          {
            required: true,
            message: "发证单位不能为空",
            trigger: "blur"
          }
        ],
        idnumber: [
          {
            required: true,
            message: "身份证号不能为空",
            trigger: "blur"
          }
        ],

        cert: [
          {
            required: true,
            message: "证书编号不能为空",
            trigger: "blur"
          }
        ],
        level: [
          {
            required: true,
            message: "资格等级不能为空",
            trigger: "blur"
          }
        ],
        addtime: [
          {
            required: true,
            message: "发证日期不能为空",
            trigger: "change",
            type: "date"
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    if (this.$route.query.id && this.$route.query.id != -1) {
      this.getData({ id: this.$route.query.id }); //修改
    }
  },
  methods: {
    aliHandleSuccess(res, file) {
      this.image =res.ret_code;
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    getData(params) {
      const that = this;
      newsdetail(params).then(res => {
        this.image = res.data[0].image;
        this.formValidate.des = res.data[0].des;
        this.formValidate.name = res.data[0].name;
        this.formValidate.sex = res.data[0].sex;
        this.formValidate.birthday = moment(res.data[0].birthday).format(
          "YYYY-MM-DD"
        );
        this.formValidate.education = res.data[0].education;
        this.formValidate.major = res.data[0].major;
        this.formValidate.issued = res.data[0].issued;
        this.formValidate.idnumber = res.data[0].idnumber;
        this.formValidate.cert = res.data[0].cert;
        this.formValidate.addtime = moment(res.data[0].addtime).format(
          "YYYY-MM-DD"
        );
        this.formValidate.level = res.data[0].level;
      });
    },
    handleChange(html, text) {},
    sure(name) {
      const that = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          let params = {};
          params["image"] = that.image;//头像
          params["name"] = that.formValidate.name;//姓名
          params["sex"] = that.formValidate.sex;  //性别
          params["birthday"] = moment(that.formValidate.birthday).valueOf();//生日
          params["education"] = that.formValidate.education; //籍贯
          params["major"] = that.formValidate.major;   //专业名称
          params["issued"] = that.formValidate.issued;  //发证机关
          params["idnumber"] = that.formValidate.idnumber; //身份证号
          params["cert"] = that.formValidate.cert;  //编号
          params["addtime"] = moment(that.formValidate.addtime).valueOf();  //发证时间
          params["level"] = that.formValidate.level;   //层级
          if (that.$route.query.id && that.$route.query.id != -1) {
            params["Id"] = that.$route.query.id;
          }
          if (!that.image) {
            that.$Message.error("请上传头像");
            return false;
          }
          if (that.$route.query.id && that.$route.query.id != -1) {
            newsUpdate(params).then(res => {
              if (res.status == 200) {
                that.$Message.success("修改成功");
                 this.$router.push({
                      path: "/content/article"
                   });
              } else {
             /*    that.$Message.error("修改失败"); */
              }
            });
          } else {
            newsadd(params).then(res => {
              console.log(res);
              if (res.status == 200) {
                that.$Message.success("增加成功");
                  this.$router.push({
                      path: "/content/article"
                   });
              } else {
              //  that.$Message.error("增加失败");
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
