import axios from "axios"
import { BASE_URL } from "../common/final.js"

export function queryBookLocation(id) {
    axios.defaults.withCredentials = true;
    return axios({
        method: "get",
        url: BASE_URL+"/api/queryLocation?id="+id,
        withCredentials: true
    })
}