import { request } from "../utils/request"

export const getTask = async (id) => {
    let info = await request(`/task/getTask?id=${id}`)
    info = JSON.parse(info)
    const [res, _] = parseTask([], info, 0)
    return res
}

const parseTask = (path, info, start) => {
    if(start >= info.length) return [path, start]

    if(info[start].name === 'Nested') {
        return [path, start]
    }
    let current = {}
    current.name = info[start].name
    info[start].props.map((prop) => {
        current[prop.propName] = prop.value
    })
    if(info[start].nestedProps){
        let [children, position] = parseTask([], info, ++start)
        // 需要记录当前已经遍历到的深度
        start = position
        current.children = children
    }
    path.push(current)
    return parseTask(path, info, ++start)
}