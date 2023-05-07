import { getProjectInfo } from "./api/getProject";
import { postData } from "./api/postData";
import { getLocal } from "./utils/storage";
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  //sender在此处没有意义
  // popup页面传输的数据——uuid
  if (request.type === "popup") {
    //配置项本地化存储
    await getProjectInfo(request.data);
    //读取配置，检查是否有打开新网页这个流程
    let project = await getLocal('projectInfo')
    project = project['projectInfo']
    console.log(project)
    if(project[0]['id'] === 'newTab'){
      await chrome.tabs.create({
        url: project[0]['openTab']
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


