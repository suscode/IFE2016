/*
 * @Author: Marte
 * @Date:   2017-01-10 23:07:41
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-01-13 11:19:21
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
    switch (event) {
        case "左侧入":
            if (textValidate()) { addEvent(event); }
            break;
        case "右侧入":
            if (textValidate()) { addEvent(event); }
            break;
        case "左侧出":
            delEvent(event);
            break;
        case "右侧出":
            delEvent(event);
            break;
    }
}

/*
 * Add事件
 */
function addEvent(event) {
    switch (event) {
        case "左侧入":
            boxNumber.unshift($("inText").value);
            break;
        case "右侧入":
            boxNumber.push($("inText").value);
            break;
    }
    var boxWrap = $cl("box-wrap")[0];
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
    }
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
            boxWrap.removeChild(boxWrap.childNodes[0]);
            break;
        case "右侧出":
            boxWrap.removeChild(boxWrap.childNodes[boxWrap.childNodes.length - 1]);
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
        return true; }
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
