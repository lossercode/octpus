import { request } from "../utils/request";

export const postData = async (data) => {
    await request('data/', {
        method: 'post',
        data: data
    })
}