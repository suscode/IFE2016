/*
 * @Author: Marte
 * @Date:   2017-01-10 23:07:41
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-01-16 09:30:08
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
            if (e.target.innerText == "左侧入" || e.target.innerText == "右侧入") {
                if (textValidate()) { btnEvent(e.target.innerText); };
            } else {
                btnEvent(e.target.innerText);
            }
        };

    });
}

/**
 * 按钮事件处理
 */
function btnEvent(event) {
    switch (event) {
        case "左侧入":
            addEvent(event);
            break;
        case "右侧入":
            addEvent(event);
            break;
        case "左侧出":
            delEvent(event);
            break;
        case "右侧出":
            delEvent(event);
            break;
        case "随机数据":
            randomMath();
            break;
        case "打乱顺序":
            boxNumber.sort(function() {
                return 0.5 - Math.random()
            });
            renderNum();
            break;
        case "升序排列":
            numSort(event);
            break;
        case "降序排列":
            numSort(event);
            break;
    }
}

/*
 * Add事件
 */
function addEvent(event) {
    var numCount = boxNumber.length;
    if (numCount >= 60) {
        alert("数据列已经到达最大限制，请删除后继续添加！");
        return false;
    };
    switch (event) {
        case "左侧入":
            boxNumber.unshift($("intBox").value);
            break;
        case "右侧入":
            boxNumber.push($("intBox").value);
            break;
    }
    var boxWrap = $cl("box-wrap")[0];
    var divBox = document.createElement("div");
    divBox.className = "box";
    divBox.setAttribute("title", "onclick delete!");
    switch (event) {
        case "左侧入":
            divBox.innerText = boxNumber[0];
            divBox.style.height = boxNumber[0] * 4 + "px";
            boxWrap.insertBefore(divBox, boxWrap.childNodes[0]);
            break;
        case "右侧入":
            divBox.innerText = boxNumber[boxNumber.length - 1];
            divBox.style.height = boxNumber[boxNumber.length - 1] * 4 + "px";
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
            if (boxNumber.length == 0) {
                break;
            };
            boxWrap.removeChild(boxWrap.childNodes[0]);
            break;
        case "右侧出":
            if (boxNumber.length == 0) {
                break;
            };
            boxWrap.removeChild(boxWrap.childNodes[boxWrap.childNodes.length - 1]);
            break;
    }
}

/*
 * 排序可视化
 */
function numSort(event) {
    var box = $cl("box-wrap")[0];
    var count = -1;
    var ret = setInterval(function() {
        count++;
        if (count > 0) {
            box.childNodes[count - 1].style.background = "";
            box.childNodes[count].style.transition = "";
        };
        if (count == boxNumber.length) {
            clearInterval(ret);
        } else {
            box.childNodes[count].style.background = "#8c8be4";
            box.childNodes[count].style.transition = "all 0.03s";
        }
        var swap = count;
        var turn = setInterval(function() {
            swap++;
            if (swap > count + 1) {
                box.childNodes[swap - 1].style.background = "";
                box.childNodes[swap].style.transition = "";
            }
            if (swap >= boxNumber.length) {
                clearInterval(turn);
            } else {
                box.childNodes[swap].style.background = "#d2b982";
                box.childNodes[swap].style.transition = "all 0.03s";
            }
            if ((boxNumber[count] < boxNumber[swap] && event == "降序排列") || (boxNumber[count] > boxNumber[swap] && event == "升序排列")) {
                var tem = boxNumber[count];
                boxNumber[count] = boxNumber[swap];
                box.childNodes[count].innerText = boxNumber[swap];
                box.childNodes[count].style.height = boxNumber[swap] * 4 + "px";
                boxNumber[swap] = tem;
                box.childNodes[swap].innerText = tem;
                box.childNodes[swap].style.height = tem * 4 + "px";
            }
        }, 30);
        printArray();
    }, (boxNumber.length - count) * 30);
}

/**
 * 给box绑定监听事件
 */
function boxOnclick() {
    $cl("box-wrap")[0].addEventListener("click", function(e) {
        if (e.target && e.target.className == "box") { boxClickRmove([].indexOf.call(e.target.parentNode.children, e.target)); }
    });
}

/**
 * box移除处理
 */
function boxClickRmove(event) {
    /*alert(event);*/
    boxNumber.splice(event, 1);
    var boxWrap = $cl("box-wrap")[0];
    boxWrap.childNodes[event].style.height = 0;
    var ret = self.setInterval(function() {
        boxWrap.childNodes[event].style.width = 0;
        clearInterval(ret);
    }, 1000);
    var etu = self.setInterval(function() {
        boxWrap.removeChild(boxWrap.childNodes[event]);
        clearInterval(etu);
    }, 2000);
}

/**
 * 文本框输入内容验证
 */
function textValidate() {
    var reg = /^[1-9]\d*|0/;
    if (reg.test($("intBox").value)) {
        if ($("intBox").value < 10 || $("intBox").value > 100) {
            alert("请输入10-100之间的整数！");
            return false;
        } else {
            return true;
        }
    } else {
        alert("请输入整数！");
        return false;
    }
}

/*
 * 验证数字是否重复
 */
function numRepeat() {
    var i = boxNumber.length;
    if (i != 0) {
        while (i--) {
            if (boxNumber[i] == $("intBox").value) {
                return false;
            }
        }
    }
    return true;
}

/**
 * 初始化函数
 */
function init() {
    btnOnclick();
    boxOnclick();
}

/*
 * 测试用随机数据生成
 */
function randomMath() {
    var m = 10;
    var n = 140;
    boxNumber.splice(0, boxNumber.length);
    for (var i = 0; i < 60; i++) {
        var num = parseInt(Math.random() * (n - m) + m, 10);
        boxNumber.push(num);
    };
    renderNum();
}

/*
 * 验证重复
 */
function randomRepeat(num) {
    for (var x = 0; x < boxNumber.length; x++) {
        if (boxNumber[x] == num) {
            return false;
        }
    }
    return true;
}

/*
 * 渲染图表
 */
function renderNum() {
    var boxWrap = $cl("box-wrap")[0];
    boxWrap.innerHTML = "";
    for (var i = 0; i < boxNumber.length; i++) {
        var divBox = document.createElement("div");
        divBox.className = "box";
        divBox.innerText = boxNumber[i];
        /*for (var x = 0; x <= boxNumber[i]; x++) {
            divBox.style.height = x * 4 + "px";
            sleep(1);
        };*/
        divBox.style.height = boxNumber[i] * 4 + "px";
        boxWrap.appendChild(divBox);
        printArray();
    };
}

/*
 * 打印数组
 */
function printArray() {
    $("arr-show").innerText = "";
    for (var i = 0; i < boxNumber.length; i++) {
        $("arr-show").innerText += boxNumber[i] + "|";
    };
}


/*
 * Sleep方法
 */
function sleep(d) {
    for (var t = Date.now(); Date.now() - t <= d;);
}

window.onload = function() {
    init();
}
