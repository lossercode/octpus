//定义组件的属性
export interface ComponentProps {
  beforeDes: string
  afterDes?: string
  propName: string
  value: string | number
}
export interface NestedProps {
  title: string
  iconName: string
  indent: number
}
export interface Component {
  // 组件名称
  name: string
  // 组件类型
  type?: number
  // 组件中文名
  title: string
  // 组件的icon
  iconName: string
  // 组件的缩进
  indent: number
  // 组件的配置信息
  props: ComponentProps[]
  // 嵌套结尾信息
  nestedProps?: NestedProps
  // 如果是嵌套组件子组件相关信息
  children?: Component[]
}
export const schemas: Component[] = [
  {
    name: 'NewTab',
    type: 0,
    title: '打开网页',
    iconName: 'Position',
    indent: 0,
    props: []
  },
  {
    name: 'Loop',
    type: 0,
    iconName: 'RefreshRight',
    title: '循环',
    indent: 0,
    props: [],
    nestedProps: {
      title: '循环结束',
      iconName: 'RefreshLeft',
      indent: 0
    },
    children: []
  }
]
// interface StaticProps {
//   // 组件所属类别：流程组件 | 控制组件、……
//   type?: number
//   title: string
//   iconName: string
// }
// interface ComponentConfig {
//   // 表单label
//   label: string
//   // 表单值
//   value: string | number
//   // 后端需要的属性
//   propName: string
//   // 是否有提示
//   tip?: string
//   // 表单的类型，默认的是Input，但是有时候需要二次封装 element-plus 的表单
//   // type: string
// }
// export interface Component {
//   // 组件名称
//   componentName: string
//   // 组件静态属性，左侧组件列表、中间渲染区域需要用到
//   static: StaticProps
//   // 缩进，表示层级关系
//   indent: number
//   // 嵌套组件相关属性
//   nested?: StaticProps
//   // 具体配置信息
//   config: ComponentConfig[]
//   // 是否有子元素，仅用于嵌套组件
//   children?: Component[]
//   // 模态框的宽度，每个组件的内容不一样，需要单独设置
//   dialogWidth: string
// }
// export const schemas: Component[] = [
//   {
//     componentName: 'NewTab',
//     static: {
//       type: 0,
//       title: '打开网页',
//       iconName: 'Position'
//     },
//     indent: 0,
//     // 配置项
//     config: [
//       {
//         label: '完整网址',
//         value: '',
//         propName: 'url',
//         tip: '填入完整的网址,例如包括https信息等'
//       },
//       {
//         label: '等待时间',
//         value: 0,
//         propName: 'wait',
//         tip: '有些网页需要等待全部元素加载完毕后才能进行爬虫'
//       }
//     ],
//     dialogWidth: '32%'
//   },
//   {
//     componentName: 'Loop',
//     static: {
//       type: 0,
//       title: '循环',
//       iconName: 'RefreshRight'
//     },
//     indent: 0,
//     config: [
//       {
//         label: '循环次数',
//         value: 0,
//         propName: 'count'
//       }
//     ],
//     children: [],
//     nested: {
//       iconName: 'RefreshLeft',
//       title: '循环结束'
//     },
//     dialogWidth: '32%'
//   },
//   {
//     componentName: 'ClickElement',
//     static: {
//       type: 0,
//       iconName: 'Mouse',
//       title: '点击元素'
//     },
//     indent: 0,
//     config: [
//       {
//         label: '元素定位',
//         value: '',
//         propName: 'element',
//         tip: '请使用xpath语法'
//       }
//     ],
//     dialogWidth: '32%'
//   },
//   {
//     componentName: 'GetData',
//     static: {
//       type: 1,
//       iconName: 'Tickets',
//       title: '获取数据'
//     },
//     indent: 0,
//     config: [
//       {
//         label: '元素定位',
//         propName: 'element',
//         value: '',
//         tip: '请使用xpath语法'
//       },
//       {
//         label: '数据类型',
//         propName: 'type',
//         value: ''
//       },
//       {
//         label: '正则匹配',
//         propName: 'regex',
//         value: '',
//         tip: '可选选项'
//       }
//     ],
//     dialogWidth: '32%'
//   }
// ]
// export const schemas = [
//   {
//     id: 'newTab',
//     typeName: '流程控制',
//     title: '打开网页',
//     iconName: 'Position',
//     componentName: 'EasyComponent',
//     //设置dialog的宽度
//     dialogWidth: '32%',
//     configs: [
//       {
//         preDes: '浏览器中打开网页',
//         formLabel: '网址',
//         value: '',
//         propName: 'openTab',
//         tips: '填入完整的网址，例如包括https信息等'
//       }
//     ]
//   },
//   {
//     id: 'loop',
//     typeName: '流程控制',
//     title: '循环',
//     iconName: 'RefreshRight',
//     dialogWidth: '32%',
//     componentName: 'Loop',
//     configs: [
//       {
//         preDes: '循环',
//         suffixDes: '次',
//         value: 0,
//         propName: 'circleCount'
//       }
//     ],
//     //嵌套元素结尾标志
//     nestedEnd: 'loopEnd'
//   },
//   {
//     id: 'loopEnd',
//     title: '循环结束',
//     typeName: 'nestedEnd',
//     iconName: 'RefreshLeft',
//     configs: []
//   },
//   {
//     //点击元素
//     id: 'click',
//     typeName: '流程控制',
//     title: '点击元素',
//     iconName: 'Mouse',
//     dialogWidth: '32%',
//     componentName: 'EasyComponent',
//     configs: [
//       {
//         preDes: '点击元素',
//         formLabel: '定位元素',
//         value: '',
//         propName: 'clickElement',
//         tips: '推荐使用Xpath定位'
//       }
//     ]
//   },
//   {
//     id: 'getData',
//     typeName: '数据获取',
//     title: '获取数据',
//     iconName: 'Tickets',
//     componentName: 'GetData',
//     dialogWidth: '48%',
//     configs: [
//       {
//         preDes: '获取数据块',
//         suffixDes: '数据',
//         formLabel: '数据块父元素',
//         value: '',
//         propName: 'parent',
//         tips: '不按照数据块进行提取可不填写此字段'
//       },
//       {
//         value: [{ select: '', fieldName: '' }],
//         propName: 'element'
//       }
//     ]
//   },
//   {
//     id: 'observer',
//     typeName: '流程控制',
//     title: '监听DOM',
//     iconName: 'View',
//     componentName: 'MutationObserver',
//     dialogWidth: '48%',
//     configs: [
//       {
//         preDes: '监听',
//         value: '',
//         propName: 'observerElement',
//         suffixDes: '元素变化'
//       },
//       {
//         value: 0,
//         propName: 'observerTime'
//       },
//       {
//         value: [{ select: '', fieldName: '' }],
//         propName: 'newChild'
//       }
//     ],
//     nestedEnd: 'observerEnd'
//   },
//   {
//     id: 'observerEnd',
//     title: '监听结束',
//     typeName: 'nestedEnd',
//     iconName: 'Hide',
//     configs: []
//   },
//   {
//     id: 'moveToBottom',
//     title: '滚动至底部',
//     typeName: '流程控制',
//     iconName: 'Promotion',
//     componentName: 'MoveToBottom',
//     dialogWidth: '32%',
//     configs: [
//       {
//         preDes: '网页滚动至底部并等待',
//         value: 0,
//         propName: 'waitTime',
//         suffixDes: '秒'
//       }
//     ]
//   }
// ]
