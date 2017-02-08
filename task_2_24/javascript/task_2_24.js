/*
 * @Author: Marte
 * @Date:   2017-01-17 16:51:02
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-01-23 13:47:29
 */

'use strict';

var $ = function(id) {
    return document.getElementById(id);
};
var $cn = function(className) {
    return document.getElementsByClassName(className);
};
var orderData = [];


var treeData = [{
    parentId: null,
    content: "spuer",
    children: [{},{},{}]
}];

function Node(data){
    this.data = data;
}




/*
 * 二叉链表
 */
/*function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = show;
}*/

function show() {
    return this.data;
}

/*
 * 绑定多叉树div点击事件
 */
var btnTree = (function() {
    var tree = $cn("div-wrap")[0];
    tree.addEventListener("click", function(e) {
        /*var index = [].indexOf.call(e.target.parentNode.children, e.target);
        alert(index);*/
        if (e.target && e.target.nodeName == "DIV") { e.target.style.background = "#cac"; } else { e.target.parentNode.style.background = "#cac"; }
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
            }
        };
    });
});

/*
 * 重置背景
 */
function restBg() {
    for (var i = 0; i < orderData.length; i++) {
        orderData[i].style.background = "#fff";
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
    var ret = setInterval(function() {
        if (count < len) {
            if (str && orderData[count].children[0].innerText == str) {
                orderData[count - 1].style.background = "#fff";
                orderData[count].style.background = "#69dcdd";
                alert("已找到，处于绿色标记所在！");
                clearInterval(ret);
            } else {
                if (count != 0) { orderData[count - 1].style.background = "#fff"; };
                orderData[count].style.background = "#aaa";
                count++;
            }
        } else {
            orderData[count - 1].style.background = "#fff";
            if (str != undefined) { alert("输入的字符串不存在！") };
            clearInterval(ret);
        }
    }, 500);
};

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
        console.log(item.children[0].innerText);
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
        orderData[count].style.background = "#aaa";
        count++;
    }, 500);

}


function init() {
    var bb = new btnEventOn();
    var tree = new btnTree();
    /*var node = $cn("div-wrap");*/
    /*ergodic(node[0]);
    ergodic(node[1]);*/
}

window.onload = function() {
    init();
};
