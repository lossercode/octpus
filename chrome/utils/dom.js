/**
 * @description: 根据用户传入的值进行xpath定位，注意：有些时候获取不到数据是因为网页延迟加载部分信息，需要进行等待
 * @return {*}
 * @Date: 2023-04-08 09:33:19； 2023/4/16/23：19
 * @param {*} xpath
 */
const findElement = (query, targetNode) => {
    const node = document.evaluate(query, targetNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    return node
}
/**
 * @description: 判断数据类型
 * @param {*} data
 * @return {*}
 * @Date: 2023-04-16 12:48:10
 */
const getType = (data) => {
    const originType = Object.prototype.toString.call(data); // 获取内部属性值
    const index = originType.indexOf(' '); // 以空格分割
    const type = originType.slice(index + 1, -1); // 截取
    return type.toLowerCase();
}

/**
 * @description: 点击元素,这里参考js高程设计中的await实现sleep()功能
 * @return {*}
 * @Date: 2023-04-08 09:33:49
 * @param {*} xpath
 */
export const clickElement = async (query) => {
    const element = findElement(query, document.body)
    element.snapshotItem(0).click()
}

/**
 * @description: 获取数据
 * @param {*} config：配置项, data：外层的数据容器
 * @return {*}
 * @Date: 2023-04-16 12:58:41
 */
export const getData = (config, data) => {
    console.log('开始获取数据')
    let { element, parent } = config
    //先从整个文档中获取父节点
    parent = findElement(parent, document.body)
    for(let i=0; i<parent.snapshotLength; i++){
        const temp = { }
        //获取子节点
        for(let j=0; j<element.length; j++){
            //当子节点xpath中使用了text(), 是一个[object Text]对象，需要使用.data访问真实值
            temp[element[j]['fieldName']] = findElement(element[j]['select'], parent.snapshotItem(i)).snapshotItem(0)?.data
        }
        data.push(temp)
    }
    console.log(data)
}
/**
 * @description: 下拉加载模块
 * @return {*}
 * @Date: 2023-04-11 17:02:07
 */
export const moveToBottom = async () => {
    setTimeout(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        })
        
    }, 3000);
}
/**
 * @description: 利用mutationObserver接口监听数据
 * @param {*} element：要观察的父节点
 * @param {*} time： 观察时间，可选
 * @param {*} newElement： 出现新数据时进行的解析操作
 * @param {*} data：传入的总体数据
 * @return {*}
 * @Date: 2023-04-13 10:20:10
 */
export const observer = (element, data) => {
    console.log('开始监听节点')
    const { observerElement, observerTime, newChild } = element
    const targetElement = findElement(observerElement, document.body).snapshotItem(0)
    const config = { attributes: true, childList: true, subtree: true }
    const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
                const temp = {}
                const newNode = mutation.addedNodes[0]
                for(let item of newChild){
                    temp[item['fieldName']] = findElement(item['select'], newNode).snapshotItem(0)?.data
                }
                data.push(temp)
            }
        }
        console.log(data)
    };
    const mutationObserver = new MutationObserver(callback)
    mutationObserver.observe(targetElement, config)
    //下面仅作为测试
    if(observerTime !== 0){
        setTimeout(() => {
            mutationObserver.disconnect()
        }, observerTime * 60 * 1000);
    }else{
        setTimeout(() => {
            mutationObserver.disconnect()
        }, 60 * 1000);
    }
}
