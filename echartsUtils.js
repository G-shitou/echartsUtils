/**
 * 判断数组是否存在某个值
 */
Array.prototype.isExist = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

var myEcharts = {
    /**
     * 数据整理
     */
    echartsData: {
        /**
         * 饼图数据整理
         * 数据格式  [{name:'xx',value:xx},{name:'xx',value:xx}...]
         */
        initPieData: function (data) {
            var names = [];
            // var datas = [];
            var selected = false;
            for (var i = 0; i < data.length; i++) {
                names.push(data[i].name || '');
                (data[i].selected) && (selected = true);
                // datas.push({value:data[i].value || 0,name:data[i].name ||''});
            }
            return {
                name: names,
                data: data,
                isSelected: selected
            };
        },
        /**
         * 柱形图,折线图数据整理
         * 数据格式  [{kind:'xx',value:xx,name:'xx'},{kind:'xx',value:xx,name:'xx'}...]
         */
        initBarData: function (obj) {
            var kinds = [],
                names = [],
                datas = [];
            for (var i = 0; i < obj.data.length; i++) {
                (!kinds.isExist(obj.data[i].kind)) && (kinds.push(obj.data[i].kind));
                (!names.isExist(obj.data[i].name)) && (names.push(obj.data[i].name));
            };
            for (var i = 0; i < kinds.length; i++) {
                datas[i] = {
                    name: kinds[i],
                    type: obj.type,
                    data: []
                };
                // 定义是否堆叠
                (obj.isStack) && (datas[i].stack = obj.isStack);
                // 定义堆叠的柱形图label样式,position位置为inside
                (obj.type === 'bar') && (obj.isStack) && (datas[i].label = {
                    show: true,
                    position: 'inside'
                });
                for (var j = 0; j < obj.data.length; j++) {
                    if (kinds[i] == obj.data[j].kind) {
                        datas[i].data.push(obj.data[j].value);
                    }
                }
            };
            return {
                name: names,
                kind: kinds,
                data: datas
            };
        }
    },
    /**
     * 生成option
     */
    initOption: {
        /**
         * 生成饼图option
         * @param {Array} obj.data   饼图数据数组
         * @param {string} obj.dataViewBgColor   饼图的数据视图背景色
         * @param {string} obj.title   标题
         * @param {string} obj.subtitle   副标题
         * @param {boolean} obj.showLegend   是否显示分类选项
         * @param {string} obj.pieTitle   数据视图标题
         */
        initPieOpt: function (obj) {
            var initData = myEcharts.echartsData.initPieData(obj.data);
            var dataViewBgColor = obj.dataViewBgColor || '#91C7AE';
            var option = {
                title: {
                    text: obj.title || '',
                    textStyle: {
                        color: '#3398DB',
                        fontWeight: 700
                    },
                    subtext: obj.subtitle || '',
                    subtextStyle: {
                        color: '#3398DB',
                        fontWeight: 400
                    },
                    left: 'center'
                },
                tooltip: {
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    show: (obj.showLegend === false) ? obj.showLegend : true,
                    orient: 'vertical',
                    right: 5,
                    top: 10,
                    data: initData.name
                },
                toolbox: {
                    bottom: 20,
                    right: 15,
                    feature: {
                        saveAsImage: {
                            pixelRatio: 2
                        },
                        dataView: {
                            title: obj.dataViewTitle || '数据视图',
                            readOnly: true,
                            optionToContent: function (opt) {
                                var data = opt.series[0].data;
                                var table = '<table cellspacing="0" style="width:100%;height:100%;text-align:center;border:3px dashed #91C7AE;padding:5px;">' +
                                    '<tr style="background:' + dataViewBgColor + ';color:#fff;font-weight:bold;"><td>统计类别</td><td>统计数量</td></tr>';
                                for (var i = 0; i < data.length; i++) {
                                    var bgcol;
                                    (i % 2 == 0) ? (bgcol = '#fff') : (bgcol = '#F5FAFA');
                                    table += '<tr style="background:' + bgcol + '"><td>' + data[i].name + '</td><td>' + data[i].value + '</td></tr>';
                                }
                                table += '</table>';
                                return table;
                            },
                            buttonColor: dataViewBgColor
                        }
                    }
                },
                series: [{
                    name: obj.pieTitle || obj.title || '',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    selectedMode: initData.isSelected && 'single',
                    data: initData.data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, .5)'
                        }
                    }
                }]
            };
            return option;
        },
        /**
         * 生成柱形图,折线图option
         * @param {object} obj
         * @param {Array} obj.data  echarts所需数组数据
         * @param {boolean} obj.stack 是否堆叠,默认不堆叠
         * @param {string} obj.dataViewBgColor 数据视图背景色,默认为淡青色
         * @param {string} obj.type  echarts图形类型
         * @param {string} obj.title 图形标题
         * @param {string} obj.subtitle 图形副标题
         * @param {boolean} obj.showLegend 是否显示数据类型选项
         * @param {boolean} obj.isY  两个坐标轴那个类型为value
         */
        initBarOpt: function (obj) {
            /**
             * 如果是对象，则表示为柱形图或者折线图。如果为数组表示既有柱形图，又有折线图。混合图形还没做判断处理，待做.
             */
            if (Object.prototype.toString.call(obj) === '[object Object]') {
                var param = (obj.stack && obj.stack != '' && obj.stack != null) ? {
                    data: obj.data,
                    type: obj.type,
                    isStack: 'stack'
                } : {
                    data: obj.data,
                    type: obj.type
                };

                var initData = myEcharts.echartsData.initBarData(param),
                    type = initData.kind;
            } else {
                return;
            }
            var dataViewBgColor = obj.dataViewBgColor || '#91C7AE';
            var option = {
                title: {
                    text: obj.title || '',
                    textStyle: {
                        color: '#3398DB',
                        fontWeight: 700
                    },
                    subtext: obj.subtitle || '',
                    subtextStyle: {
                        color: '#3398DB',
                        fontWeight: 400
                    },
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: (obj.type && (obj.type == 'line')) ? 'line' : 'shadow'
                    }
                },
                toolbox: {
                    top: 45,
                    right: 20,
                    feature: {
                        saveAsImage: {
                            pixelRatio: 2
                        },
                        magicType: {
                            type: ((obj.type == 'line') || (initData.kind.length === 1)) ? [] : ['stack', 'tiled']
                        },
                        dataView: {
                            title: '数据视图',
                            readOnly: true,
                            optionToContent: function (opt) {
                                var data = opt.series;
                                var names = opt.xAxis[0].data;
                                var table = '<table cellspacing="0" style="width:100%;height:100%;text-align:center;border:3px dashed #91C7AE;padding:5px;">' +
                                    '<tr style="background:' + dataViewBgColor + ';color:#fff;font-weight:bold;"><td></td>';
                                for (var i = 0; i < names.length; i++) {
                                    table += '<td>' + names[i] + '</td>';
                                }
                                table += '</tr>';
                                for (var i = 0; i < data.length; i++) {
                                    var bgcol;
                                    (i % 2 == 0) ? (bgcol = '#fff') : (bgcol = '#F5FAFA');
                                    table += '<tr style="background:' + bgcol + '"><td>' + data[i].name + '</td>';
                                    for (var j = 0; j < data[i].data.length; j++) {
                                        table += '<td>' + data[i].data[j] + '</td>';
                                    };
                                    table += '</tr>';
                                }
                                table += '</table>';
                                return table;
                            },
                            buttonColor: dataViewBgColor
                        },
                        mySort: {
                            show: (initData.kind.length === 1) ? true : false,
                            title: '排序',
                            icon: 'path://M416.3,535.9v-95.6h382.4v95.6H416.3 M416.3,822.7v-95.6h191.2v95.6H416.3 M416.3,249v-95.6H990V249H416.3 M225.1,727.1h119.5L177.3,894.4L10,727.1h119.5V105.6h95.6L225.1,727.1L225.1,727.1z',
                            onclick: function(parmes){
                                var data = parmes.scheduler.ecInstance.getOption().series[0].data,
                                    preData = parmes.scheduler.ecInstance.getOption().series[0].data,
                                    name = parmes.scheduler.ecInstance.getOption().xAxis[0].data;
                                var sortName = name.map(function(value,index){
                                    return {
                                        index:data[index],
                                        value:value
                                    }
                                }).sort(function(obj1,obj2){
                                    return obj2.index - obj1.index;
                                }).map(function(value,index){
                                    return value.value;
                                });
                                var sortData = data.sort(function(value1,value2){
                                    return value2 - value1; 
                                });                                                                                           
                                if(preData.toString() === sortData.toString()){
                                    // 如果已经是降序了,就升序
                                    sortName.reverse();
                                    sortData.reverse();
                                }else if(preData.reverse().toString() === sortData.toString()){
                                    // 如果已经是升序了,且初始值不是升序,就回到初始值.否则降序                                   
                                    var option = myEcharts.echartsData.initBarData({
                                        data:obj.data,
                                        type:obj.type
                                    });
                                    if(preData.toString() === option.data[0].data.toString()){                                        
                                        sortData = option.data[0].data;
                                        sortName = option.name;
                                    }             
                                }                                                           
                                // 如果上面两个条件都不满足,不对已经排序的数据做处理,按照升序排序
                                parmes.scheduler.ecInstance.setOption({
                                    xAxis: {
                                        type: obj.isY ? 'value' : 'category',
                                        data: sortName
                                    },
                                    yAxis: {
                                        type: obj.isY ? 'category' : 'value',
                                        data: sortName
                                    },
                                    series:{
                                        data:sortData
                                    }
                                })
                            }
                        }
                    }
                },
                legend: {
                    show: (obj.showLegend === false || initData.kind.length === 1) ? false : true,
                    left: 'center',
                    top: 50,
                    data: type
                },
                grid: {
                    top: 90,
                    bottom: 25
                },
                xAxis: {
                    type: obj.isY ? 'value' : 'category',
                    data: initData.name
                },
                yAxis: {
                    type: obj.isY ? 'category' : 'value',
                    data: initData.name
                },
                series: initData.data
            };
            return option;
        }
    },
    /**
     * 生成echarts
     */
    initCharts: function (obj) {
        /**
         * 除上述data中所需参数,还可以传opts合并图形配置,达到按需配置图形
         */
        var myChart = echarts.init(document.getElementById(obj.echartsId));
        if (obj.type === "pie") {
            option = myEcharts.initOption.initPieOpt(obj);
        } else if (obj.type === 'bar' || obj.type === 'line') {
            option = myEcharts.initOption.initBarOpt(obj);
        }
        myChart.setOption(option);
        // 更新obj中的opts配置
        (obj.opts) && myChart.setOption(obj.opts);
        window.onresize = myChart.resize;
        return myChart;
    }
}