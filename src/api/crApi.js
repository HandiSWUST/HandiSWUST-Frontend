import axios from "axios";
import {BASE_URL} from "@/common/final";

export function cr(img) {
    return axios({
        url: BASE_URL + "/api/v2/extension/cr",
        method: "POST",
        data: img,
        withCredentials: true
    });
}
