import axios from "_axios@0.27.2@axios";
import {BASE_URL} from "@/common/final";

export function checkLogin() {
    axios.defaults.withCredentials = true;
    return axios({
        method: "get",
        url: BASE_URL+"/api/loginCheck",
        withCredentials: true
    })
}
