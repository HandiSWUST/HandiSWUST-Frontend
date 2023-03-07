import axios from "axios"
import { BASE_URL } from "@/common/final"

export function captcha() {
	axios.defaults.withCredentials = true;
	return axios({
		method: "get",
		url: BASE_URL + "/api/v2/login/captcha",
		withCredentials: true
	})
}