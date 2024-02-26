import axios from "axios";
import {BASE_URL} from "@/common/final";

export function getWebVersion() {
    return axios({
        method: "get",
        url: BASE_URL + "/api/web/version"
    })
}