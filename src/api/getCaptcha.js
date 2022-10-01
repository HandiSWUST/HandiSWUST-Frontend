import axios from "axios"

export function captcha() {
	axios.defaults.withCredentials = true;
	return axios({
		method: "get",
		url: "/api/captcha",
		withCredentials: true
	})
}