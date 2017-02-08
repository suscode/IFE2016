/*
 * @Author: Marte
 * @Date:   2017-01-17 16:51:02
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-01-20 11:47:29
 */

'use strict';

var $ = function(id) {
    return document.getElementById(id);
};
var $cn = function(className) {
    return document.getElementsByClassName(className);
};
var orderData = [];


/*
 * 二叉链表
 */
function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = show;
}

function show() {
    return this.data;
}

//btn事件对象
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
                    preOrder(node[1]);
                    ergodic();
                    break;
                case 1:
                    inOrder(node[0]);
                    inOrder(node[1]);
                    ergodic();
                    break;
                case 2:
                    postOrder(node[0]);
                    postOrder(node[1]);
                    ergodic();
                    break;
                case 3:
                    break;
            }
        };
    });
});

//重置背景
function restBg() {
    for (var i = 0; i < orderData.length; i++) {
        orderData[i].style.background = "#aaa";
    };
}

//遍历
function ergodic() {
    var count = 0;
    var len = orderData.length;
    var ret = setInterval(function() {
        if (count < len) {
            orderData[count].style.background = "#fff";
            count++;
        } else {
            clearInterval(ret);
        }
    }, 500);
};

//先序遍历
function preOrder(node) {
    if (node != undefined) {
        orderData.push(node);
        preOrder(node.children[0]);
        preOrder(node.children[1]);
    };
}

//中序遍历
function inOrder(node) {
    if (node != undefined) {
        inOrder(node.children[0]);
        orderData.push(node);
        inOrder(node.children[1]);
    };
}

//后序遍历
function postOrder(node) {
    if (node != undefined) {
        postOrder(node.children[0]);
        postOrder(node.children[1]);
        orderData.push(node);
    };
}

function init() {
    var bb = new btnEventOn();
    var node = $cn("div-wrap");
    ergodic(node[0]);
    ergodic(node[1]);
}

window.onload = function() {
    init();
};
