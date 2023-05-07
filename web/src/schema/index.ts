//定义组件的属性
export const schemas = [
  {
    id: 'newTab',
    typeName: '流程控制',
    title: '打开网页',
    iconName: 'Position',
    componentName: 'EasyComponent',
    //设置dialog的宽度
    dialogWidth: '32%',
    configs: [
      {
        preDes: '浏览器中打开网页',
        formLabel: '网址',
        value: '',
        propName: 'openTab',
        tips: '填入完整的网址，例如包括https信息等'
      }
    ]
  },
  {
    id: 'loop',
    typeName: '流程控制',
    title: '循环',
    iconName: 'RefreshRight',
    dialogWidth: '32%',
    componentName: 'Loop',
    configs: [
      {
        preDes: '循环',
        suffixDes: '次',
        value: 0,
        propName: 'circleCount'
      }
    ],
    //嵌套元素结尾标志
    nestedEnd: 'loopEnd'
  },
  {
    id: 'loopEnd',
    title: '循环结束',
    typeName: 'nestedEnd',
    iconName: 'RefreshLeft',
    configs: []
  },
  {
    //点击元素
    id: 'click',
    typeName: '流程控制',
    title: '点击元素',
    iconName: 'Mouse',
    dialogWidth: '32%',
    componentName: 'EasyComponent',
    configs: [
      {
        preDes: '点击元素',
        formLabel: '定位元素',
        value: '',
        propName: 'clickElement',
        tips: '推荐使用Xpath定位'
      }
    ]
  },
  {
    id: 'getData',
    typeName: '数据获取',
    title: '获取数据',
    iconName: 'Tickets',
    componentName: 'GetData',
    dialogWidth: '48%',
    configs: [
      {
        preDes: '获取数据块',
        suffixDes: '数据',
        formLabel: '数据块父元素',
        value: '',
        propName: 'parent',
        tips: '不按照数据块进行提取可不填写此字段'
      },
      {
        value: [{ select: '', fieldName: '' }],
        propName: 'element'
      }
    ]
  },
  {
    id: 'observer',
    typeName: '流程控制',
    title: '监听DOM',
    iconName: 'View',
    componentName: 'MutationObserver',
    dialogWidth: '48%',
    configs: [
      {
        preDes: '监听',
        value: '',
        propName: 'observerElement',
        suffixDes: '元素变化'
      },
      {
        value: 0,
        propName: 'observerTime'
      },
      {
        value: [{ select: '', fieldName: '' }],
        propName: 'newChild'
      }
    ],
    nestedEnd: 'observerEnd'
  },
  {
    id: 'observerEnd',
    title: '监听结束',
    typeName: 'nestedEnd',
    iconName: 'Hide',
    configs: []
  },
  {
    id: 'moveToBottom',
    title: '滚动至底部',
    typeName: '流程控制',
    iconName: 'Promotion',
    componentName: 'MoveToBottom',
    dialogWidth: '32%',
    configs: [
      {
        preDes: '网页滚动至底部并等待',
        value: 0,
        propName: 'waitTime',
        suffixDes: '秒'
      }
    ]
  }
]
