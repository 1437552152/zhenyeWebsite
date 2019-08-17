<!--
 * @Description: 
 * @version: 
 * @Date: 2019-07-31 19:53:24
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-08-17 20:10:30
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 -->
<template>
    <div >
      <Card>
        <p slot="title">
        用户列表
          <Button type="primary" size="small" @click="refreshPageManual">
            <Icon type="refresh"></Icon>
            刷新
          </Button>
        </p>

        <Row class="functionWrapper">
          <div class="btnsWrapper clearfix">
            <Button type="error" @click="ifDelete = true">删除用户</Button>
            <Button type="primary" @click="addUserBtn">111添加用户</Button>
          </div>
        </Row>

        <Row >
          <Table 
            :columns="column_frist" 
            :data="userpage" 
            :loading="ifLoading"
            @on-selection-change="select"
            border>
          </Table>
        </Row>

        <Row class="pageWrapper">
          <Page :total="pageNum" 
                class="buttomPage"
                @on-change="changePage"
								:current="currentPageIdx"
                show-elevator></Page>
        </Row>

        <Modal
          v-model="ifDelete"
          title="删除用户"
          @on-ok="confirmDel"
          @on-cancel="$Message.info('已取消！')">
          <p>是否删除所选的{{ delArr.length }}项?</p>
       </Modal>
      <Modal v-model="addUpdate" draggable scrollable :title="title">
          <div>



            
          </div>
      </Modal>
  

      </Card>
    </div>
</template>

<script>
import { setStore, getStore, removeStore } from '@/config/storage';
import { queryEmployee, addAuditEmployee, employeeDetail, delEmployee, departmentManage } from "@/service/getData";
export default {
  data() {
    return {
      addUpdate:false,/* 模态框默认隐藏 */
      title:"增加",/* 标题默认为增加 */
      currentPageIdx: 1,
      pageNum: null,
      delArr: [],
      ifLoading: true,
      ifDelete: false,
      departName: null,
      column_frist: [
        {
          type: "selection",
          width: 80,
          align: "center"
        },
        {
          title: "用户ID",
          key: "user_id",
          width: 80
        },
        {
          title: "用户名",
          key: "username"
        },     
        {
          title: "角色",
          key: "roleName"
        },
        {
          title: "手机号",
          key: "mobile"
        },
        {
          title: "邮箱",
          key: "email"
        },
        {
          title: "操作",
          render: (h, obj) => {
            return (
              "div",
              [
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    on: {
                      click: () => {
                          this.addUpdate=true;
                          this.title='修改';
                      }
                    }
                  },
                  "查看 / 编辑"
                )
              ]
            );
          }
        }
      ],
      userpage: []
    }
  },
  methods: {
    changePage(pageIndex) {
      this.currentPageIdx = pageIndex;
      this.freshPage({ pageNo: pageIndex, pageSize: 10 });
    },
    select(solutions) {
      this.delArr = [];
      solutions.forEach(item => {
        this.delArr.push(item.user_id);
      });
      console.log(solutions);
    },
    addUserBtn () {
      this.addUpdate=true;
      this.title='增加';
    },
    confirmDel() {
      delEmployee({ user_id: this.delArr })
      .then(res => {
        if (!res.code) {
          this.freshPage();
          this.$Message.success("删除成功！");
        } else this.$Message.error("删除失败！");
      })
      .catch( err =>{ console.log(err)})
    },
   
    refreshPageManual() {
      this.freshPage({ pageNo: this.currentPageIdx, pageSize: 10 });
    },
    freshPage(obj) {
      this.ifLoading = true;
      queryEmployee(obj)
      .then(res => {
        console.log(res)
        if (res.status==200) {
          this.userpage = res.data;
          this.ifLoading = false;
          this.pageNum = res.total;
        } else this.$Message.error(res.msg);
      })
      .catch( err => console.log( err ));
    }
  },
  created() {
    removeStore('employeeID');
    this.freshPage({ pageNo: 1, pageSize: 10 });
  }
};
</script>

<style lang="less" scoped></style>