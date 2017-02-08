/*
 * @Author: Marte
 * @Date:   2017-01-04 11:37:16
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-01-09 23:20:05
 */

'use strict';
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

var $ = function(id) {
    return document.getElementById(id);
};


/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityname = $("aqi-city-input").value.trim();
    var cityaqi = $("aqi-value-input").value.trim();
    if (!aqiData[cityname]) {
        aqiData[cityname] = cityaqi;
        return true;
    } else {
        alert("该城市已经添加！")
        return false;
    }
}


/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    /*var trs = $("aqi-table").getElementsByTagName("tr");*/
    /*var aqiArr = aqiData;*/
    /*for (var i = trs.length - 1; i > 0; i--) {
        if(!aqiData[trs[i].getElementsByTagName("td")[0].innerText])
        {
            alert(aqiData[trs[i].getElementsByTagName("td")[0].innerText]);
            $("aqi-table").removeChild(trs[i]);
        }else{
            delete aqiArr[trs[i].getElementsByTagName("td")[0].innerText];
        }
        alert(trs[i].getElementsByTagName("td")[0].innerText);
    };*/

    /*    if (aqiArr.length > 0) {
                for(var str in aqiArr){
                    var table = $("aqi-table");
                    var tr = document.createElement("tr");
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    var td3 = document.createElement("td");
                    td1.innerText = str;
                    td2.innerText = aqiArr[str];
                    td3.innerHTML = "<button>删除</button>";
                    tr.append(td1);
                    tr.append(td2);
                    tr.append(td3);
                    table.append(tr);
                }
        };*/
    /*alert(tds.length);*/


    var tbody = $("aqi-table").getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    /*table.innerHTML = "";*/
    for (var str in aqiData) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        td1.innerText = str;
        td2.innerText = aqiData[str];
        td3.innerHTML = "<button onclick=\"delBtnHandle(this)\">删除</button>";
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tbody.appendChild(tr);
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    if (addAqiData()) {
        renderAqiList();
    }
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(obj) {
    // do sth.
    delete aqiData[obj.parentElement.parentElement.children[0].innerText];
    /*alert();*/
    /*var rowIndex = obj.parentElement.rowIndex;*/
    /*alert($("aqi-table").getElementsByTagName("tbody")[0].rowIndex);*/
    renderAqiList();
}

function init() {

    $("aqi-city-input").onblur = function() {
        validity("aqi-city-input", "error-city", /^[\u4e00-\u9fa5A-Za-z ]{0,}$/);
    }
    $("aqi-value-input").onblur = function() {
        validity("aqi-value-input", "error-aqi", /^\d+$/);
    }

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    $("add-btn").onclick = function() {
        if ($("aqi-city-input").value == "" || $("aqi-city-input").value == "" || $("error-city").style.display == "inline" || $("error-aqi").style.display == "inline") {
            alert("你输入的数据有误，无法提交，请修正！");
            // $("prompt-box").style.display = "block";
        } else {
            addBtnHandle();
        }
    };

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    //
    //
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    /*document.getElementById("aqi-table").addEventListener("click", function(event){
        if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.dataset.city);
    })*/
}

function validity(id, errorInfo, reg) {
    /*var cityName = /^[\u4e00-\u9fa5A-Za-z]{0,}$/;
    var cityAqi = /^\d+$/;*/
    if ($(id).value == "" || !reg.test($(id).value)) {
        $(errorInfo).style.display = "inline";
    } else {
        $(errorInfo).style.display = "none";
    }

}

window.onload = function() {
    init();
}
