import axios from "axios"

export function logout() {
	axios.defaults.withCredentials = true;
	return axios({
		method: "get",
		url: "/api/logout",
		withCredentials: true
	})
}