import axios from "axios"
import { BASE_URL } from "../common/final.js"

export function captcha() {
	axios.defaults.withCredentials = true;
	return axios({
		method: "get",
		url: BASE_URL + "/api/captcha",
		withCredentials: true
	})
}