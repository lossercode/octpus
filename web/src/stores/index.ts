import type { Component } from '@/schema'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useComponentStore = defineStore('componentList', () => {
  const componentList = reactive<Component[]>([])

  // function addComponent(component: Component, index: number) {
  //   componentList.splice(index, 0, component)
  // }
  function deleteComponent(index: number) {
    let end = index
    if (componentList[index].nestedProps) {
      //找到结束组件位置,
      for (let i = index; i < componentList.length; i++) {
        if (componentList[i].props.length === 0) {
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
  return { componentList, deleteComponent, findComponent }
})
