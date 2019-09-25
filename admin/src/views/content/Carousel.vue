<!--
 * @Description: 
 * @version: 
 * @Company: 烽火通信
 * @Author: yeyifu
 * @Date: 2019-08-31 10:48:30
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-09-25 00:36:32
 -->
<template>
    <div>
      <div style="display:flex;justify-content:flex-end;margin: 30px 20px 10px 0;">
          <ButtonGroup>
            <Button type="primary" @click="reflash">刷新</Button>
            <Button type="primary" @click="add" style="float:right">增加</Button>
          </ButtonGroup>
      </div>
 
       <Modal v-model="addModal" title="添加轮播图"  draggable   :footer-hide=true>
           <Form :model="formItem" :label-width="100">                           
            <FormItem label="图片标题">
               <Input v-model="formItem.title" placeholder="请填写图片标题..."/>
            </FormItem>
             <FormItem label="图片跳转链接">
               <Input  v-model="formItem.href" placeholder="请填写图片跳转链接..."/><span style="color:red">注：链接地址前须加https或http,不跳转时填#号</span>
            </FormItem>
             <FormItem label="语言类型" prop="lang">
                <Select v-model="formItem.lang"  @on-clear="clearValue" :clearable="true" :label="formItem.lang">
                  <Option :value="item.id" v-for="item in langData" :key="item.id">{{item.title}}</Option>
                </Select>
              </FormItem>
             <FormItem label="图片排序">
                <Input  v-model="formItem.orderBy"/>
            </FormItem>
          <FormItem label="上传图片" prop="img">
            <div class="acc_sc">
                <img  id="aliImg" :src="img" style="width:380px;height:100px;">
                  <div style="color:red">注:建议上传图片大小1920*500,大小在5兆以内</div>           
                <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess"  :action="uploadUrl" enctype="multipart/form-data">
                  <Button type="primary"   icon="ios-cloud-upload-outline" style="opacity: 0;width: 380px;height:100px;margin-top: -200px;">上传图片</Button>
                </Upload>  
            </div> 
             </FormItem>                     
        </Form>
        <div style="display:flex;justify-content:flex-end">
          <Button type="ghost" @click="cancel" style="margin-right:10px">取消</Button>
          <Button type="primary" @click="ok">确定</Button>
        </div> 
    </Modal>
     <Modal v-model="UPModal" title="修改轮播图" draggable  :footer-hide=true>
          <Form :model="formItem" :label-width="100">                           
            <FormItem label="图片标题">
               <Input v-model="formItem.title" placeholder="请填写图片标题..."/>
            </FormItem>
             <FormItem label="图片跳转链接">
               <Input  v-model="formItem.href" placeholder="请填写图片跳转链接..."/><span style="color:red">注：链接地址前须加https或http,不跳转时填#号</span>
            </FormItem>

              <FormItem label="语言类型" prop="lang">
                <Select v-model="formItem.lang" @on-clear="clearValue" :clearable="true" :label="formItem.lang"> 
                  <Option :value="item.id" v-for="item in langData" :key="item.id">{{item.title}}</Option>
                </Select>
              </FormItem>

             <FormItem label="图片排序">
                <Input  v-model="formItem.orderBy"/>
            </FormItem>
          <FormItem label="上传图片" prop="img">
            <div class="acc_sc">
                <img  id="aliImg" :src="img" style="width: 200px;height:170px;">
                 <div style="color:red">注:建议上传图片大小1920*500,大小在5兆以内</div>           
                <Upload ref="upload"  name="picUrl" :show-upload-list="false"  :on-success="aliHandleSuccess"  :action="uploadUrl" enctype="multipart/form-data">
                  <Button type="primary"   icon="ios-cloud-upload-outline" style="opacity: 0;width:380px;height: 100px;margin-top: -200px;">上传图片</Button>
                </Upload>             
            </div> 
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
 carouselConfigdelete,
  carouselConfiglist,
  BASICURL,
  carouselConfigUpdate,
  carouselConfigdetail,
  carouselConfigadd,
  langConfiglist
} from "@/service/getData";
export default {
  name: "Carousel",
  data() {
    return {
      currentPageIdx: 1,
      current: 1,
      total: 1,
      id: 0,
      addModal: false,
      UPModal: false,
      uploadUrl: BASICURL + "admin/upload",
      img:require("../../images/talkingdata.png"),  
      formItem: {
        title: "",
        orderBy: "",
        href:'',
        lang:''
      },
      tableTitle: [
         {
          title: "标题",
          key: "title",
          align:"center"
        },
        {
          title: "banner",
          key: "img",
          align:"center",
          render: (h, params) => {
            const pic = params.row.img;
            let text = "";
            return h("div", [
              h("img", {
                attrs: {
                  src: pic
                },
                style: {
                  width: "200px"
                /*   height: "70px" */
                }
              }),
              h("span", {}, text)
            ]);
          }
        },
        {
          title: "跳转链接",
          key: "href",
          align:"center"
        },
         {
          title: "排序",
          key: "orderBy",
          align:"center"
        },
         {
          title: "创建时间",
          key: "time",
          align:"center"
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
      tableData: [],
      langData: []
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
      this.img =require("../../images/talkingdata.png");
      this.formItem.title = "";
      this.formItem.href = "";
       this.formItem.orderBy = "";
    },
    clearValue(){
      this.formItem.lang=''
    },
    // 点击确定时
    ok() {
      let params = [];
      params["img"] = this.img||"";
      params["title"] = this.formItem.title;
      params["href"] = this.formItem.href;
      params["lang"] = this.formItem.lang;
      params["orderBy"] = this.formItem.orderBy;
      if(this.img==require("../../images/talkingdata.png")||this.formItem.title==''||this.formItem.href==''||this.formItem.lang==''||this.formItem.orderBy==''){
        this.$Message.error("请填写所有表单数据");
        return false;
      }   
      carouselConfigadd(params).then(res => {
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
      params["img"] = this.img || "";
      params["title"] = this.formItem.title;
      params["href"] = this.formItem.href;
      params["orderBy"] = this.formItem.orderBy;
        params["lang"] = this.formItem.lang;
      params["id"] = this.id;
       
      if(this.img==require("../../images/talkingdata.png")||this.formItem.title==''||this.formItem.href==''||this.formItem.lang==''||this.formItem.orderBy==''){
        this.$Message.error("请填写所有表单数据");
        return false;
      }
      
      carouselConfigUpdate(params).then(res => {
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
      carouselConfiglist(obj).then(res => {
        this.tableData = res.data;
        this.total = res.total;
        this.current = res.currentPage;
        this.$Spin.hide();
      });
    },
    godelete(id) {
      carouselConfigdelete({ id: id }).then(res => {
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
      carouselConfigdetail({ id: id }).then(res => {
        this.img = res.data[0].img;
        this.formItem.title = res.data[0].title;
        this.formItem.orderBy = res.data[0].orderBy;
        this.formItem.href = res.data[0].href;    
        this.formItem.lang =Number(res.data[0].lang);      
      });
    },
    goupdate(id) {
      this.UPModal = true;
      this.carouselConfigIdShow(id);
    },
    getLangData() {
      langConfiglist({
        pageNo: 1,
        pageSize: 10
      }).then(res => {
        this.langData = res.data;
      });
    }
  },
  created() {
    this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
    this.getLangData();
  }
};
</script>
<style lang="less" scoped>
</style>
