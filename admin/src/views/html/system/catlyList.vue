<template>
    <div>
      <div style="display:flex;justify-content:flex-end;margin: 30px 20px 10px 0;">
          <ButtonGroup>
            <Button type="primary" @click="reflash">刷新</Button>
            <Button type="primary" @click="add" style="float:right">增加</Button>
          </ButtonGroup>
      </div>
 
       <Modal v-model="addModal" title="添加"  draggable   :footer-hide=true>
           <Form :model="formItem" :label-width="100">                           
            <FormItem label="分类标题">
               <Input v-model="formItem.title" placeholder="请填写分类标题..."/>
            </FormItem>                 
        </Form>
        <div style="display:flex;justify-content:flex-end">
          <Button type="ghost" @click="cancel" style="margin-right:10px">取消</Button>
          <Button type="primary" @click="ok">确定</Button>
        </div> 
    </Modal>
     <Modal v-model="UPModal" title="修改分类" draggable  :footer-hide=true>
          <Form :model="formItem" :label-width="100">                           
            <FormItem label="分类标题">
               <Input v-model="formItem.title" placeholder="请填写分类标题..."/>
            </FormItem>             
        </Form>
       
        <div style="display:flex;justify-content:flex-end">
          <Button type="ghost" @click="cancel" style="margin-right:10px">取消</Button>
          <Button type="primary" @click="okUP">确定</Button>
        </div>
         
    </Modal>
        <Row class="margin-top-10">
          <Table :columns="tableTitle" :data="tableData"/>
        </Row>
        <Row class="pageWrapper">
          <Page :total="total"  :current="current" show-total  :page-size="10"   @on-change="changePage"></Page>
        </Row>
      </div>
</template>
<script>
import {
CateConfigdelete,
 CateConfiglist,
CateConfigUpdate,
 CateConfigdetail,
 CateConfigadd,
} from "@/service/getData";
export default {
  data() {
    return {
      currentPageIdx: 1,
      current: 1,
      total: 1,
      id: 0,
      addModal: false,
      UPModal: false,
      formItem: {
        title: "",
      },
      tableTitle: [
          {
          title: "分类id",
          key: "id",
          align:"left"
        },
         {
          title: "标题",
          key: "title",
          align:"left"
        },
        {
          title: "操作",
          align: "center",
          width: 240,
          key: "id",
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
                      this.id = id;
                      this.goupdate(id);
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
  //  watch: {
  //   $route(to, from) {
  //     this.getLangData();
  //   }
  // },
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
    // 模态框的出现与隐藏
    add() {
      this.addModal = true;
      this.formItem.title = ""; 
    },
  
    // 点击确定时
    ok() {
      let params = [];
      params["title"] = this.formItem.title;
      CateConfigadd(params).then(res => {
        if (res.status == 200) {
          this.$Message.success("增加成功");
          this.addModal=false;
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        } else {
          this.$Message.error("增加失败");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        }
      });
    },
    okUP() {
      let params = [];
      params["title"] = this.formItem.title;
      params["id"] = this.id;   
      CateConfigUpdate(params).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$Message.success("修改成功");
           this.UPModal=false;
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        } else {
          this.$Message.error("修改失败");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        }
      });
    },
    cancel() {
      this.addModal = false;
      this.UPModal = false;
    },
    aliHandleSuccess(res, file) {
      this.img = BASICURL + res.ret_code;
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
      CateConfiglist(obj).then(res => {
        this.tableData = res.data;
        this.total = res.total;
        this.current = res.currentPage;
        this.$Spin.hide();
      });
    },
    godelete(id) {
      CateConfigdelete({ id: id }).then(res => {
        if (res.status == 200) {
          this.$Message.success("删除成功");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        } else {
          this.$Message.error("删除失败");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        }
      });
    },
    carouselConfigIdShow(id) {
     CateConfigdetail({ id: id }).then(res => {
        this.formItem.title = res.data[0].title;
       });
    },
    goupdate(id) {
      this.UPModal = true;
      this.carouselConfigIdShow(id);
    }
  },
  created() {
    this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
   }
};
</script>
<style lang="less" scoped>
</style>