/*
 * @Author: Marte
 * @Date:   2017-01-09 23:40:18
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-01-10 22:30:24
 */

'use strict';

/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 简写
var $ = function(id) {
    return document.getElementById(id);
}


// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    /*alert("开始渲染图表！");*/
    var picTle = document.getElementsByClassName("aqi-chart-wrap")[0];
    picTle.innerHTML = "";
    var tleUl = document.createElement("ul");
    for (var cr in chartData) {
        var ulLi = document.createElement("li");
        switch (pageState.nowGraTime) {
            case "day":
                ulLi.className = "width-8";
                break;
            case "week":
                ulLi.className = "width-22";
                break;
            case "month":
                ulLi.className = "width-52";
                break;
        }

        if (chartData[cr] <= 100) {
            ulLi.className += " bg-green";
            ulLi.style.height = chartData[cr] + "px";
        } else if (chartData[cr] > 100 && chartData[cr] < 200) {
            ulLi.className += " bg-blue";
            ulLi.style.height = chartData[cr] + "px";
        } else if (chartData[cr] > 200 && chartData[cr] < 300) {
            ulLi.className += " bg-red";
            ulLi.style.height = chartData[cr] + "px";
        } else if (chartData[cr] > 300 && chartData[cr] < 400) {
            ulLi.className += " bg-purple";
            ulLi.style.height = chartData[cr] + "px";
        } else {
            ulLi.className += " bg-black";
            ulLi.style.height = chartData[cr] + "px";
        };

        ulLi.setAttribute("title", "日期:" + cr + ", 空气指数:" + chartData[cr]);
        /*ulLi.className += " bg-green";*/
        tleUl.append(ulLi);
        /*document.write(chartData[cr] + "<br>");*/
        //获取日期时间是星期几（1,2,3,4,5,6,0）
        /*document.write(new Date(cr).getDay() + "<br>");*/
    }
    picTle.append(tleUl);
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(time) {
    /*alert(time);*/
    // 确定是否选项发生了变化
    pageState.nowGraTime = time;
    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    /*alert("调用citySelectChange事件！");*/
    // 确定是否选项发生了变化
    var citySleect = $("city-select").getElementsByTagName("option");
    for (var selected in citySleect) {
        if (citySleect[selected].selected) {
            pageState.nowSelectCity = citySleect[selected].innerText;
        };
    }

    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    $("form-gra-time").addEventListener("click", function(e) {
        if (e.target && e.target.nodeName == "INPUT") {
            graTimeChange(e.target.value);
        };
    });

    var graName = document.getElementsByName("gra-time");
    for (var i = 0; i < graName.length; i++) {
        if (graName[i].checked) {
            pageState.nowGraTime = graName[i].value;
        }
    };
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var city = $("city-select");
    city.innerHTML = "";
    for (var cityName in aqiSourceData) {
        var option = document.createElement("option");
        option.innerText = cityName;
        city.append(option);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    city.addEventListener("change", function() {
        citySelectChange();
    });

    var citySleect = $("city-select").getElementsByTagName("option");
    for (var selected in citySleect) {
        if (citySleect[selected].selected) {
            pageState.nowSelectCity = citySleect[selected].innerText;
        };
    }
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    switch (pageState.nowGraTime) {
        case "day":
            chartData = aqiSourceData[pageState.nowSelectCity];
            break;
        case "week":
            chartData = disposeData("week", aqiSourceData[pageState.nowSelectCity]);
            break;
        case "month":
            chartData = disposeData("month", aqiSourceData[pageState.nowSelectCity]);
            break;
    }
}
/**
 * 当时间选择为周的时候进行计算
 */
function disposeData(time, data) {
    //新数据暂存
    var newData = {};
    var startTime = "";
    var endTime = "";
    var aqiDataMean = 0;
    if (time == "week") {
        for (var da in data) {
            if (da == "2016-01-01" || new Date(da).getDay() == 1) { startTime = da; };
            aqiDataMean += parseInt(data[da]);
            if (da == "2016-03-31" || new Date(da).getDay() == 0) {

                endTime = da;
                aqiDataMean = aqiDataMean / 7;
                newData[startTime + "到" + endTime] = parseInt(aqiDataMean);
                startTime = "";
                endTime = "";
                aqiDataMean = 0;
            }
            /*document.write(da+"<br>");*/
        }
        return newData;
    }
    else if (time == "month") {
        var dast = [];
        for (var da in data) {
            dast = da.split("-");
            if (dast[2] == "01") {
                startTime = da;
                endTime = dast[0] +"-"+ dast[1] +"-"+ new Date(dast[0],dast[1],0).getDate();
            };
            aqiDataMean += parseInt(data[da]);
            if (da == endTime) {
                aqiDataMean = aqiDataMean / parseInt(new Date(dast[0],dast[1],0).getDate());
                newData[startTime + "到" + endTime] = parseInt(aqiDataMean);
                startTime = "";
                endTime = "";
                aqiDataMean = 0;
            };
        }
        /*for(var ii in newData){document.write(ii +":"+ newData[ii] +"<br>");}*/
        return newData;
    }
}


/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}

window.onload = function() {
    init();
}
