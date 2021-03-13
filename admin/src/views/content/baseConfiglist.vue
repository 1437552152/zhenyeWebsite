<!--
 * @Description: 
 * @version: 
 * @Date: 2019-08-31 20:27:40
 * @LastEditors: yfye
 * @LastEditTime: 2021-03-14 00:41:07
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 -->
<template>
  <div>
    <div style="display:flex;justify-content:flex-end;margin: 30px 20px 10px 0;">
          <ButtonGroup>
            <Button type="primary" @click="reflash">刷新</Button>
           <!--  <Button type="primary" @click="add" style="float:right">增加</Button> -->
          </ButtonGroup>
      </div>
    <Row class="margin-top-10">
      <Table :columns="tableTitle" :data="tableData"></Table>
    </Row>
    <Row class="pageWrapper">
      <Page :total="total" :current="current" show-total :page-size="10" @on-change="changePage"></Page>
    </Row>
      <Modal v-model="modal3" footer-hide>
       <img :src="imgSrc" style="width:100%"/>
    </Modal>
  </div>
</template>
<script>

import { BASICURL, baseConfig, deleteWebsiteConfig } from '@/service/getData';
export default {
    name: 'baseConfiglist',
    data () {
        return {
            currentPageIdx: 1,
            current: 1,
            total: 1,
            imgSrc: '',
            modal3: false,
            tableTitle: [
                {
                    title: '公司名称',
                    key: 'webname'
                },             
                {
                    title: '法人',
                    key: 'legalPerson'             
                },
                 {
                    title: '审核状态',
                    key: 'isShow',
                    render(h, params) {
                        let text = "";
                        if (params.row.isShow == 0) {
                        text = "未审核";
                        } else if (params.row.isShow == 1) {
                        text = "通过";
                        }else if (params.row.isShow == 2) {
                        text = "未通过";
                        }
                        return h("div", text);
                    }            
                },
                {
                    title: '手机号',
                    key: 'mobile'                
                },

                {
                    title: '操作',
                    align: 'center',
                    width: 240,
                    key: 'introduceBriefly',
                    render: (h, params) => {
                      //  const id = params.row.configId;
                        const isShow = params.row.isShow;

                        return h('div', [
                                  h(
                                    "Button",
                                    {
                                    props: {
                                        type: "primary",
                                        size: "small",
                                        disabled:isShow==0?false:true
                                    },
                                    style: {
                                        marginRight: "20px"
                                    },
                                    class: {
                                    },
                                    on: {
                                        click: () => {
                                        this.godelete(params.row,1);
                                        }
                                    }
                                    },
                                    "通过"
                                ),
                               h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                         disabled:isShow==0?false:true
                                    },
                                    style: {
                                        marginRight: '20px'
                                    },
                                    class: {
                                        // disabled: authStatus === 0 ? false : true
                                    },
                                    on: {
                                        click: () => {
                                        this.godelete(params.row,2);
                                        }
                                    }
                                },
                                '驳回'
                            )
                        ])
                    }
                }
            ],
            tableData: []
        };
    },
    methods: {
        reflash () {
            this.$Spin.show({
                render: h => {
                    return h('div', [
                        h('Icon', {
                            class: 'demo-spin-icon-load',
                            props: {
                                type: 'ios-loading',
                                size: 18
                            }
                        }),
                        h('div', 'Loading')
                    ]);
                }
            });
            this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        },
        add () {
            this.$router.push({
                path: '/websiteConfig',
                query: { id: -1 }
            });
        },
        changePage (pageIndex) {
            this.currentPageIdx = pageIndex;
            let obj = {
                pageNo: pageIndex,
                pageSize: 10
            };
            this.getData(obj);
        },
        getData (obj) {
            baseConfig(obj).then(res => {
                this.tableData = res.data;
                this.total = res.total;
                this.current = res.currentPage;
                this.$Spin.hide();
            });
        },
        godelete (params,index) {

            deleteWebsiteConfig(Object.assign(params,{isShow:index})).then(res => {
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
    created () {
        this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
    }
};
</script>
<style lang="less" scoped>
.clearfix {
  clear: both;
}
</style>
