import axios from "axios"
import { BASE_URL } from "../common/final.js"

export function save(courseData, qq) {
    axios.defaults.withCredentials = true;
    return axios({
        method: "post",
        url: BASE_URL+"/api/course/push/save/" + qq.toString(),
        data: courseData,
        withCredentials: true
    })
}

export function test() {
    axios.defaults.withCredentials = true;
    return axios({
        method: "get",
        url: BASE_URL+"/api/course/push/test/",
        withCredentials: true
    })
}
