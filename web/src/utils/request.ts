import { ElMessage } from 'element-plus'
import axios from 'axios'
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig
} from 'axios'

//链接：https://juejin.cn/post/7212986537776431162

//封装实例
class Request {
  // Axios 实例
  instance: AxiosInstance
  // 存放取消请求控制器
  abortControllerMap: Map<string, AbortController>

  constructor(config: AxiosRequestConfig) {
    // 创建 Axios 实例
    this.instance = axios.create(config)
    // 存储取消请求的控制器
    this.abortControllerMap = new Map()
    // 添加请求拦截器
    this.instance.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => {
        res.headers.Authorization = 'Bearer ' + localStorage.getItem('token') || ''
        // 创建取消请求的控制器
        const controller = new AbortController()
        // 获取请求的 url
        const url = res.url || ''
        // 将控制器存储到 Map 中
        res.signal = controller.signal
        this.abortControllerMap.set(url, controller)
        return res
      },
      (err: any) => ElMessage(err.message)
    )

    // 添加响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return new Promise((resolve, reject) => {
          // 获取响应的 url
          const url = res.config.url || ''
          // 从 Map 中删除对应的控制器
          this.abortControllerMap.delete(url)
          const data = res.data
          //根据响应结果进行处理
          // switch (data.code) {
          //   case 200:
          //     resolve(data.data)
          //     break

          //   case 401:
          //     ElMessage.warning('请先登录')
          //     reject()
          //     break

          //   case 404:
          //     ElMessage.error('请求错误')
          //     reject()
          //     break

          //   case 500:
          //     ElMessage.error('服务器错误')
          //     reject()
          //     break

          //   default:
          //     ElMessage.error('未知错误')
          //     reject()
          // }
          if (data.code !== 200) {
            ElMessage(data.message)
            reject()
          } else {
            resolve(data.data)
          }
        })
      },
      (err: any) => {
        // 响应拦截器错误处理函数
        ElMessage.error(err.message)
        throw new Error(err.message)
      }
    )
  }

  // 发送请求的方法，返回 Promise 对象
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res as T)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  }

  // 取消全部请求
  cancelAllRequest() {
    for (const controller of this.abortControllerMap.values()) {
      controller.abort()
    }
    // 清空 Map
    this.abortControllerMap.clear()
  }

  // 取消指定的请求
  cancelRequest(url: string | string[]) {
    // 将参数转换为数组
    const urlList = Array.isArray(url) ? url : [url]
    urlList.forEach((_url) => {
      // 根据 url 获取对应的控制器并取消请求
      this.abortControllerMap.get(_url)?.abort()
      // 从 Map 中删除对应的控制器
      this.abortControllerMap.delete(_url)
    })
  }
}

const myRequest = new Request({
  baseURL: 'http://127.0.0.1:7001/api',
  timeout: 5000
})

export default myRequest
