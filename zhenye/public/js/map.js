/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-31 20:27:40
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-10-14 21:11:17
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
$(function(){
	var mapChart = echarts.init(document.getElementById('map')) //获取装载数据表的容器
function randomData() {
    return Math.round(Math.random() * 300);
}

var geoCoordMap = {
    '美国': [-100.68591,40.619994], //纽约
    '印度': [78.997375,20.614526],
    '中国': [117.27541,31.842039], //安徽合肥
    '荷兰': [5.194105,52.114761], //阿富汗
    '俄罗斯': [105.311857,61.531782], //安哥拉
    '法国': [2.254568,46.25177], //阿尔巴尼亚
    '伊拉克': [43.646521,33.233097], //阿根廷-科尔多瓦
    '玻利维亚': [-63.585778,-16.273217], //阿拉伯联合酋长国-阿布扎比
    "沙特阿拉伯": [45.101009,23.91898], //奥地利-维也纳
    "比利时": [4.342799, 50.85052], //比利时
    '土耳其': [35.243322,38.972946], //贝宁-波多诺伏
    '韩国': [127.727828,35.936985], //布基纳法索-瓦加杜古
    '摩洛哥': [-7.09492,31.805205], //孟加拉人民共和国 - 达卡
    "马拉西亚": [102.002212,4.196918], //保加利亚-索非亚
    '尼日利亚': [8.711497,9.063997], //尼日利亚-拿骚
    '英国': [28.028703,53.698039], //白俄罗斯-明克斯
    '阿联酋': [53.856442,23.411077], //中美洲国家阿联酋-贝尔莫潘
    '伊朗': [53.670799,32.424251], //伊朗-哈密尔顿
    '玻利维亚': [-78.332036, 22.082519], //玻利维亚-哈密尔顿
    '巴西': [-47.888777, -15.791724], //巴西-巴西利亚
    '澳大利亚': [137.708144, -25.328065],
};
var BJData = [
    [{
        name: '美国',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '印度',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '荷兰',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '俄罗斯',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '法国',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '伊拉克',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '玻利维亚',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '沙特阿拉伯',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '比利时',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '土耳其',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '韩国',
        value: randomData(),
    }, {
        name: '中国'
    }],
    [{
        name: '摩洛哥',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '马拉西亚',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '尼日利亚',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '英国',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '阿联酋',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '玻利维亚',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '巴西',
        value: randomData()
    }, {
        name: '中国'
    }],
    [{
        name: '澳大利亚',
        value: randomData()
    }, {
        name: '中国'
    }]   
];
var convertData2 = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[1].name];
        var toCoord = geoCoordMap[dataItem[0].name];
        if (fromCoord && toCoord) {
            res.push([{
                    coord: fromCoord,
                    value: dataItem[0].value
                },
                {
                    coord: toCoord
                }
            ]);
        }
    }
    return res;
};

var series = [];
[
    ["中国", BJData]
].forEach(function(item, i) {
    series.push({
            // name: '攻击线2',
            type: "lines",
            zlevel: 2,
            effect: {
                show: true,
                color: 'red',
                period:3, //箭头指向速度，值越小速度越快
                trailLength:0.1, //特效尾迹长度[0,1]值越大，尾迹越长重
              //  symbol: "arrow", //箭头图标
                symbolSize:10 //图标大小
            },
            lineStyle: {
                normal: {
                    color: 'yellow',
                    width: 1, //尾迹线条宽度
                    opacity: 0, //尾迹线条透明度
                    curveness: -0.3 //尾迹线条曲直度
                }
            },
            data: convertData2(item[1])
        }, {

            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
                //涟漪特效
                period: 4, //动画时间，值越小速度越快
                brushType: "stroke", //波纹绘制方式 stroke, fill
                scale: 4 //波纹圆环最大限制，值越大波纹越大
            },
            label: {
                normal: {
                    show: true,
                    position: "right", //显示位置
                    offset: [5, 0], //偏移设置
                    formatter: "{b}" //圆环显示文字
                },
                emphasis: {
                    show: true,
                    color: "red"
                }
            },
            symbol: "circle",
            symbolSize: function(val) {
                return 8 + val[2] / 1000; //圆环大小
            },
            itemStyle: {
                normal: {
                    show: true,
                },
                emphasis: {
                    show: true,
                    color: "red"
                }
            },
            data: item[1].map(function(dataItem) {
                return {
                    name: dataItem[0].name,
                    value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                };
            })
        },
        //被攻击点
        {
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
                period: 4,
                brushType: "stroke",
                scale: 4
            },
            label: {
                normal: {
                    show: true,
                    color: "rgb(215,13,25)",
                    position: "right",
                    formatter: "{b}",
                },
                emphasis: {
                    show: true,
                    color: "red"
                }
            },
            symbol: "pin",
            symbolSize: 30,
            itemStyle: {
                normal: {
                    show: true,
                    color: "rgb(215,13,25)",
                },
                emphasis: {
                    show: true,
                    color: "red"
                }
            },
            data: [{
                name: item[0],
                value: geoCoordMap[item[0]].concat([100]),
                visualMap: false
            }]
        }
    );
});
var svg = "http://image.baidu.com/search/detail?ct=503316480&z=1&tn=baiduimagedetail&ipn=d&word=%E5%B0%8F%E7%AE%AD%E5%A4%B4&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined©right=undefined&cs=1525371984,4236387017&os=105247815,201702987&simid=4259792343,784147648&pn=0&rn=1&di=20350&ln=1368&fr=&fmq=1564028762207_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=0&height=0&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=78&objurl=http%3A%2F%2Fimg58.nipic.com%2F20140830%2F2531170_195503597000_1.jpg&rpstart=0&rpnum=0&adpicid=0&force=undefined"

option = {
    backgroundColor: '#FFF',
    tooltip: {
        trigger: "item",
        backgroundColor: "red",
        borderColor: "red",
        showDelay: 0,
        hideDelay: 0,
        enterable: true,
        transitionDuration: 0,
        extraCssText: "z-index:100",
        formatter: function(params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            var value = params.value[params.seriesIndex + 1];
            res =
                "";
            return res;
        }
    },
    visualMap: {
        //图例值控制
        show: false,
        type: 'piecewise',
        pieces: [{
                max: 80,
                color: 'red'
            },
            {
                min: 80,
                max: 120,
                color: 'red'
            },
            {
                min: 120,
                color: 'red'
            }
        ],
        calculable: true,
    },
    geo: {
        map: "world",
        show: true,
        label: {
            emphasis: {
                show: false
            }
        },
        roam: false, //是否允许缩放
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "180%",
        itemStyle: {
            normal: {
                show: 'true',
                color: "rgb(4,40,78)", //地图背景色
                borderColor: "rgb(178,178,178)" //省市边界线
            },
            emphasis: {
                show: 'true',
                color: "rgb(4,40,78)" //悬浮背景
            }
        }
    },
    legend: {
        orient: 'vertical',
        top: '30',
        left: 'center',
        align: 'right',
        data: [{
                name: '攻击线1',
                icon: svg,
            },
            {
                name: '攻击线2',
                icon: svg
            },
        ],
        textStyle: {
            color: '#fff',
            fontSize: 20,
        },
        itemWidth: 50,
        itemHeight: 30,
        selectedMode: 'multiple'
    },
    series: series
};
mapChart.setOption(option)//把echarts配置项启动
})
