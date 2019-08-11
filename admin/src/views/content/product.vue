<template>
  <div> 
      <Button type="primary"  @click="reflash">刷新</Button>
     <Button type="primary"    @click="add" style="float:right">增加</Button>
     <div class="clearfix"></div>
    <Row class="margin-top-10">
      <Table :columns="tableTitle" :data="tableData"></Table>
    </Row>
     <Row class="pageWrapper" >
        <Page :total="total"  :current="current" show-total  :page-size="10"   @on-change="changePage"></Page>
      </Row>
  </div>
</template>
<script>
import { team, teamdelete } from "@/service/getData";
export default {
  name: "team",
  data() {
    return {
      currentPageIdx: 1,
      current: 1,
      total: 1,
      tableTitle: [
        {
          title: "产品名称",
          key: "title"
        },
        {
          title: "关键词",
          key: "keyword"
        },       
        {
          title: "产品图片",
          key: "pic",
          render: (h, params) => {
            const pic = params.row.pic;
            let text = "";
            return h("div", [
              h("img", {
                attrs: {
                  src: pic
                },
                style: {
                  width: "100px",
                  height: "70px"
                }
              }),
              h("span", {}, text)
            ]);
          }
        },
         {
          title: "产品类型",
          key: "typeTitle",
          //  render: (h, params) => {
          //   const type = params.row.type;
          //   let text = type=='1'?"真石漆系列":type=="2"?'多彩漆系列':'岩片漆';
          //   return h("span",text);
          // }
        }, 
        {
          title: "简介",
          key: "des",
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
        // {
        //   title: "浏览数",
        //   key: "view"
        // },
        //  {
        //   title: "发布时间",
        //   key: "time"
        // }, 
        {
          title: "操作",
          align: "center",
          width: 240,
          key: "introduceBriefly",
          render: (h, params) => {
            const id = params.row.productId;
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
                        path: "/teamdetail",
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
        path: "/teamdetail",
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
      team(obj).then(res => {
        this.tableData = res.data;
        this.total = res.total;
        this.current = res.currentPage;
        this.$Spin.hide();
      });
    },
    godelete(id) {
      teamdelete({ productId: id }).then(res => {
        if (res.status == 200) {
          this.$Message.success(res.msg);
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        } else {
          this.$Message.error(res.msg);
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
