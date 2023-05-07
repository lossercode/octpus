import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useComponentStore = defineStore('componentList', () => {
  const componentList = reactive<any[]>([])
  function addComponent(component: any, index: number) {
    componentList.splice(index, 0, component)
  }
  function deleteComponent(index: number) {
    let end = index
    if (componentList[index].nestedEnd) {
      //找到结束组件位置,
      for (let i = index; i < componentList.length; i++) {
        const pattern = /.*End/
        if (pattern.test(componentList[i].id)) {
          end = i
          break
        }
      }
    }
    componentList.splice(index, end - index + 1)
  }
  function findComponent(index: number) {
    return componentList[index]
  }
  return { componentList, addComponent, deleteComponent, findComponent }
})
