import ClipboardJS = require('clipboard')


/** 待处理 */
const inputEle = <HTMLTextAreaElement>document.querySelector('.input')
/** 处理结果 */
const outputEle = <HTMLTextAreaElement>document.querySelector('.output')
/** 开始处理 */
const startEle = <HTMLButtonElement>document.querySelector('.start')
/** 清空 */
const clearEle = <HTMLButtonElement>document.querySelector('.clear')

// 设置默认待处理文本
// setDefaultInput()

startEle.onclick = () => {
    let inputText = inputEle.value
    let outputText = parseText(inputText)
    outputEle.value = outputText
}
clearEle.onclick = () => {
    inputEle.value = ''
    outputEle.value = ''
}

new ClipboardJS('.copy')

/**
 * 对文本排版优化
 * @param text 待处理文本
 * @returns 处理结果
 */
function parseText(text: string) {
    // 汉字
    let hans = `[\\u4E00-\\u9FA5]`
    // 和两端的中文间均增加空格
    let bothSpace = `[a-zA-Z0-9-&*~/+=|]`
    // 和左边的中文间增加空格
    let leftSpace = `[($]`
    // 和右边的中文间增加空格
    let rightSpace = `[)%]`
    const rules = [
        [hans, bothSpace, '$1 $2'],
        [bothSpace, hans, '$1 $2'],
        [hans, leftSpace, '$1 $2'],
        [rightSpace, hans, '$1 $2'],
    ]
    rules.forEach(rule => {
        const reg = new RegExp(`(${rule[0]})\s*(${rule[1]})`, 'g')
        text = text.replace(reg, rule[2])
    })
    return text
}

/** 设置默认待处理文本 */
function setDefaultInput() {
    /** 默认待处理文本 */
    let text = `
    中文abc中-文&中*文（abc中~文）中文(abcd)中文
    概率=符合样本数/总样本数
    `.replace(/(\n\s*)/g, '\n').replace(/(^\n)|(\n$)/g, '')
    // 设置默认待处理文本
    inputEle.value = text
}