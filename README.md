# echartsUtils
基于平时项目中常用echarts图形的要求,对echarts饼图,折线图,柱形图进行二次封装.
echarts.html中有详细示例,封装的js里有注释.
####  饼图
生成饼图的option
|param|Type|Default|isNecessary|Explain|
|:-:|:-:|:-:|:-:|:-:|
|data|Array| |yes|饼图数据数组|
|echartsId|string| |yes|图形区域的ID|
|type|string| |yes|图形类型|
|dataViewBgColor|string|#91C7AE|no|数据视图背景色|
|title|string|null|no|图形标题|
|subtitle|string|null|no|图形副标题|
|showLegend|boolean|true|no|legend是否显示|
|pieTitle|string|null|no|数据视图标题|
|opts|object|Default configuration|no|自定义图形配置项|
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
