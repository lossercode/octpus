# 开发难点知识总结

### vue3 插槽

为了方便给父元素进行定制内容，可以考虑使用插槽机制。在 vue 中用`<template></template>` 标签组成。

一个组件中为了方便使用多个插槽，可以使用具名插槽，也就是 v-slot 指令，简写为#

### 拖拽事件注意点

在监听 drop 事件时，需要先清除 dropover 的默认行为，drop 事件才能生效，在 vue3 中可以简写为`@dragover.prevent`

参考文献：https://blog.csdn.net/A1399108257/article/details/122723931

```
let dragged = null;

const source = document.getElementById("draggable");
source.addEventListener("dragstart", (event) => {
  // store a ref. on the dragged elem
  dragged = event.target;
});

//目标对象，需要先监听dragover事件然后才能监听drop事件
const target = document.getElementById("droptarget");
target.addEventListener("dragover", (event) => {
  // prevent default to allow drop
  event.preventDefault();
});

target.addEventListener("drop", (event) => {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged element to the selected drop target
  if (event.target.className === "dropzone") {
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
});

```

### 事件中传递参数

如果我们需要同时知道事件触发的元素 e 以及传递一些额外数据例，那么应该写成`@click=handleClick(data, $event)`

这个$event 是 vue3 默认携带的参数，注意放在最后

可参考官网 `在内联事件处理器中访问事件参数`

### vue3 异步组件 defineAsyncComponents

和动态路由一样，只有当我们需要某个组件时，我们才加载这个组件，这就叫异步组件，它的好处在于可以提高性能

同时，如果不使用异步组件进行全局自定义组件注册，我们就可能会出现问题

```
//自定义组件名称
const cutomComponents = ['OpenNewTab']
cutomComponents.forEach((element) => {
  app.component(
    element,
    //异步加载自定义组件
    defineAsyncComponent(() => import(`@/components/custom/${element}.vue`))
  )
})

//不异步加载在component is中就会报错
```

### 元素定位相关,需着重复习

clientX 和 clientY 与 x，y 一样的，以浏览器显示区域的左上角开始，指鼠标的坐标。x,y 是新浏览器支持

offsetX，offsetY，针对目标元素的左上角坐标，从 padding 开始。

layerX,layerY，往上找有定位属性的父元素的左上角（自身有定位属性的话就是相对于自身），都没有的话，就是相对于 body 的左上角

pageX，pageY 相对页面左上角的距离

screenX screenY 相对屏幕左上角的位置

### css 实现三角形
1. 将宽高都设置为 0，要显现的边设置宽度，其他不显示的边设置透明
2. 利用渐变
3. 利用 clip-path 直接设置

### vue3事件修饰符需要注意复习

### vue3使用emit
使用emit向父元素传递事件时，只能在直接父元素上才能监听到，否则无效，如果是多层监听，推荐全局状态变量监听

emit传递的事件都是没有冒泡机制的

### 使用xpath进行定位
使用`document.evaluate` api

### 多级嵌套v-model注意事项
在vue中如果存在多级嵌套的v-model，（一般是父组件向子表单组件传值），如果使用原始的v-model会导致报错，报错的原因是

违背vue中的单向数据流原则.此时在表单中就不能使用v-model,而因该使用model-value

参考：https://blog.csdn.net/dujing_15620553271/article/details/116130968

### 关于对reactive对象重新赋值导致失去响应式
想要引用pinia中的store对象时，不能使用重新赋值，否则会失去响应性，例如

```javascript

const {componentList } = useSotre()
//错误做法，原因在于对一个reactive对象重新赋值就会失去响应性
const temp = componentList[2]

```

### proxy获取真实值的方式
1. 使用vue的toRaws方法
2. 使用JSON.parse(JSON.stringify(val))

### 复制到剪贴板功能
1. 使用naivacator.clicp功能API

### pinia页面刷新会失去数据
解决方法：使用localStorage或者使用插件pinia-plugin-persist