import axios from "axios"

export function hitokoto(type, encode) {
    return axios({
        method: "get",
        url: "/api/gethitokoto?c=" + type + "&encode=" + encode,
    })
}