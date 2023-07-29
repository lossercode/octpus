import { postData } from "./api/postData";
import { getTask } from "./api/task";
import { getLocal, setLocal } from "./utils/storage";
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  //sender在此处没有意义
  // popup页面传输的数据——uuid
  if (request.type === "popup") {
    const info = await getTask(request.data);
    // 本地化存储方便content.js读取
    setLocal('taskInfo', info)
    //读取配置，检查是否有打开新网页这个流程
    if(info[0]['name'] === 'NewTab'){
      await chrome.tabs.create({
        url: info[0].url
      })
    }
    //注入content.js
    setTimeout(async () => {
      let queryOptions = { active: true };
      let [tab] = await chrome.tabs.query(queryOptions);
      await chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ["content.js"],
        },
        () => {
          console.log("注入脚本成功");
        }
      );
    }, 3000);
    
  }

  if (request.type === "content") {
    // postData(request.data)
    console.log(request.data)
  }
});


