# echartsUtils
最近用echarts做了几个图,感觉挺方便的,于是休息时间简单的对echarts做了二次封装,如果您觉得有什么不好的地方或者有更好的建议,请多多指教.如果您觉得有用,请给个star(html中有几个示例,封装的js有部分注释).
<br>
封装只为了自己用,如果和您的需求不一致,您可在initOption中修改配置.
####  柱形图和折线图
柱形图和折线图toolbox添加了排序的功能,如果初始是升序或者降序,点击在升序降序之间切换;如果初始不排序,则第一次降序,第二次升序,第三次回到初始值.
生成柱形图和折线图的params

| param | Type | Default | isNecessary | Explain |
| :-: | :-: | :-: | :-: | :-: |
| data | Array| | yes | 数据数组 |
| echartsId | string | | yes | 图形区域的ID |
| type | string |   | yes | 图形类型 |
| stack | boolean | false | no | 是否堆叠 |
| isY | boolean | false | no | 坐标轴基底是X轴还是Y轴 |
| dataViewBgColor | string | #91C7AE | no | 数据视图背景色 |
| title | string | null | no | 图形标题 |
| subtitle | string | null | no | 图形副标题 |
| showLegend | boolean | true | no | legend是否显示 |
| opts | object | Default configuration | no | 自定义图形配置项 |

例子如下(html中有更多示例):

```
myEcharts.initCharts({
    echartsId: 'bar3',
    type: 'bar',
    title: '月度统计表',
    subtitle: '纯属虚构',
    pieTitle: '统计月份',
    data: [{
            name: '一月',
            kind: '总数',                    
            value: 80
        }, {
            name: '二月',
            kind: '总数',                    
            value: 70
        }, {
            name: '三月',
            kind: '总数',                    
            value: 60
        },
        {
            name: '四月',
            kind: '总数',                    
            value: 50
        }, {
            name: '五月',
            kind: '总数',                    
            value: 40
        }, {
            name: '六月',
            kind: '总数',                    
            value: 30
        }
    ]
});

```

####  饼图
生成饼图的params

| param | Type | Default | isNecessary | Explain |
| :-: | :-: | :-: | :-: | :-: |
| data | Array| | yes | 饼图数据数组 |
| echartsId | string | | yes | 图形区域的ID |
| type | string |   | yes | 图形类型 |
| dataViewBgColor | string | #91C7AE | no | 数据视图背景色 |
| title | string | null | no | 图形标题 |
| subtitle | string | null | no | 图形副标题 |
| showLegend | boolean | true | no | legend是否显示 |
| pieTitle | string | null | no | 数据视图标题 |
| opts | object | Default configuration | no | 自定义图形配置项 |

例子如下

```
myEcharts.initCharts({
    echartsId: 'pie',
    type: 'pie',
    title: '月度统计表',
    subtitle: '纯属虚构',
    pieTitle: '统计月份',
    data: [{
            name: '一月',
            value: 40
        }, {
            name: '二月',
            value: 60
        }, {
            name: '三月',
            value: 30
        },
        {
            name: '四月',
            value: 80
        }, {
            name: '五月',
            value: 50
        }, {
            name: '六月',
            value: 90
        }
    ]
});

```
