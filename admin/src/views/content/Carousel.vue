<!--
 * @Description: 
 * @version: 
 * @Company: 烽火通信
 * @Author: yeyifu
 * @Date: 2019-08-31 10:48:30
 * @LastEditors: yfye
 * @LastEditTime: 2021-03-22 20:16:56
 -->
<template>
    <div>
      <div style="display:flex;justify-content:flex-end;margin: 30px 20px 10px 0;">
          <ButtonGroup>
            <Button type="primary" @click="reflash">刷新</Button>
            <Button type="primary" @click="add" style="float:right">增加</Button>
          </ButtonGroup>
      </div>
 
       <Modal v-model="addModal" title="添加岗位"  draggable   :footer-hide=true>
           <Form :model="formItem" :label-width="100" ref='form'>                           
            <FormItem label="职位标题">
               <Input v-model="formItem.title" placeholder="请填写职位标题..."/>
            </FormItem>  
            <FormItem label="薪资范围">
                <Input  v-model="formItem.rangee"/>
            </FormItem>

            <FormItem label="职位类型">
                <Select v-model="formItem.jobCate">
                <Option :value="item.id" v-for="item in TableList" :key="item.id">{{item.title}}</Option>
              </Select>
             </FormItem>
 
             <FormItem label="学历要求">
                <Input  v-model="formItem.EduRequir"/>
            </FormItem>
            <FormItem label="工作年限">
                <Input  v-model="formItem.workingYears"/>
            </FormItem>
             <FormItem label="工作区域">
                <Input  v-model="formItem.workingArea"/>
            </FormItem>
            <FormItem label="岗位要求">
                <Input  v-model="formItem.content"  type="textarea" :rows="6"/>
            </FormItem>  
             <FormItem label="岗位职责">
                <Input  v-model="formItem.jobDuty"  type="textarea" :rows="6"/>
            </FormItem>     
                            
        </Form>
        <div style="display:flex;justify-content:flex-end">
          <Button type="ghost" @click="cancel" style="margin-right:10px">取消</Button>
          <Button type="primary" @click="ok">确定</Button>
        </div> 
    </Modal>
     <Modal v-model="UPModal" title="修改职位" draggable  :footer-hide=true ref='form'>
          <Form :model="formItem" :label-width="100">                           
            <FormItem label="职位标题">
               <Input v-model="formItem.title" placeholder="请填写职位标题..."/>
            </FormItem>           
            <FormItem label="薪资范围">
                <Input  v-model="formItem.rangee"/>
            </FormItem>
           <FormItem label="职位类型">
                <Select v-model="formItem.jobCate">
                <Option :value="item.id" v-for="item in TableList" :key="item.id">{{item.title}}</Option>
              </Select>
             </FormItem>
             <FormItem label="学历要求">
                <Input  v-model="formItem.EduRequir"/>
            </FormItem>
            <FormItem label="工作年限">
                <Input  v-model="formItem.workingYears"/>
            </FormItem>
             <FormItem label="工作区域">
                <Input  v-model="formItem.workingArea"/>
            </FormItem>
           <FormItem label="岗位要求">
                <Input  v-model="formItem.content"  type="textarea" :rows="6"/>
            </FormItem>    
             <FormItem label="岗位职责">
                <Input  v-model="formItem.jobDuty"  type="textarea" :rows="6"/>
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
  langConfiglist,
 CateConfiglist,
} from "@/service/getData";
export default {
  name: "Carousel",
  data() {
    return {
      currentPageIdx: 1,
      current: 1,
      total: 1,
      id: 0,
      modal3: false,
      addModal: false,
      UPModal: false,
      formItem: {
        title: "",
        rangee:'',
        EduRequir:'',
        workingYears:'',
        workingArea:'',
        content:'',
        jobDuty:'',
        jobCate:''
      },
      TableList:[],
      tableTitle: [
         {
          title: "标题",
          key: "title",
          align:"center"
        },
         {
          title: "职位分类",
          key: "jobTitle",
          align:"center"
        },
         {
          title: "创建时间",
          key: "time",
          align:"center"
        },

         {
          title: "薪资范围",
          key: "rangee",
          align:"center"
        },
         {
          title: "学历要求",
          key: "EduRequir",
          align:"center"
        },
         {
          title: "工作年限",
          key: "workingYears",
          align:"center"
        },
        {
          title: "工作区域",
          key: "workingArea",
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
       this.formItem={};
    },
    // 点击确定时
    ok() {
      let jobTitle='';
      this.TableList.map(item=>{
        if(item.id==this.formItem.jobCate){
          jobTitle=item.title
        }
      })      
      this.formItem.jobTitle=jobTitle;
      carouselConfigadd(this.formItem).then(res => {
        if (res.status == 200) {
          this.$Message.success("增加成功");
          this.addModal=false;
           this.formItem={};
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        } else {
          this.$Message.error("增加失败");
          this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        }
      });
    },
    okUP() {  
            let jobTitle='';
      this.TableList.map(item=>{
        if(item.id==this.formItem.jobCate){
          jobTitle=item.title
        }
      })      
      this.formItem.jobTitle=jobTitle;
      carouselConfigUpdate(this.formItem).then(res => {
        console.log(res);
        if (res.status == 200) {
          this.$Message.success("修改成功");
           this.UPModal=false;
           this.formItem={};
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
      this.formItem={};
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
         this.formItem = res.data[0];
      });
    },
    goupdate(id) {
      this.UPModal = true;
      this.carouselConfigIdShow(id);
    },
    getCateData(obj) {
      CateConfiglist(obj).then(res => {
        this.TableList = res.data;
      });
    },
  },
  created() {
    this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
     this.getCateData({ pageNo: this.currentPageIdx, pageSize: 100 });
  }
};
</script>
<style lang="less" scoped>
</style>
