webpackJsonp([9],{805:function(e,t,r){"use strict";function a(e){i||r(873)}Object.defineProperty(t,"__esModule",{value:!0});var o=r(875),n=r.n(o),s=r(876),l=r.n(s),i=!1,d=r(19),c=a,u=d(n.a,l.a,!1,c,"data-v-012cdff4",null);u.options.__file="src\\views\\html\\system\\role.vue",u.esModule&&Object.keys(u.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),t.default=u.exports},873:function(e,t,r){var a=r(874);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(48)("3e6277d4",a,!1)},874:function(e,t,r){t=e.exports=r(47)(void 0),t.push([e.i,'\n.permissionWrapper[data-v-012cdff4] {\n  position: absolute;\n  z-index: 10;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.2);\n}\n.permissionWrapper p[data-v-012cdff4] {\n  position: absolute;\n  top: 50%;\n  left: 45%;\n  transform: -50%;\n  font-size: 25px;\n  font-style: "\\9ED1\\4F53";\n  text-align: center;\n  color: #fff;\n}\n',""])},875:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=r(291),n=a(o),s=r(289),l=a(s),i=r(87),d=a(i),c=r(172);r(117);t.default={data:function(){var e=this;return{pageNum:null,currentPageIdx:1,permissionWrapper:!1,ifLoading:!0,deleteRoleArr:[],delRole:!1,deleteRoleID:null,fixedRolePermission:[],submitArr:[],allPermission:[{title:"全部权限",expand:!0,selected:!0,children:[]}],updateIds:null,roleId:null,showAddRole:!1,showForm:!1,formValidate:{roleName:null,remark:null},ruleValidate:{roleName:[{required:!0,message:"角色名称不能为空!",trigger:"blur"}]},column_list:[{title:"ID",key:"roleId",width:80},{title:"角色名称",key:"roleName"},{title:"备注",key:"remark"},{title:"操作",render:function(t,r){var a=r.row;return t("div",[t("Button",{props:{type:"info",size:"small"},style:{marginRight:"5px"},on:{click:function(){e.formValidate.remark=a.remark,e.formValidate.roleName=a.roleName,e.obj=a;var t=JSON.parse((0,d.default)(e.allPermission)),r=JSON.parse(a.rolePermissions);r&&r.length>0&&"string"!=typeof r&&r.map(function(e,r){t&&t[0].children.length>0&&t[0].children.map(function(t,r){t.menuId==e&&(t.checked=!0),t&&t.children&&t.children.length>0&&t.children.map(function(t,r){t.menuId==e&&(t.checked=!0)})})}),e.permissions=t,e.showForm=!0,e.updateIds=null}}},"修改"),t("Button",{props:{type:"error",size:"small"},on:{click:function(){e.deleteRoleID=r.row.roleId,e.delRoleBtn()}}},"删除")])}}],permissions:[],userpage:[],obj:null}},methods:{changePage:function(e){this.currentPageIdx=e,this.refreshPage({pageNo:e,pageSize:10})},deleteRole:function(){var e=this;(0,c.deleteRole)({roleId:this.deleteRoleID}).then(function(t){200==t.status?(e.$Message.success("删除成功！"),e.refreshPage()):e.$Message.error(t.msg)})},delRoleBtn:function(){this.delRole=!0},addRoleBtn:function(){this.showAddRole=!0,this.formValidate.roleName="",this.formValidate.remark=""},addRoleTree:function(e){this.submitArr=[];var t=[];e&&e.length>0&&e.map(function(e,r){e.menuId&&(t.push(e.menuId),e.children&&e.children.length>0&&e.children.map(function(e,r){t.push(e.menuId)}))}),this.submitArr=(0,l.default)(new n.default(t))},addRole:function(){var e=this;if(""!==this.formValidate.roleName&&this.formValidate.roleName){alert(this.submitArr.length),console.log(this.submitArr);var t={roleName:this.formValidate.roleName,remark:this.formValidate.remark,permissions:0===this.submitArr.length?[]:this.submitArr};(0,c.useRoleadd)(t).then(function(t){t.code?e.$Message.error(t.message):(e.$Message.success("操作成功！"),e.refreshPage())}).catch(function(e){console.log(e)})}else this.$Message.warning("角色名称不能为空！")},fixTreeArray:function(e){console.log("val==>",e);var t=[];0===e.length?this.updateIds=t:(e.map(function(e,r){t.push(e.menuId)}),this.updateIds=t)},confirmChange:function(){var e=this;if(""===this.formValidate.roleName)return this.$Message.error("角色名不能为空"),!1;if(""===this.formValidate.remark)return this.$Message.error("备注不能为空"),!1;var t={roleName:this.formValidate.roleName,remark:this.formValidate.remark,permissions:null===this.updateIds?this.obj.rolePermissions:this.updateIds,roleId:this.obj.roleId};(0,c.useRoleUpdate)(t).then(function(t){"200"===t.status?(e.refreshPage(),e.$Message.success(t.msg)):e.$Message.error(t.msg)})},cancelChange:function(){this.$Message.info("已取消修改！")},refreshPageManual:function(){this.refreshPage()},refreshPage:function(e){var t=this;this.ifLoading=!0,(0,c.roleManage)(e).then(function(e){e.code?t.$Message.error(e.msg):(t.userpage=e.data,t.ifLoading=!1)},function(e){console.log(e)})},getAllPessions:function(){var e=this;(0,c.getAllPessions)().then(function(t){console.log(t),t.data.permissions.map(function(e,t){e.title=e.name,e.expand=!0,e.children=e.submenus,e.submenus.map(function(e,t){e.title=e.name})}),e.allPermission[0].children=t.data.permissions},function(e){console.log(e)})}},created:function(){this.refreshPage({pageNo:1,pageSize:10}),this.getAllPessions()}}},876:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("Card",[r("p",{attrs:{slot:"title"},slot:"title"},[e._v("\n        角色列表\n          "),r("Button",{attrs:{type:"primary",size:"small"},on:{click:e.refreshPageManual}},[r("Icon",{attrs:{type:"refresh"}}),e._v("\n            刷新\n          ")],1)],1),e._v(" "),r("Row",{staticClass:"functionWrapper"},[r("div",{staticClass:"btnsWrapper clearfix"},[r("Button",{attrs:{type:"primary"},on:{click:e.addRoleBtn}},[e._v("添加角色")])],1)]),e._v(" "),r("Modal",{attrs:{title:"删除角色"},on:{"on-ok":e.deleteRole,"on-cancel":function(t){e.$Message.info("已取消！")}},model:{value:e.delRole,callback:function(t){e.delRole=t},expression:"delRole"}},[r("p",[e._v("是否删除该角色?")])]),e._v(" "),r("Modal",{attrs:{title:"添加角色"},on:{"on-ok":e.addRole},model:{value:e.showAddRole,callback:function(t){e.showAddRole=t},expression:"showAddRole"}},[r("Form",{attrs:{"label-position":"right",model:e.formValidate,"label-width":100,rules:e.ruleValidate}},[r("FormItem",{attrs:{label:"角色名称：",prop:"roleName"}},[r("Input",{model:{value:e.formValidate.roleName,callback:function(t){e.$set(e.formValidate,"roleName",t)},expression:"formValidate.roleName"}})],1),e._v(" "),r("FormItem",{attrs:{label:"角色描述：",prop:"remark"}},[r("Input",{attrs:{type:"textarea"},model:{value:e.formValidate.remark,callback:function(t){e.$set(e.formValidate,"remark",t)},expression:"formValidate.remark"}})],1)],1),e._v(" "),r("br"),e._v(" "),r("Tree",{attrs:{data:e.allPermission,"show-checkbox":""},on:{"on-check-change":e.addRoleTree}})],1),e._v(" "),r("Row",[r("Table",{attrs:{columns:e.column_list,data:e.userpage,loading:e.ifLoading,border:""}})],1),e._v(" "),r("Modal",{attrs:{title:"修改权限","mask-closable":!1},on:{"on-ok":e.confirmChange,"on-cancel":e.cancelChange},model:{value:e.showForm,callback:function(t){e.showForm=t},expression:"showForm"}},[r("Form",[r("FormItem",{attrs:{label:"角色名称：",prop:"roleName"}},[r("Input",{model:{value:e.formValidate.roleName,callback:function(t){e.$set(e.formValidate,"roleName",t)},expression:"formValidate.roleName"}})],1),e._v(" "),r("FormItem",{attrs:{label:"角色描述：",prop:"remark"}},[r("Input",{attrs:{type:"textarea"},model:{value:e.formValidate.remark,callback:function(t){e.$set(e.formValidate,"remark",t)},expression:"formValidate.remark"}})],1)],1),e._v(" "),r("Tree",{attrs:{data:e.permissions,"show-checkbox":""},on:{"on-check-change":e.fixTreeArray}})],1),e._v(" "),r("Row",{staticClass:"pageWrapper"},[r("Page",{staticClass:"buttomPage",attrs:{total:e.pageNum,current:e.currentPageIdx,"show-elevator":""},on:{"on-change":e.changePage}})],1)],1)],1)},o=[];a._withStripped=!0;var n={render:a,staticRenderFns:o};t.default=n}});