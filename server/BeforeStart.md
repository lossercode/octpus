### 装饰器

主要用途：不使用继承的前提下给类、属性、方法加上一些特殊功能

例子：儿子从父亲那里继承了一辆车，但是想要将车的方向盘、轮毂进行装饰

基本原理：给类的原型链上加上新方法(以类装饰器为列)

```Typescript
const decorate: ClassDecorator = (target: Function) => {
    target.prototype.getName = ():{x:string} => {
        return {x:'ht'}
    }
}

//语法糖，本质上是函数调用
@decorate
class MyName {
    //...
}
```

### 模块化

typescript 中的模块化与原生 js、nodejs 中的模块化有一定区别

- 导入文件时不需要添加`.ts` 后缀

### declare

用处：使用某些第三方库时 typescript 编译器不认识某些变量或类型

作用：declare 关键字除了可以声明全局变量之外，它还可以用来声明全局函数、全局类或全局枚举类型等。

用法: `declare var/function... 第三方库名称: 类型`

### IoC 和 DI

控制反转：A 依赖 B，但是 A 不控制 B 的创建和销毁

```typescript
class B {}
class A {
  constructor(b: B) {
    console.log(b);
  }
}
const b = new B();
// 将B的实例注入到a中，实际上就是将B的实例作为属性传递到A中
const a = new A(b);
```

从上述代码中可以看到，如果依赖项很多，那么我们需要手动的创建每一个依赖项，为了方便集中管理，提出 IOC 容器方案，用一个容器来自动分析和创建要实例化的依赖项(具体原理还未深究)

### dto

data to object，也就是将数据库中的内容变为对象，方便利用中间件进行处理，也可以进行一些验证处理

### nestjs核心组件的理解

1. 控制器controller: 相当于路由
2. 提供者provider: 对每个路由进行业务处理
3. 模块module：管理对应路由下的依赖项，相当库的管理

