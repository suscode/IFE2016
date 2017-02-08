/*
 * @Author: Marte
 * @Date:   2017-01-10 23:07:41
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-01-16 09:28:05
 */

'use strict';

/**
 * 简写
 */
var $cl = function(className) {
    return document.getElementsByClassName(className);
}
var $ = function(id) {
    return document.getElementById(id);
}

/**
 * 存储已经输入的box
 */
var boxNumber = [];

/**
 * 给按钮绑定事件
 */
function btnOnclick() {
    $cl("console-wrap")[0].addEventListener("click", function(e) {
        if (e.target && e.target.nodeName == "BUTTON") {
            btnEvent(e.target.innerText);
        };
    });
}

/**
 * 按钮事件处理
 */
function btnEvent(event) {
    if (event == "左侧入" || event == "右侧入") { addEvent(event); } else if (event == "左侧出" || event == "右侧出") { delEvent(event); } else if (event == "搜索") { searchChar(); };
}

/*
 * 检索字符
 */
function searchChar() {
    if ($("searchText").value.trim() == "") {
        alert("请正确输入关键词！");
        return;
    };
    var reg = new RegExp($("searchText").value.trim());
    for (var i = 0; i < boxNumber.length; i++) {
        $cl("box-wrap")[0].childNodes[i].style.background = "";
        if (reg.test(boxNumber[i])) {
            $cl("box-wrap")[0].childNodes[i].style.background = "#5e80f1";
        };
    };
}

/*
 * Add事件
 */
function addEvent(event) {
    var boxWrap = $cl("box-wrap")[0];
    switch (event) {
        case "左侧入":
            boxNumber.unshift.apply(boxNumber, strSplit());
            for (var i = strSplit().length - 1; i >= 0; i--) {
                var divBox = document.createElement("div");
                divBox.className = "box";
                divBox.setAttribute("title", "onclick delete!");
                divBox.innerText = strSplit()[i];
                boxWrap.insertBefore(divBox, boxWrap.childNodes[0]);
            };
            break;
        case "右侧入":
            boxNumber.push.apply(boxNumber, strSplit());
            for (var i = 0; i < strSplit().length; i++) {
                var divBox = document.createElement("div");
                divBox.className = "box";
                divBox.setAttribute("title", "onclick delete!");
                divBox.innerText = strSplit()[i];
                boxWrap.append(divBox);
            };
            break;
    }
    /*var boxWrap = $cl("box-wrap")[0];
    var divBox = document.createElement("div");
    divBox.className = "box";
    divBox.setAttribute("title", "onclick delete!");
    switch (event) {
        case "左侧入":
            divBox.innerText = boxNumber[0];
            boxWrap.insertBefore(divBox, boxWrap.childNodes[0]);
            break;
        case "右侧入":
            divBox.innerText = boxNumber[boxNumber.length - 1];
            boxWrap.append(divBox);
            break;
    }*/
}

/*
 * 切割字符串
 */
function strSplit() {
    var reg = /[\u4E00-\u9FA5A-Za-z0-9]+/g;
    var arr = [];
    var temp = null;
    while ((temp = reg.exec($("inText").value)) != null) {
        arr.push(temp);
    }
    return arr;
}

/*
 * 删除事件
 */
function delEvent(event) {
    switch (event) {
        case "左侧出":
            boxNumber.shift();
            break;
        case "右侧出":
            boxNumber.pop();
            break;
    }
    var boxWrap = $cl("box-wrap")[0];
    switch (event) {
        case "左侧出":
            if (boxNumber.length >= 0) { boxWrap.removeChild(boxWrap.childNodes[0]); };
            break;
        case "右侧出":
            if (boxNumber.length >= 0) { boxWrap.removeChild(boxWrap.childNodes[boxWrap.childNodes.length - 1]); };
            break;
    }
}

/**
 * 给box绑定监听事件
 */
function boxOnclick() {
    $cl("box-wrap")[0].addEventListener("click", function(e) {
        if (e.target && e.target.className == "box") {
            boxClickRmove([].indexOf.call(e.target.parentNode.children, e.target));
        };
    });
}

/**
 * box移除处理
 */
function boxClickRmove(event) {
    boxNumber.splice(event, 1);
    /*alert(event);*/
    var boxWrap = $cl("box-wrap")[0];
    boxWrap.removeChild(boxWrap.childNodes[event]);
}

/**
 * 文本框输入内容验证
 */
function textValidate() {
    var reg = /^[1-9]\d*|0/;
    if (reg.test($("inText").value)) {
        return true;
    }
    alert("请输入整数！");
    return false;
}

/**
 * 初始化函数
 */
function init() {
    btnOnclick();
    boxOnclick();
    //实验假数据
    randomMath();
}

/*
 * 测试用随机数据生成
 */
function randomMath() {
    var m = 0;
    var n = 20;
    for (var i = 0; i < 10; i++) {
        boxNumber.push(parseInt(Math.random() * (n - m) + m, 10));
    };
    renderNum();
}

/*
 * 初始渲染
 */
function renderNum() {
    var boxWrap = $cl("box-wrap")[0];
    for (var i = 0; i < boxNumber.length; i++) {
        var divBox = document.createElement("div");
        divBox.className = "box";
        divBox.setAttribute("title", "onclick delete!");
        divBox.innerText = boxNumber[i];
        boxWrap.append(divBox);
    };
}


window.onload = function() {
    init();
}
