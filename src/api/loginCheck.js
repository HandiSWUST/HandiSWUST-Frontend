import axios from "axios"
import { BASE_URL } from "../common/final.js"

export function checkLogin() {
    axios.defaults.withCredentials = true;
    return axios({
        method: "get",
        url: BASE_URL+"/api/v2/login/loginCheck",
        withCredentials: true
    })
}
