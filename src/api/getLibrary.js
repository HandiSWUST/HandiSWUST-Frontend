import axios from "axios";
import {BASE_URL} from "@/common/final";

export function library() {
    axios.defaults.withCredentials = true;
    return axios({
        url: BASE_URL+"/api/v2/extension/library",
        method: "get",
        withCredentials: true,
    })
}
