//获取本地存储信息，例如配置项,参数为对象形式
export const setLocal = async (item) => {
    await chrome.storage.local.set(item)
}

export const getLocal = async (key) => {
    return await chrome.storage.local.get([key])
}