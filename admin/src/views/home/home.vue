<!--
 * @Description: 
 * @version: 
 * @Date: 2019-08-20 00:29:22
 * @LastEditors: yfye
 * @LastEditTime: 2021-04-11 18:50:23
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 -->
<template>
	<div class="home">
	<h5>管理系统</h5>
    <div style="text-align:center;margin-top:50px"><img src="../../styles/admin.png"></div>
	<!--  <div class="chartStyle" ref="chart"></div> -->
    <div id="container"></div>
	</div>
</template>

<script>
export default {
    data () {
        return {};
    },
    methods: {
        initCharts (res) {
            let arr = [];
            let arr1 = [];
            res.map((item, index) => {
                arr.push(item.address);
                arr1.push(item.num);
            });
            let myChart = this.$echarts.init(this.$refs.chart);
            myChart.setOption({
                color: ['#9BBB59'],
                title: {
                    textStyle: {
                        color: '#000',
                        fontWeight: '600'
                    },
                    text: '访客记录(次)',
                    x: '100'// 设置标题的偏移
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: '访问次数 : <br/>{b} : {c}'
                },
                toolbox: {
                    show: true,
                    x: '800',
                    feature: {
                        dataView: {show: false, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                xAxis: {
                    data: arr
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        data: arr1
                    }
                ]
            });
        },
        getData () {
        }
    },
    mounted () {
     /*    this.getData(); */
    }
};
</script>
<style lang="less" scoped>
h5 {
  font-size: 40px;
  color: #2d8cf0;
  text-align: center;
  margin-top: 50px;
}
.chartStyle{
	width:1000px;
	height:500px;
	margin: 50px auto;
	margin-top: 100px;
}
</style>
