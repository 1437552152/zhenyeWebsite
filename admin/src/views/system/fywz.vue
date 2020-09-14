<!--
 * @Description: 
 * @version: 
 * @Date: 2019-08-20 00:29:21
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-10-07 21:56:47
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 -->
<template>
  <div>
     <Tabs value="name1">
        <TabPane label="供应商列表" name="name1">
           <Button type="primary" size="small" @click="exportService">导出</Button>
            <Row class="margin-top-10">
            <Table :columns="tableTitle" :data="tableData"></Table>
            </Row>
    <Row class="pageWrapper">
      <Page :total="total" :current="current" show-total :page-size="10" @on-change="changePage"></Page>
    </Row>
        </TabPane>
        <TabPane label="采购商列表" name="name2">
        <Button type="primary" size="small" @click="exportService1">导出</Button>
                    <Row class="margin-top-10">
                    <Table :columns="tableTitle1" :data="tableData1"></Table>
                    </Row>
            <Row class="pageWrapper">
            <Page :total="total1" :current="current1" show-total :page-size="10" @on-change="changePage1"></Page>
            </Row>
        </TabPane>
    </Tabs>
  </div>  
</template>
<script>
import { getWuGYTable, getWuCGTable, getWuGYExportExcel, getWuCGExportExcel, deleteGyConfig, deleteCGConfig } from '@/service/getData';
export default {
    name: 'team',
    data () {
        return {
            currentPageIdx: 1,
            current: 1,
            total: 1,
            currentPageIdx1: 1,
            current1: 1,
            total1: 1,
            tableTitle: [
                {
                    title: '身份类型',
                    key: 'type'
                },

                {
                    title: '公司',
                    key: 'company'
                },
                {
                    title: '住址',
                    key: 'detailaddress'
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '联系方式',
                    key: 'phone'
                },
                {
                    title: '生产机型与台数',
                    key: 'jixieDec'
                },

                {
                    title: '库存量（标明过滤率）',
                    key: 'totalText'
                },

                {
                    title: '建议与帮助',
                    key: 'remark'
                },
                {
                    title: '是否接受回访',
                    key: 'isNeedBrief'
                },
                {
                    title: '创建时间',
                    key: 'time'
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 240,
                    key: 'introduceBriefly',
                    render: (h, params) => {
                        const id = params.row.id;
                        return h('div', [
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '20px'
                                    },
                                    class: {
                                    },
                                    on: {
                                        click: () => {
                                            this.godelete(id);
                                        }
                                    }
                                },
                                '删除'
                            )
                        ]);
                    }
                }
            ],
            tableTitle1: [
                {
                    title: '身份类型',
                    key: 'type'
                },

                {
                    title: '公司',
                    key: 'company'
                },
                {
                    title: '住址',
                    key: 'detailaddress'
                },
                {
                    title: '姓名',
                    key: 'name'
                },

                {
                    title: '联系方式',
                    key: 'phone'
                },

                {
                    title: '需求产品',
                    key: 'totalText'
                },
                {
                    title: '建议与帮助',
                    key: 'remark'
                },
                {
                    title: '是否接受回访',
                    key: 'isNeedBrief'
                },
                {
                    title: '创建时间',
                    key: 'time'
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 240,
                    key: 'introduceBriefly',
                    render: (h, params) => {
                        const id = params.row.id;
                        return h('div', [
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '20px'
                                    },
                                    class: {
                                    },
                                    on: {
                                        click: () => {
                                            this.godelete1(id);
                                        }
                                    }
                                },
                                '删除'
                            )
                        ]);
                    }
                }
            ],
            tableData: [],
            tableData1: []
        };
    },
    methods: {
        changePage (pageIndex) {
            this.currentPageIdx = pageIndex;
            let obj = {
                pageNo: pageIndex,
                pageSize: 10
            };
            this.getData(obj);
        },
        changePage1 (pageIndex) {
            this.currentPageIdx1 = pageIndex;
            let obj = {
                pageNo: pageIndex,
                pageSize: 10
            };
            this.getData1(obj);
        },
        getData (obj) {
            getWuGYTable(obj).then(res => {
                this.tableData = res.data;
                this.total = res.total;
                this.current = res.currentPage;
            });
        },
        getData1 (obj) {
            getWuCGTable(obj).then(res => {
                this.tableData1 = res.data;
                this.total1 = res.total;
                this.current1 = res.currentPage;
            });
        },

        /* 导出功能 */
        exportService () {
            let obj = {};
            getWuGYExportExcel(obj).then(response => {});
        },
        exportService1 () {
            let obj = {};
            getWuCGExportExcel(obj).then(response => {});
        },
        godelete (id) {
            deleteGyConfig({ id: id }).then(res => {
                if (res.status == 200) {
                    this.$Message.success(res.msg);
                    this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
                } else {
                    this.$Message.error(res.msg);
                    this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
                }
            });
        },
        godelete1 (id) {
            deleteCGConfig({ id: id }).then(res => {
                if (res.status == 200) {
                    this.$Message.success(res.msg);
                    this.getData1({ pageNo: this.currentPageIdx1, pageSize: 10 });
                } else {
                    this.$Message.error(res.msg);
                    this.getData1({ pageNo: this.currentPageIdx1, pageSize: 10 });
                }
            });
        }
    },
    created () {
        this.getData({ pageNo: this.currentPageIdx, pageSize: 10 });
        this.getData1({pageNo: this.currentPageIdx1, pageSize: 10});
    }
};
</script>
<style lang="less" scoped>
.clearfix {
  clear: both;
}
</style>
