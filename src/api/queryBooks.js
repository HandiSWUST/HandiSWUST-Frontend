import axios from "axios"
import { BASE_URL } from "@/common/final"

export function queryBooks(bookName,page) {
    axios.defaults.withCredentials = true;
    return axios({
        method: "get",
        url: BASE_URL+"/api/v2/extension/queryBooks?bookName="+bookName+"&page="+page,
        withCredentials: true
    })
}