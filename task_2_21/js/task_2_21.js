/*
 * @Author: Marte
 * @Date:   2017-01-14 13:32:50
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-01-17 11:11:40
 */

'use strict';
/**
 * 简写
 */
var $ = function(id) {
    return document.getElementById(id);
}

/**
 * 储存输入的tag
 */
var tagData = ["JavaSpcrit", "CSS", "HTML", "JQuery"];

/*
 * 储存输入的爱好
 */
var loveData = ["游泳", "篮球", "乒乓", "羽毛球"];

/*
 * 为tag输入框添加响应事件
 */
function tagKey() {
    $("tagText").onkeypress = function(e) {
        /*alert(e.keyCode);*/
        if (e.keyCode == 13 || e.keyCode == 32 || e.keyCode == 44) {
            tagNode(e, 1);
        }
    };
}

/*
 * 给每个Tag绑定事件
 */
function tagLi() {
    //为每个tag增加悬停时改变文字的事件
    $("tagShow").addEventListener("mouseover", function(e) {
        if (e.target && e.target.nodeName == "LI") {
            var index = [].indexOf.call(e.target.parentNode.childNodes, e.target);
            onAndOver(index, "mouseover");
        };
    });

    //为每个tag增加鼠标移开时恢复文字的事件
    $("tagShow").addEventListener("mouseout", function(e) {
        if (e.target && e.target.nodeName == "LI") {
            var index = [].indexOf.call(e.target.parentNode.childNodes, e.target);
            onAndOver(index, "mouseout");
        };
    });

    //为每个已添加tag增加点击删除的事件
    $("tagShow").addEventListener("click", function(e) {
        if (e.target && e.target.nodeName == "LI") {
            /*console.log([].indexOf.call(e.target.parentNode.childNodes, e.target));*/
            var index = [].indexOf.call(e.target.parentNode.childNodes, e.target);
            tagNode(index, 0);
        };
    });
}

/*
 * 悬停时更换文字处理
 */
function onAndOver(index, action) {
    var node = $("tagShow").childNodes[index];
    if (action == "mouseover") {
        node.innerText = "点击删除" + node.innerText;
    } else if (action == "mouseout") {
        node.innerText = tagData[index];
    }
}

/*
 * 处理节点
 */
function tagNode(index, aord) {
    if (aord == 1) {
        var tag = $("tagText").value.trim();
        $("tagText").value = "";
        if (!isRepeat(tagData, tag) && tag != "" && tagData.length <= 10) {
            tagData.push(tag);
            renderOfLi(tag, "blue", "tagShow");
        } else if (!isRepeat(tagData, tag) && tag != "" && tagData.length > 10) {
            tagData.shift();
            tagData.push(tag);
            $("tagShow").removeChild($("tagShow").childNodes[0]);
            renderOfLi(tag, "blue", "tagShow");
        }
    } else if (aord == 0) {
        tagData.splice(index, 1);
        $("tagShow").removeChild($("tagShow").childNodes[index]);
    };
}

/*
 * 为爱好button绑定事件
 */
function btnLove() {
    $("btnLove").onclick = function() {
        addLove();
    }
}

/*
 * 添加爱好事件
 */
function addLove() {
    var str = $("tagLove").value.trim();
    $("tagLove").value = "";
    if (str == "") {
        return false;
    };
    str = strSplit(str);
    for (var i = 0; i < str.length; i++) {
        if (!isRepeat(loveData, str[i])) {
            loveData.push(str[i]);
            renderOfLi(str[i], "yellow", "loveShow");
            if (loveData.length > 10) {
                loveData.shift();
                $("loveShow").removeChild($("loveShow").childNodes[0]);
            };
        };
    };
    /*alert(str);
    alert(loveData);*/
}

/*
 * 切割字符串
 */
function strSplit(str) {
    var reg = /[\u4E00-\u9FA5A-Za-z0-9]+/g;
    var arr = [];
    var temp = null;
    while ((temp = reg.exec(str)) != null) {
        arr.push(temp[0]);
        /*temp = null;*/
    }
    return arr;
}

/*
 * 验证重复与否
 */
function isRepeat(data, cr) {
    for (var i = 0; i < data.length; i++) {
        if (data[i] == cr) {
            return true;
        };
    };
    return false;
}

/*
 * 测试数据HTML渲染
 */
function renderLi(data, parentId) {
    for (var i = 0; i < data.length; i++) {
        var newLi = document.createElement("li");
        if (parentId == "tagShow") { newLi.className = "bg-blue"; } else if (parentId == "loveShow") { newLi.className = "bg-yellow"; }
        newLi.innerText = data[i];
        $(parentId).appendChild(newLi);
    };
}

/*
 * 渲染单个li接点
 */
function renderOfLi(data, color, parentId) {
    var newLi = document.createElement("li");
    if (color == "blue") { newLi.className = "bg-blue"; } else if (color == "yellow") { newLi.className = "bg-yellow"; }
    newLi.innerText = data;
    $(parentId).appendChild(newLi);
}

/**
 * 初始化函数
 */
function init() {
    //初始化tagText响应事件
    tagKey();
    //给tag展示标签添加事件
    tagLi();
    //给确认爱好绑定事件
    btnLove();
    //对已存在的数据进行渲染
    renderLi(tagData, "tagShow");
    renderLi(loveData, "loveShow");
}

/*
 * 页面加载完成后加载js
 */
window.onload = function() {
    init();
}
