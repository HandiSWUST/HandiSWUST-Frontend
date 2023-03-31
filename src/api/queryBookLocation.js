import axios from "axios"
import { BASE_URL } from "@/common/final"

export function queryBookLocation(id) {
    axios.defaults.withCredentials = true;
    return axios({
        method: "get",
        url: BASE_URL+"/api/v2/extension/queryLocation?id="+id,
        withCredentials: true
    })
}