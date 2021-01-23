<!--
 * @Description: 
 * @version: 
 * @Date: 2019-08-20 00:29:21
 * @LastEditors: yfye
 * @LastEditTime: 2021-01-24 00:01:08
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 -->
<template>
  <div> 
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" inline style="margin-top:50px">
        <FormItem label="标题" prop="title">
            <Input v-model="formValidate.title" />
        </FormItem>
      
        <FormItem label="博客大类" prop="classify">
          <Select v-model="formValidate.classify" :clearable="true"  style="width:200px">
            <Option :value="item.key" v-for="(item,index) in classify" :key="index">{{item.label}}</Option>
          </Select>
        </FormItem>

       <FormItem label="博客小类" prop="type">
          <Select v-model="formValidate.type" :clearable="true"  style="width:200px">
             <Option :value="item.key" v-for="(item,index) in BlogType" :key="index">{{item.label}}</Option>
          </Select>
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
     <Row class="pageWrapper" >
        <Page :total="total"  :current="current" show-total  :page-size="10"   @on-change="changePage"></Page>
      </Row>
        <Modal v-model="modal3" footer-hide>
       <img :src="imgSrc" style="width:100%"/>
    </Modal>
  </div>
</template>
<script>
import { BlogNewslist, BlogNewsdelete } from "@/service/getData";
import {api } from "@/service/http";
import {classify,BlogType} from "@/utils/BlogType";
import moment from 'moment';
export default {
  name: "article",
  data() {
    return {
      classify,
      BlogType,
      currentPageIdx: 1,
      current: 1,
      total: 1,
      imgSrc: "",
      modal3: false,
      formValidate: {
        title: "",
        type: "",
        classify: ""
      },
      ruleValidate: {},
      tableTitle: [
       
        {
          title: "标题",
          key: "title",
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
                    webkitLineClamp: 2
                  }
                },
                params.row.title
              )
            ]);
          }
        },
         {
          title: "作者",
          key: "author"
        },
        {
          title: "描述",
          key: "describee",
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
                params.row.describee
              )
            ]);
          }
        },
        {
          title: "发布时间",
          key: "creatTime",
          render(h, params) {       
            return h("div", moment(params.row.creatTime).format("YYYY-MM-DD HH:mm:ss"));
          }
        },
        /*   {
          title: "浏览量",
          key: "view"
        },   */

        {
          title: "焦点图",
          key: "pic",
          render: (h, params) => {
            const pic =api+params.row.thumbnail;
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
          title: "博客大类型",
          key: "classify",
          render(h, params) {
            let text='';
            classify.map(item=>{
              if(item.key==params.row.classify){
                text=item.label
              }
            })
            return h("div", text);
          }
        },    
        {
          title: "博客小分类",
          key: "type",
          render(h, params) {   
              let text='';
            BlogType.map(item=>{
              if(item.key==params.row.type){
                text=item.label
              }
            })       
             return h("div", text);
          }
        },
        {
          title: "操作",
          align: "center",
          width: 240,
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
                        path: "/argu-page/Blogdetail",
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
          console.log(this.formValidate);
          let params = {};
          params["title"] = this.formValidate.title;
          params["type"] = this.formValidate.type;
          params["classify"] = this.formValidate.classify;
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
        path: "/argu-page/Blogdetail",
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
      BlogNewslist(obj).then(res => {
        this.tableData = res.data;
        this.total = res.total;
        this.current = res.currentPage;
        this.$Spin.hide();
      });
    },
    godelete(id) {
      BlogNewsdelete({id: id }).then(res => {
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
