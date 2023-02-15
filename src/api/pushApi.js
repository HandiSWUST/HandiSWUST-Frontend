import axios from "axios"
import { BASE_URL } from "@/common/final"

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

export function del() {
    axios.defaults.withCredentials = true;
    return axios({
        method: "delete",
        url: BASE_URL+"/api/course/push/delete/",
        withCredentials: true
    })
}

export function check() {
    axios.defaults.withCredentials = true;
    return axios({
        method: "get",
        url: BASE_URL+"/api/course/push/check/",
        withCredentials: true
    })
}
