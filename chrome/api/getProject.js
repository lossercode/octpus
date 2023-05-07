import { request } from "../utils/request";
import { setLocal } from '../utils/storage'
/**
 * @description: 根据生成的项目token获取项目具体配置信息
 * @return {*}
 * @Date: 2023-04-09 16:35:09
 * @param {*} token
 */
export const getProjectInfo = async (token) => {
    const projectInfo = await request(`task/getTask?token=${token}`)
    await setLocal({'projectInfo': projectInfo})
}