<!--
 * @Description: 
 * @version: 
 * @Date: 2019-08-20 00:29:21
 * @LastEditors: yfye
 * @LastEditTime: 2021-02-03 23:56:15
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 -->
<template>
  <div>
     <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" inline style="margin-top:50px">
        <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" />
        </FormItem>
       <FormItem label="身份证号" prop="idnumber">
            <Input v-model="formValidate.idnumber" />
        </FormItem>
        <FormItem label="证书编号" prop="cert">
            <Input v-model="formValidate.cert" />
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
import { newslist, newsdelete,BASICURL } from "@/service/getData";
import moment from 'moment';
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
        idnumber: "",
        cert: ""
      },
      ruleValidate: {},
      tableTitle: [
        {
          title: "姓名",
          key: "name"
        },
                {
          title: "头像",
          key: "pic",
          render: (h, params) => {
            const pic = params.row.image;
            let text = "";
            return h("div", [
              h("img", {
                attrs: {
                  src:BASICURL+pic
                },
                on: {
                  click: () => {
                    this.imgSrc =BASICURL+pic;
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
          title: "性别",
          key: "sex"
        },
        {
          title: "出生日期",
          key: "birthday",
         render: (h, params) => {
            let birthday = params.row.birthday;
            return h("span", moment(birthday).format('YYYY-MM-DD'));
            }
        },
        {
          title: "籍贯",
          key: "education"
        },
        {
          title: "专业名称",
          key: "major",
        },
        {
          title: "资格级别",
          key: "level",
        },
       
        {
          title: "身份证号",
          key: "idnumber",
        },
        {
          title: "证书编号",
          key: "cert",
        },
         {
          title: "发证机关",
          key: "issued",
        },
        {
          title: "发证日期",
          key: "addtime",
         render: (h, params) => {
            let addtime = params.row.addtime;
            return h("span", moment(addtime).format('YYYY-MM-DD'));
            }
        },
        {
          title: "操作",
          align: "center",
          width: 200,
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
          params["idnumber"] = this.formValidate.idnumber;
          params["cert"] = this.formValidate.cert;
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
