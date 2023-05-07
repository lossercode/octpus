
//对配置项进行解析
/**
 * @description: 核心功能
 * @return {*}
 * @Date: 2023-04-03 09:59:31
 */

import { clickElement, getData, moveToBottom, observer } from "./utils/dom"
import { getLocal} from "./utils/storage"
const core = async () => {
  let project = await getLocal('projectInfo')
  project = project['projectInfo']
  const data = []
  if(project.length > 0){
    setTimeout(() => {
        parse(project, data)
      }, 3000);
  }
}

const parse = async (element, data) => {
  console.log('开始运行')
  //达到一定长度发送数据
  if(data.length >= 20){
    chrome.runtime.sendMessage({data: data, type: 'content'})
    data.length = 0
  }
  for(let i=0; i<element.length; i++){
    let id = element[i].id
    switch(id){
      case 'loop':
        for(let j=0; j<element[i]['circleCount']; j++){
          setTimeout(() => {
            console.log(`我是第${j}次循环`)
            parse(element[i]['child'], data)
          }, j * 3000);
        }
        break
      
      case 'click':
        clickElement(element[i]['clickElement'])
        break

      case 'getData':
        getData(element[i], data)
        break

      case 'observer':
        observer(element[i], data)
        if(element[i].child){
          for(let j=0; j<element[i].child.length; j++){
            setTimeout(() => {
              parse(element[i].child, data)
            }, j * 3000);
          }
        }
        break
      
      case 'moveToBottom':
        console.log('我执行l')
        moveToBottom()
        break

      default:
        continue
    }
  }
}

core()