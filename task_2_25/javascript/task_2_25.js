/*
 * @Author: Marte
 * @Date:   2017-01-17 16:51:02
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-02-08 17:55:06
 */

'use strict';

var $ = function(id) {
    return document.getElementById(id);
};
var $cn = function(className) {
    return document.getElementsByClassName(className);
};
var orderData = [];
var takeNode = false;

var treeData = [
    { id: 0, parentId: null, content: "Spuer" },
    { id: 1, parentId: 0, content: "Cat" },
    { id: 2, parentId: 0, content: "Note" },
    { id: 3, parentId: 0, content: "Fish" },
    { id: 4, parentId: 1, content: "Apple" },
    { id: 5, parentId: 1, content: "Phone" },
    { id: 6, parentId: 2, content: "Human" },
    { id: 7, parentId: 2, content: "Progrom" },
    { id: 8, parentId: 4, content: "Pcor" },
    { id: 9, parentId: 4, content: "Pig" },
    { id: 10, parentId: 4, content: "Cola" },
    { id: 11, parentId: 4, content: "Soccor" },
    { id: 12, parentId: 5, content: "Book" },
    { id: 13, parentId: 5, content: "School" },
    { id: 14, parentId: 6, content: "Code" },
    { id: 15, parentId: 6, content: "Operate" },
    { id: 16, parentId: 6, content: "Man" },
    { id: 17, parentId: 7, content: "Element" },
    { id: 18, parentId: 7, content: "Class" },
    { id: 19, parentId: 17, content: "Cat" },
];

/*
 * 初始化Tree的HTML
 */
function createTree(data) {
    if (data) {
        var tree = $("treeHTML");
        var divList = [tree];
        for (var i = 0; i < data.length; i++) {
            var hDiv = document.createElement("div");
            var hP = document.createElement("p");
            hP.innerText = data[i].content;
            var treeId = document.createAttribute("treeId");
            treeId.value = data[i].id;
            if (data[i].parentId == null) {
                tree.setAttributeNode(treeId);
                tree.appendChild(hP);
            } else {
                hDiv.setAttributeNode(treeId);
                hDiv.appendChild(hP);
                orderData = [];
                scopeErgodic(divList);
                var count = orderData.length;
                inter:
                    for (var j = 0; j < count; j++) {
                        if (orderData[j].attributes.treeId.value && orderData[j].attributes.treeId.value == data[i].parentId) {
                            orderData[j].appendChild(hDiv);
                            break inter;
                        };
                    };
            }
        };
        orderData = [];
        scopeErgodic(divList);
        var count = orderData.length;
        for (var i = 0; i < count; i++) {
            var incount = orderData[i].children.length;
            var divcount = 0;
            inter_:
                for (var j = 0; j < incount; j++) {
                    if (orderData[i].children[j].nodeName == "DIV") {
                        var hSvg = document.createElementNS("http://www.w3.org/2000/svg","svg");

                        var hClass = document.createAttribute("class");
                        hClass.value = "node-icon";
                        hSvg.setAttributeNode(hClass);
                        /*hSvg.style = "width:10px; height:10px;";*/

                        var xmlns = document.createAttribute("xmlns");
                        xmlns.value = "http://www.w3.org/2000/svg";
                        hSvg.setAttributeNode(xmlns);
                        var hVersion = document.createAttribute("version");
                        hVersion.value = "1.1";
                        hSvg.setAttributeNode(hVersion);

                        var hPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                        var hPoints = document.createAttribute("points");
                        hPoints.value = "0,0 0,10 10,5";
                        hPolygon.setAttributeNode(hPoints);
                        hPolygon.style.fill = "purple";
                        hSvg.appendChild(hPolygon);

                        orderData[i].children[0].insertBefore(hSvg, orderData[i].children[0].childNodes[0]);
                        orderData[i].children[0].className = "havechild";

                        divcount++;
                        break inter_;
                    }
                };
            if (divcount == 0) { orderData[i].children[0].className = "nochild"; };
        };
    };
}


/*
 * 绑定多叉树div点击事件
 */
var btnTree = (function() {
    var tree = $cn("div-wrap")[0];
    tree.addEventListener("click", function(e) {
        if (e.target) {
            if (takeNode) { takeNode.children[0].style.background = ""; };
            /*if (e.target.nodeName == "DIV") { takeNode = e.target; } else */
            if (e.target.nodeName == "P") { takeNode = e.target.parentNode; };
            takeNode.children[0].style.background = "#cac";
        };
    });
});


/*
 * btn事件对象
 */
var btnEventOn = (function() {
    var btnBox = $("btnBox");
    btnBox.addEventListener("click", function(e) {
        if (e.target && e.target.nodeName == "BUTTON") {
            var index = [].indexOf.call(e.target.parentNode.children, e.target);
            var node = $cn("div-wrap");
            restBg();
            orderData.splice(0, orderData.length);
            switch (index) {
                case 0:
                    preOrder(node[0]);
                    ergodic();
                    break;
                case 1:
                    scopeErgodic(node);
                    ergodic();
                    break;
                case 2:
                    depthErgodic(node);
                    ergodic();
                    break;
                case 4:
                    scopeErgodic(node);
                    ergodic($("textSearch").value);
                    break;
                case 6:
                    addNode(takeNode);
                    break;
                case 7:
                    delNode(takeNode);
                    break;
            }
        };
    });
});

/*
 * 删除该节点
 */
function delNode(node) {
    if (node) {
        node.parentNode.removeChild(node);
    } else {
        alert("没有选中的节点！");
    }
}

/*
 * 增加子节点
 */
function addNode(node) {
    if (node && $("addStr").value != "") {
        var div = document.createElement("div");
        var span = document.createElement("span");
        span.innerText = $("addStr").value.trim();
        div.appendChild(span);
        node.appendChild(div);
        $("addStr").value = null;
    };
}

/*
 * 重置背景
 */
function restBg() {
    for (var i = 0; i < orderData.length; i++) {
        orderData[i].children[0].style.background = "#fff";
    };
}

/*
 * 查找
 */
function textSearch(node) {
    scopeErgodic();
    ergodic();
}

/*
 * 遍历
 */
function ergodic(str) {
    var count = 0;
    var len = orderData.length;
    var searchSwitch = false;
    var searchCount = 0;
    var ret = setInterval(function() {
        if (count < len) {
            if (count != 0 && !searchSwitch) { orderData[count - 1].children[0].style.background = ""; };
            if (str && orderData[count].children[0].innerText == str) {
                orderData[count].children[0].style.background = "#69dcdd";
                searchSwitch = true;
                searchCount++;
            } else {
                orderData[count].children[0].style.background = "#aaa";
                searchSwitch = false;
            }
            count++;
        } else {
            if (!searchSwitch) { orderData[count - 1].children[0].style.background = ""; };
            if (str != undefined && searchCount == 0) { alert("输入的字符串不存在！") };
            clearInterval(ret);
        }
    }, 500);
};

/*
 * 清除背景颜色
 */
function clearBg(node) {
    node.children[0].style.background = "";
}

/*
 * 递归遍历
 */
function preOrder(node) {
    if (node != undefined) {
        orderData.push(node);
        for (var i = 0; i < node.children.length; i++) {
            if (node.children[i].nodeName == "DIV") {
                preOrder(node.children[i]);
            }
        };
    };
}

/*
 * 非递归广度优先
 */
function scopeErgodic(node) {
    if (!node || !node.length) {
        return;
    };
    var temp = [];
    //先将第一层节点放入栈
    for (var i = 0, len = node.length; i < len; i++) {
        temp.push(node[i]);
    };
    var item;
    while (temp.length) {
        item = temp.shift();
        orderData = orderData.concat(item);
        if (item.children && item.children.length) {
            for (var i = 0, len = item.children.length; i < len; i++) {
                if (item.children[i].nodeName == "DIV") { temp.push(item.children[i]); };
            };
        };
    }
}

/*
 * 非递归深度优先
 */

function depthErgodic(node) {
    if (!node || !node.length) {
        return;
    };
    var temp = [];
    /*
     * 先将第一层节点放入栈
     */
    for (var i = 0, len = node.length; i < len; i++) {
        temp.push(node[i]);
    };
    var item;
    while (temp.length) {
        item = temp.shift();
        orderData = orderData.concat(item);
        console.log(item.children[0].innerText);
        if (item.children && item.children.length) {
            for (var i = item.children.length; i > 0; i--) {
                if (item.children[i - 1].nodeName == "DIV") { temp.unshift(item.children[i - 1]); };
            };
        };
    }
}



/*
 * 初始化所有div背景
 */

function divBg() {
    var wp = $cn("div-wrap")[0];
    preOrder(wp);
    var count = 0;
    var fullCount = orderData.length;
    /*    for (var i = 0; i < fullCount; i++) {
            orderData[i].className += " bg-gary";
        };*/
    var ret = setInterval(function() {
        if (count == fullCount) { clearInterval(ret); };
        orderData[count].children[0].style.background = "#aaa";
        count++;
    }, 500);

}


function init() {
    var bb = new btnEventOn();
    var tree = new btnTree();
    for (var i = 0; i < treeData.length; i++) {
        $("treeShow").innerHTML += "ID: " + treeData[i].id + "  parentID: " + treeData[i].parentId + "  content: " + treeData[i].content + "<br>";
    };
    createTree(treeData);

}

window.onload = function() {
    init();
};
