<!--
 * @Description: 
 * @version: 
 * @Date: 2019-08-20 00:29:21
 * @LastEditors: yfye
 * @LastEditTime: 2021-01-12 19:29:56
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 -->
<template>
  <div>
     <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" inline style="margin-top:50px">
        <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" />
        </FormItem>
       <FormItem label="身份证号" prop="IDCard">
            <Input v-model="formValidate.IDCard" />
        </FormItem>
        <FormItem label="证书编号" prop="CertificateNo">
            <Input v-model="formValidate.CertificateNo" />
        </FormItem>
       
      
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">查询</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
        <FormItem style="float:right;">
          <ButtonGroup>
            <Button type="primary" @click="reflash">刷新</Button>
            <Button type="primary" @click="add" style="float:right">增加</Button>
          </ButtonGroup>
        </FormItem>
    </Form>
    <Row class="margin-top-10">
      <Table :columns="tableTitle" :data="tableData"></Table>
    </Row>
    <Row class="pageWrapper">
      <Page :total="total" :current="current" show-total :page-size="10" @on-change="changePage"></Page>
    </Row>
    <Modal v-model="modal3" footer-hide>
      <img :src="imgSrc" style="width:100%" />
    </Modal>
  </div>
</template>
<script>
import { newslist, newsdelete } from "@/service/getData";

export default {
  name: "article",
  data() {
    return {
      currentPageIdx: 1,
      current: 1,
      total: 1,
      imgSrc: "",
      modal3: false,
      formValidate: {
        name: "",
        IDCard: "",
        CertificateNo: ""
      },
      ruleValidate: {},
      tableTitle: [
        {
          title: "证书标题",
          key: "title",
          width: 200,
          fixed: 'left',
        },
        {
          title: "发布时间",
          key: "time",
            width: 240,
        },
        {
          title: "姓名",
          key: "name",
            width: 240,
        },
        {
          title: "性别",
          key: "sex",
            width: 240,
          render: (h, params) => {
            const sex = params.row.sex;
            return h("div", [h("span", {}, sex ? "男" : "女")]);
          }
        },
        {
          title: "出生年月",
          key: "brithday",
            width: 240,
        },
        {
          title: "资格名称",
          key: "qualificationsName",
            width: 240,
        },
        {
          title: "专业名称",
          key: "major",
            width: 240,
        },
        {
          title: "批准日期",
          key: "ApprovedDate",
            width: 240,
        },
        {
          title: "发证单位",
          key: "unit",
            width: 240,
        },
        {
          title: "身份证号",
          key: "IDCard",
            width: 240,
        },
        {
          title: "证书编号",
          key: "CertificateNo",
            width: 240,
        },
        {
          title: "公布文号",
          key: "PublicationNumber",
            width: 240,
        },
        {
          title: "查询网址",
          key: "websiteUrl",
            width: 240,
        },
        {
          title: "在线验证码",
          key: "OnVerCode",
            width: 240,
        },
        {
          title: "发证日期",
          key: "DateOfIssue",
            width: 240,
        },
        {
          title: "头像",
          key: "pic",
            width: 240,
          render: (h, params) => {
            const pic = params.row.focusPic;
            let text = "";
            return h("div", [
              h("img", {
                attrs: {
                  src: pic
                },
                on: {
                  click: () => {
                    this.imgSrc = pic;
                    this.modal3 = true;
                  }
                },
                style: {
                  width: "100px",
                  cursor: "pointer"
                  /*   height: "70px" */
                }
              }),
              h("span", {}, text)
            ]);
          }
        },
        {
          title: "备注",
          key: "des",
            width: 240,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    webkitBoxOrient: "vertical",
                    webkitLineClamp: 3
                  }
                },
                params.row.des
              )
            ]);
          }
        },
        {
          title: "操作",
          align: "center",
          width: 240,
          fixed: 'right',
          key: "introduceBriefly",
          render: (h, params) => {
            const id = params.row.id;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "20px"
                  },
                  class: {
                    // disabled: authStatus === 0 ? false : true
                  },
                  on: {
                    click: () => {
                      this.godelete(id);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "20px"
                  },
                  class: {
                    // disabled: authStatus === 0 ? false : true
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/argu-page/articledetail",
                        query: { id: id }
                      });
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      tableData: []
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let params = {};
          params["name"] = this.formValidate.name;
          params["IDCard"] = this.formValidate.IDCard;
          params["CertificateNo"] = this.formValidate.CertificateNo;
          this.getData(Object.assign({ pageNo: 1, pageSize: 10 }, params));
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.getData({ pageNo: 1, pageSize: 10 });
      this.$refs[name].resetFields();
    },
    reflash() {
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 18
              }
            }),
            h("div", "Loading")
          ]);
        }
      });
      this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
    },
    add() {
      this.$router.push({
        path: "/argu-page/articledetail",
        query: { id: -1 }
      });
    },
    changePage(pageIndex) {
      this.currentPageIdx = pageIndex;
      let obj = {
        pageNo: pageIndex,
        pageSize: 10
      };
      this.getData(obj);
    },
    getData(obj) {
      newslist(obj).then(res => {
        this.tableData = res.data;
        this.total = res.total;
        this.current = res.currentPage;
        this.$Spin.hide();
      });
    },
    godelete(id) {
      newsdelete({ Id: id }).then(res => {
        if (res.status == 200) {
          this.$Message.success("删除成功");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        } else {
          this.$Message.error("删除失败");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        }
      });
    }
  },
  created() {
    this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
  }
};
</script>
<style lang="less" scoped>
.clearfix {
  clear: both;
}
</style>
