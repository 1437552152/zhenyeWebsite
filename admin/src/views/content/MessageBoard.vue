<!--
 * @Description: 
 * @version: 
 * @Date: 2019-08-20 00:29:21
 * @LastEditors: yfye
 * @LastEditTime: 2021-03-14 03:10:37
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 -->
<template>
  <div> 
      <Button type="primary"  @click="reflash">刷新</Button>
     <!-- <Button type="primary"    @click="add" style="float:right">增加</Button> -->
     <div class="clearfix"></div>
    <Row class="margin-top-10">
      <Table :columns="tableTitle" :data="tableData"></Table>
    </Row>
     <Row class="pageWrapper" >
        <Page :total="total"  :current="current" show-total  :page-size="10"   @on-change="changePage"></Page>
      </Row>
      <Modal v-model="modal11" fullscreen draggable scrollable title="报名者简历" @on-ok="handleReply">
          <ul style="font-size: 17px;line-height: 38px">
            <li>用户名:{{info.name}}</li>
            <li>性别:{{info.sex}}</li>
            <li>生日:{{info.briday}}</li>
            <li>籍贯:{{info.NativePlace}}</li>
            <li>QQ:{{info.qqNum}}</li>
            <li>毕业院校:{{info.school}}</li>
            <li>学历:{{info.education}}</li>
            <li>专业:{{info.major}}</li>
            <li>邮箱:{{info.email}}</li>
          </ul>
     </Modal>
  </div>
</template>
<script>
import { messagelist, reportdelete,messageupdate,messagedetail } from "@/service/getData";
export default {
  name: "famousSchool",
  data() {
    return {
      currentPageIdx: 1,
      current: 1,
      total: 1,
      Id:0,
      replyContent:'',
      modal11: false,
      info:{},
      tableTitle: [
        {
          title: "职位标题",
          key: "title"
        },
        {
          title: "报名时间",
          key: "time"
        },
         {
          title: "报名者账号",
          key: "account"
        },
        {
          title: "审核状态",
          key: "status",
           render(h, params) {
            let text = "";
            if (params.row.status == 0) {
            text = "未审核";
            } else if (params.row.status == 1) {
            text = "通过";
            }else if (params.row.status == 2) {
            text = "未通过";
            }
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
            const userId=params.row.userId;
            const status=params.row.status;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    disabled: status == 0 ? false : true
                  },
                  style: {
                    marginRight: "20px"
                  },
                  class: {
                    // disabled: authStatus === 0 ? false : true
                  },
                  on: {
                    click: () => {
                      this.godelete(id,1);
                    }
                  }
                },
                "通过"
              ),
               h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    disabled: status == 0 ? false : true
                  },
                  style: {
                    marginRight: "20px"
                  },
                  class: {
                    // disabled: authStatus === 0 ? false : true
                  },
                  on: {
                    click: () => {
                      this.godelete(id,2);
                    }
                  }
                },
                "驳回"
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
                       this.replyContent='';
                       this.modal11 = true;
                     let obj={};
                     obj.userId=userId
                  messagedetail(obj).then(res => {
                       this.info=res.data;
                  });              
                    }
                  }
                },
                "查看简历"
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
    changePage(pageIndex) {
      this.currentPageIdx = pageIndex;
      let obj = {
        pageNo: pageIndex,
        pageSize: 10
      };
      this.getData(obj);
    },
    getData(obj) {
      messagelist(obj).then(res => {
        this.tableData = res.data;
        this.total = res.total;
        this.current = res.currentPage;
        this.$Spin.hide();
      });
    },
    handleReply(){   
    /*    messageupdate({replyContent:this.replyContent,Id:this.Id}).then(res => {
         this.$Message.success(res.msg);
         this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
      }); */
    },
    godelete(id,type) {
      console.log(id,type)
      reportdelete({ id:id,status:type }).then(res => {
        if (res.status == 200) {
          this.$Message.success("审核成功");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        } else {
          this.$Message.error("审核失败");
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
