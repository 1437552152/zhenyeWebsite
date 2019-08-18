<!--
 * @Description: 
 * @version: 
 * @Date: 2019-07-31 19:53:24
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-08-19 00:56:38
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 -->
<template>
    <div >
      <Card>
        <p slot="title">
        角色列表
          <Button type="primary" size="small" @click="refreshPageManual">
            <Icon type="refresh"></Icon>
            刷新
          </Button>
        </p>

        <Row class="functionWrapper">
          <div class="btnsWrapper clearfix">
           <Button type="primary" @click="addRoleBtn">添加角色</Button>
          </div>
        </Row>

        <Modal
          v-model="delRole"
          title="删除角色"
          @on-ok="deleteRole"
          @on-cancel="$Message.info('已取消！')">
          <p>是否删除该角色?</p>
      
        </Modal>

        <Modal
          v-model="showAddRole"
          title="添加角色"
          @on-ok="addRole">
          <Form label-position="right" :model="formValidate" :label-width="100" :rules="ruleValidate"> 
            <FormItem label="角色名称：" prop="roleName">
              <Input v-model="formValidate.roleName"/>
            </FormItem>

            <FormItem label="角色描述：" prop="remark">
              <Input type="textarea" v-model="formValidate.remark"/>
            </FormItem>

          </Form>
          <br>
          <Tree :data="allPermission" show-checkbox @on-check-change="addRoleTree"></Tree>
        </Modal>
        <Row >
          <Table 
          :columns="column_list" 
          :data="userpage"
          :loading="ifLoading" 
          border>
          </Table>
        </Row>
        <Modal
            v-model="showForm"
            title="修改权限"
            @on-ok="confirmChange"
            @on-cancel="cancelChange" :mask-closable=false>
            <Form>
              <FormItem label="角色描述：">
                <Input type="textarea" v-model="formValidate.roleDscrp"> </Input>
              </FormItem>
            </Form>
            <Tree :data="permissions"  show-checkbox @on-check-change="fixTreeArray"></Tree>
        </Modal>
				<Row class="pageWrapper">
          <Page :total="pageNum" 
                class="buttomPage"
                @on-change="changePage"
								:current="currentPageIdx"
                show-elevator></Page>
        </Row>
      </Card>
    </div>
</template>

<script>
import {
  roleManage,
  useRoleadd,
  queryRolePermission,
  addAuditRole,
  getAllPermission,
  deleteRole,
  getAllPessions
} from "@/service/getData";
import { setStore, getStore, removeStore } from "@/config/storage";

export default {
  data() {
    return {
      pageNum: null,
      currentPageIdx: 1,
      permissionWrapper: false,
      ifLoading: true,
      deleteRoleArr: [],
      delRole: false,
      deleteRoleID: null,
      fixedRolePermission: [],
      submitArr: [],
      allPermission: [
        {
          title: "全部权限",
          expand: true,
          selected: true,
          children: []
        }
      ],
      roleId: null,
      showAddRole: false,
      showForm: false,
      formValidate: {
        roleName: null,
        remark: null
      },
      ruleValidate: {
        roleName: [
          { required: true, message: "角色名称不能为空!", trigger: "blur" }
        ]
      },
      column_list: [
        {
          title: "ID",
          key: "roleId",
          width: 80
        },
        {
          title: "角色名称",
          key: "roleName"
        },
        {
          title: "备注",
          key: "remark"
        },
        {
          title: "操作",
          render: (h, obj) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.deleteRoleID = obj.row.roleId;
                      this.delRoleBtn();
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      permissions: [],
      userpage: []
    };
  },

  methods: {
    changePage(pageIndex) {
      this.currentPageIdx = pageIndex;
      this.refreshPage({ pageNo: pageIndex, pageSize: 10 });
    },
    deleteRole() {
      deleteRole({ roleId: this.deleteRoleID }).then(res => {
        if (res.status == 200) {
          this.$Message.success("删除成功！");
          this.refreshPage();
        } else this.$Message.error(res.msg);
      });
    },
    delRoleBtn() {
      this.delRole = true;
    },
    addRoleBtn() {
      this.showAddRole = true;
    },
    addRoleTree(val) {
      /* submitArr */
      this.submitArr=[];
      let submitIds = [];
      if (val && val.length > 0) {
        val.map((item, index) => {
          if (item.menuId) {
            submitIds.push(item.menuId);
            if (item.children && item.children.length > 0) {
              item.children.map((list,indexbak)=>{
                 submitIds.push(list.menuId);
              })
            }
          }
        });
      }
      this.submitArr=Array.from(new Set(submitIds))
    },
    addRole() {
      if (this.formValidate.roleName === "" || !this.formValidate.roleName) {
        this.$Message.warning("角色名称不能为空！");
      } else {
        let obj = {
          roleName: this.formValidate.roleName,
          remark: this.formValidate.remark,
          permissions: this.submitArr
        };

        useRoleadd(obj)
          .then(res => {
            if (!res.code) {
              this.$Message.success("操作成功！");
              this.refreshPage();
            } else this.$Message.error(res.message);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    fixTreeArray(val) {
      console.log("val==>", val);
    },
    confirmChange() {
      if (!this.fixedRolePermission.length) {
        this.$Message.success("角色权限修改成功！");
        this.refreshPage();
        return false;
      }
      this.permissionWrapper = true;
      let obj = {
        id: this.roleId,
        role: this.formValidate.name,
        description: this.formValidate.roleDscrp,
        permissions: this.fixedRolePermission
      };
      addAuditRole(obj).then(res => {
        if (!res.code) {
          this.$Message.success("角色权限修改成功！");
          this.refreshPage();
        } else {
          this.$Message.error("角色权限修改失败！");
        }
        this.permissionWrapper = false;
      });
    },
    cancelChange() {
      this.$Message.info("已取消修改！");
    },
    refreshPageManual() {
      this.refreshPage();
    },
    refreshPage(obj) {
      this.ifLoading = true;
      roleManage(obj).then(
        res => {
          if (!res.code) {
            this.userpage = res.data;
            this.ifLoading = false;
          } else this.$Message.error(res.msg);
        },
        err => {
          console.log(err);
        }
      );
    },
    getAllPessions() {
      getAllPessions().then(
        res => {
          console.log(res);
          res.data.permissions.map((item, index) => {
            item.title = item.name;
            item.expand = true;
            item.children = item.submenus;
            item.submenus.map((list, index) => {
              list.title = list.name;
            });
          });
          this.allPermission[0].children = res.data.permissions;
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {
    this.refreshPage({ pageNo: 1, pageSize: 10 });
    this.getAllPessions();
  }
};
</script>

<style lang="less" scoped>
.permissionWrapper {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  p {
    position: absolute;
    top: 50%;
    left: 45%;
    transform: -50%;
    font-size: 25px;
    font-style: "黑体";
    text-align: center;
    color: #fff;
  }
}
</style>