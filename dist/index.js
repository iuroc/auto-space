"use strict";
exports.__esModule = true;
var ClipboardJS = require("clipboard");
/** 待处理 */
var inputEle = document.querySelector('.input');
/** 处理结果 */
var outputEle = document.querySelector('.output');
/** 开始处理 */
var startEle = document.querySelector('.start');
/** 清空 */
var clearEle = document.querySelector('.clear');
// 设置默认待处理文本
// setDefaultInput()
startEle.onclick = function () {
    var inputText = inputEle.value;
    var outputText = parseText(inputText);
    outputEle.value = outputText;
};
clearEle.onclick = function () {
    inputEle.value = '';
    outputEle.value = '';
};
new ClipboardJS('.copy');
/**
 * 对文本排版优化
 * @param text 待处理文本
 * @returns 处理结果
 */
function parseText(text) {
    // 汉字
    var hans = "[\\u4E00-\\u9FA5]";
    // 和两端的中文间均增加空格
    var bothSpace = "[a-zA-Z0-9-&*~/+=|]";
    // 和左边的中文间增加空格
    var leftSpace = "[($]";
    // 和右边的中文间增加空格
    var rightSpace = "[)%]";
    var rules = [
        [hans, bothSpace, '$1 $2'],
        [bothSpace, hans, '$1 $2'],
        [hans, leftSpace, '$1 $2'],
        [rightSpace, hans, '$1 $2'],
    ];
    rules.forEach(function (rule) {
        var reg = new RegExp("(".concat(rule[0], ")s*(").concat(rule[1], ")"), 'g');
        text = text.replace(reg, rule[2]);
    });
    return text;
}
/** 设置默认待处理文本 */
function setDefaultInput() {
    /** 默认待处理文本 */
    var text = "\n    \u4E2D\u6587abc\u4E2D-\u6587&\u4E2D*\u6587\uFF08abc\u4E2D~\u6587\uFF09\u4E2D\u6587(abcd)\u4E2D\u6587\n    \u6982\u7387=\u7B26\u5408\u6837\u672C\u6570/\u603B\u6837\u672C\u6570\n    ".replace(/(\n\s*)/g, '\n').replace(/(^\n)|(\n$)/g, '');
    // 设置默认待处理文本
    inputEle.value = text;
}
